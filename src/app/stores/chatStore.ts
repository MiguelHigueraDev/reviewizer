import { create } from "zustand";

type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type ChatStore = {
  chatHistory: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  setChatHistory: (messages: ChatMessage[]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chatHistory: [],
  addMessage: (message) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }));
  },
  clearChat: () => set({ chatHistory: [] }),
  setChatHistory: (messages) => set({ chatHistory: messages }),
}));
