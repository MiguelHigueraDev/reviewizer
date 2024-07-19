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

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [summaries, setSummaries] = useState([] as SummaryResponse[]);
  const [reviews, setReviews] = useState([] as ReviewList[]);

  const [isSelectedModalVisible, setIsSelectedModalVisible] = useState(false);
  const [isReviewsModalVisible, setIsReviewsModalVisible] = useState(false);

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
    getSummaries(reviews);

    setIsReviewsModalVisible(true);
  };

  const getSummaries = async (reviews: ReviewList[]) => {
    const summaryPromises = reviews.map((review) =>
      fetchAiSummary(review.reviews.map((r) => r.review).join('\n'))
    );
    const summaries = await Promise.all(summaryPromises);
    const parsedSummaries: SummaryResponse[] = summaries.map((summary) => JSON.parse(summary));
    setSummaries(parsedSummaries);
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto gap-10 items-center justify-center p-4 md:p-16">
      <AppIntro />
      <GameSearch
        selectedGames={selectedGames}
        onAddGame={handleAddGame}
        onRemoveGame={handleRemoveGame}
      />
      <hr className="w-full mt-4 border-neutral-600" />

      <GetReviewsButton
        selectedGames={selectedGames}
        onClick={handleGetReviews}
      />
      <SummaryList summaries={summaries} />

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

      <ReviewsModal
        isVisible={isReviewsModalVisible}
        reviews={reviews}
        onToggleVisibility={() => setIsReviewsModalVisible(false)}
      />
    </main>
  );
}
