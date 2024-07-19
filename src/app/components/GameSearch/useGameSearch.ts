import { useState, useCallback } from "react";
import { fetchGames } from "../../utils/dataFetching";
import { GameResult } from "@/app/interfaces/GameResult";

const useGameSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const searchGames = useCallback(async () => {
    if (query === "" || isLoading) return;
    setGameResults([]);
    setIsLoading(true);

    const games = await fetchGames(query);
    setIsLoading(false);
    setGameResults(games);
  }, [query, isLoading]);

  return { query, setQuery, isLoading, gameResults, searchGames };
};

export default useGameSearch;