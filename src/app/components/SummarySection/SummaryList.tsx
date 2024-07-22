'use client';
import { SummaryResponse } from '@/app/interfaces/SummaryResponse';
import { useState } from 'react';
import SummaryButtons from './SummaryButtons';
import SummaryError from './SummaryError';

const SummaryList = ({ summaries }: { summaries: SummaryResponse[] }) => {
  const [currentSummaryIndex, setCurrentSummaryIndex] = useState(0);
  const summaryCount = summaries.length;

  return (
    summaryCount > 0 && (
      <div className="mt-4">
        <SummaryButtons
          summaries={summaries}
          currentSummaryIndex={currentSummaryIndex}
          setCurrentSummaryIndex={setCurrentSummaryIndex}
        />

        {summaries[currentSummaryIndex].error ? (
          <SummaryError error={summaries[currentSummaryIndex].error} />
        ) : (
          <div className="p-4 bg-neutral-800 mt-2 rounded-xl">
            <p className="mb-2">{summaries[currentSummaryIndex].summary}</p>
            <h4 className="font-semibold text-lg mb-2">Positives:</h4>
            {summaries[currentSummaryIndex].positive.length < 1 ? (
              <p className="mb-2">No positives found.</p>
            ) : (
              <ol className="list-disc ml-6 mb-2">
                {summaries[currentSummaryIndex].positive.map(
                  (positive, index) => (
                    <li key={index}>{positive}</li>
                  )
                )}
              </ol>
            )}

            <h4 className="font-semibold text-lg mb-2">Negatives:</h4>
            {summaries[currentSummaryIndex].negative.length < 1 ? (
              <p className="mb-2">No negatives found.</p>
            ) : (
              <ol className="list-disc ml-6">
                {summaries[currentSummaryIndex].negative.map(
                  (negative, index) => (
                    <li key={index}>{negative}</li>
                  )
                )}
              </ol>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default SummaryList;
