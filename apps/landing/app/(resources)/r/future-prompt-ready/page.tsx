import { ResourcesClient } from "../../../../components/resources/ResourcesClient";
import { ResourceType } from "../../../../types/resources";


const resources: ResourceType[] = [
    {
      title: "Future Prompt Engineering Ready",
      description:
        "Comprehensive guide on AI agents implementation and architecture.",
      link: "/r/prompt/Prompt Engineering PPT_compressed.pdf",
      type: "pdf",
    },
   
  ];

export default function ResourcesPage() {
  return <ResourcesClient resources={resources} />;
}
