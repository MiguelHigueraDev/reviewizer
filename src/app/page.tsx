'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useState } from 'react';
import { GameResult } from './interfaces/GameResult';
import SelectedGamesModal from './components/SelectedGames/SelectedGamesModal';
import AppIntro from './components/AppIntro';

export default function Home() {
  const [selectedGames, setSelectedGames] = useState([] as GameResult[]);

  const handleAddGame = (game: GameResult) => {
    if (selectedGames.length >= 10) return;
    if (selectedGames.find((selectedGame) => selectedGame.appId === game.appId))
      return;
    setSelectedGames([...selectedGames, game]);
  };

  const handleRemoveGame = (game: GameResult) => {
    setSelectedGames(selectedGames.filter((g) => game.appId !== g.appId));
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

        {selectedGames.length > 0 ? (
          <button
            type="button"
            className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate {selectedGames.length === 1 ? 'summary' : 'summaries'} for{' '}
            {selectedGames.length}{' '}
            {selectedGames.length === 1 ? 'game' : 'games'}
          </button>
        ) : (
          <button
            className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Select at least one game
          </button>
        )}
      </div>

      <SelectedGamesModal
        selectedGames={selectedGames}
        onRemoveGame={handleRemoveGame}
      />
    </main>
  );
}
