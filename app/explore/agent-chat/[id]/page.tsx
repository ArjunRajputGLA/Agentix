"use client";

import { use } from "react";
import { useState } from "react";
import { Agent } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoryAgents } from "@/app/dashboard/preview/agents/data";

interface ChatMessage {
  text: string;
  isUser: boolean;
  evaluation?: {
    scores: {
      clarity: number;
      structure: number;
      engagement: number;
      depth: number;
      formatting: number;
    };
    average_score: number;
  };
  response_time?: number;
}

interface ApiResponse {
  status: string;
  results: Array<{
    id: number;
    content: string;
    error?: string;
    response_time?: number;
  }>;
  evaluations?: Array<{
    id: number;
    scores: {
      clarity: number;
      structure: number;
      engagement: number;
      depth: number;
      formatting: number;
    };
    average_score: number;
  }>;
}

const findAgentInCategory = (id: string): [Agent | null, string] => {
  for (const [category, agents] of Object.entries(categoryAgents)) {
    const agent = agents.find((a) => a.id === id);
    if (agent) return [agent, category];
  }
  return [null, ""];
};

const getCategoryFromId = (id: number): string => {
  if (id >= 1 && id <= 4) return "blog";
  if (id >= 5 && id <= 8) return "linkedin";
  if (id >= 9 && id <= 12) return "youtube";
  if (id >= 13 && id <= 16) return "travel";
  return "";
};

export default function AgentChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      // First, get content type classification from Gemini
      const geminiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gemini`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input.trim() }),
        }
      );

      if (!geminiResponse.ok) {
        throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
      }

      const geminiData = await geminiResponse.json();

      // Proceed with content generation if content is relevant
      if (geminiData.is_relevant) {
        const requestData = [
          {
            category: getCategoryFromId(Number(unwrappedParams.id)),
            id: Number(unwrappedParams.id),
            input: input.trim(),
          },
        ];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/generate_content`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.status === "error" || !data.results?.[0]) {
          throw new Error(
            data.results?.[0]?.error || "Failed to generate content"
          );
        }

        const result = data.results[0];
        const evaluation = data.evaluations?.[0];

        const agentMessage: ChatMessage = {
          text: result.content,
          isUser: false,
          response_time: result.response_time,
          evaluation: evaluation,
        };

        setMessages((prev) => [...prev, agentMessage]);
      } else {
        // Handle non-relevant content
        setMessages((prev) => [
          ...prev,
          {
            text: "I apologize, but I'm not suited to handle this type of request. Could you please try something more relevant to my expertise?",
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setMessages((prev) => [
        ...prev,
        {
          text: "I encountered an error processing your request. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEvaluation = (evaluation: ChatMessage["evaluation"]) => {
    if (!evaluation) return null;

    return (
      <div className="mt-2 p-3 rounded-lg bg-blue-50 text-sm space-y-2">
        <div className="font-semibold text-blue-700">Content Evaluation:</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(evaluation.scores).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize text-blue-600">{key}:</span>
              <span className="text-blue-700 font-medium">{value}/5</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-blue-200 mt-2">
          <span className="text-blue-600">Average Score:</span>
          <span className="ml-2 text-blue-700 font-medium">
            {evaluation.average_score}/5
          </span>
        </div>
      </div>
    );
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
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 text-gray-900"
                  } whitespace-pre-wrap`}
                >
                  {message.text}
                  {message.response_time && (
                    <div className="mt-2 text-xs text-gray-500">
                      Response time: {message.response_time.toFixed(2)}s
                    </div>
                  )}
                </div>
              </div>
              {!message.isUser && renderEvaluation(message.evaluation)}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Start a conversation with {agent.name}
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                {error}
              </div>
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
