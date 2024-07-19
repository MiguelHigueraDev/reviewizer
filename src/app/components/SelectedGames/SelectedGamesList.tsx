import React from 'react';
import { GameResult } from '../../interfaces/GameResult';
import { IconMinus } from '@tabler/icons-react';

const SelectedGamesList = ({
  selectedGames,
  onRemoveGame,
}: {
  selectedGames: GameResult[];
  onRemoveGame: (game: GameResult) => void;
}) => {
  return (
    <div>
      <h3 className="mb-4">Selected games</h3>
      {selectedGames.length > 0 ? (
        <ol className="flex gap-2 flex-col w-full">
          {selectedGames.map((game) => (
            <li className="flex gap-3 items-center" key={game.appId}>
              <a
                className="w-[120px] h-[45px] flex-shrink-0"
                href={game.url}
                target="_blank"
                rel="noreferrer"
              >
                <img src={game.imageUrl} alt={game.title} loading="lazy" />
              </a>

              <div className="flex-grow">
                <h3 className="font-semibold text-md">{game.title}</h3>
              </div>

              <button
                className="p-1.5 bg-red-600 rounded-md hover:bg-red-500 transition-colors duration-100"
                onClick={() => onRemoveGame(game)}
                aria-label="Remove game from selected games"
              >
                <IconMinus />
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p>
          No games selected. Search and add games
          <br /> to generate recommendations.
        </p>
      )}
    </div>
  );
};

export default SelectedGamesList;
