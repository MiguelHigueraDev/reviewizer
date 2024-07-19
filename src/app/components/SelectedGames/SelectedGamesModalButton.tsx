import { GameResult } from '@/app/interfaces/GameResult';
import React from 'react';

const SelectedGamesModalButton = ({
  selectedGames,
  onToggleVisibility,
}: {
  selectedGames: GameResult[];
  onToggleVisibility: () => void;
}) => {
  return (
    <button
      onClick={onToggleVisibility}
      className="fixed w-10 top-4 right-4 z-10 bg-neutral-700 text-white p-2 font-semibold text-lg rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-100 ease-in-out"
    >
      {selectedGames.length}
    </button>
  );
};

export default SelectedGamesModalButton;
