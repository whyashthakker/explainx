import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";

const resources: ResourceType[] = [
  {
    title: "How to launch on Product Hunt",
    description: "How to launch on Product Hunt effectively",
    link: "/r/producthunt/Product Hunt PPT.pdf",
    type: "pdf",
  },
];

export default function ResourcesPage() {
  return (
    <ResourcesClient resources={resources} heading="Product Hunt Starter" />
  );
}
