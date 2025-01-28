"use client";
import React from "react";
import {
  History,
  Settings,
  ChevronDown,
  LineChart,
  PlayCircle,
  Users,
  Database,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Box = () => {
  const pathname = usePathname();

  interface SectionHeaderProps {
    title: string;
    icon: React.ElementType;
    section: string;
    link: string;
  }

  const SectionHeader = ({ title, icon: Icon, link }: SectionHeaderProps) => (
    <Link
      href={link}
      className={`cursor-pointer flex items-center justify-between px-5 bg-white py-4 rounded-xl transition-all duration-300 ${
        pathname === link
          ? "bg-emerald-50 text-emerald-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center">
        <Icon className="mr-3" size={24} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ChevronDown
        className={`transform transition-transform ${
          pathname === link ? "rotate-180 text-emerald-500" : "text-gray-500"
        }`}
        size={24}
      />
    </Link>
  );

  return (
    <div className="w-1/4 h-screen bg-gray-100 border-r border-gray-200 fixed left-0 top-0">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto">
        <SectionHeader
          link={"/dashboard/preview/data-input"}
          title="Data"
          icon={Database}
          section="data-input"
        />
        <SectionHeader
          link={"/dashboard/preview/agents"}
          title="Agents"
          icon={Users}
          section="agents"
        />
        <SectionHeader
          link={"/dashboard/preview/playground"}
          title="Playground"
          icon={PlayCircle}
          section="playground"
        />
        <SectionHeader
          title="Evaluation"
          link={"/dashboard/preview/evaluation"}
          icon={LineChart}
          section="evaluation"
        />
        <SectionHeader
          link={"/dashboard/preview/history"}
          title="History"
          icon={History}
          section="history"
        />
        <SectionHeader
          link={"/dashboard/preview/settings"}
          title="Settings"
          icon={Settings}
          section="settings"
        />
        <SectionHeader
          link={"/dashboard/preview/help"}
          title="Help"
          icon={HelpCircle}
          section="help"
        />
      </div>
    </div>
  );
};

export default Box;

// 'use client'
// import React, { useState } from 'react';
// import {
//     History,
//     Settings,
//     ChevronDown,
//     LineChart,
//     PlayCircle,
//     Users,
//     Database,
//     HelpCircle,
//     Menu,
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Sidebar = () => {
//     const pathname = usePathname();
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [hoveredSection, setHoveredSection] = useState<string | null>(null);

//     interface SectionHeaderProps {
//         title: string;
//         icon: React.ElementType;
//         section: string;
//         link: string;
//         description?: string;
//     }

//     const navigationSections: SectionHeaderProps[] = [
//         {
//             title: "Data",
//             icon: Database,
//             section: "data-input",
//             link: "/dashboard/preview/data-input",
//             description: "Manage your data sources"
//         },
//         {
//             title: "Agents",
//             icon: Users,
//             section: "agents",
//             link: "/dashboard/preview/agents",
//             description: "Configure AI agents"
//         },
//         {
//             title: "Playground",
//             icon: PlayCircle,
//             section: "playground",
//             link: "/dashboard/preview/playground",
//             description: "Test and experiment"
//         },
//         {
//             title: "Evaluation",
//             icon: LineChart,
//             section: "evaluation",
//             link: "/dashboard/preview/evaluation",
//             description: "Analysis and metrics"
//         },
//         {
//             title: "History",
//             icon: History,
//             section: "history",
//             link: "/dashboard/preview/history",
//             description: "View past activities"
//         },
//         {
//             title: "Settings",
//             icon: Settings,
//             section: "settings",
//             link: "/dashboard/preview/settings",
//             description: "Configure preferences"
//         },
//         {
//             title: "Help",
//             icon: HelpCircle,
//             section: "help",
//             link: "/dashboard/preview/help",
//             description: "Get assistance"
//         }
//     ];

//     const SectionHeader = ({
//         title,
//         icon: Icon,
//         link,
//         section,
//         description
//     }: SectionHeaderProps) => {
//         const isActive = pathname === link;
//         const isHovered = hoveredSection === section;

//         return (
//             <Link
//                 href={link}
//                 className={`
//                     relative group cursor-pointer
//                     flex items-center justify-between
//                     px-4 py-3 rounded-xl
//                     transition-all duration-300
//                     ${isActive
//                         ? 'bg-emerald-50 text-emerald-700 shadow-sm'
//                         : 'bg-white text-gray-800 hover:bg-gray-50'
//                     }
//                     ${isCollapsed ? 'mx-2' : 'mx-3'}
//                 `}
//                 onMouseEnter={() => setHoveredSection(section)}
//                 onMouseLeave={() => setHoveredSection(null)}
//             >
//                 <div className="flex items-center space-x-3">
//                     <div className={`
//                         p-2 rounded-lg
//                         ${isActive ? 'bg-emerald-100' : 'bg-gray-50'}
//                         group-hover:scale-110 transition-transform duration-200
//                     `}>
//                         <Icon
//                             size={20}
//                             className={isActive ? 'text-emerald-600' : 'text-gray-600'}
//                         />
//                     </div>
//                     {!isCollapsed && (
//                         <div className="flex flex-col">
//                             <h2 className={`text-base font-semibold ${
//                                 isActive ? 'text-emerald-700' : 'text-gray-700'
//                             }`}>
//                                 {title}
//                             </h2>
//                             {description && (
//                                 <p className={`text-xs ${
//                                     isActive ? 'text-emerald-600' : 'text-gray-500'
//                                 } ${isHovered ? 'opacity-100' : 'opacity-0'}
//                                 transition-opacity duration-200`}>
//                                     {description}
//                                 </p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 {!isCollapsed && (
//                     <ChevronDown
//                         className={`transform transition-transform duration-300 ${
//                             isActive ? 'rotate-180 text-emerald-500' : 'text-gray-400'
//                         } ${isHovered ? 'opacity-100' : 'opacity-50'}`}
//                         size={16}
//                     />
//                 )}
//             </Link>
//         );
//     };

//     return (
//         <div className={`
//             h-screen bg-white border-r border-gray-200
//             fixed left-0 top-0 transition-all duration-300
//             ${isCollapsed ? 'w-20' : 'w-72'}
//             shadow-lg
//         `}>
//             <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex items-center justify-between">
//                 {!isCollapsed && (
//                     <h1 className="text-xl font-bold text-white truncate">
//                         {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
//                     </h1>
//                 )}
//                 <button
//                     onClick={() => setIsCollapsed(!isCollapsed)}
//                     className="p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                     <Menu className="text-white" size={20} />
//                 </button>
//             </div>

//             <div className="py-6 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
//                 {navigationSections.map((section) => (
//                     <SectionHeader key={section.section} {...section} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
