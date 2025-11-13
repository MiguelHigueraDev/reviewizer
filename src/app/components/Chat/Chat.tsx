import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, Sparkles, Send } from "lucide-react";
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
        <Button className="w-full" size="lg" variant="secondary">
          <MessageCircle className="h-4 w-4" />
          Chat with AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-3xl h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            AI Gaming Assistant
          </DialogTitle>
          <DialogDescription>
            Ask questions about the games, get recommendations, or discuss what you value most in gaming.
          </DialogDescription>
        </DialogHeader>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto space-y-3 px-1 py-2"
        >
          {chatHistory.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">Start a conversation about your selected games</p>
              </div>
            </div>
          )}

          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted border border-border"
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] p-4 rounded-lg bg-muted border border-border">
                <div className="flex items-center gap-2">
                  <div className="animate-pulse">Thinking</div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <DialogFooter className="mt-auto border-t pt-4">
          <div className="flex flex-col w-full space-y-3">
            {suggestions.length > 0 && chatHistory.length === 0 && (
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Suggested questions</p>
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
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                placeholder="Ask me anything about the games..."
                className="flex-grow resize-none"
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
                type="submit"
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ""}
                size="icon"
                className="h-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
