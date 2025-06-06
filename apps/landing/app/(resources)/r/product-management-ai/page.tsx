import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";


const resources: ResourceType[] = [
    {
      title: "Product Management with AI",
      description:
        "Comprehensive guide on AI agents implementation and architecture.",
      link: "/r/product-manage/GROWTH PRODUCT MANAGER (1).pdf",
      type: "pdf",
    },
   
  ];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} />;
}
