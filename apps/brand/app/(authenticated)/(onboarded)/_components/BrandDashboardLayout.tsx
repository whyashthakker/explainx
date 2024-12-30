"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  SearchIcon,
  HandshakeIcon,
  BarChart3Icon,
  UserCircleIcon,
  XIcon,
  MenuIcon,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useUser } from "../_context/user-context";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { LogoutMenuItem } from "./LogoutMenuItem";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

interface NavSection {
  title: string;
  routes: {
    label: string;
    icon: any;
    href: string;
    description: string;
    badge?: number;
  }[];
}

const Sidebar = ({
  className,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useUser();
  const pathname = usePathname();

  const navigationSections: NavSection[] = [
    {
      title: "Discovery",
      routes: [
        {
          label: "Search Creators",
          icon: SearchIcon,
          href: "/search",
          description: "Find perfect creators",
          badge: 12, // New creators
        },
        {
          label: "Creator Directory",
          icon: Users,
          href: "/directory",
          description: "Browse by category",
        },
      ],
    },
    {
      title: "Campaign Management",
      routes: [
        {
          label: "Active Campaigns",
          icon: Briefcase,
          href: "/campaigns",
          description: "Manage your campaigns",
          badge: 3, // Active campaigns
        },
        {
          label: "Collaborations",
          icon: HandshakeIcon,
          href: "/collaborations",
          description: "Ongoing partnerships",
          badge: 2, // New requests
        },
        {
          label: "Messages",
          icon: MessageSquare,
          href: "/messages",
          description: "Chat with creators",
          badge: 5, // Unread messages
        },
      ],
    },
    {
      title: "Insights",
      routes: [
        {
          label: "Analytics",
          icon: BarChart3Icon,
          href: "/analytics",
          description: "Performance metrics",
        },
        {
          label: "Reports",
          icon: BarChart3Icon,
          href: "/reports",
          description: "Campaign reports",
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full transition-all duration-300 ease-in-out",
        className,
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="flex flex-col h-full bg-white border-r shadow-lg w-80">
        {/* Logo Section */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                infoq
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-lg hover:bg-blue-50"
              >
                <Bell className="w-4 h-4 text-blue-600" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-lg hover:bg-blue-50"
              >
                <HelpCircle className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 py-4 overflow-y-auto">
          {navigationSections.map((section, index) => (
            <div
              key={section.title}
              className={cn("px-4", index > 0 && "mt-6")}
            >
              <h2 className="px-3 mb-2 text-sm font-medium text-gray-500">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.routes.map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Button
                      key={route.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-x-3 p-3 transition-all duration-200 ease-in-out hover:bg-blue-50/50",
                        isActive
                          ? "bg-blue-50 hover:bg-blue-50"
                          : "hover:bg-gray-50",
                      )}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <a href={route.href} className="flex items-center w-full">
                        <div className="flex items-center flex-1 gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-all duration-200",
                              isActive ? "bg-blue-100" : "bg-gray-50",
                            )}
                          >
                            <route.icon
                              className={cn(
                                "h-5 w-5 transition-all duration-200",
                                isActive ? "text-blue-600" : "text-gray-600",
                              )}
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <span
                              className={cn(
                                "font-medium transition-all duration-200",
                                isActive ? "text-blue-600" : "text-gray-600",
                              )}
                            >
                              {route.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {route.description}
                            </span>
                          </div>
                        </div>
                        {route.badge && (
                          <div className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            {route.badge}
                          </div>
                        )}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-2 hover:bg-blue-50 rounded-lg"
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.brand?.logo || ""} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.brand?.name?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.brand?.name || user.email}
                    </p>
                    <p className="text-xs text-blue-600">
                      {user?.userType || "Brand Account"}
                    </p>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircleIcon className="w-4 h-4 mr-2" /> Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" /> Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutMenuItem />
            </DropdownMenuContent>{" "}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const BrandDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-full relative bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border md:hidden hover:bg-blue-50"
      >
        {isMobileOpen ? (
          <XIcon className="w-6 h-6 text-blue-600" />
        ) : (
          <MenuIcon className="w-6 h-6 text-blue-600" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      {/* Main Content */}
      <main className="transition-all duration-300 ease-in-out md:pl-80">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};
export default BrandDashboardLayout;
