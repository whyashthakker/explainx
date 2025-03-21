import { Building2 } from "lucide-react";

const AgentHeader = ({title}:{title:string}) => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        </div>
      </div>
    </header>
  );

export default AgentHeader