'use client'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@repo/ui/components/ui/button'
import React from 'react'
import { useScroll } from 'motion/react'
import { cn } from '@repo/ui/lib/utils'
import { ModeToggle } from './mode-toggle'

// Define the navigation type
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
    hasDropdown: false,
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

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const handleMouseEnter = (name: string) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setActiveDropdown(name)
    }

    const handleMouseLeave = () => {
        // Set a timeout before closing the dropdown
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null)
        }, 300) // 300ms delay gives users time to move to the dropdown
    }

    // Handle mouse enter on dropdown to keep it open
    const handleDropdownMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    // Clean up timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <header>
        <nav
            data-state={menuState ? 'active' : ''}
            className={cn(
                'fixed z-20 w-full border-b transition-colors duration-150',
                'bg-black/40 backdrop-blur-lg text-white', // Glass effect for header
                scrolled ? 'border-white/10' : 'border-transparent'
            )}>
            <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                    <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            Explain <span className='text-yellow-500 font-bold'>X</span>
                        </Link>

                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                            <Menu className={cn('m-auto size-6 duration-200', menuState && 'rotate-180 scale-0 opacity-0')} />
                            <X className={cn('absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200', menuState && 'rotate-0 scale-100 opacity-100')} />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <ul className="flex gap-8 text-sm">
                                {navigation.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="relative"
                                        onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center text-white hover:text-yellow-400 duration-150"
                                        >
                                            <span>{item.name}</span>
                                            {item.hasDropdown && (
                                                <ChevronDown className="ml-1 size-4" />
                                            )}
                                        </Link>
                                        
                                        {/* Dropdown Menu - Changed to pure black */}
                                        {item.hasDropdown && item.dropdownItems && (
                                            <div 
                                                className={cn(
                                                    "absolute top-full left-0 z-20 mt-2 w-64 rounded-md shadow-lg ring-1 ring-yellow-500/20 transition-all duration-200 origin-top-left",
                                                    "bg-black text-white", // Pure black background
                                                    activeDropdown === item.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                                )}
                                                onMouseEnter={handleDropdownMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="py-1">
                                                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                        <Link 
                                                            key={dropdownIndex}
                                                            href={dropdownItem.href}
                                                            target={dropdownItem.target}
                                                            className="block px-4 py-2 hover:bg-zinc-900 border-l-2 border-transparent hover:border-yellow-500 transition-all duration-150"
                                                        >
                                                            <div className="font-medium text-white">{dropdownItem.name}</div>
                                                            {dropdownItem.description && (
                                                                <p className="text-xs text-gray-400">{dropdownItem.description}</p>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div 
                        className={cn(
                            "mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:p-0 lg:shadow-none dark:shadow-none",
                            menuState ? "block" : "hidden",
                            "lg:flex",
                            "bg-black text-white" // Pure black for mobile menu too
                        )}
                    >
                        {/* Mobile Navigation Menu */}
                        <div className="lg:hidden">
                            <ul className="space-y-6 text-base">
                                {navigation.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-white hover:text-yellow-400 block duration-150"
                                            onClick={() => setMenuState(false)}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                        
                                        {/* Mobile Dropdown Menu Items */}
                                        {item.hasDropdown && item.dropdownItems && (
                                            <ul className="pl-4 pt-2 space-y-2">
                                                {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                    <li key={dropdownIndex}>
                                                        <Link
                                                            href={dropdownItem.href}
                                                            target={dropdownItem.target}
                                                            className="text-sm text-gray-400 hover:text-yellow-400 block py-1 border-l border-zinc-800 pl-2"
                                                            onClick={() => setMenuState(false)}
                                                        >
                                                            {dropdownItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Auth Buttons */}
                        <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-white hover:border-white text-white">
                                <a href={`https://agents.explainx.ai/signup`}>
                                    <span>Login</span>
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="bg-white hover:bg-white text-black">
                                <a href={`https://agents.explainx.ai/signup`}>
                                    <span>Sign Up</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    )
}