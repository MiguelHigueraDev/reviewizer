"use server";

import * as cheerio from "cheerio";
import { GameResult, ReviewResponse, SummaryResponse } from "./types";
import { GoogleGenAI } from "@google/genai";

const REVIEWS_URL = "https://store.steampowered.com/appreviews/";
// Category 998 is for games only
const SEARCH_GAME_URL =
  "https://store.steampowered.com/search/?category1=998&term=";

const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
const AI_MODEL = "gemini-2.5-flash";

if (!GOOGLE_AI_KEY) throw new Error("Missing Google AI key");
const ai = new GoogleGenAI({
  apiKey: GOOGLE_AI_KEY,
});

export const fetchReviews = async (
  appId: string,
  title: string
): Promise<ReviewResponse> => {
  try {
    const response = await fetch(
      `${REVIEWS_URL}${appId}?use_review_quality=1&cursor=*&day_range=30&start_date=-1&end_date=-1&date_range_type=all&filter=summary&language=english&l=english&review_type=all&purchase_type=all&playtime_filter_min=0&playtime_filter_max=0&filter_offtopic_activity=1&summary_num_positive_reviews=30&summary_num_reviews=15&json=1`
    );
    if (!response.ok) throw new Error("Failed to fetch reviews");

    const data: ReviewResponse = await response.json();
    if (data.reviews.length < 1)
      throw new Error("App does not exist or does not have any reviews");

    // Append app ID and title to the response
    data.appId = appId;
    data.title = title;

    return filterReviews(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Filter joke reviews and those that are too short (less than 10 words)
// Remove non alphanumeric characters from the reviews
const filterReviews = async (reviewResponse: ReviewResponse) => {
  const filteredReviews = reviewResponse.reviews.filter(
    (review) =>
      review.review.trim().split(" ").length > 7 && review.votes_funny < 40
  );

  // Remove non alphanumeric characters from the reviews, except for punctuation
  filteredReviews.forEach((review) => {
    review.review = review.review.replace(/[^a-zA-Z0-9\s,.!?-]/g, "");
  });

  return { ...reviewResponse, reviews: filteredReviews };
};

// This returns raw HTML that needs to be parsed by extractGameList
export const fetchGames = async (query: string): Promise<GameResult[]> => {
  try {
    const response = await fetch(`${SEARCH_GAME_URL}${query}`);
    if (!response.ok) throw new Error("Failed to search for games");

    const data = await response.text();
    return extractGameList(data);
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

// Get 10 most relevant games from the search results
const extractGameList = (html: string): GameResult[] => {
  const $ = cheerio.load(html);
  const games: GameResult[] = [];
  $(".search_result_row").each((_, element) => {
    if (games.length >= 10) return;

    const appId = $(element).attr("data-ds-appid");
    const title = $(element).find(".title").text();
    const releaseDate = $(element)
      .find(".search_released")
      .text()
      .trim()
      .replaceAll("\n", "");
    const imageUrl = $(element).find(".search_capsule img").attr("src");
    const url = $(element).attr("href");
    if (appId && title && releaseDate && imageUrl && url)
      games.push({ appId, title, releaseDate, imageUrl, url });
  });

  return games;
};

export const fetchAiSummary = async (
  text: string,
  title: string
): Promise<string> => {
  const prompt = `Summarize the following reviews. 
  Each review is separated by a line break. 
  Ignore any irrelevant reviews like ASCII art or jokes. 
  Besides the summary, enumerate at most five positive and negative points about the games.
  Use the following JSON template for the summary.
  EXPORT RAW, MINIFIED JSON. NO MARKDOWN OR ANYTHING ELSE.
  {
    "title": "[game title]", 
    "summary": "[review summary]",
    "positive": ["[positive points]"],
    "negative": ["[negative points]"],
  }
  Game title:
  ${title}
  Review list: 
  ${text}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const output = response.text;
    if (!output) throw new Error("No output from AI");
    // Remove markdown JSON formatting
    const startIndex = output.indexOf("{");
    const endIndex = output.lastIndexOf("}");
    return output.slice(startIndex, endIndex + 1);
  } catch (error) {
    console.error("Error fetching AI summary:", error);
    throw error;
  }
};

export const fetchAiChatResponse = async (
  chatHistory: { role: "user" | "assistant"; content: string }[],
  summaries: Omit<SummaryResponse, "error">[]
): Promise<string> => {
  const summariesText = summaries
    .map(
      (s) =>
        `Game: ${s.title}\\nSummary: ${
          s.summary
        }\\nPositive Points: ${s.positive.join(
          ", "
        )}\\nNegative Points: ${s.negative.join(", ")}`
    )
    .join("\\n\\n");

  const historyText = chatHistory
    .map((message) => `${message.role}: ${message.content}`)
    .join("\\n");

  const prompt = `You are a helpful assistant knowledgeable about video games.
The user has provided summaries for the following games:
${summariesText}

Continue the conversation based on these summaries and the chat history below.
If asked about other games not in the summary, do your best to answer based on your knowledge.
Keep your answers concise and helpful.
Only answer questions related to video games.
Do not answer any other questions.

Chat History:
${historyText}
assistant:`;

  try {
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const output = response.text;
    if (!output) throw new Error("No output from AI");
    return output.trim();
  } catch (error) {
    console.error("Error fetching AI chat response:", error);
    throw error;
  }
};

export const fetchAiSuggestions = async (
  summaries: Omit<SummaryResponse, "error">[]
): Promise<string[]> => {
  const summariesText = summaries
    .map(
      (s) =>
        `Game: ${s.title}\\nSummary: ${
          s.summary
        }\\nPositive Points: ${s.positive.join(
          ", "
        )}\\nNegative Points: ${s.negative.join(", ")}`
    )
    .join("\\n\\n");

  const prompt = `
  You are a helpful assistant knowledgeable about video games.
  The user has provided summaries, positive and negative points for the following games:
  ${summariesText}
  Based on these summaries, and what you know as an expert, but mainly focusing on the summaries, write a list of three questions that the user can ask to get more information about the games.
  Format the questions as a JSON array of strings, like this:
  Try to keep questions below 10 words.
  ["Question 1", "Question 2", "Question 3"]`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const output = response.text;
  if (!output) throw new Error("No output from AI");

  // Extract the JSON array from the output
  const startIndex = output.indexOf("[");
  const endIndex = output.lastIndexOf("]");
  const jsonArray = output.slice(startIndex, endIndex + 1);
  try {
    const questions = JSON.parse(jsonArray) as string[];
    if (!Array.isArray(questions) || questions.length !== 3) {
      throw new Error("Invalid AI response format");
    }
    return questions;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI response");
  }
};
