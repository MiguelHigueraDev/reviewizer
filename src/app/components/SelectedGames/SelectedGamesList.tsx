import React from "react";
import { X } from "lucide-react";
import { GameResult } from "@/app/utils/types";
import { Button } from "@/components/ui/button";

const SelectedGamesList = ({
  selectedGames,
  onRemoveGame,
}: {
  selectedGames: GameResult[];
  onRemoveGame: (game: GameResult) => void;
}) => {
  return (
    <div>
      {selectedGames.length > 0 ? (
        <div className="flex gap-3 flex-col w-full">
          {selectedGames.map((game, index) => (
            <div
              className="group relative flex gap-3 items-center p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200"
              key={game.appId}
            >
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </div>

              <a
                className="w-[120px] h-[45px] flex-shrink-0 rounded overflow-hidden ml-4"
                href={game.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  loading="lazy"
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </a>

              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-sm truncate">{game.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {game.releaseDate}
                </p>
              </div>

              <Button
                variant="destructive"
                size="icon"
                className="flex-shrink-0 h-8 w-8"
                onClick={() => onRemoveGame(game)}
                aria-label="Remove game from selected games"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">
            No games selected yet.
            <br />
            Search and add up to 3 games to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectedGamesList;
