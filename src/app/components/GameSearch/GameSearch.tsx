"use client";

import React from "react";
import GameSearchResults from "./GameSearchResults";
import GameResultsSkeleton from "./GameResultsSkeleton";
import GameSearchInput from "./GameSearchInput";
import useGameSearch from "./useGameSearch";
import { getRandomGame } from "./randomGameList";
import { GameResult } from "@/app/utils/types";

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
    <div className="flex flex-col w-full space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-3">Search for Steam games</h2>
        <GameSearchInput
          query={query}
          setQuery={setQuery}
          onSearch={searchGames}
          onRandomGame={() => {
            setQuery(getRandomGame());
          }}
        />
      </div>

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
