import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Basic to Advanced: RAG",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "r/rag/RAG PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} />;
}
