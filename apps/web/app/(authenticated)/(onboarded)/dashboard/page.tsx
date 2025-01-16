import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import prisma from "@repo/db/client";

export default async function BrandDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
