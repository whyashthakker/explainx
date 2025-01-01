"use client";

import { useState } from "react";
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
    name: "Use Cases",
    href: "/use-cases",
    hasDropdown: true,
    dropdownItems: [
      { name: "For Creators", href: "/use-cases/creators", description: "Grow your audience" },
      { name: "For Brands", href: "/use-cases/brands", description: "Connect with creators" },
      { name: "For Agencies", href: "/use-cases/agencies", description: "Manage multiple accounts" }
    ]
  },
  // { 
  //   name: "Agency",
  //   href: "/agency",
  //   hasDropdown: false
  // },
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
      { name: "Hashtag Generator", href: "/tools/hashtag-generator" },
      { name: "Caption Writer", href: "/tools/caption-writer" },
      { name: "Analytics Calculator", href: "/tools/analytics-calculator" }
    ]
  },
  { 
    name: "Resources",
    href: "/resources",
    hasDropdown: true,
    dropdownItems: [
      { name: "Blog", href: "/blog" },
      // { name: "Case Studies", href: "/case-studies" },
      { name: "Help Center", href: "/contact" },
      { name: "Docs", href: "/#faqs", target: "_blank" },
    ]
  }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
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
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors inline-flex items-center"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                )}
              </Link>
              
              {item.hasDropdown && activeDropdown === item.name && item.dropdownItems && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3">
                  <div className="w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative bg-white">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          target={dropdownItem.target}
                          className={`
                            block 
                            px-4 
                            py-2 
                            text-sm 
                            text-gray-700 
                            hover:bg-gray-50 
                            transition-colors
                            ${index !== item.dropdownItems!.length - 1 ? 'border-b border-gray-100' : ''}
                          `}
                        >
                          <div className="font-medium">{dropdownItem.name}</div>
                          {dropdownItem.description && (
                            <p className="mt-1 text-xs text-gray-500">{dropdownItem.description}</p>
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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <Link
            href="https://creator.infloq.com/login"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
          >
            For Influencers
          </Link>
          <Link
            href="https://brand.infloq.com/login"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="https://brand.infloq.com/signup"
            className="rounded-lg bg-[#4361EE] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3B54D3] transition-colors"
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