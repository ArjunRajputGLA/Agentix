export interface Agent {
    id: string;
    name: string;
    imagePath: string;
    description: string;
    costing: string; // Cost per token or charges per token
}

export interface CategoryAgents {
    [key: string]: Agent[];
}

export const categoryAgents: CategoryAgents = {
    blog: [
        { id: '1', name: 'Blog Expert', imagePath: '/logos/blog_generator.png', description: 'Specializes in generating high-quality blog posts tailored to your needs.', costing: '2 credits per token' },
        { id: '2', name: 'Content Pro', imagePath: '/logos/blog_generator.png', description: 'Expert in crafting engaging and informative content for blogs.', costing: '1.5 credits per token' },
        { id: '3', name: 'Article Writer', imagePath: '/logos/blog_generator.png', description: 'Focused on creating professional articles for a variety of industries.', costing: '2.5 credits per token' },
        { id: '4', name: 'Storyteller AI', imagePath: '/logos/blog_generator.png', description: 'Turns ideas into captivating stories that resonate with readers.', costing: '3 credits per token' }
    ],
    linkedin: [
        { id: '5', name: 'LinkedIn Pro', imagePath: '/logos/linkedIn.png', description: 'Optimizes LinkedIn posts for maximum engagement and professional appeal.', costing: '2 credits per token' },
        { id: '6', name: 'Business Writer', imagePath: '/logos/linkedIn.png', description: 'Crafts persuasive business content for your LinkedIn audience.', costing: '2.5 credits per token' },
        { id: '7', name: 'Social Media Expert', imagePath: '/logos/linkedIn.png', description: 'Specialized in creating impactful posts for professional social networks.', costing: '1.8 credits per token' },
        { id: '8', name: 'Professional Networker', imagePath: '/logos/linkedIn.png', description: 'Helps you build and maintain meaningful connections on LinkedIn.', costing: '2.2 credits per token' }
    ],
    youtube: [
        { id: '9', name: 'Video Analyzer', imagePath: '/logos/youtube.png', description: 'Provides deep insights and analysis for YouTube videos.', costing: '2.5 credits per token' },
        { id: '10', name: 'Summary Expert', imagePath: '/logos/youtube.png', description: 'Creates concise and effective summaries for video content.', costing: '2 credits per token' },
        { id: '11', name: 'Content Curator', imagePath: '/logos/youtube.png', description: 'Helps you discover and organize the best YouTube content.', costing: '1.8 credits per token' },
        { id: '12', name: 'Video Insight AI', imagePath: '/logos/youtube.png', description: 'Delivers actionable insights from video performance metrics.', costing: '3 credits per token' }
    ],
    travel: [
        { id: '13', name: 'Journey Expert', imagePath: '/logos/travel_planner-removebg-preview.png', description: 'Expert in planning personalized travel itineraries.', costing: '3 credits per token' },
        { id: '14', name: 'Travel Planner', imagePath: '/logos/travel_planner-removebg-preview.png', description: 'Simplifies travel planning by organizing trips efficiently.', costing: '2.5 credits per token' },
        { id: '15', name: 'Route Optimizer', imagePath: '/logos/travel_planner-removebg-preview.png', description: 'Optimizes travel routes to save time and money.', costing: '2 credits per token' },
        { id: '16', name: 'Travel Assistant', imagePath: '/logos/travel_planner-removebg-preview.png', description: 'Your virtual assistant for seamless travel experiences.', costing: '1.5 credits per token' }
    ]
};
