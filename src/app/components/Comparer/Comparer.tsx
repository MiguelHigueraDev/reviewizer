import React, { useMemo, useState } from "react";
import { useReviewStore } from "@/app/stores/reviewStore";
import { fetchAiRecommendation } from "@/app/utils/dataFetching";
import type { Category } from "./game-categories";
import CompareDialog from "./CompareDialog";
import RecommendationDialog from "./RecommendationDialog";
import type { RecommendationResult } from "./types";

const MAX_POINTS = 15;
const MAX_PER_CATEGORY = 3;
const MIN_REQUIRED_POINTS = 5;

const createEmptyAllocation = (): Record<Category, number> => ({
  Graphics: 0,
  Story: 0,
  Gameplay: 0,
  Music: 0,
  Challenge: 0,
  Replayability: 0,
  Progression: 0,
  "Value for Money": 0,
});

const Comparer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { summaries } = useReviewStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(
    null,
  );
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [allocation, setAllocation] = useState<Record<Category, number>>(
    () => createEmptyAllocation(),
  );

  const totalAllocated = useMemo(
    () => Object.values(allocation).reduce((sum, value) => sum + value, 0),
    [allocation],
  );
  const remaining = Math.max(0, MAX_POINTS - totalAllocated);

  const handleChange = (cat: Category, nextRaw: number) => {
    setAllocation((prev) => {
      const current = prev[cat];
      const desired = Math.max(
        0,
        Math.min(MAX_PER_CATEGORY, Math.round(nextRaw)),
      );

      if (desired <= current) {
        if (desired === current) {
          return prev;
        }

        return { ...prev, [cat]: desired };
      }

      const delta = desired - current;
      const currentTotal = Object.values(prev).reduce(
        (sum, value) => sum + value,
        0,
      );
      const allowedDelta = Math.min(
        delta,
        Math.max(0, MAX_POINTS - currentTotal),
      );
      const next = current + allowedDelta;

      if (next === current) {
        return prev;
      }

      return { ...prev, [cat]: next };
    });
  };

  const handleReset = () => {
    setAllocation(createEmptyAllocation());
  };

  const handleRequestRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const nonErroredSummaries = summaries.filter((summary) => !summary.error);
      const result = await fetchAiRecommendation(
        nonErroredSummaries as any,
        allocation,
      );
      const parsed = JSON.parse(result) as RecommendationResult;
      setRecommendation(parsed);
      setIsResultOpen(true);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to get recommendation";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CompareDialog
        allocation={allocation}
        error={error}
        isLoading={isLoading}
        isOpen={isOpen}
        maxPerCategory={MAX_PER_CATEGORY}
        maxPoints={MAX_POINTS}
        minRequiredPoints={MIN_REQUIRED_POINTS}
        onChangeCategory={handleChange}
        onOpenChange={setIsOpen}
        onRequestRecommendation={handleRequestRecommendation}
        onReset={handleReset}
        remaining={remaining}
        totalAllocated={totalAllocated}
      />

      <RecommendationDialog
        isOpen={isResultOpen}
        onOpenChange={setIsResultOpen}
        recommendation={recommendation}
      />
    </>
  );
};

export default Comparer;
