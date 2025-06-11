import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Intro to RAG",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/rag/RAG PPT.pdf",
    type: "pdf",
  },
  {
    title: "Intro to AGI",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/agi/AGI Course PPT.pdf",
    type: "pdf",
  },
  {
    title: "Prompt Engineering",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
  {
    title: "AI Agents GitHub Repository",
    description: "Access the complete source code and implementation details.",
    link: "https://github.com/whyashthakker/ai-agents",
    type: "external",
  },
  {
    title: "AI Agents - Deep Dive",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/agents/AI Agents - Deep Dive.pdf",
    type: "pdf",
  },
  {
    title: "A Practical Guide to Building Agents by OpenAI",
    description: "Learn how to build AI agents.",
    link: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    type: "external",
  },
  {
    title: "Evaluating AI Agents",
    description: "Learn how to evaluate and optimize AI agent performance.",
    link: "/r/agents/Evaluating AI Agent.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Intro to GenAI" />;
}

