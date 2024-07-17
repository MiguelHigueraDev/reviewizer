const GameSearchInput = ({
  query,
  setQuery,
  onSearch,
}: {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Enter the name of a Steam game..."
      className="flex mb-2 h-10 w-full bg-black rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      value={query}
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      onChange={handleChange}
    />
  );
};

export default GameSearchInput;
