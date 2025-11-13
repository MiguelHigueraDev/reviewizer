import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SummaryResponse } from "@/app/utils/types";
import { Button } from "@/components/ui/button";

const SummaryButtons = ({
  summaries,
  currentSummaryIndex,
  setCurrentSummaryIndex,
}: {
  summaries: SummaryResponse[];
  currentSummaryIndex: number;
  setCurrentSummaryIndex: (index: number) => void;
}) => {
  const summaryCount = summaries.length;
  return (
    <div className="flex justify-between items-center mb-6 gap-4 bg-card border border-border rounded-lg p-4">
      <Button
        onClick={() =>
          setCurrentSummaryIndex(currentSummaryIndex - (1 % summaryCount))
        }
        disabled={currentSummaryIndex === 0}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-col items-center gap-1 min-w-0 flex-1">
        <h4 className="font-semibold text-base md:text-lg text-center truncate w-full">
          {summaries[currentSummaryIndex].title}
        </h4>
        {summaryCount > 1 && (
          <p className="text-xs text-muted-foreground">
            {currentSummaryIndex + 1} of {summaryCount}
          </p>
        )}
      </div>

      <Button
        onClick={() =>
          setCurrentSummaryIndex(currentSummaryIndex + (1 % summaryCount))
        }
        disabled={currentSummaryIndex === summaryCount - 1}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SummaryButtons;
