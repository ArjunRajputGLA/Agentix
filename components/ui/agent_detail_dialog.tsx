import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import { Agent } from "@/types/agent";

interface AgentDetailDialogProps {
  selectedAgent: Agent | null;
  onClose: () => void;
}

export const AgentDetailDialog: React.FC<AgentDetailDialogProps> = ({
  selectedAgent,
  onClose,
}) => {
  if (!selectedAgent) return null;

  return (
    <Dialog open={!!selectedAgent} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="h-48 -mt-6 -mx-6 mb-4 overflow-hidden rounded-t-lg">
            <img
              src={selectedAgent.imagePath}
              alt={selectedAgent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {selectedAgent.name}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {selectedAgent.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Pricing</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Coins className="h-4 w-4" />
            {selectedAgent.costing}
          </Badge>

          <h3 className="font-semibold mt-4 mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Advanced natural language processing</li>
            <li>Context-aware responses</li>
            <li>Real-time adaptation</li>
            <li>Multi-language support</li>
          </ul>

          <div className="mt-6 flex justify-end gap-2">
            <Link href={`explore/agent-chat/${selectedAgent.id}`} passHref>
              <Button variant="outline" onClick={onClose}>
                Try Out
              </Button>
            </Link>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
