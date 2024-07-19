import { GameResult } from '@/app/interfaces/GameResult';

const GetReviewsButton = ({
  selectedGames,
  onClick,
  isLoading,
}: {
  selectedGames: GameResult[];
  onClick: () => void;
  isLoading: boolean;
}) => {
  return selectedGames.length > 0 ? (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      Get reviews for {selectedGames.length} {selectedGames.length === 1 ? 'game' : 'games'}
    </button>
  ) : (
    <button
      className="mt-4 mb-2 md:mb-0 p-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-100 w-full rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      disabled
    >
      Select at least one game
    </button>
  );
};

export default GetReviewsButton;
