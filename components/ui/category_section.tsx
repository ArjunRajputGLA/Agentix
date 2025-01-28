import React from 'react';
import { Agent, CategoryAgents } from '@/types/agent';
import { AgentCard } from './Agent_card';

interface CategoriesSectionProps {
  categoryAgents: CategoryAgents;
  onAgentSelect: (agent: Agent) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categoryAgents,
  onAgentSelect
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {Object.entries(categoryAgents).map(([category, agents]) => (
        <div key={category} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 capitalize">
            {category} Agents
            <div className="h-1 w-20 bg-blue-600 mt-2" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => onAgentSelect(agent)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};