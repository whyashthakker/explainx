import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Format the message for Discord
    // Discord has a 2000 character limit, so we need to be concise
    const discordMessage = `
📬 New Contact Form Submission

👤 Contact Information
• Name: ${validatedData.name}
• Email: ${validatedData.email}${validatedData.phone ? `\n• Phone: ${validatedData.phone}` : ''}${validatedData.subject ? `\n• Subject: ${validatedData.subject}` : ''}

💬 Message
${validatedData.message.slice(0, 1000)}${validatedData.message.length > 1000 ? '...(truncated)' : ''}
    `.trim();

    // Send to Discord
    await sendDiscordNotification(discordMessage);

    return NextResponse.json({ 
      success: true, 
      message: "Contact form submitted successfully" 
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
} 