import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "OpenAI Codex Masterclass",
    description:
      "OpenAI Codex: A Comprehensive Guide to let AI agent code for you.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient resources={resources} heading="Intro to OpenAI's Codex " />
  );
}
