import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RecommendationResult } from "./types";

interface RecommendationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: RecommendationResult | null;
}

const RecommendationDialog: React.FC<RecommendationDialogProps> = ({
  isOpen,
  onOpenChange,
  recommendation,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>AI Recommendation</DialogTitle>
          <DialogDescription>
            Based on your preferences and selected games.
          </DialogDescription>
        </DialogHeader>
        {recommendation ? (
          <div className="mt-2">
            <div className="text-sm">
              <span className="font-semibold">Recommended Game:</span>{" "}
              <span className="text-neutral-100">
                {recommendation.recommended}
              </span>
            </div>
            <div className="mt-2 text-sm text-neutral-300">
              {recommendation.rationale}
            </div>
            {Array.isArray(recommendation.ranking) &&
              recommendation.ranking.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-neutral-400">
                    Ranking
                  </div>
                  <ul className="mt-1 space-y-1">
                    {recommendation.ranking.map((entry, index) => (
                      <li
                        key={entry.title}
                        className="text-xs text-neutral-300"
                      >
                        {index + 1}. {entry.title} — {entry.score}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ) : (
          <div className="text-sm text-neutral-400">
            No recommendation available.
          </div>
        )}
        <DialogFooter>
          <button
            className="px-3 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 text-sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDialog;
