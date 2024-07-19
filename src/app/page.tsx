'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useState } from 'react';
import { GameResult } from './interfaces/GameResult';
import SelectedGamesModal from './components/SelectedGames/SelectedGamesModal';
import AppIntro from './components/AppIntro';
import SummaryList from './components/SummarySection/SummaryList';
import { fetchAiSummary, fetchReviews } from './utils/dataFetching';
import { ReviewList } from './interfaces/ReviewList';
import GetReviewsButton from './components/ReviewSection/GetReviewsButton';
import SelectedGamesModalButton from './components/SelectedGames/SelectedGamesModalButton';
import ReviewsModal from './components/ReviewSection/ReviewsModal';
import { SummaryResponse } from './interfaces/SummaryResponse';
import SummaryListSkeleton from './components/shared/Skeletons/SummaryListSkeleton';

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [summaries, setSummaries] = useState([] as SummaryResponse[]);
  const [_, setReviews] = useState([] as ReviewList[]);

  const [isSelectedModalVisible, setIsSelectedModalVisible] = useState(false);

  const [summariesLoading, setSummariesLoading] = useState(false);

  const handleAddGame = (game: GameResult) => {
    if (selectedGames.length >= 10) return;
    if (selectedGames.find((selectedGame) => selectedGame.appId === game.appId))
      return;
    setSelectedGames([...selectedGames, game]);
  };

  const handleRemoveGame = (game: GameResult) => {
    setSelectedGames(selectedGames.filter((g) => game.appId !== g.appId));
  };

  const handleGetReviews = async () => {
    setSummariesLoading(true);

    const reviewPromises = selectedGames.map((game) =>
      fetchReviews(game.appId, game.title, 'all')
    );
    const reviewResponses = await Promise.all(reviewPromises);
    const reviews: ReviewList[] = reviewResponses.map((response) => ({
      appId: response.appId,
      title: response.title,
      reviews: response.reviews,
    }));
    setReviews(reviews);
    console.log(reviews);

    // After getting reviews, get summaries
    getSummaries(reviews);
  };

  const getSummaries = async (reviews: ReviewList[]) => {
    // Filter out empty reviews
    const filteredReviews = filterEmptyReviews(reviews);
    if (filteredReviews.length === 0) {
      alert('No reviews found for selected games');
      setSummaries([]);
      setSummariesLoading(false);
      return;
    }
    if (filteredReviews.length !== reviews.length) {
      alert('Some games have no reviews');
    }

    const summaryPromises = filteredReviews.map((review) =>
      fetchAiSummary(review.reviews.map((r) => r.review).join('\n'))
    );

    const summaries = await Promise.all(summaryPromises);

    const parsedSummaries: SummaryResponse[] = summaries.map((summary) =>
      JSON.parse(summary)
    );

    setSummaries(parsedSummaries);
    setSummariesLoading(false);
  };

  const filterEmptyReviews = (reviews: ReviewList[]) => {
    return reviews.filter((review) => review.reviews.length > 0);
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto gap-10 items-center justify-center p-4 md:p-16">
      <AppIntro />
      <GameSearch
        selectedGames={selectedGames}
        onAddGame={handleAddGame}
        onRemoveGame={handleRemoveGame}
      />
      <GetReviewsButton
        selectedGames={selectedGames}
        onClick={handleGetReviews}
      />

      <hr className="w-full mt-4 border-neutral-600" />

      {summariesLoading ? (
        <SummaryListSkeleton />
      ) : (
        <SummaryList summaries={summaries} />
      )}

      {/* Selected games modal and toggle button */}
      <SelectedGamesModalButton
        selectedGames={selectedGames}
        onToggleVisibility={() =>
          setIsSelectedModalVisible(!isSelectedModalVisible)
        }
      />

      <SelectedGamesModal
        isVisible={isSelectedModalVisible}
        selectedGames={selectedGames}
        onRemoveGame={handleRemoveGame}
        onToggleVisibility={() =>
          setIsSelectedModalVisible(!isSelectedModalVisible)
        }
      />
    </main>
  );
}
