import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-2 w-full items-center">
      <input
        type="text"
        placeholder="Enter the name of a Steam game..."
        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={query}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        onChange={handleChange}
      />
      <Button
        aria-label="Get a random game"
        variant="outline"
        size="icon"
        onClick={onRandomGame}
        className="h-11 w-11 flex-shrink-0"
      >
        <Dices className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GameSearchInput;
