import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);
  if (!session) {
    console.log("no session");
    redirect("/");
  }

  return <main>{children}</main>;
}
