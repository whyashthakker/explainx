import { Button } from '@repo/ui/components/ui/button'
import { ModeToggle } from '@repo/ui/components/ui/mode-toggle'
import { Bell, HelpCircle } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors">
    <div className="flex items-center gap-4 w-full max-w-md">

    </div>

    <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
        </Button>
        <ModeToggle />
    </div>
</header>
  )
}

export default Header