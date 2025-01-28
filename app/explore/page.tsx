'use client'
import React, { useState } from 'react';
import { categoryAgents } from '../dashboard/preview/agents/data';
import { Agent } from '@/types/agent';
import { HeroCarousel } from '@/components/ui/carousal';
import { CategoriesSection } from '@/components/ui/category_section';
import { AgentDetailDialog } from '@/components/ui/agent_detail_dialog';

const AgentsShowcasePage = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Get featured agents for carousel (one from each category)
  const featuredAgents = Object.values(categoryAgents).map(agents => agents[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroCarousel
        featuredAgents={featuredAgents}
        onAgentSelect={setSelectedAgent}
      />
      
      <CategoriesSection 
        categoryAgents={categoryAgents}
        onAgentSelect={setSelectedAgent}
      />

      <AgentDetailDialog
        selectedAgent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  );
};

export default AgentsShowcasePage;