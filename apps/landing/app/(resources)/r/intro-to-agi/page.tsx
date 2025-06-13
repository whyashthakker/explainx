import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Intro to AGI",
    description: "Introduction to AGI and how to use it to create AI agents.",
    link: "/r/agi/AGI Course PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Intro to AGI" />;
}
