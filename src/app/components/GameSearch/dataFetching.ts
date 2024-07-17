'use server';

import * as cheerio from 'cheerio'
import { ReviewResponse } from '@/app/interfaces/ReviewResponse';
import { GameResult } from '@/app/interfaces/GameResult';

const REVIEWS_URL = 'https://store.steampowered.com/appreviews/';
// Category 998 is for games only
const SEARCH_GAME_URL =
  'https://store.steampowered.com/search/?category1=998&term=';

type ReviewType = 'all' | 'positive' | 'negative';

export const fetchReviews = async (
  appId: string,
  type: ReviewType
): Promise<ReviewResponse> => {
  try {
    const response = await fetch(
      `${REVIEWS_URL}${appId}?json=1&filter=${type}`
    );
    if (!response.ok) throw new Error('Failed to fetch reviews');

    const data: ReviewResponse = await response.json();
    if (data.reviews.length < 1)
      throw new Error('App does not exist or does not have any reviews');

    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// This returns raw HTML that needs to be parsed by extractGameList
export const searchGameRaw = async (query: string): Promise<GameResult[]> => {
  try {
    const response = await fetch(`${SEARCH_GAME_URL}${query}`);
    if (!response.ok) throw new Error('Failed to search for games');

    const data = await response.text();
    return extractGameList(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

// Get 10 most relevant games from the search results
const extractGameList = (html: string): GameResult[] => {
    const $ = cheerio.load(html);
    const games: GameResult[] = [];
    $('.search_result_row').each((_, element) => {
        if (games.length >= 10) return;

        const appId = $(element).attr('data-ds-appid');
        const title = $(element).find('.title').text();
        const releaseDate = $(element).find('.search_released').text().trim().replaceAll('\n', '');
        const imageUrl = $(element).find('.search_capsule img').attr('src');
        const url = $(element).attr('href');
        if (appId && title && releaseDate && imageUrl && url)
            games.push({ appId, title, releaseDate, imageUrl, url });
    });
    
    return games;
}
