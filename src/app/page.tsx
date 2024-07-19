'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useState } from 'react';
import { GameResult } from './interfaces/GameResult';
import SelectedGamesModal from './components/SelectedGames/SelectedGamesModal';
import AppIntro from './components/AppIntro';
import SummaryList from './components/SummarySection/SummaryList';
import { fetchReviews } from './utils/dataFetching';
import ReviewCarousel from './components/ReviewSection/ReviewCarousel';
import { ReviewList } from './interfaces/ReviewList';
import GetReviewsButton from './components/ReviewSection/GetReviewsButton';
import SelectedGamesModalButton from './components/SelectedGames/SelectedGamesModalButton';
import ReviewsModal from './components/ReviewSection/ReviewsModal';

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [summaries, setSummaries] = useState([] as string[]);
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
    const reviews = reviewResponses.map((response) => ({
      appId: response.appId,
      title: response.title,
      reviews: response.reviews,
    }));
    setReviews(reviews);

    setIsReviewsModalVisible(true);
  };

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto gap-10 items-center justify-center p-24">
      <div className="w-1/2">
        <AppIntro />
      </div>
      <div className="w-1/2">
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

      <ReviewsModal
        isVisible={isReviewsModalVisible}
        reviews={reviews}
        onToggleVisibility={() => setIsReviewsModalVisible(false)}
      />
    </main>
  );
}
