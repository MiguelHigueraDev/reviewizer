import { GameResult } from "@/app/utils/types";

const SelectedGamesModalButton = ({
  selectedGames,
  onToggleVisibility,
}: {
  selectedGames: GameResult[];
  onToggleVisibility: () => void;
}) => {
  if (selectedGames.length === 0) {
    return null;
  }
  return (
    <button
      onClick={onToggleVisibility}
      className="fixed px-3 top-4 right-4 z-10 bg-neutral-700 text-white p-2 font-semibold text-lg rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-100 ease-in-out"
    >
      Selected: {selectedGames.length}
    </button>
  );
};

export default SelectedGamesModalButton;
