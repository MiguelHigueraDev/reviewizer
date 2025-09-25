import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconGitCompare } from "@tabler/icons-react";
import AllocationList from "./AllocationList";
import type { Category } from "./game-categories";

interface CompareDialogProps {
  allocation: Record<Category, number>;
  error: string | null;
  isLoading: boolean;
  isOpen: boolean;
  maxPerCategory: number;
  maxPoints: number;
  minRequiredPoints: number;
  onChangeCategory: (category: Category, nextValue: number) => void;
  onOpenChange: (open: boolean) => void;
  onRequestRecommendation: () => Promise<void> | void;
  onReset: () => void;
  remaining: number;
  totalAllocated: number;
}

const CompareDialog: React.FC<CompareDialogProps> = ({
  allocation,
  error,
  isLoading,
  isOpen,
  maxPerCategory,
  maxPoints,
  minRequiredPoints,
  onChangeCategory,
  onOpenChange,
  onRequestRecommendation,
  onReset,
  remaining,
  totalAllocated,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 w-full p-2 mt-4 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          <IconGitCompare /> Compare Games
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Compare Games</DialogTitle>
          <DialogDescription>
            Compare the games you have selected. Select what you value more in a
            game and the AI will pick the best game for you.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Distribute Your Points</h2>
            <div className="text-sm text-neutral-400">
              Remaining:{" "}
              <span className="font-semibold text-neutral-200">
                {remaining}
              </span>{" "}
              / {maxPoints}
            </div>
          </div>

          <AllocationList
            allocation={allocation}
            maxPerCategory={maxPerCategory}
            onChange={onChangeCategory}
          />
        </div>

        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}

        <DialogFooter className="mt-2">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-xs text-neutral-400">
                Must allocate at least {minRequiredPoints} points.
              </div>
              <button
                type="button"
                className="text-xs px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                onClick={onReset}
              >
                Reset points
              </button>
            </div>
            <button
              className="px-3 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 text-sm disabled:bg-neutral-500 disabled:text-neutral-400 disabled:cursor-not-allowed"
              disabled={isLoading || totalAllocated < minRequiredPoints}
              onClick={async () => {
                await onRequestRecommendation();
              }}
            >
              {isLoading ? "Getting Recommendation..." : "Get AI Recommendation"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompareDialog;
