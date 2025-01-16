import { Suspense } from "react";
import Link from "next/link";
import prisma from "@repo/db/client";

// Loading component for Suspense fallback
function LoadingAgents() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 h-48"></div>
        ))}
      </div>
    </div>
  );
}

// Agent Card Component
function AgentCard({ agent }: { agent: any }) {
  return (
    <Link href={`/marketplace/${agent.id}`}>
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
        <p className="text-gray-600 mb-4">{agent.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Created {new Date(agent.createdAt).toLocaleDateString()}
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

// Agent List Component
async function AgentList() {
  const agents = await prisma.agent.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">No agents available</h3>
        <p className="mt-2 text-gray-500">Check back later for new AI agents.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Agent Marketplace</h1>
        <p className="mt-2 text-gray-600">
          Browse and discover AI agents to enhance your workflow
        </p>
      </div>
      
      <Suspense fallback={<LoadingAgents />}>
        <AgentList />
      </Suspense>
    </div>
  );
}
