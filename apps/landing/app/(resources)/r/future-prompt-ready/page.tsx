import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Future Prompt Engineering Ready",
    description:
      "A comprehensive guide on how to use prompt engineering to create future-ready prompts.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient resources={resources} heading="Prompts for the future." />
  );
}
