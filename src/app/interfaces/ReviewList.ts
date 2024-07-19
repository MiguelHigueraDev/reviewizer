import { Review } from "./ReviewResponse";

/**
 * This represents a list of reviews for each separate game
 */
export interface ReviewList {
    appId: string;
    title: string;
    reviews: Review[];
}