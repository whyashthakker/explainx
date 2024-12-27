"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { BarChart3Icon } from "lucide-react";
import { Building2Icon } from "lucide-react";
import { CreditCardIcon } from "lucide-react";
import { HandshakeIcon } from "lucide-react";
import { LayoutDashboardIcon } from "lucide-react";
import { PlugIcon } from "lucide-react";
import { UserCircleIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { useUser } from "../_context/user-context";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";

// Utility function for combining class names
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const Sidebar = ({
  className,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const user = useUser();
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboardIcon,
      href: "/dashboard",
    },
    {
      label: "Brands",
      icon: Building2Icon,
      href: "/brands",
    },
    {
      label: "Collabs",
      icon: HandshakeIcon,
      href: "/collabs",
    },
    {
      label: "Integrations",
      icon: PlugIcon,
      href: "/integrations",
    },
    {
      label: "Analytics",
      icon: BarChart3Icon,
      href: "/analytics",
    },
    {
      label: "Billing",
      icon: CreditCardIcon,
      href: "/billing",
    },
    {
      label: "Profile",
      icon: UserCircleIcon,
      href: "/profile",
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
      <div className="flex flex-col h-full bg-white border-r shadow-lg w-72">
        {/* Logo Section */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              infoq
            </h1>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Button
                key={route.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-x-3 p-3 transition-all duration-200 ease-in-out",
                  isActive ? "bg-blue-50 hover:bg-blue-50" : "hover:bg-gray-50",
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <a
                  href={route.href}
                  className="flex items-center gap-x-3 w-full"
                >
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
                  <span
                    className={cn(
                      "font-medium transition-all duration-200",
                      isActive ? "text-blue-600" : "text-gray-600",
                    )}
                  >
                    {route.label}
                  </span>
                </a>
              </Button>
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50">
            <div className="p-2 rounded-lg bg-blue-100">
              <UserCircleIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user.influencer?.name || user.email}
              </p>
              <p className="text-xs text-blue-600">
                {user.influencer?.category || "Influencer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
      <main className="transition-all duration-300 ease-in-out md:pl-72">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
