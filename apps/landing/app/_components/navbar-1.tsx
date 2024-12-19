"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { MenuIcon, XIcon, ChevronDown } from "lucide-react";
import Logo from "./logo-2";
import { AuthButton } from "./auth-button-navbar";

const mainNavigation = [
  { name: "Features", href: "/#features" },
  { name: "Wall of Love", href: "/#testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Pricing", href: "/#pricing" },
];

const resourcesNavigation = [
  { name: "Product Roadmap", href: "/product-roadmap" },
  { name: "FAQ", href: "/#faq" },
  { name: "Release Notes", href: "/release-notes" },
  { name: "Docs", href: "https://docs.olly.social/", target: "_blank" },
  { name: "Affiliates", href: "https://olly-ai.lemonsqueezy.com/affiliates", target: "_blank" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Olly.social logo</span>
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button
              className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
            >
              Resources
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`
              absolute 
              top-full 
              left-1/2 
              transform 
              -translate-x-1/2 
              pt-3
              ${isResourcesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}
              transition-all 
              duration-200 
              ease-out
            `}>
              <div className="w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative bg-white">
                  {resourcesNavigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target={item.target}
                      className={`
                        block 
                        px-4 
                        py-2 
                        text-sm 
                        text-gray-700 
                        hover:bg-gray-50 
                        transition-colors
                        ${index !== resourcesNavigation.length - 1 ? 'border-b border-gray-100' : ''}
                      `}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <AuthButton />
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5" onClick={closeMobileMenu}>
              <span className="sr-only">Olly Social logo</span>
              <Logo className="h-4 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-base font-semibold text-gray-900">Resources</div>
                  {resourcesNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target={item.target}
                      className="-mx-3 block rounded-lg px-6 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-6">
                <Link
                  href="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}