// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   AlertCircle, Brain, Scale, Code, MessageSquare,
//   ChevronLeft, ChevronRight, Users, Award, Target,
//   BarChart, Clock, Globe
// } from 'lucide-react';

// interface Section {
//   title: string;
//   content: string;
//   icon: React.ElementType;
// }

// interface EvaluationCriteria {
//   title: string;
//   description: string;
//   color: string;
//   score?: number;
// }

// interface Testimonial {
//   name: string;
//   role: string;
//   content: string;
//   company: string;
// }

// const AboutPage: React.FC = () => {
//   const [activeSection, setActiveSection] = useState<number | null>(null);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   const stats = [
//     { label: "AI Models Compared", value: "50+", icon: Brain },
//     { label: "Monthly Users", value: "10K+", icon: Users },
//     { label: "Accuracy Rate", value: "99.9%", icon: Target },
//     { label: "Expert Reviews", value: "1000+", icon: Award }
//   ];

//   const testimonials: Testimonial[] = [
//     {
//       name: "Sarah Chen",
//       role: "AI Research Lead",
//       company: "TechCorp Inc.",
//       content: "This platform has been instrumental in helping us choose the right AI models for our projects. The depth of analysis is unprecedented."
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "CTO",
//       company: "AI Solutions",
//       content: "The comparison metrics are spot-on. We've saved countless hours in evaluation thanks to this platform."
//     },
//     {
//       name: "Dr. Emily Watson",
//       role: "ML Engineer",
//       company: "DataDrive",
//       content: "Finally, a platform that provides truly objective comparisons of AI models. The evaluation criteria are comprehensive and well-thought-out."
//     }
//   ];

//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setInterval(() => {
//         setActiveTestimonial((prev) =>
//           prev === testimonials.length - 1 ? 0 : prev + 1
//         );
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [isHovering, testimonials.length]);

//   const sections: Section[] = [
//     {
//       title: "Our Mission",
//       content: "We're revolutionizing how organizations evaluate and select AI language models. Through rigorous testing, comprehensive analysis, and real-world benchmarking, we provide unparalleled insights into AI model capabilities.",
//       icon: Brain
//     },
//     {
//       title: "What We Do",
//       content: "Our platform delivers in-depth comparisons of leading AI language models, examining everything from basic performance metrics to advanced capabilities. We simulate real-world scenarios, measure response quality, and provide actionable recommendations.",
//       icon: Scale
//     },
//     {
//       title: "Our Methodology",
//       content: "Using a combination of automated testing frameworks and expert human evaluation, we assess each model across hundreds of parameters. Our proprietary scoring system ensures consistent, reliable comparisons across all models.",
//       icon: Code
//     },
//     {
//       title: "Why Trust Us",
//       content: "Our team comprises AI researchers, engineers, and industry experts with decades of combined experience. We maintain strict independence from model providers and update our assessments weekly to reflect the latest developments.",
//       icon: AlertCircle
//     }
//   ];

//   const evaluationCriteria: EvaluationCriteria[] = [
//     {
//       title: "Clarity",
//       description: "Evaluates response coherence, precision, and accessibility across different complexity levels.",
//       color: "bg-blue-500",
//       score: 98
//     },
//     {
//       title: "Depth",
//       description: "Measures the comprehensiveness of responses and the ability to handle complex, multi-faceted queries.",
//       color: "bg-purple-500",
//       score: 95
//     },
//     {
//       title: "Engagement",
//       description: "Assesses conversational ability, context retention, and response relevance in extended interactions.",
//       color: "bg-green-500",
//       score: 92
//     },
//     {
//       title: "Formatting",
//       description: "Evaluates presentation clarity, structural organization, and visual hierarchy in responses.",
//       color: "bg-orange-500",
//       score: 94
//     },
//     {
//       title: "Structure",
//       description: "Analyzes logical flow, information organization, and coherence in complex explanations.",
//       color: "bg-red-500",
//       score: 96
//     }
//   ];

//   const handleTestimonialChange = (direction: 'prev' | 'next') => {
//     setActiveTestimonial(prev => {
//       if (direction === 'prev') {
//         return prev === 0 ? testimonials.length - 1 : prev - 1;
//       }
//       return prev === testimonials.length - 1 ? 0 : prev + 1;
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       {/* Hero Section */}
//       <div className="relative h-96 mb-24 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="absolute inset-0 bg-black bg-opacity-40" />
//         <div className="relative h-full flex flex-col justify-center items-center text-white p-8 text-center">
//           <h1 className="text-5xl font-bold mb-6 animate-fade-in">
//             AI Model Comparison Platform
//           </h1>
//           <p className="text-xl max-w-2xl animate-fade-in-delay">
//             Making AI model selection simple, scientific, and systematic
//           </p>
//           <div className="mt-8 flex gap-4">
//             <Button className="bg-white text-blue-600 hover:bg-blue-50">
//               Get Started
//             </Button>
//             <Button variant="outline" className="text-white border-white hover:bg-white/20">
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
//         {stats.map((stat, index) => (
//           <div
//             key={stat.label}
//             className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
//             <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
//             <div className="text-gray-600">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Main Sections */}
//       <div className="grid md:grid-cols-2 gap-8 mb-24">
//         {sections.map((section, index) => (
//           <div
//             key={section.title}
//             className="opacity-0 animate-slide-in"
//             style={{ animationDelay: `${index * 200}ms` }}
//           >
//             <Card
//               className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl ${
//                 activeSection === index ? 'ring-2 ring-blue-500 transform scale-102' : ''
//               }`}
//               onClick={() => setActiveSection(activeSection === index ? null : index)}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4 mb-4">
//                   <section.icon className="w-8 h-8 text-blue-500" />
//                   <h2 className="text-2xl font-semibold">{section.title}</h2>
//                 </div>
//                 <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${
//                   activeSection === index ? 'max-h-96' : 'max-h-32 overflow-hidden'
//                 }`}>
//                   {section.content}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>

//       {/* Testimonials Carousel */}
//       <div className="mb-24">
//         <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
//         <div
//           className="relative"
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="w-full flex-shrink-0 px-4"
//                 >
//                   <Card className="h-full">
//                     <CardContent className="p-8">
//                       <p className="text-lg text-gray-600 mb-6 italic">
//                         "{testimonial.content}"
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-semibold text-gray-800">{testimonial.name}</p>
//                           <p className="text-gray-600">{testimonial.role}</p>
//                           <p className="text-gray-500 text-sm">{testimonial.company}</p>
//                         </div>
//                         <Users className="w-8 h-8 text-blue-500" />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={() => handleTestimonialChange('prev')}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           </button>
//           <button
//             onClick={() => handleTestimonialChange('next')}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Evaluation Criteria */}
//       <div className="mb-24">
//         <h2 className="text-3xl font-bold text-center mb-12">Our Evaluation Criteria</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {evaluationCriteria.map((criteria, index) => (
//             <div
//               key={criteria.title}
//               className="opacity-0 animate-slide-up"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <Card className="h-full hover:shadow-xl transition-shadow duration-300">
//                 <CardContent className="p-6">
//                   <div className={`w-12 h-12 rounded-full ${criteria.color} mb-4 flex items-center justify-center`}>
//                     <MessageSquare className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{criteria.title}</h3>
//                   <p className="text-gray-600 mb-4">{criteria.description}</p>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className={`${criteria.color} rounded-full h-2 transition-all duration-1000`}
//                       style={{ width: `${criteria.score}%` }}
//                     />
//                   </div>
//                   <p className="text-right text-sm text-gray-600 mt-1">
//                     Score: {criteria.score}%
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
//         <h2 className="text-3xl font-bold mb-6">Ready to Make Informed AI Decisions?</h2>
//         <p className="text-lg mb-8 max-w-2xl mx-auto">
//           Join thousands of organizations making data-driven decisions about their AI implementations.
//         </p>
//         <div className="flex justify-center gap-4">
//           <Button className="bg-white text-blue-600 hover:bg-blue-50">
//             Start Comparing Models
//           </Button>
//           <Button variant="outline" className="text-white border-white hover:bg-white/20">
//             Schedule a Demo
//           </Button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes fade-in-delay {
//           0% { opacity: 0; }
//           50% { opacity: 0; }
//           100% { opacity: 1; }
//         }

//         @keyframes slide-in {
//           from { opacity: 0; transform: translateX(-20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-out forwards;
//         }

//         .animate-fade-in-delay {
//           animation: fade-in-delay 2s ease-out forwards;
//         }

//         .animate-slide-in {
//           animation: slide-in 0.5s ease-out forwards;
//         }

//         .animate-slide-up {
//           animation: slide-up 0.5s ease-out forwards;
//         }

//         .scale-102 {
//           transform: scale(1.02);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutPage;
"use client";
import React, { useState, useEffect } from "react";
import {
  StarIcon,
  BrainCircuit,
  Target,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      title: "Next-Gen AI Analysis",
      description: "Cutting-edge evaluation metrics for modern AI agents",
      image: "/api/placeholder/1200/600",
    },
    {
      title: "Real-Time Insights",
      description: "Immediate performance tracking and analytics",
      image: "/api/placeholder/1200/600",
    },
    {
      title: "Global Reach",
      description: "Serving clients across 50+ countries worldwide",
      image: "/api/placeholder/1200/600",
    },
  ];

  const stats = [
    { label: "AI Agents Analyzed", value: "500+" },
    { label: "Happy Users", value: "10K+" },
    { label: "Success Rate", value: "99%" },
    { label: "Countries Reached", value: "50+" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative h-full">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{item.title}</h1>
                  <p className="text-xl">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Stats Section with Image */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Our Impact in Numbers</h2>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-50 rounded-xl"
                  >
                    <div className="text-4xl font-bold text-indigo-600">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="/ai_agnet.png"
                alt="Team working"
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision with Images */}
      <div className="py-24 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="h-8 w-8 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  We're committed to democratizing access to advanced AI
                  technologies through comprehensive agent analysis. Our mission
                  is to empower organizations and individuals with the insights
                  they need to make informed decisions about AI implementation.
                </p>
                <img
                  src="/mission.png"
                  alt="Our Mission"
                  className="rounded-lg shadow-2xl object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <BrainCircuit className="h-8 w-8 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  We envision a future where AI agent selection is streamlined,
                  transparent, and accessible to everyone. Our platform aims to
                  be the gold standard in AI agent evaluation, providing
                  unmatched insights and analytics.
                </p>
                <img
                  src="/vision.png"
                  alt="Vision illustration"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={`/api/placeholder/200/200`}
                    alt={`Team member ${member}`}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Team Member {member}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-indigo-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {["Innovation", "Collaboration", "Excellence"].map(
              (value, index) => (
                <div key={value} className="relative">
                  <div className="h-64 mb-4">
                    <img
                      src={`/api/placeholder/400/300`}
                      alt={value}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md -mt-16 mx-4 relative">
                    <h3 className="text-xl font-semibold mb-2">{value}</h3>
                    <p className="text-gray-600">
                      We maintain the highest standards in our analysis and
                      recommendations, ensuring our users always receive
                      accurate and actionable insights.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
