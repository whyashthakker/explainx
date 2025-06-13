import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Prompt Engineering",
    description: "Free collection of prompts for various LLM models",
    link: "https://github.com/f/awesome-chatgpt-prompts",
    type: "external",
  },
  {
    title: "Basic of Prompt Engineering",
    description: "Basic of prompt engineering for beginners.",
    link: "/r/prompt/Basics Prompt Engineering 2024.pdf",
    type: "pdf",
  },
  {
    title: "Advance Prompt Engineering",
    description:
      "Advanced guide to prompt engineering for creating text , audio, image and video.",
    link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
    type: "pdf",
  },
  {
    title: "OpenAI Prompt Engineering Guide",
    description:
      "OpenAI guide on how to use prompt engineering to create prompts to get the best results.",
    link: "https://platform.openai.com/docs/guides/text?api-mode=chat",
    type: "external",
  },
];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} heading="Prompt Engineering" />;
}
