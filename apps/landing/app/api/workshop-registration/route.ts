import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

const workshopRegistrationSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  experience: z.string().refine(val => 
    val === "BEGINNER" || val === "INTERMEDIATE" || val === "ADVANCED", {
    message: "Experience level must be BEGINNER, INTERMEDIATE, or ADVANCED"
  }),
  goals: z.string().optional(),
  referralSource: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = workshopRegistrationSchema.parse(body);

    // Create workshop registration in database
    const registration = await prisma.workshopRegistration.create({
      data: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        experience: validatedData.experience,
        goals: validatedData.goals,
        referralSource: validatedData.referralSource,
        workshopType: "PROMPT_ENGINEERING",
        status: "REGISTERED",
      },
    });

    // Create detailed Discord notification
    const discordMessage = `🎯 **New Workshop Registration - Prompt Engineering**
    
👤 **Student Details:**
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone || 'Not provided'}

📊 **Experience & Goals:**
• AI Experience Level: ${validatedData.experience}
• Learning Goals: ${validatedData.goals || 'Not specified'}
• How they found us: ${validatedData.referralSource || 'Not specified'}

🆔 **Registration ID:** ${registration.id}
📅 **Registered At:** ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

**Next Steps:** Send workshop details and calendar invite to the registered email.`;

    // Send Discord notification
    sendDiscordNotification(discordMessage).catch(console.error);

    return NextResponse.json({ 
      success: true, 
      data: {
        id: registration.id,
        message: "Successfully registered for the workshop! Check your email for details."
      }
    });
  } catch (error) {
    console.error("Workshop registration error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid registration data", details: error.errors },
        { status: 400 }
      );
    }
    
    // Handle unique constraint violation (duplicate email)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email already registered for this workshop" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to register for workshop", details: String(error) },
      { status: 500 }
    );
  }
} 