import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Product Management with AI",
    description:
      "A comprehensive guide on how to manage growth and product development with AI.",
    link: "/r/product-manage/GROWTH PRODUCT MANAGER (1).pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient
      resources={resources}
      heading={"Product Management with AI"}
    />
  );
}
