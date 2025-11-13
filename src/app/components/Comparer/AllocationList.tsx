import { Info } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  categories,
  descriptionMap,
  emojiMap,
  type Category,
} from "./game-categories";

interface AllocationListProps {
  allocation: Record<Category, number>;
  maxPerCategory: number;
  onChange: (category: Category, nextValue: number) => void;
}

const AllocationList: React.FC<AllocationListProps> = ({
  allocation,
  maxPerCategory,
  onChange,
}) => {
  return (
    <TooltipProvider>
      <div className="space-y-4 py-4">
        {categories.map((category) => {
          const value = allocation[category];
          const percentage = (value / maxPerCategory) * 100;

          return (
            <div
              key={category}
              className="bg-card border border-border rounded-lg p-4 space-y-3 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-lg border border-primary/20"
                    aria-hidden
                  >
                    {emojiMap[category]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium truncate">
                        {category}
                      </label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={`${category} info`}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <Info className="h-3 w-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="max-w-xs text-xs">
                            {descriptionMap[category]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tabular-nums">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {maxPerCategory}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={maxPerCategory}
                  step={1}
                  value={value}
                  onChange={(event) =>
                    onChange(category, Number(event.target.value))
                  }
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
                  }}
                />
                {/* Indicator dots */}
                <div className="flex justify-between px-1">
                  {Array.from({ length: maxPerCategory + 1 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-1 rounded-full ${
                        i <= value ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default AllocationList;
