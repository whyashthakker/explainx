import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Prompt Engineering Guide",
    description:
      "Comprehensive guide on AI agents implementation and architecture.",
    link: "/r/agi/AGI Course PPT.pdf",
    type: "pdf",
  },
 
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} />;
}
