import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "Growth Product Management",
    description:
      "A comprehensive guide on how to manage growth and product development.",
    link: "r/product-manage/GROWTH PRODUCT MANAGER (1).pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient
      resources={resources}
      heading="Growth Product Management"
    />
  );
}
