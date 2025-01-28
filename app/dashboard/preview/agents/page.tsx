'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Check, ArrowRightLeft } from 'lucide-react';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/skeleton';
import { categoryAgents } from './data';


interface ResultData {
    results: Array<{
        content: string;
        id: string;
    }>;
    status: string;
}

interface BackendRequestData {
    id: string;
    category: string;
    input: string;
}

export default function AgentsPreviewPage() {
    const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
    const [, setResults] = useState<ResultData | null>(null);
    const [activeTab, setActiveTab] = useState("agents");
    const [typedInput, setTypedInput] = useState<string>("");
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

    const router = useRouter();

    // Modified to handle agent selection without category restrictions
    const handleAgentSelection = (agentId: string) => {
        setSelectedAgents(prev => {
            return prev.includes(agentId)
                ? prev.filter(id => id !== agentId)
                : [...prev, agentId];
        });
    };

    const placeholders = [
        "Write a blog post about sustainable travel tips...",
        "Create a LinkedIn post about digital marketing trends...",
        "Analyze this YouTube video for key insights...",
        "Plan a 7-day itinerary for Paris...",
        "Generate content ideas for my travel blog...",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypedInput(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedAgents.length === 0) {
            console.error('Please select agents first');
            setActiveTab("agents");
            return;
        }

        // Find category for each selected agent
        const backendData: BackendRequestData[] = selectedAgents.map((agentId: string) => {
            let agentCategory = "";
            for (const [category, agents] of Object.entries(categoryAgents)) {
                if (agents.some(agent => agent.id === agentId)) {
                    agentCategory = category;
                    break;
                }
            }
            return {
                id: agentId,
                category: agentCategory,
                input: typedInput
            };
        });

        sendToBackend(backendData);
    };

    const sendToBackend = async (backendData: BackendRequestData[]) => {
        try {
            setIsDataLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate_content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backendData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate content');
            }

            localStorage.setItem('responseData', JSON.stringify(data));
            setResults(data);
            router.push('/dashboard/preview/playground');
        } catch (error) {
            console.error('Error:', error);
            // Handle error state here
        } finally {
            setIsDataLoading(false);
        }
    };

    const formatCategoryName = (category: string) => {
        return category
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setActiveTab("task");
    };

    if (isDataLoading) return <Skeleton />

    return (
        <div className="p-4 min-h-screen bg-background">
            <h1 className="text-2xl font-bold mb-6 text-foreground">Agent Selection</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="agents">Available Agents</TabsTrigger>
                    <TabsTrigger value="task">Task</TabsTrigger>
                </TabsList>

                <TabsContent value="agents">
                    <div className="space-y-12">
                        {Object.entries(categoryAgents).map(([category, agents]) => (
                            <div key={category} className="border rounded-xl p-8 bg-white/50 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/70">
                                        {formatCategoryName(category)}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {agents.map((agent) => (
                                        <Card
                                            key={agent.id}
                                            className={`relative group transition-all duration-300 hover:scale-105 ${
                                                selectedAgents.includes(agent.id)
                                                    ? 'bg-primary/10 ring-2 ring-primary shadow-primary/20'
                                                    : 'bg-white/80 hover:bg-white hover:shadow-xl'
                                            }`}
                                        >
                                            <div className="p-6 flex flex-col items-center">
                                                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                                    {agent.imagePath ? (
                                                        <div className="w-20 h-20 relative">
                                                            <Image
                                                                src={agent.imagePath}
                                                                alt={agent.name}
                                                                fill
                                                                className="object-contain rounded-lg"
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span>🤖</span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                                    {agent.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground text-center mb-4">
                                                    {agent.description || "AI Agent for specialized tasks"}
                                                </p>
                                                <button
                                                    onClick={() => handleAgentSelection(agent.id)}
                                                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                                        selectedAgents.includes(agent.id)
                                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                                                    }`}
                                                >
                                                    <ArrowRightLeft size={16} />
                                                    {selectedAgents.includes(agent.id) ? 'Selected' : 'Compare'}
                                                </button>
                                            </div>
                                            {selectedAgents.includes(agent.id) && (
                                                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                    <Check className="text-white" size={14} />
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={handleSave}
                                disabled={selectedAgents.length === 0}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium shadow-lg hover:shadow-xl disabled:hover:shadow-none"
                            >
                                Continue with Selection
                            </button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="task">
                    <div className="h-[300px] text-foreground flex flex-col space-y-3 justify-center items-center">
                        <p>What is the task you want to perform?</p>
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}