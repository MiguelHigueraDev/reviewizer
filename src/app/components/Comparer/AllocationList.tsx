import { IconInfoCircle } from "@tabler/icons-react";
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
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-base"
                  aria-hidden
                >
                  {emojiMap[category]}
                </span>
                <label className="text-sm font-medium truncate">
                  {category}
                </label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={`${category} info`}
                      className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-md text-neutral-300 hover:text-neutral-100 hover:bg-neutral-700"
                    >
                      <IconInfoCircle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-neutral-800 text-neutral-100"
                  >
                    {descriptionMap[category]}
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-sm tabular-nums text-neutral-300">
                {allocation[category]} / {maxPerCategory}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPerCategory}
              step={1}
              value={allocation[category]}
              onChange={(event) =>
                onChange(category, Number(event.target.value))
              }
              className="w-full accent-neutral-200"
            />
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default AllocationList;
