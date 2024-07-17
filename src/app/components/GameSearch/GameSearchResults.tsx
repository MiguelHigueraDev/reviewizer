import { GameResult } from '@/app/interfaces/GameResult';
import { IconMinus, IconPlus } from '@tabler/icons-react';
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
  return (
    <ol className="flex gap-2 flex-col w-full">
      {results.map((game) => (
        <li className="flex gap-3 items-center" key={game.appId}>
          <a href={game.url} target="_blank" rel="noreferrer">
            <img src={game.imageUrl} alt={game.title} />
          </a>

          <div className="flex-grow">
            <h3 className="font-semibold">{game.title}</h3>
            <p className="text-sm text-neutral-300">
              Released {game.releaseDate}
            </p>
          </div>

          <button
            className="p-1.5 bg-neutral-800 rounded-md hover:bg-neutral-700 transition-colors duration-100"
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
        </li>
      ))}
    </ol>
  );
};

export default GameSearchResults;
