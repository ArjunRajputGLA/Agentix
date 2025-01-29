"use client";

import { use } from "react";
import { useState } from "react";
import { Agent, CategoryAgents } from "@/types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoryAgents } from "@/app/dashboard/preview/agents/data";

const findAgentInCategory = (id: string): [Agent | null, string] => {
  for (const [category, agents] of Object.entries(categoryAgents)) {
    const agent = agents.find((a) => a.id === id);
    if (agent) return [agent, category];
  }
  return [null, ""];
};

export default function AgentChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const unwrappedParams = use(params);
  const [agent, category] = findAgentInCategory(unwrappedParams.id);

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error: Agent not found</h1>
        <Button onClick={() => router.push("/explore")}>
          Return to Explore
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const agentMessage = {
        text: `Response from ${agent.name}: Analysis of "${input}"`,
        isUser: false,
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error processing your request. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            className="mb-4 text-gray-600"
            onClick={() => router.push("/explore")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Button>
          <div className="flex items-center gap-4">
            <img
              src={agent.imagePath}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
            />
            <div>
              <h2 className="font-bold text-xl">{agent.name}</h2>
              <p className="text-sm text-gray-500">{category}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">Pricing</h3>
            <p className="text-sm text-gray-600">{agent.costing}</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Start a conversation with {agent.name}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${agent.name}...`}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
