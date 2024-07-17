'use client';

import React, { useState } from 'react';
import GameSearchResults from './GameSearchResults';
import { fetchGames } from './dataFetching';
import GameResultsSkeleton from '../shared/Skeletons/GameResultsSkeleton';
import { GameResult } from '@/app/interfaces/GameResult';

const GameSearch = ({
  selectedGames,
  onAddGame,
  onRemoveGame,
}: {
  selectedGames: GameResult[];
  onAddGame: (game: GameResult) => void;
  onRemoveGame: (game: GameResult) => void;
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameResults, setGameResults] = useState([] as GameResult[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const searchGames = async () => {
    if (query === '' || isLoading) return;
    setGameResults([]);
    setIsLoading(true);

    const games = await fetchGames(query);
    setIsLoading(false);
    setGameResults(games);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="w-full mb-2">Search for Steam games</h2>
      <input
        type="text"
        placeholder="Enter the name of a Steam game..."
        className="flex mb-2 h-10 w-full bg-black rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={query}
        onKeyDown={(e) => e.key === 'Enter' && searchGames()}
        onChange={handleChange}
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
