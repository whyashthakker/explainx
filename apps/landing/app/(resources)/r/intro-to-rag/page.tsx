import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Basic to Advanced: RAG",
    description: "RAG: A Comprehensive Guide to Building AI Agents.",
    link: "/r/rag/RAG PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Intro to RAG" />;
}
