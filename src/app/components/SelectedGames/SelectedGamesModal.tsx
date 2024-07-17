import { useState } from 'react';
import SelectedGamesList from './SelectedGamesList';
import { GameResult } from '@/app/interfaces/GameResult';

const SelectedGamesModal = ({
  selectedGames,
  onRemoveGame,
}: {
  selectedGames: GameResult[];
  onRemoveGame: (game: GameResult) => void;
}) => {
  const [showList, setShowList] = useState<boolean>();

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <>
      <button
        onClick={toggleList}
        className="fixed top-4 right-4 z-10 bg-white text-black p-2 font-semibold text-lg rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-100 ease-in-out"
      >
        {selectedGames.length} {selectedGames.length === 1 ? 'game' : 'games'} selected
      </button>

      {/* Backdrop to close modal */}
      {showList && (
        <div
          onClick={toggleList}
          className="bg-black bg-opacity-50 w-screen h-screen fixed z-40 right-0 bottom-0"
        />
      )}

      {/* The actual modal */}
      {showList && (
        <div className="fixed top-0 right-0 md:top-4 md:right-4 z-50 bg-neutral-800 p-4 rounded-t-xl md:rounded-md">
          <SelectedGamesList selectedGames={selectedGames} onRemoveGame={onRemoveGame} />
        </div>
      )}
    </>
  );
};

export default SelectedGamesModal;
