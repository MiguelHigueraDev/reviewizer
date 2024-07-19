import React from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { SummaryResponse } from '@/app/interfaces/SummaryResponse';

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
    <div className="flex justify-between items-center mb-4 gap-4">
      <button
        onClick={() =>
          setCurrentSummaryIndex(currentSummaryIndex - (1 % summaryCount))
        }
        disabled={currentSummaryIndex === 0}
        className="p-2 bg-neutral-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconArrowLeft />
      </button>
      <h4 className="font-bold md:text-lg text-center">
        {summaries[currentSummaryIndex].title}
      </h4>
      <button
        onClick={() =>
          setCurrentSummaryIndex(currentSummaryIndex + (1 % summaryCount))
        }
        disabled={currentSummaryIndex === summaryCount - 1}
        className="p-2 bg-neutral-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IconArrowRight />
      </button>
    </div>
  );
};

export default SummaryButtons;
