import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../auth";

const AdminBlogLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  console.log(session?.user);
  if (!session?.user?.isAdmin) {
    redirect("/blog");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-16 pb-12">{children}</div>
    </div>
  );
};

export default AdminBlogLayout;
