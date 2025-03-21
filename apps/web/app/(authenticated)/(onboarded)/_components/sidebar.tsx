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
import Link from "next/link";


function SidebarComponent() {
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
    <Sidebar 
    className="border-r border-gray-200 dark:border-zinc-800 w-64 flex-shrink-0 transition-all duration-200" 
    collapsible="icon"
  >
    <SidebarHeader className="p-4 border-b border-gray-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-secondaccent/10 border-2 border-secondaccent flex items-center justify-center">
          <Robot className="w-4 h-4 text-secondaccent" />
        </div>
        <span className="font-bold text-xl">AISOLO</span>
      </div>
    </SidebarHeader>
    
    <SidebarContent className="py-4">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-1 px-3">
          <Link href={'/dashboard'}>
          <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Button>
          </Link>
          
          <Collapsible
            open={agentDropdownOpen}
            onOpenChange={setAgentDropdownOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
                <Bot className="h-5 w-5" />
                <span>Agents</span>
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${agentDropdownOpen ? "transform rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-9 space-y-1">
              {agents.map((agent) => (
                <Button
                  key={agent.id}
                  variant="ghost"
                  className="w-full justify-start text-sm mb-1 h-9"
                  onClick={() => handleAgentSelect(agent.path)}
                >
                  {agent.name}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
         
        </div>
      </ScrollArea>
    </SidebarContent>
    
    <SidebarFooter className="p-4 border-t border-gray-200 dark:border-zinc-800">
    {session ? (
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div className="flex items-center gap-3 cursor-pointer">
      <Avatar>
        <AvatarImage src={session.data?.user.image || ""} alt={session.data?.user.name || "User"} />
        <AvatarFallback>{session.data?.user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{session.data?.user.name}</span>
        <span className="text-xs text-slate-500 dark:text-zinc-400">{session.data?.user.email}</span>
      </div>
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => signOut()}>
      Sign out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
) : (
<Button variant="outline" onClick={() => signIn()} className="w-full">
  Sign In
</Button>
)}
    </SidebarFooter>
    
    <SidebarRail />
  </Sidebar>
  )
}

export default SidebarComponent