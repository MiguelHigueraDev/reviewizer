import { SummaryResponse } from "@/app/interfaces/SummaryResponse";

const SummaryList = ({ summaries }: { summaries: SummaryResponse[] }) => {
  return (
    <ol>
      {summaries.map((summary, index) => (
        <li key={index}>
          <div className="p-4 bg-neutral-800 mt-4 rounded-xl">
            <h3 className="font-bold text-2xl mb-2">{summary.title}</h3>
            <p className="mb-2">{summary.summary}</p>
            <h4 className="font-semibold text-lg mb-2">Positives:</h4>
            <ol className="list-disc ml-6 mb-2">
              {summary.positive.map((positive, index) => (
                <li key={index}>{positive}</li>
              ))}
            </ol>
            <h4 className="font-semibold text-lg mb-2">Negatives:</h4>
            <ol className="list-disc ml-6">
              {summary.negative.map((negative, index) => (
                <li key={index}>{negative}</li>
              ))}
            </ol>
          </div>
        </li>
      ))}
    </ol>
  )
};

export default SummaryList;
