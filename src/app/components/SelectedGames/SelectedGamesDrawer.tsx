"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SelectedGamesList from "./SelectedGamesList";
import { GameResult } from "@/app/utils/types";

const SelectedGamesDrawer = ({
  isOpen,
  selectedGames,
  onRemoveGame,
  onOpenChange,
}: {
  isOpen: boolean;
  selectedGames: GameResult[];
  onRemoveGame: (game: GameResult) => void;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Selected Games</SheetTitle>
          <SheetDescription>
            {selectedGames.length === 0
              ? "No games selected yet. Add up to 3 games to get started."
              : `${selectedGames.length} of 3 games selected`}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <SelectedGamesList
            selectedGames={selectedGames}
            onRemoveGame={onRemoveGame}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SelectedGamesDrawer;
