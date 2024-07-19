'use client';

import { ReviewList } from '@/app/interfaces/ReviewList';
import { useState } from 'react';

const ReviewCarousel = ({ reviews }: { reviews: ReviewList[] }) => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const gameCount = reviews.length;
  const reviewCount = reviews[currentGameIndex]?.reviews.length || 0;

  const updateCurrentGameIndex = (action: 'decrease' | 'increase') => {
    // Reset review index when changing games to prevent out of bounds
    setCurrentReviewIndex(0);
    if (action === 'decrease') {
      setCurrentGameIndex((currentGameIndex - 1 + gameCount) % gameCount);
    } else {
      setCurrentGameIndex((currentGameIndex + 1) % gameCount);
    }
  };

  const generateSummary = () => {
    const currentReviews = reviews[currentGameIndex].reviews;
    const reviewString = currentReviews.map((review) => review.review).join('\n');
    console.log(reviewString);
  }

  return (
    <section className="space-y-2 w-[400px]">
      <h2 className="text-lg font-bold">
        Current game: {reviews[currentGameIndex].title}
      </h2>
      <div className="flex justify-between">
        <button
          className="p-2 bg-neutral-600 rounded-md"
          onClick={() => updateCurrentGameIndex('decrease')}
        >
          Previous game
        </button>
        <button
          className="p-2 bg-neutral-600 rounded-md"
          onClick={() => updateCurrentGameIndex('increase')}
        >
          Next game
        </button>
      </div>

      <h2 className="text-lg font-bold">
        Review {currentReviewIndex + 1} of {reviewCount}
      </h2>
      <div className="flex justify-between">
        <button
          className="p-2 bg-neutral-600 rounded-md"
          onClick={() =>
            setCurrentReviewIndex(
              (currentReviewIndex - 1 + reviewCount) % reviewCount
            )
          }
        >
          Previous review
        </button>
        <button
          className="p-2 bg-neutral-600 rounded-md"
          onClick={() =>
            setCurrentReviewIndex((currentReviewIndex + 1) % reviewCount)
          }
        >
          Next review
        </button>
      </div>

      <article className="max-h-[300px] overflow-y-auto">
        {reviewCount > 0 ? (
          <p className="text-sm">
            {reviews[currentGameIndex].reviews[currentReviewIndex].review}
          </p>
        ) : (
          <p>No reviews found</p>
        )}
      </article>

      <button onClick={generateSummary}>Generate summary</button>
    </section>
  );
};

export default ReviewCarousel;
