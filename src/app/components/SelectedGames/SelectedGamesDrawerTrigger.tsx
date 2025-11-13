"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { GameResult } from "@/app/utils/types";

const SelectedGamesDrawerTrigger = ({
  selectedGames,
  onOpenDrawer,
}: {
  selectedGames: GameResult[];
  onOpenDrawer: () => void;
}) => {
  if (selectedGames.length === 0) {
    return null;
  }

  return (
    <Button
      onClick={onOpenDrawer}
      className="fixed top-4 right-4 z-10 shadow-lg"
      size="lg"
      variant="default"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="font-semibold">
        Selected: {selectedGames.length}/3
      </span>
    </Button>
  );
};

export default SelectedGamesDrawerTrigger;
