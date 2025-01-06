"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  BarChart3Icon,
  Building2Icon,
  CreditCardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  PlugIcon,
  UserCircleIcon,
  XIcon,
  MenuIcon,
  YoutubeIcon,
} from "lucide-react";
import { useUser } from "../_context/user-context";
import { cn } from "@repo/ui/lib/utils";
import { usePathname } from "next/navigation";
import { UserType } from "@prisma/client";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
  },
  {
    label: "Profile",
    icon: UserCircleIcon,
    href: "/profile",
  },
  {
    label: "Brands",
    icon: Building2Icon,
    href: "/brands",
  },
  {
    label: "Collaborations",
    icon: HandshakeIcon,
    href: "/collaborations",
  },
  {
    label: "Integrations",
    icon: PlugIcon,
    href: "/integrations",
  },
  {
    label: "YouTube",
    icon: YoutubeIcon,
    href: "/youtube",
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
] as const;

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const user = useUser();
  const pathname = usePathname();

  if (
    user.userType !== UserType.INFLUENCER &&
    user.userType !== UserType.BOTH
  ) {
    return null;
  }

  const getProfileInfo = () => {
    const activeInfluencer = user.influencers?.[0];
    return {
      name: activeInfluencer?.name || user.name || user.email || "",
      type: activeInfluencer?.category || "Influencer",
    };
  };

  const profileInfo = getProfileInfo();

  return (
    <div
      className={cn(
        "flex h-full transition-all duration-300 ease-in-out",
        className,
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="flex flex-col h-full bg-white border-r shadow-lg w-72">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              infloq
            </h1>
          </div>
        </div>

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
                asChild
                onClick={() => setIsMobileOpen(false)}
              >
                <Link
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
                </Link>
              </Button>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50">
            <div className="p-2 rounded-lg bg-blue-100">
              <UserCircleIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {profileInfo.name}
              </p>
              <p className="text-xs text-blue-600">{profileInfo.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-full relative bg-gray-50">
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

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="fixed inset-y-0 left-0 z-40">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      <main className="transition-all duration-300 ease-in-out md:pl-72">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
