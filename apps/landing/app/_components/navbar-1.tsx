"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
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
    name: "Features",
    href: "/#features",
    hasDropdown: true,
    dropdownItems: [
      { name: "Analytics Dashboard", href: "/#features", description: "Track your campaign performance" },
      { name: "Automation Tools", href: "/#features", description: "Streamline your workflow" },
      { name: "Content Management", href: "/#features", description: "Organize your content" }
    ]
  },
  { 
    name: "Products",
    href: "/products",
    hasDropdown: true,
    dropdownItems: [
      { name: "Influencer Marketing Platform", href: "/products/influencer-marketing-platform", description: "Our AI-driven platform for impactful campaigns" },
      { name: "Campaign Management", href: "/products/campaign-management", description: "Streamline your campaign workflows" },
      { name: "Influencer Analytics", href: "/products/influencer-analytics", description: "In-depth creator performance analysis" },
      { name: "Product Seeding", href: "/products/product-seeding", description: "Automate your gifting campaigns" },
      { name: "Campaign Analytics", href: "/products/campaign-analytics", description: "Track campaign performance" },
      { name: "Affiliate Marketing", href: "/products/affiliate-marketing", description: "Manage creator partnerships" },
      { name: "Free Influencer Finder", href: "/products/free-influencer-finder", description: "Discover perfect creators" },
      { name: "All Products", href: "/products", description: "View our complete suite" }
    ]
  },
  {
    name: "Use Cases",
    href: "/use-cases",
    hasDropdown: true,
    dropdownItems: [
      { name: "Drive E-commerce Sales", href: "/use-cases/drive-ecommerce-sales", description: "Boost your online sales" },
      { name: "Run Affiliate Programs", href: "/use-cases/run-affiliate-programs", description: "Manage affiliate partnerships" },
      { name: "Manage Client Campaigns", href: "/use-cases/manage-client-campaigns", description: "Streamline campaign management" },
      { name: "For Creators", href: "/use-cases/for-creators", description: "Grow your influence" },
      { name: "For Brands", href: "/use-cases/for-brands", description: "Connect with your audience" }
    ]
  },
  { 
    name: "Pricing",
    href: "/pricing",
    hasDropdown: false
  },
  {
    name: "Free tools",
    href: "/tools",
    hasDropdown: true,
    dropdownItems: [
      { name: "Instagram Engagement Checker", href: "/tools/instagram-engagement-checker", description: "Check engagement metrics" },
      { name: "Instagram Audit", href: "/tools/instagram-audit", description: "Analyze Instagram profiles" },
      { name: "TikTok Audit", href: "/tools/tiktok-audit", description: "Analyze TikTok profiles" },
      { name: "YouTube Audit", href: "/tools/youtube-audit", description: "Analyze YouTube channels" },
      { name: "Twitch Audit", href: "/tools/twitch-audit", description: "Analyze Twitch channels" },
      { name: "Pinterest Audit", href: "/tools/pinterest-audit", description: "Analyze Pinterest profiles" },
      { name: "Fake Follower Checker", href: "/tools/fake-follower-checker", description: "Detect fake followers" },
      { name: "Creator Discovery", href: "/tools/creator-discovery", description: "Find relevant creators" },
      { name: "Social ROI Calculator", href: "/tools/social-roi-calculator", description: "Calculate campaign ROI" },
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
        ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}
    >
      <nav className="relative flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Infloq logo</span>
            <Logo className="h-14 w-auto" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
                className="flex items-center h-10 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                )}
              </Link>
              
              {item.hasDropdown && activeDropdown === item.name && item.dropdownItems && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2">
                  <div className="w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
                    <div className="relative bg-white p-1">
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
                            hover:bg-gray-50 
                            transition-colors
                          `}
                        >
                          <div className="font-medium text-gray-900">{dropdownItem.name}</div>
                          {dropdownItem.description && (
                            <p className="mt-1 text-xs text-gray-500 line-clamp-1">{dropdownItem.description}</p>
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
            href="https://creator.infloq.com/login"
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            For Influencers
          </Link>
          <Link
            href="https://brand.infloq.com/login"
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="https://brand.infloq.com/signup"
            className="inline-flex items-center justify-center rounded-lg bg-[#4361EE] px-4 h-10 text-sm font-semibold text-white hover:bg-[#3B54D3] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={closeMobileMenu}>
              <span className="sr-only">Infloq logo</span>
              <Logo className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                            className="-mx-3 block rounded-lg px-6 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                            onClick={closeMobileMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="https://creator.infloq.com/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  For Influencers
                </Link>
              </div>
              <div className="py-6 space-y-2">
                <Link
                  href="https://brands.infloq.com/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  href="https://brands.infloq.com/signup"
                  className="-mx-3 block rounded-lg bg-[#4361EE] px-3 py-2.5 text-base font-semibold text-white hover:bg-[#3B54D3]"
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