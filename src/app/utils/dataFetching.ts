"use server";

import * as cheerio from "cheerio";
import { GameResult, ReviewResponse } from "./types";
import { GoogleGenAI } from "@google/genai";

const REVIEWS_URL = "https://store.steampowered.com/appreviews/";
// Category 998 is for games only
const SEARCH_GAME_URL =
  "https://store.steampowered.com/search/?category1=998&term=";

const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
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
      model: "gemini-2.5-flash",
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
