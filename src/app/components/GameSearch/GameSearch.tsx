"use client";

import React from "react";
import GameSearchResults from "./GameSearchResults";
import GameResultsSkeleton from "./GameResultsSkeleton";
import GameSearchInput from "./GameSearchInput";
import useGameSearch from "./useGameSearch";
import { GameResult } from "@/app/interfaces/GameResult";
import { getRandomGame } from "./randomGameList";

const GameSearch = ({
  selectedGames,
  onAddGame,
  onRemoveGame,
}: {
  selectedGames: GameResult[];
  onAddGame: (game: GameResult) => void;
  onRemoveGame: (game: GameResult) => void;
}) => {
  const { query, setQuery, isLoading, gameResults, searchGames } =
    useGameSearch();

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="w-full mb-2">Search for Steam games</h2>
      <GameSearchInput
        query={query}
        setQuery={setQuery}
        onSearch={searchGames}
        onRandomGame={() => {
          setQuery(getRandomGame());
        }}
      />

      <button
        type="button"
        className="mt-2 mb-5 p-2 bg-neutral-700 hover:bg-neutral-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={searchGames}
        disabled={query.length < 1 || isLoading}
      >
        Search games
      </button>

      {isLoading ? (
        <GameResultsSkeleton />
      ) : (
        <GameSearchResults
          results={gameResults}
          selectedGames={selectedGames}
          onAddGame={onAddGame}
          onRemoveGame={onRemoveGame}
        />
      )}
    </div>
  );
};

export default GameSearch;
