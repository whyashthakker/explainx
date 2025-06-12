import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Perplexity Masterclass",
    description: "Best practices for using Perplexity to search the web",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient resources={resources} heading="Perplexity Masterclass" />
  );
}
