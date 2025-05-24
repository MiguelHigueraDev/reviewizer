import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconWand, IconInfoCircle } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState, useRef } from "react";
import { useChatStore } from "@/app/stores/chatStore";
import { useReviewStore } from "@/app/stores/reviewStore";
import { fetchAiChatResponse } from "@/app/utils/dataFetching";

const Chat = () => {
  const { chatHistory, addMessage, clearChat } = useChatStore();
  const { summaries } = useReviewStore();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Sheet onOpenChange={(open) => !open && clearChat()}>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center gap-2 w-full p-2 mt-4 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
          <IconWand /> Chat with AI
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Chat with AI</SheetTitle>
          <SheetDescription>
            Ask questions about the games, specify what you value in a game, or
            just ask me to pick a game for you.
          </SheetDescription>
        </SheetHeader>
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
                {message.content}
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
        <SheetFooter className="mt-auto">
          <div className="flex flex-col w-full items-center space-y-3">
            <Alert>
              <IconInfoCircle className="h-4 w-4" />
              <AlertTitle>Context all the way!</AlertTitle>
              <AlertDescription>
                The reviews from the current page are automatically included as
                context for the AI.
              </AlertDescription>
            </Alert>
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
