import { GameResult } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

const GetReviewsButton = ({
  selectedGames,
  onClick,
  isLoading,
}: {
  selectedGames: GameResult[];
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="mt-6 mb-2 md:mb-0 w-full"
      size="lg"
      disabled={isLoading || selectedGames.length === 0}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating summaries...
        </>
      ) : selectedGames.length > 0 ? (
        <>
          <Sparkles className="h-4 w-4" />
          Get AI reviews for {selectedGames.length}{" "}
          {selectedGames.length === 1 ? "game" : "games"}
        </>
      ) : (
        <>Select at least one game</>
      )}
    </Button>
  );
};

export default GetReviewsButton;
