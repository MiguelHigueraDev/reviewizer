"use client";

import GameSearch from "./components/GameSearch/GameSearch";
import { useRef, useState } from "react";
import SelectedGamesModal from "./components/SelectedGames/SelectedGamesModal";
import AppIntro from "./components/AppIntro";
import SummaryList from "./components/SummarySection/SummaryList";
import { fetchAiSummary, fetchReviews } from "./utils/dataFetching";
import GetReviewsButton from "./components/SummarySection/GetReviewsButton";
import SelectedGamesModalButton from "./components/SelectedGames/SelectedGamesModalButton";
import SummaryListSkeleton from "./components/SummarySection/SummaryListSkeleton";
import { GameResult, ReviewList, SummaryResponse } from "./utils/types";
import { useReviewStore } from "./stores/reviewStore";
import Chat from "./components/Chat/Chat";

export default function Home() {
  const {
    selectedGames,
    addGame,
    removeGame,
    summaries,
    setSummaries,
    setReviews,
  } = useReviewStore();
  const [isSelectedModalVisible, setIsSelectedModalVisible] = useState(false);
  const [summariesLoading, setSummariesLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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
      console.error("Error fetching data:", error);
      alert("Error fetching reviews or AI summaries.");
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
        if (review.reviews.length === 0) throw new Error("No reviews found");

        const summary = await fetchAiSummary(
          review.reviews.map((r) => r.review).join("\n"),
          review.title
        );

        try {
          return JSON.parse(summary);
        } catch {
          throw new Error("Error parsing JSON");
        }
      } catch (error) {
        return {
          title: review.title,
          summary: "[ERROR]",
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
        behavior: "smooth",
        block: "end",
      });
    }, 1500);
  };

  const shouldCenterLayout = !summariesLoading && summaries.length === 0;

  return (
    <main
      ref={containerRef}
      className={`dark min-h-screen max-w-7xl mx-auto p-4 md:p-16 ${
        shouldCenterLayout
          ? "flex items-center justify-center"
          : "lg:flex lg:items-center lg:gap-10 lg:justify-center"
      }`}
    >
      <div className={`${shouldCenterLayout ? "w-full max-w-lg" : "lg:w-1/2"}`}>
        <AppIntro />
        <GameSearch
          selectedGames={selectedGames}
          onAddGame={addGame}
          onRemoveGame={removeGame}
        />
        <GetReviewsButton
          selectedGames={selectedGames}
          onClick={handleGetReviews}
          isLoading={summariesLoading}
        />

        <hr className="block lg:hidden w-full mt-4 border-neutral-600" />
      </div>

      {(summariesLoading || summaries.length > 0) && (
        <div className="lg:w-1/2 lg:self-center mt-8 lg:mt-0">
          {summariesLoading ? (
            <SummaryListSkeleton />
          ) : (
            <>
              <SummaryList summaries={summaries} />
              {summaries.length > 0 && <Chat />}
            </>
          )}
        </div>
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
        onRemoveGame={removeGame}
        onToggleVisibility={() =>
          setIsSelectedModalVisible(!isSelectedModalVisible)
        }
      />
    </main>
  );
}
