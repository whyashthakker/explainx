import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import AgentCard from "../_components/AgentCard";


export default async function BrandDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }


  return <AgentCard  />;
}
