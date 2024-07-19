export interface ReviewResponse {
    success: number;
    query_summary: QuerySummary;
    reviews: Review[];
    cursor: string;
    appId: string;
    title: string;
}

interface QuerySummary {
    num_reviews: number;
}

export interface Review {
    recommendationid: number;
    author: Author;
    language: string;
    review: string;
    timestamp_created: number;
    timestamp_updated: number;
    voted_up: boolean;
    votes_up: number;
    votes_funny: number;
    weighted_vote_score: number;
    comment_count: number;
    steam_purchase: boolean;
    received_for_free: boolean;
    written_during_early_access: boolean;
    hidden_in_steam_china: boolean;
    steam_china_location: string;
}

interface Author {
    steamid: string;
    num_games_owned: number;
    num_reviews: number;
    playtime_forever: number;
    playtime_last_two_weeks: number;
    last_played: number;
}