import React from 'react'
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Notebook as Robot } from "lucide-react";
import { agents } from "../../../constants";

function AgentCard({ agent, onClick } : any) {
    return (
      <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-secondaccent2 transition-all duration-300 overflow-hidden group shadow-sm">
      
        
        <CardHeader className="pt-8 pb-4">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-secondaccent2/10 mr-4">
              <agent.icon className="w-6 h-6 text-secondaccent2" />
            </div>
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-white transition-colors">
              {agent.name}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-slate-600 dark:text-zinc-400 transition-colors">
            {agent.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 pb-6">
          <Button 
            className="w-full bg-secondaccent2 hover:bg-secondaccent3 text-black transition-colors duration-300"
            onClick={onClick}
          >
            Use this Agent
          </Button>
        </CardFooter>
      </Card>
    );
  }

export default AgentCard