import { ReviewList } from '@/app/interfaces/ReviewList';
import { useState } from 'react';
import ReviewCarousel from './ReviewCarousel';

const ReviewsModal = ({
  isVisible,
  reviews,
  onToggleVisibility,
}: {
  isVisible: boolean;
  reviews: ReviewList[];
  onToggleVisibility: () => void;
}) => {
  return (
    <>
      {/* Backdrop to close modal */}
      {isVisible && (
        <div
          onClick={onToggleVisibility}
          className="bg-black bg-opacity-50 w-screen h-screen fixed z-40 top-0 left-0"
        />
      )}

      {/* The actual modal */}
      {isVisible && (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-neutral-800 p-4 rounded-t-xl md:rounded-md">
          <h3 className="text-2xl font-bold mb-2">Reviews</h3>
          <ReviewCarousel reviews={reviews} />
        </div>
      )}
    </>
  );
};

export default ReviewsModal;
