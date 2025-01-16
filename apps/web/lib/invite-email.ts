// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail({
  email,
  inviteToken,
  teamName,
  inviterName,
}: {
  email: string;
  inviteToken: string;
  teamName: string;
  inviterName: string;
}) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteToken}`;

  await resend.emails.send({
    from: "Your App <team@yourapp.com>",
    to: email,
    subject: `You've been invited to join ${teamName}'s team`,
    html: `
      <p>Hi there!</p>
      <p>${inviterName} has invited you to join their team on [Your App Name].</p>
      <p><a href="${inviteUrl}">Click here to accept the invitation</a></p>
    `,
  });
}
