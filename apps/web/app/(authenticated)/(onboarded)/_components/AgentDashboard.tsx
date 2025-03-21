"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { ModeToggle } from "@repo/ui/components/ui/mode-toggle";
import { 
  ChevronDown, 
  Notebook as Robot, 
  Home, 
  Settings, 
  Users, 
  BarChart, 
  Bot, 
  Layout, 
  Search,
  HelpCircle,
  Bell
} from "lucide-react";
import { agents } from "../../../constants";
import AgentCard from "./AgentCards";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import { Input } from "@repo/ui/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@repo/ui/components/ui/dropdown-menu";

export default function AgentDashboard() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(true);
  
  // To avoid hydration mismatch, only render theme toggle after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleAgentSelect = (path: string) => {
    router.push(`/dashboard/agent/${path}`);

  };

  const session = useSession()

  return (
    <div className="flex h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      {/* Left Sidebar */}

      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}

        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-zinc-950 transition-colors">
          {/* Title Area */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              AI Agents <span className="text-secondaccent">Directory</span>
            </h1>
            <p className="text-slate-600 dark:text-zinc-400 max-w-2xl">
              Discover specialized AI agents designed to assist you with various tasks and enhance your productivity.
            </p>
          </div>
          
          {/* Categories navigation */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button variant="ghost" className="bg-gray-100 dark:bg-zinc-900 hover:bg-secondaccent2 hover:text-black rounded-full px-6 border border-gray-200 dark:border-zinc-800 text-slate-800 dark:text-white transition-colors duration-200">
              All Agents
            </Button>
            <Button variant="ghost" className="bg-gray-100 dark:bg-zinc-900 hover:bg-secondaccent2 hover:text-black rounded-full px-6 border border-gray-200 dark:border-zinc-800 text-slate-800 dark:text-white transition-colors duration-200">
              Business
            </Button>
            <Button variant="ghost" className="bg-gray-100 dark:bg-zinc-900 hover:bg-secondaccent2 hover:text-black rounded-full px-6 border border-gray-200 dark:border-zinc-800 text-slate-800 dark:text-white transition-colors duration-200">
              Creative
            </Button>
            <Button variant="ghost" className="bg-gray-100 dark:bg-zinc-900 hover:bg-secondaccent2 hover:text-black rounded-full px-6 border border-gray-200 dark:border-zinc-800 text-slate-800 dark:text-white transition-colors duration-200">
              Technical
            </Button>
          </div>
          
          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onClick={() => handleAgentSelect(agent.path)} 
              />
            ))}
          </div>
          
          {/* Bottom CTA Section */}
          <div className="mt-12 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-8 text-center transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4">Need a <span className="text-secondaccent">custom agent</span> for your specific task?</h2>
            <p className="text-slate-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto transition-colors duration-200">
              We can develop specialized AI agents tailored to your unique requirements and workflows.
            </p>
            <Button className="bg-secondaccent2 hover:bg-secondaccent3 text-black px-8 py-6 text-lg font-medium">
              Request Custom Agent
            </Button>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-zinc-800 py-4 px-6 bg-white dark:bg-black transition-colors">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 dark:text-zinc-500 mb-4 md:mb-0 text-sm">© 2025 AISOLO. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-secondaccent dark:text-zinc-400 dark:hover:text-secondaccent transition-colors text-sm">Help</a>
              <a href="#" className="text-slate-500 hover:text-secondaccent dark:text-zinc-400 dark:hover:text-secondaccent transition-colors text-sm">Documentation</a>
              <a href="#" className="text-slate-500 hover:text-secondaccent dark:text-zinc-400 dark:hover:text-secondaccent transition-colors text-sm">Contact</a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Right Sidebar (Optional) - Uncomment if needed 
      <div className="w-64 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-black p-4 hidden lg:block transition-colors">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-lg">
            <p className="text-sm text-slate-900 dark:text-white font-medium">Data Analysis Agent</p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Used 10 minutes ago</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-lg">
            <p className="text-sm text-slate-900 dark:text-white font-medium">Content Writer Agent</p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Used 1 hour ago</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-lg">
            <p className="text-sm text-slate-900 dark:text-white font-medium">Marketing Copy Generator</p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Used 1 day ago</p>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}