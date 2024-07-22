import { GameResult } from '@/app/interfaces/GameResult';
import { IconForbid, IconMinus, IconPlus } from '@tabler/icons-react';
import React from 'react';

const GameSearchResults = ({
  results,
  selectedGames,
  onAddGame,
  onRemoveGame,
}: {
  results: GameResult[];
  selectedGames: GameResult[];
  onAddGame: (game: GameResult) => void;
  onRemoveGame: (game: GameResult) => void;
}) => {

  if (results.length < 1) {
    return <p className="text-neutral-300">No results found.</p>;
  }

  return (
    <ol className="flex gap-2 flex-col w-full">
      {results.map((game) => (
        <li className="flex gap-3 items-center" key={game.appId}>
          <a
            href={game.url}
            className="w-[120px] h-[45px] flex-shrink-0"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={game.imageUrl}
              alt={game.title}
              className="object-cover"
            />
          </a>

          <div className="flex-grow">
            <h3 className="font-semibold">{game.title}</h3>
            <p className="text-sm text-neutral-300">
              Released {game.releaseDate}
            </p>
          </div>

          {/* Disable button if game is unreleased */}
          {!Date.parse(game.releaseDate) || Date.parse(game.releaseDate) > Date.now() ? (
            <button className="p-1.5 rounded-md transition-colors duration-100 bg-neutral-800 hover:bg-neutral-700 opacity-50" disabled>
              <IconForbid />
            </button>
          ) : (
            <button
              className={`p-1.5 ${
                selectedGames.some((g) => g.appId === game.appId)
                  ? 'bg-red-600 hover:bg-red-500'
                  : 'bg-neutral-800 hover:bg-neutral-700'
              } rounded-md transition-colors duration-100`}
              onClick={() =>
                selectedGames.some((g) => g.appId === game.appId)
                  ? onRemoveGame(game)
                  : onAddGame(game)
              }
              aria-label={
                selectedGames.some((g) => g.appId === game.appId)
                  ? 'Remove game from selected games'
                  : 'Add game to selected games'
              }
            >
              {selectedGames.some((g) => g.appId === game.appId) ? (
                <IconMinus />
              ) : (
                <IconPlus />
              )}
            </button>
          )}
        </li>
      ))}
    </ol>
  );
};

export default GameSearchResults;
