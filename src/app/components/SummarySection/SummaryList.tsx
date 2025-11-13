"use client";
import { useState } from "react";
import SummaryButtons from "./SummaryButtons";
import SummaryError from "./SummaryError";
import { SummaryResponse } from "@/app/utils/types";
import { ThumbsUp, ThumbsDown, FileText } from "lucide-react";

const SummaryList = ({ summaries }: { summaries: SummaryResponse[] }) => {
  const [currentSummaryIndex, setCurrentSummaryIndex] = useState(0);
  const summaryCount = summaries.length;

  return (
    summaryCount > 0 && (
      <div>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            AI Review Summary
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Analyzed from recent Steam reviews
          </p>
        </div>

        <SummaryButtons
          summaries={summaries}
          currentSummaryIndex={currentSummaryIndex}
          setCurrentSummaryIndex={setCurrentSummaryIndex}
        />

        {summaries[currentSummaryIndex].error ? (
          <SummaryError error={summaries[currentSummaryIndex].error} />
        ) : (
          <div className="space-y-4">
            {/* Summary Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm leading-relaxed">
                {summaries[currentSummaryIndex].summary}
              </p>
            </div>

            {/* Positives Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-green-500" />
                <h4 className="font-semibold text-lg">What Players Love</h4>
              </div>
              {summaries[currentSummaryIndex].positive.length < 1 ? (
                <p className="text-sm text-muted-foreground">
                  No specific positive points found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {summaries[currentSummaryIndex].positive.map(
                    (positive, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{positive}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>

            {/* Negatives Card */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-red-500" />
                <h4 className="font-semibold text-lg">Common Complaints</h4>
              </div>
              {summaries[currentSummaryIndex].negative.length < 1 ? (
                <p className="text-sm text-muted-foreground">
                  No specific negative points found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {summaries[currentSummaryIndex].negative.map(
                    (negative, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{negative}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SummaryList;
