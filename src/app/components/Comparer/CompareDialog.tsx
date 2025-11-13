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
import { Scale, RotateCcw, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <Button className="w-full" size="lg" variant="secondary">
          <Scale className="h-4 w-4" />
          Compare Games
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-3xl h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Compare Games
          </DialogTitle>
          <DialogDescription>
            Allocate points to what matters most to you, and let AI recommend the best game based on your preferences.
          </DialogDescription>
        </DialogHeader>

        {/* Points indicator card */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Point Budget</h3>
              <p className="text-xs text-muted-foreground">
                Allocate {maxPoints} points across categories (max {maxPerCategory} per category)
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold tabular-nums">
                {remaining}
              </div>
              <div className="text-xs text-muted-foreground">remaining</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(totalAllocated / maxPoints) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <AllocationList
            allocation={allocation}
            maxPerCategory={maxPerCategory}
            onChange={onChangeCategory}
          />
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <DialogFooter className="border-t pt-4">
          <div className="flex w-full items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground">
                Minimum {minRequiredPoints} points required
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onReset}
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            </div>
            <Button
              disabled={isLoading || totalAllocated < minRequiredPoints}
              onClick={async () => {
                await onRequestRecommendation();
              }}
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Getting Recommendation...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Get AI Recommendation
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompareDialog;
