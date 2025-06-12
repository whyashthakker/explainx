import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Auto Video Factory",
    description:
      "A comprehensive guide on how to automate video creation with AI.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient
      resources={resources}
      heading="Automated Video Factory : AI Content Creation"
    />
  );
}
