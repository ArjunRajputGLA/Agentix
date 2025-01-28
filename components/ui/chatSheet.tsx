import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Agent } from "@/types/agent";

interface Message {
  role: "user" | "agent";
  content: string;
}

interface BackendRequestData {
  category: string;
  id: number;
  input: string;
}

interface ChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  category: string;
}

export const ChatSheet: React.FC<ChatSheetProps> = ({
  isOpen,
  onClose,
  agent,
  category,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToBackend = async (input: string) => {
    // Format the request data exactly as specified
    const backendData: BackendRequestData[] = [
      {
        category: category,
        id: Number(agent.id), // Convert string ID to number
        input: input,
      },
    ];

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate_content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate content");
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input and any previous errors
    setInput("");
    setError(null);

    // Send to backend and handle response
    const response = await sendToBackend(input);

    if (response) {
      const agentMessage: Message = {
        role: "agent",
        content: response.content || response.response || "",
      };
      setMessages((prev) => [...prev, agentMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] flex flex-col h-full p-0"
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <img
              src={agent.imagePath}
              alt={agent.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            {agent.name}
          </SheetTitle>
          <SheetDescription>{agent.description}</SheetDescription>
        </SheetHeader>

        {/* Initial Instructions */}
        {messages.length === 0 && (
          <div className="p-6 border-b">
            <h3 className="font-semibold mb-2">
              How to interact with {agent.name}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Be specific in your questions or requests</li>
              <li>Provide necessary context for better responses</li>
              <li>Use clear language for optimal results</li>
              <li>Try following up if you need clarification</li>
            </ul>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mx-4 my-2 rounded">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.role === "agent" ? (
                    <ReactMarkdown
                      className="prose prose-sm max-w-none"
                      components={{
                        code: ({
                          node,

                          className,
                          children,
                          ...props
                        }) => (
                          <code className={`${className} `} {...props}>
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-800 p-2 rounded-lg overflow-x-auto">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating response...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 gap-4 flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading} size="icon">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
