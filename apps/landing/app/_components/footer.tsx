// Footer Component
import { Button } from "@repo/ui/components/ui/button";
import Logo from "./logo-2";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center w-full md:p-6 p-2 bg-background z-50 dark:bg-[#1F1F1F] md:text-base text-xs overflow-x-hidden">
      <Logo />
      <div className="flex flex-wrap md:flex justify-center md:justify-normal items-center gap-x-2 text-muted-foreground">
        <Link href="https://olly-ai.lemonsqueezy.com/affiliates">
          <Button variant="ghost" className="text-blue-500" size="sm">
            Become an Affiliate 🤝 (Get 25% per sale)
          </Button>
        </Link>
        <Link href="https://snapy.ai">
          <Button variant="ghost" size="sm">
            Never Edit Videos Ever Again 🎬
          </Button>
        </Link>
        <Link href="https://explainx.ai">
          <Button variant="ghost" size="sm">
            50K+ AI Newsletter Community 🚀
          </Button>
        </Link>
        <Link href="https://yashthakker.com">
          <Button variant="ghost" size="sm">
            Maker Projects 👋
          </Button>
        </Link>
      </div>
    </div>
  )
}
