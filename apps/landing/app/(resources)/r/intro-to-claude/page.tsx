import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Intro to Claude",
    description: "Comprehensive guide on how to use Claude for AI agents.",
    link: "/r/agi/AGI Course PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Intro to Claude" />;
}
