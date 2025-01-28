// // import React from 'react';
// // import { 
// //   CpuIcon, 
// //   DocumentIcon, 
// //   EmojiHappyIcon, 
// //   SearchIcon, 
// //   TargetIcon, 
// //   TrendingUpIcon, 
// //   PhotographIcon
// // } from '@heroicons/react/outline';

// // const AgentMarketplace = () => {
// //   const services = [
// //     {
// //       // icon: <CpuIcon className="w-12 h-12 text-blue-500" />,
// //       title: 'Competitor Analyst',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '42.2K tasks completed'
// //     },
// //     {
// //       icon: <DocumentIcon className="w-12 h-12 text-green-500" />,
// //       title: 'Web Page Copy Editor',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '11.2K tasks completed'
// //     },
// //     {
// //       icon: <EmojiHappyIcon className="w-12 h-12 text-purple-500" />,
// //       title: 'Meme Maker',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '62.9K tasks completed'
// //     },
// //     {
// //       icon: <SearchIcon className="w-12 h-12 text-orange-500" />,
// //       title: 'Search Keyword Research',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '9.5K tasks completed'
// //     },
// //     {
// //       // icon: <TargetIcon className="w-12 h-12 text-indigo-500" />,
// //       title: 'Website Optimizer',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '17.6K tasks completed'
// //     },
// //     {
// //       icon: <TrendingUpIcon className="w-12 h-12 text-yellow-500" />,
// //       title: 'Social Media Analyst',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '28.3K tasks completed'
// //     },
// //     {
// //       icon: <PhotographIcon className="w-12 h-12 text-red-500" />,
// //       title: 'Image Enhancement',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '31.1K tasks completed'
// //     },
// //     {
// //       icon: <DocumentIcon className="w-12 h-12 text-gray-500" />,
// //       title: 'Content Summarizer',
// //       author: '@dharmesh',
// //       credits: '1 credit per task',
// //       progress: '22.4K tasks completed'
// //     }
// //   ];

// //   return (
// //     <div className="container mx-auto my-12">
// //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
// //         AI Agent Marketplace
// //       </h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {services.map((service, index) => (
// //           <div 
// //             key={index} 
// //             className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
// //           >
// //             <div className="mb-4">{service.icon}</div>
// //             <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //               {service.title}
// //             </h3>
// //             <p className="text-gray-500 text-sm mb-4">
// //               By {service.author}
// //             </p>
// //             <div className="text-gray-600 text-sm mb-4">
// //               {service.credits} • {service.progress}
// //             </div>
// //             <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
// //               Hire
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AgentMarketplace;

// 'use client'
// import React, { useState } from 'react';
// import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { motion } from 'framer-motion';
// import { ArrowRight, BarChart2, LineChart as LineChartIcon, Check, X } from 'lucide-react';

// const AIComparisonDashboard = () => {
//   const [selectedPair, setSelectedPair] = useState(0);

//   const metrics = ['Clarity', 'Depth', 'Structure', 'Formatting', 'Engagement'];
  
//   const agentPairs = [
//     {
//       title: "Claude vs GPT-4",
//       data: [
//         { metric: 'Clarity', Claude: 95, 'GPT-4': 90 },
//         { metric: 'Depth', Claude: 92, 'GPT-4': 90 },
//         { metric: 'Structure', Claude: 88, 'GPT-4': 85 },
//         { metric: 'Formatting', Claude: 90, 'GPT-4': 88 },
//         { metric: 'Engagement', Claude: 85, 'GPT-4': 88 }
//       ]
//     },
//     {
//       title: "Bard vs Llama",
//       data: [
//         { metric: 'Clarity', Bard: 85, Llama: 82 },
//         { metric: 'Depth', Bard: 82, Llama: 80 },
//         { metric: 'Structure', Bard: 80, Llama: 78 },
//         { metric: 'Formatting', Bard: 85, Llama: 80 },
//         { metric: 'Engagement', Bard: 82, Llama: 85 }
//       ]
//     }
//   ];

//   const detailedComparisons = [
//     {
//       pair: "Claude vs GPT-4",
//       agent1: "Claude",
//       agent2: "GPT-4",
//       features: [
//         { name: "Code Generation", agent1Score: true, agent2Score: true },
//         { name: "Mathematical Reasoning", agent1Score: true, agent2Score: true },
//         { name: "Context Window", agent1Score: true, agent2Score: false },
//         { name: "Creative Writing", agent1Score: false, agent2Score: true },
//         { name: "Real-time Data", agent1Score: false, agent2Score: false }
//       ],
//       strengths: {
//         agent1: ["Detailed explanations", "Consistent formatting", "Ethical reasoning"],
//         agent2: ["Creative tasks", "Technical accuracy", "Multi-modal capabilities"]
//       }
//     },
//     {
//       pair: "Bard vs Llama",
//       agent1: "Bard",
//       agent2: "Llama",
//       features: [
//         { name: "Real-time Search", agent1Score: true, agent2Score: false },
//         { name: "Code Review", agent1Score: true, agent2Score: true },
//         { name: "Image Generation", agent1Score: true, agent2Score: false },
//         { name: "Multi-lingual", agent1Score: true, agent2Score: true },
//         { name: "Open Source", agent1Score: false, agent2Score: true }
//       ],
//       strengths: {
//         agent1: ["Search integration", "Current information", "Multi-modal tasks"],
//         agent2: ["Community support", "Customization", "Local deployment"]
//       }
//     },
//     {
//       pair: "Claude vs Bard",
//       agent1: "Claude",
//       agent2: "Bard",
//       features: [
//         { name: "Long Context", agent1Score: true, agent2Score: false },
//         { name: "Programming", agent1Score: true, agent2Score: true },
//         { name: "Data Analysis", agent1Score: true, agent2Score: true },
//         { name: "Search Integration", agent1Score: false, agent2Score: true },
//         { name: "Custom Training", agent1Score: false, agent2Score: true }
//       ],
//       strengths: {
//         agent1: ["Contextual understanding", "Structured output", "Safety features"],
//         agent2: ["Real-time data", "Visual inputs", "Integration capabilities"]
//       }
//     }
//   ];

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50">
//       {/* Main Charts Section */}
//       <div className="text-center mb-8">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-bold mb-4"
//         >
//           AI Agent Performance Analysis
//         </motion.h1>
//         <p className="text-gray-600">Comprehensive comparison of leading AI models</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//         {/* Existing charts here */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <BarChart2 className="mr-2" />
//               Head-to-Head Comparison
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-center space-x-4 mb-4">
//                 {agentPairs.map((pair, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedPair(index)}
//                     className={`px-4 py-2 rounded-lg ${selectedPair === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                   >
//                     {pair.title}
//                   </motion.button>
//                 ))}
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={agentPairs[selectedPair].data}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="metric" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip />
//                   <Legend />
//                   {Object.keys(agentPairs[selectedPair].data[0])
//                     .filter(key => key !== 'metric')
//                     .map((key, index) => (
//                       <Bar
//                         key={key}
//                         dataKey={key}
//                         fill={index === 0 ? '#4F46E5' : '#EC4899'}
//                         radius={[4, 4, 0, 0]}
//                       />
//                     ))}
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <LineChartIcon className="mr-2" />
//               Performance Overview
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={metrics.map(metric => ({
//                   name: metric,
//                   Claude: 85 + Math.random() * 15,
//                   'GPT-4': 82 + Math.random() * 15,
//                   Bard: 80 + Math.random() * 15,
//                   Llama: 75 + Math.random() * 15
//                 }))}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis domain={[0, 100]} />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="Claude" stroke="#4F46E5" strokeWidth={2} />
//                 <Line type="monotone" dataKey="GPT-4" stroke="#EC4899" strokeWidth={2} />
//                 <Line type="monotone" dataKey="Bard" stroke="#10B981" strokeWidth={2} />
//                 <Line type="monotone" dataKey="Llama" stroke="#F59E0B" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Detailed Comparison Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {detailedComparisons.map((comparison, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">{comparison.pair}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {/* Feature Comparison */}
//                   <div className="space-y-2">
//                     <h3 className="font-semibold mb-2">Feature Comparison</h3>
//                     {comparison.features.map((feature, idx) => (
//                       <div key={idx} className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600">{feature.name}</span>
//                         <div className="flex space-x-4">
//                           <span>{feature.agent1Score ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
//                           <span>{feature.agent2Score ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Strengths */}
//                   <div className="grid grid-cols-2 gap-4 pt-4 border-t">
//                     <div>
//                       <h4 className="font-semibold mb-2 text-sm">{comparison.agent1} Strengths</h4>
//                       <ul className="text-sm space-y-1">
//                         {comparison.strengths.agent1.map((strength, idx) => (
//                           <li key={idx} className="text-gray-600">• {strength}</li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2 text-sm">{comparison.agent2} Strengths</h4>
//                       <ul className="text-sm space-y-1">
//                         {comparison.strengths.agent2.map((strength, idx) => (
//                           <li key={idx} className="text-gray-600">• {strength}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AIComparisonDashboard;

'use client'
import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, ArrowRight, ArrowLeft } from 'lucide-react';
import { categoryAgents } from '../dashboard/preview/agents/data';
// import { categoryAgents } from './data';

const AgentsShowcase = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured agents for carousel (one from each category)
  const featuredAgents = Object.values(categoryAgents).map(agents => agents[0]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAgents.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredAgents.length) % featuredAgents.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel */}
      <div className="relative h-[70vh] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-gray-900/70 z-10" />
        
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {featuredAgents.map((agent, idx) => (
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
                    onClick={() => setSelectedAgent(agent)}
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

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {Object.entries(categoryAgents).map(([category, agents]) => (
          <div key={category} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 capitalize">
              {category} Agents
              <div className="h-1 w-20 bg-blue-600 mt-2" />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedAgent(agent)}
                >
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
                    <CardDescription className="mb-4">
                      {agent.description}
                    </CardDescription>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Coins className="h-4 w-4" />
                      {agent.costing}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Agent Detail Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedAgent && (
            <>
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
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setSelectedAgent(null)}>Close</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentsShowcase;