import { create } from "zustand";
import { GameResult, ReviewList, SummaryResponse } from "../utils/types";

type ReviewStore = {
  selectedGames: GameResult[];
  summaries: SummaryResponse[];
  reviews: ReviewList[];
  suggestions: string[];

  addGame: (game: GameResult) => void;
  removeGame: (game: GameResult) => void;

  setSelectedGames: (games: GameResult[]) => void;
  setSummaries: (summaries: SummaryResponse[]) => void;
  setReviews: (reviews: ReviewList[]) => void;
  setSuggestions: (suggestions: string[]) => void;
};

export const useReviewStore = create<ReviewStore>((set) => ({
  selectedGames: [],
  summaries: [],
  reviews: [],
  suggestions: [],

  addGame: (game) => {
    set((state) => {
      if (state.selectedGames.length >= 3) return state;
      if (
        state.selectedGames.find(
          (selectedGame) => selectedGame.appId === game.appId
        )
      )
        return state;
      return { selectedGames: [...state.selectedGames, game] };
    });
  },

  removeGame: (game) => {
    set((state) => ({
      selectedGames: state.selectedGames.filter((g) => game.appId !== g.appId),
    }));
  },

  setSelectedGames: (games) => set({ selectedGames: games }),
  setSummaries: (summaries) => set({ summaries }),
  setReviews: (reviews) => set({ reviews }),
  setSuggestions: (suggestions) => set({ suggestions }),
}));
