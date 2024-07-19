'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useState } from 'react';
import { GameResult } from './interfaces/GameResult';
import SelectedGamesModal from './components/SelectedGames/SelectedGamesModal';
import AppIntro from './components/AppIntro';
import SummaryList from './components/SummarySection/SummaryList';
import { fetchAiSummary, fetchReviews } from './utils/dataFetching';
import { ReviewList } from './interfaces/ReviewList';
import GetReviewsButton from './components/SummarySection/GetReviewsButton';
import SelectedGamesModalButton from './components/SelectedGames/SelectedGamesModalButton';
import { SummaryResponse } from './interfaces/SummaryResponse';
import SummaryListSkeleton from './components/SummarySection/SummaryListSkeleton';

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [summaries, setSummaries] = useState([] as SummaryResponse[]);
  const [_, setReviews] = useState([] as ReviewList[]);

  const [isSelectedModalVisible, setIsSelectedModalVisible] = useState(false);

  const [summariesLoading, setSummariesLoading] = useState(false);

  const handleAddGame = (game: GameResult) => {
    if (selectedGames.length >= 3) return;
    if (selectedGames.find((selectedGame) => selectedGame.appId === game.appId))
      return;
    setSelectedGames([...selectedGames, game]);
  };

  const handleRemoveGame = (game: GameResult) => {
    setSelectedGames(selectedGames.filter((g) => game.appId !== g.appId));
  };

  const handleGetReviews = async () => {
    setSummariesLoading(true);
    try {
      const reviews = await fetchAllReviews(selectedGames);
      setReviews(reviews);
      console.log(reviews);

      const filteredReviews = filterEmptyReviews(reviews);
      if (filteredReviews.length === 0) {
        alert('No reviews found for selected games');
        setSummaries([]);
      } else {
        if (filteredReviews.length !== reviews.length) {
          alert('Some games have no reviews');
        }
        const summaries = await fetchAllSummaries(filteredReviews);
        setSummaries(summaries);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching reviews or AI summaries.');
    } finally {
      setSummariesLoading(false);
    }
  };

  const fetchAllReviews = async (games: GameResult[]) => {
    const reviewPromises = games.map((game) =>
      fetchReviews(game.appId, game.title)
    );
    const reviewResponses = await Promise.all(reviewPromises);
    return reviewResponses.map((response) => ({
      appId: response.appId,
      title: response.title,
      reviews: response.reviews,
    }));
  };

  const fetchAllSummaries = async (reviews: ReviewList[]) => {
    const summaryPromises = reviews.map((review) =>
      fetchAiSummary(review.reviews.map((r) => r.review).join('\n'), review.title)
    );
    
    const summaries = await Promise.all(summaryPromises);
  
    // If there is an error parsing a summary, log it and continue, ignoring it
    return summaries.reduce((acc: SummaryResponse[], summary) => {
      try {
        const parsedSummary = JSON.parse(summary);
        acc.push(parsedSummary);
      } catch (error) {
        console.error('Error parsing summary:', error);
      }
      return acc;
    }, []);
  };

  const filterEmptyReviews = (reviews: ReviewList[]) => {
    return reviews.filter((review) => review.reviews.length > 0);
  };

  return (
    <main className="lg:flex min-h-screen items-start max-w-7xl mx-auto gap-10 justify-center p-4 md:p-16">
      <div className="lg:w-1/2">
        <AppIntro />
        <GameSearch
          selectedGames={selectedGames}
          onAddGame={handleAddGame}
          onRemoveGame={handleRemoveGame}
        />
        <GetReviewsButton
          selectedGames={selectedGames}
          onClick={handleGetReviews}
          isLoading={summariesLoading}
        />

        <hr className="block lg:hidden w-full mt-4 border-neutral-600" />
      </div>

      <div className="lg:w-1/2 self-center">
        {summariesLoading ? (
          <SummaryListSkeleton />
        ) : (
          <SummaryList summaries={summaries} />
        )}
      </div>

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
