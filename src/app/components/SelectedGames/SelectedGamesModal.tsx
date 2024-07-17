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
        className="fixed bottom-4 right-4 z-10 bg-white text-black border-transparent border-2 p-4 font-bold text-lg rounded-lg hover:bg-black hover:text-white hover:border-white transition-colors duration-100 ease-in-out"
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
        <div className="fixed bottom-0 right-0 md:bottom-4 md:right-4 z-50 bg-neutral-800 p-4 rounded-t-xl md:rounded-md">
          <SelectedGamesList selectedGames={selectedGames} onRemoveGame={onRemoveGame} />
        </div>
      )}
    </>
  );
};

export default SelectedGamesModal;
