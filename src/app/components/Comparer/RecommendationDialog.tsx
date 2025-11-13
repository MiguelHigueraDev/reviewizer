import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecommendationResult } from "./types";

interface RecommendationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: RecommendationResult | null;
}

const getMedalIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 1:
      return <Medal className="h-5 w-5 text-slate-400" />;
    case 2:
      return <Award className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
};

const RecommendationDialog: React.FC<RecommendationDialogProps> = ({
  isOpen,
  onOpenChange,
  recommendation,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Recommendation
          </DialogTitle>
          <DialogDescription>
            Based on your preferences and the selected games.
          </DialogDescription>
        </DialogHeader>

        {recommendation ? (
          <div className="space-y-6">
            {/* Winner Card */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Trophy className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    Recommended for You
                  </h3>
                  <p className="text-2xl font-bold mb-3">
                    {recommendation.recommended}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {recommendation.rationale}
                  </p>
                </div>
              </div>
            </div>

            {/* Rankings */}
            {Array.isArray(recommendation.ranking) &&
              recommendation.ranking.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Complete Rankings
                  </h4>
                  <div className="space-y-2">
                    {recommendation.ranking.map((entry, index) => {
                      const isWinner = index === 0;
                      return (
                        <div
                          key={entry.title}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            isWinner
                              ? "bg-primary/5 border-primary/20"
                              : "bg-card border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getMedalIcon(index) || (
                              <div className="h-5 w-5 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                                {index + 1}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {entry.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="text-right">
                              <div className="text-lg font-bold tabular-nums">
                                {entry.score}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                score
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto opacity-50 mb-3" />
            <p className="text-sm">No recommendation available.</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDialog;
