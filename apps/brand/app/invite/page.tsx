// app/invite/page.tsx
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { AcceptInviteForm } from "./_components/AcceptInviteForm";

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

async function getInviteDetails(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/team/invite/${token}`,
  );
  if (!response.ok) return null;
  return response.json();
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;
  const session = await auth();
  const invite = await getInviteDetails(token);

  console.log("invite received ", invite);
  
  // If no valid invite found, redirect to 404
  if (!invite) {
    redirect("/404");
  }

  // If user is not logged in, redirect to sign in
  if (!session) {
    redirect(`/login?invite=${token}`);
  }

  // If user is logged in but with wrong email, show error
  if (session.user?.email !== invite.inviteEmail) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          This invite was sent to {invite.inviteEmail}. Please sign in with that
          email address.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6">
      <AcceptInviteForm invite={invite.invite} token={token} />
    </div>
  );
}