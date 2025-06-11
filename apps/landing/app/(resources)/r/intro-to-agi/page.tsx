import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Intro to AGI",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/prompt/AGI Course PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Intro to AGI" />;
}
