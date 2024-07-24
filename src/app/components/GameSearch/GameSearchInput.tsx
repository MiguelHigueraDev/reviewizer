import { IconDice6 } from "@tabler/icons-react";

const GameSearchInput = ({
  query,
  setQuery,
  onSearch,
  onRandomGame,
}: {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  onRandomGame: () => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex gap-3 w-full items-center justify-center">
      <input
        type="text"
        placeholder="Enter the name of a Steam game..."
        className="flex mb-2 h-10 w-full bg-black rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={query}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        onChange={handleChange}
      />
      <button
        aria-label="Get a random game"
        className="mb-2 hover:bg-neutral-800 active:bg-neutral-700 p-1.5 rounded-md"
        onClick={onRandomGame}
      >
        <IconDice6 />
      </button>
    </div>
  );
};

export default GameSearchInput;
