import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Agent } from '@/types/agent';
// import { Agent } from '../types';

interface HeroCarouselProps {
  featuredAgents: Agent[];
  onAgentSelect: (agent: Agent) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  featuredAgents, 
  onAgentSelect 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAgents.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredAgents.length) % featuredAgents.length);
  };

  return (
    <div className="relative h-[70vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-gray-900/70 z-10" />
      
      <div 
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredAgents.map((agent) => (
          <div key={agent.id} className="min-w-full h-full relative">
            <img
              src={agent.imagePath}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white p-8 max-w-4xl">
                <h1 className="text-5xl font-bold mb-4">{agent.name}</h1>
                <p className="text-xl mb-6">{agent.description}</p>
                <Button 
                  onClick={() => onAgentSelect(agent)}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 z-20 text-white"
        onClick={prevSlide}
      >
        <ArrowLeft className="h-8 w-8" />
      </Button>
      
      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 z-20 text-white"
        onClick={nextSlide}
      >
        <ArrowRight className="h-8 w-8" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredAgents.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};