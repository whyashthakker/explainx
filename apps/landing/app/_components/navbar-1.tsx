"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Logo from "./logo-2";

type DropdownItem = {
  name: string;
  href: string;
  description?: string;
  target?: string;
};

type NavigationItem = {
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
};

const navigation: NavigationItem[] = [
  {
    name: "Services",
    href: "/#services",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "Custom AI Agent Development",
        href: "/#services",
        description: "Build powerful AI agents tailored to your needs"
      },
      {
        name: "AI Agent Training",
        href: "/#services",
        description: "Empower your team with AI development skills"
      },
      {
        name: "Generative AI Training",
        href: "/#services", 
        description: "Master the fundamentals of generative AI"
      },
      {
        name: "Frontend Development",
        href: "/#services",
        description: "Create intuitive interfaces for AI agents"
      },
      {
        name: "AI Consulting",
        href: "/#services",
        description: "Strategic guidance for AI implementation"
      }
    ]
  },
  // { 
  //   name: "Products",
  //   href: "/products",
  //   hasDropdown: true,
  //   dropdownItems: [
  //     { name: "Influencer Marketing Platform", href: "/products/influencer-marketing-platform", description: "Our AI-driven platform for impactful campaigns" },
  //     { name: "Campaign Management", href: "/products/campaign-management", description: "Streamline your campaign workflows" },
  //     { name: "Influencer Analytics", href: "/products/influencer-analytics", description: "In-depth creator performance analysis" },
  //     { name: "Product Seeding", href: "/products/product-seeding", description: "Automate your gifting campaigns" },
  //     { name: "Campaign Analytics", href: "/products/campaign-analytics", description: "Track campaign performance" },
  //     { name: "Affiliate Marketing", href: "/products/affiliate-marketing", description: "Manage creator partnerships" },
  //     { name: "Free Influencer Finder", href: "/products/free-influencer-finder", description: "Discover perfect creators" },
  //     { name: "All Products", href: "/products", description: "View our complete suite" }
  //   ]
  // },
  // {
  //   name: "Use Cases",
  //   href: "/use-cases",
  //   hasDropdown: true,
  //   dropdownItems: [
  //     { name: "Drive E-commerce Sales", href: "/use-cases/drive-ecommerce-sales", description: "Boost your online sales" },
  //     { name: "Run Affiliate Programs", href: "/use-cases/run-affiliate-programs", description: "Manage affiliate partnerships" },
  //     { name: "Manage Client Campaigns", href: "/use-cases/manage-client-campaigns", description: "Streamline campaign management" },
  //     { name: "For Creators", href: "/use-cases/for-creators", description: "Grow your influence" },
  //     { name: "For Brands", href: "/use-cases/for-brands", description: "Connect with your audience" }
  //   ]
  // },
  { 
    name: "Pricing",
    href: "/#pricing",
    hasDropdown: false
  },
  {
    name: "Free tools",
    href: "/tools",
    hasDropdown: true,
    dropdownItems: [
      { name: "AI Agent Finder", href: "/tools/ai-agent-finder", description: "Find AI Agents by use case" },
      { name: "All Tools", href: "/tools", description: "View all free tools" }
    ]
  },
  { 
    name: "Resources",
    href: "/resources",
    hasDropdown: true,
    dropdownItems: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/contact" },
      { name: "Docs", href: "/#faqs", target: "_blank" },
    ]
  }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 
        ${isScrolled ? 'bg-[#2D2D2E]/95 backdrop-blur-sm shadow-sm' : 'bg-[#2D2D2E]'}`}
    >
      <nav className="relative flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo</span>
            <Logo className="h-14 w-auto" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center h-10 text-sm font-semibold text-gray-200 hover:text-white transition-colors"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                )}
              </Link>
              
              {item.hasDropdown && activeDropdown === item.name && item.dropdownItems && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2">
                  <div className="w-64 rounded-xl bg-[#2D2D2E] shadow-lg ring-1 ring-white/10 overflow-hidden">
                    <div className="relative bg-[#2D2D2E] p-1">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          target={dropdownItem.target}
                          className={`
                            block 
                            px-4 
                            py-2.5
                            rounded-lg
                            text-sm 
                            hover:bg-gray-700 
                            transition-colors
                          `}
                        >
                          <div className="font-medium text-gray-200">{dropdownItem.name}</div>
                          {dropdownItem.description && (
                            <p className="mt-1 text-xs text-gray-400 line-clamp-1">{dropdownItem.description}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 lg:items-center">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 h-10 text-sm font-semibold text-[#2D2D2E] hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#2D2D2E] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={closeMobileMenu}>
              <span className="sr-only">Logo</span>
              <Logo className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700/30">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            target={dropdownItem.target}
                            className="-mx-3 block rounded-lg px-6 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                            onClick={closeMobileMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6 space-y-2">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="-mx-3 block rounded-lg bg-white px-3 py-2.5 text-base font-semibold text-[#2D2D2E] hover:bg-gray-200"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}