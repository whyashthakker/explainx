import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "AI Agents - Deep Dive",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/agents/AI Agents - Deep Dive.pdf",
    type: "pdf",
  },
  {
    title: "Intro to RAG",
    description: "RAG with ollama for building AI agents.",
    link: "/r/rag/RAG PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Ollama Masterclass" />;
}
