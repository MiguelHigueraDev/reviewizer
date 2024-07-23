'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useRef, useState } from 'react';
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
import Disclaimer from './components/Disclaimer';

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [summaries, setSummaries] = useState([] as SummaryResponse[]);
  const [_, setReviews] = useState([] as ReviewList[]);
  const [isSelectedModalVisible, setIsSelectedModalVisible] = useState(false);
  const [summariesLoading, setSummariesLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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
    scrollToBottom();
    try {
      const reviews = await fetchAllReviews(selectedGames);
      setReviews(reviews);
      
      const filteredReviews = filterEmptyReviews(reviews);
      if (filteredReviews.length === 0) {
        setSummaries([]);
      } else {
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
    const summaryPromises = reviews.map(async (review) => {
      try {
        if (review.reviews.length === 0) throw new Error('No reviews found');
        
        const summary = await fetchAiSummary(
          review.reviews.map((r) => r.review).join('\n'),
          review.title
        );

        try {
          return JSON.parse(summary);
        } catch {
          throw new Error('Error parsing JSON')
        }
      } catch (error) {
        return {
          title: review.title,
          summary: '[ERROR]',
          positive: [],
          negative: [],
          error,
        };
      }
    });

    const summaries: SummaryResponse[] = await Promise.all(summaryPromises);
    return summaries;
  };

  const filterEmptyReviews = (reviews: ReviewList[]) => {
    return reviews.filter((review) => review.reviews.length > 0);
  };

  // Scroll to bottom, needed for mobile so user sees the reviews
  const scrollToBottom = () => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 1500);
  };

  return (
    <main
      ref={containerRef}
      className="lg:flex min-h-screen items-center max-w-7xl mx-auto gap-10 justify-center p-4 md:p-16"
    >
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
