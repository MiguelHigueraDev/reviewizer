'use client';

import GameSearch from './components/GameSearch/GameSearch';
import { useState } from 'react';
import { GameResult } from './interfaces/GameResult';
import SelectedGamesModal from './components/SelectedGames/SelectedGamesModal';

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
        {/* Name and logo */}
        <div>
          <h1 className="text-4xl font-bold">Reviewizer AI 🤖</h1>
          <p className="font-semibold text-xl">
            Decide on what game to buy using by consulting our AI connoisseur!
          </p>
        </div>
        {/* How it works */}
        <div>
          <h2>How it works</h2>
          <ol>
            <li>
              <div>
                <h3>Search up to 10 Steam games that you are interested in</h3>
                <p>You can also enter a store link or an AppID</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Select a mode</h3>
                <p>Summary Mode</p>
                <p>Contrast Mode</p>
              </div>
            </li>
            <li>
              <div>The AI will select games for you!</div>
            </li>
          </ol>
        </div>
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
