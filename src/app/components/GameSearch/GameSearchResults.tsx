import { GameResult } from "@/app/utils/types";
import { Ban, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No results found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 flex-col w-full">
      {results.map((game) => {
        const isSelected = selectedGames.some((g) => g.appId === game.appId);
        const isUnreleased =
          !Date.parse(game.releaseDate) ||
          Date.parse(game.releaseDate) > Date.now();

        return (
          <div
            className="group flex gap-3 items-center p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200"
            key={game.appId}
          >
            <a
              href={game.url}
              className="w-[120px] h-[45px] flex-shrink-0 rounded overflow-hidden"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
              />
            </a>

            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-sm truncate">{game.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Released {game.releaseDate}
              </p>
            </div>

            {isUnreleased ? (
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 h-9 w-9"
                disabled
              >
                <Ban className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={isSelected ? "destructive" : "default"}
                size="icon"
                className="flex-shrink-0 h-9 w-9"
                onClick={() => (isSelected ? onRemoveGame(game) : onAddGame(game))}
                aria-label={
                  isSelected
                    ? "Remove game from selected games"
                    : "Add game to selected games"
                }
              >
                {isSelected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameSearchResults;
