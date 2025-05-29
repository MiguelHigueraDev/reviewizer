import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconWand } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useChatStore } from "@/app/stores/chatStore";
import { useReviewStore } from "@/app/stores/reviewStore";
import {
  fetchAiChatResponse,
  fetchAiSuggestions,
} from "@/app/utils/dataFetching";
import Markdown from "marked-react";

const Chat = () => {
  const { chatHistory, addMessage } = useChatStore();
  const { summaries, suggestions, setSuggestions } = useReviewStore();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user" as const,
    };
    addMessage(userMessage);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await fetchAiChatResponse(
        [...chatHistory, userMessage],
        summaries
      );
      addMessage({
        id: Date.now().toString(),
        content: aiResponse,
        role: "assistant" as const,
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      addMessage({
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant" as const,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (summaries.length > 0) {
        try {
          const newSuggestions = await fetchAiSuggestions(summaries);
          setSuggestions(newSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          // Fallback to default suggestions
          setSuggestions([
            "Pick one for me!",
            "Do I need a friend to enjoy them?",
            "Are they well optimized?",
          ]);
        }
      }
    };

    loadSuggestions();
  }, [summaries, setSuggestions]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 w-full p-2 mt-4 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          <IconWand /> Chat with AI
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-2xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Chat with AI</DialogTitle>
          <DialogDescription>
            Ask questions about the games, specify what you value in a game, or
            just ask me to pick a game for you.
          </DialogDescription>
        </DialogHeader>
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto space-y-4 px-1"
        >
          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="mt-auto">
          <div className="flex flex-col w-full items-center space-y-3">
            <div className="flex gap-2 items-center w-full">
              <IconWand size={18} />
              <p className="text-sm text-white">Suggestions </p>
            </div>

            <div className="flex w-full gap-2 flex-wrap">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputValue(suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
            <Textarea
              placeholder="Type your message here..."
              className="flex-grow resize-none w-full"
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              className="w-full"
              type="submit"
              onClick={handleSendMessage}
              disabled={isLoading || inputValue.trim() === ""}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
