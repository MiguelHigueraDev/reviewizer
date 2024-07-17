'use client';

import React, { useState } from 'react';
import GameSearchResults from './GameSearchResults';
import { fetchGames } from './dataFetching';
import { GameResult } from '@/app/interfaces/GameResult';
import SelectedGamesModal from '../SelectedGames/SelectedGamesModal';
import GameResultsSkeleton from '../shared/Skeletons/GameResultsSkeleton';

const GameSearch = () => {
  const [query, setQuery] = useState('');
  const [gameResults, setGameResults] = useState([] as GameResult[]);
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddGame = (game: GameResult) => {
    if (selectedGames.length >= 10) return;
    if (selectedGames.find((selectedGame) => selectedGame.appId === game.appId))
      return;
    setSelectedGames([...selectedGames, game]);
  };

  const handleRemoveGame = (game: GameResult) => {
    setSelectedGames(selectedGames.filter((g) => game.appId !== g.appId));
  };

  const searchGames = async () => {
    if (query === '') return;
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
        disabled={query.length < 1}
      >
        Search games
      </button>
      {isLoading ? (
        <GameResultsSkeleton />
      ) : (
        <GameSearchResults
          results={gameResults}
          selectedGames={selectedGames}
          onAddGame={handleAddGame}
          onRemoveGame={handleRemoveGame}
        />
      )}

      {selectedGames.length > 0 ? (
        <button
          type="button"
          className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={searchGames}
          disabled={query.length < 1}
        >
          Generate {selectedGames.length === 1 ? 'summary' : 'summaries'} for{' '}
          {selectedGames.length} {selectedGames.length === 1 ? 'game' : 'games'}
        </button>
      ) : (
        <button
          className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Select at least one game
        </button>
      )}

      <SelectedGamesModal
        selectedGames={selectedGames}
        onRemoveGame={handleRemoveGame}
      />
    </div>
  );
};

export default GameSearch;
