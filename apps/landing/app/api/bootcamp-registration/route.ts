import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

// Helper function to validate phone numbers and filter out fake ones
function isValidPhoneNumber(phone: string): boolean {
  // Extract only digits from the phone number (very permissive)
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Need at least 7 digits for a valid phone number
  if (digitsOnly.length < 7) {
    return false;
  }
  
  // Check for obviously fake patterns
  const fakePatterns = [
    /^(\d)\1{6,}$/, // 7+ same digits (1111111, 22222222, etc.)
    /^0{7,}$/, // 7+ zeros
    /^1234567890?$/, // Sequential 1234567890
    /^0123456789?$/, // Sequential starting with 0
    /^9876543210?$/, // Reverse sequential
  ];
  
  // Check against fake patterns
  for (const pattern of fakePatterns) {
    if (pattern.test(digitsOnly)) {
      return false;
    }
  }
  
  return true;
}

const bootcampRegistrationSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional().refine(
    (phone) => {
      // If phone is empty or undefined, it's valid (since it's optional)
      if (!phone || phone.trim() === '') return true;
      
      return isValidPhoneNumber(phone);
    },
    {
      message: "Please provide a valid phone number"
    }
  ),
  department: z.string().optional(),
  experience: z.string().refine(val => 
    val === "BEGINNER" || val === "INTERMEDIATE" || val === "ADVANCED", {
    message: "Experience level must be BEGINNER, INTERMEDIATE, or ADVANCED"
  }),
  pricingTier: z.string().refine(val => 
    val === "EARLY_BIRD" || val === "REGULAR", {
    message: "Pricing tier must be EARLY_BIRD or REGULAR"
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = bootcampRegistrationSchema.parse(body);

    // Create bootcamp registration in database (step 1 - basic details only)
    const registration = await prisma.bootcampRegistration.create({
      data: {
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        department: validatedData.department,
        experience: validatedData.experience,
        pricingTier: validatedData.pricingTier,
        status: "REGISTERED",
      },
    });

    // Create basic Discord notification for step 1
    const pricingEmoji = validatedData.pricingTier === "EARLY_BIRD" ? "🎯" : "💰";
    const pricingText = validatedData.pricingTier === "EARLY_BIRD" ? "Early Bird (₹4,999)" : "Regular (₹6,999)";
    
    const discordMessage = `${pricingEmoji} **AI Bootcamp Registration Started - Step 1 Complete**
    
👤 **Student Details:**
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone || 'Not provided'}
• Department: ${validatedData.department || 'Not specified'}
• AI Experience Level: ${validatedData.experience}
• Pricing Tier: ${pricingText}

🆔 **Registration ID:** ${registration.id}
📅 **Registered At:** ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

⏳ **Status:** Waiting for additional details (Step 2)
📚 **Program:** 5-Week AI Bootcamp (20 hours total)`;

    // Send Discord notification using bootcamp-specific webhook
    sendDiscordNotification(
      discordMessage, 
      false, // statusUpdate
      process.env.DISCORD_WEBHOOK_BOOTCAMP_URL || process.env.DISCORD_WEBHOOK_WORKSHOP_URL // fallback to workshop webhook
    ).catch(console.error);

    return NextResponse.json({ 
      success: true, 
      data: {
        id: registration.id,
        message: "Basic bootcamp registration successful! Please complete additional details.",
      }
    });
  } catch (error) {
    console.error("Bootcamp registration error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid registration data", details: error.errors },
        { status: 400 }
      );
    }
    
    // Handle unique constraint violation (duplicate email)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email already registered for this bootcamp" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to register for bootcamp", details: String(error) },
      { status: 500 }
    );
  }
} 