import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img
            src={agent.imagePath}
            alt={agent.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">{agent.name}</CardTitle>
        <CardDescription className="mb-4">{agent.description}</CardDescription>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Coins className="h-4 w-4" />
          {agent.costing}
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Link href={`explore/agent-chat/${agent.id}`} passHref>
          <Button variant="outline">Try Out</Button>
        </Link>
        <Button onClick={onClick}>Learn More</Button>
      </CardFooter>
    </Card>
  );
};
