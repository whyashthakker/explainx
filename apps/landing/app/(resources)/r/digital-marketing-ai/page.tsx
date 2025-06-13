import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Digital Marketing with AI",
    description:
      "A comprehensive guide on how to automate digital marketing with social media marketing.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient
      resources={resources}
      heading="Automated Digital Marketing with GenAI"
    />
  );
}
