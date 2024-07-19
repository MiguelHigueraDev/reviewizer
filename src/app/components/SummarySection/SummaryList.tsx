const SummaryList = ({ summaries }: { summaries: string[] }) => {
  return (
    <ol>
      {summaries.map((summary, index) => (
        <li key={index} className="text-lg">{summary}</li>
      ))}
    </ol>
  )
};

export default SummaryList;
