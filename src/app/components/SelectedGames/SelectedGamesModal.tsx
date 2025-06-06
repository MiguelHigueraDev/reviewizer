import SelectedGamesList from "./SelectedGamesList";
import { GameResult } from "@/app/utils/types";

const SelectedGamesModal = ({
  isVisible,
  selectedGames,
  onRemoveGame,
  onToggleVisibility,
}: {
  isVisible: boolean;
  selectedGames: GameResult[];
  onRemoveGame: (game: GameResult) => void;
  onToggleVisibility: () => void;
}) => {
  return (
    <>
      {/* Backdrop to close modal */}
      {isVisible && (
        <div
          onClick={onToggleVisibility}
          className="bg-black bg-opacity-50 w-screen h-screen fixed z-40 right-0 bottom-0"
        />
      )}

      {/* The actual modal */}
      {isVisible && (
        <div className="fixed top-4 right-4 z-50 bg-neutral-800 p-4 rounded-xl">
          <SelectedGamesList
            selectedGames={selectedGames}
            onRemoveGame={onRemoveGame}
          />
        </div>
      )}
    </>
  );
};

export default SelectedGamesModal;
