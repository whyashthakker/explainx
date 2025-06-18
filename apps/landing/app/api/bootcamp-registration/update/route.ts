import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../../lib/discord-notify";
import prisma from "@repo/db/client";

// Beehiiv API configuration
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const updateBootcampRegistrationSchema = z.object({
  registrationId: z.string().min(1, "Registration ID is required"),
  goals: z.string().optional(),
  referralSource: z.string().optional(),
});

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const validatedData = updateBootcampRegistrationSchema.parse(body);

    // Get the existing registration
    const existingRegistration = await prisma.bootcampRegistration.findUnique({
      where: { id: validatedData.registrationId },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Update the registration with additional details
    const updatedRegistration = await prisma.bootcampRegistration.update({
      where: { id: validatedData.registrationId },
      data: {
        goals: validatedData.goals,
        referralSource: validatedData.referralSource,
      },
    });

    // Subscribe to Beehiiv newsletter (mandatory for bootcamp)
    try {
      if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
        throw new Error('Beehiiv API configuration missing');
      }

      const beehiivResponse = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email: existingRegistration.email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "bootcamp_registration",
          utm_medium: "form",
          utm_campaign: "ai_bootcamp_2025",
          referring_site: "https://explainx.ai",
          custom_fields: [
            {
              name: "subscriber_type",
              value: "BOOTCAMP_LEAD"
            },
            {
              name: "first_name", 
              value: existingRegistration.firstName
            },
            {
              name: "last_name",
              value: existingRegistration.lastName
            },
            {
              name: "department",
              value: existingRegistration.department || "Not specified"
            },
            {
              name: "experience_level",
              value: existingRegistration.experience
            },
            {
              name: "pricing_tier",
              value: updatedRegistration.pricingTier
            },
            {
              name: "registration_source",
              value: validatedData.referralSource || "Direct"
            }
          ]
        }),
      });

      if (!beehiivResponse.ok) {
        const errorData = await beehiivResponse.text();
        console.error("Beehiiv subscription failed:", errorData);
        
        // Since newsletter subscription is mandatory for bootcamp, we should fail the registration
        return NextResponse.json(
          { error: "Newsletter subscription failed. Please try again or contact support." },
          { status: 500 }
        );
      }

      console.log("Successfully subscribed to Beehiiv newsletter");
    } catch (beehiivError) {
      console.error("Beehiiv subscription error:", beehiivError);
      
      // Since newsletter subscription is mandatory for bootcamp, we should fail the registration
      return NextResponse.json(
        { error: "Newsletter subscription failed. Please try again or contact support." },
        { status: 500 }
      );
    }

    // Create comprehensive Discord notification for step 2 completion
    const pricingEmoji = updatedRegistration.pricingTier === "EARLY_BIRD" ? "🎯" : "💰";
    const pricingText = updatedRegistration.pricingTier === "EARLY_BIRD" ? "Early Bird (₹4,999)" : "Regular (₹6,999)";
    
    const discordMessage = `🎉 **AI Bootcamp Registration COMPLETED!**
    
👤 **Student Profile:**
• Name: ${existingRegistration.firstName} ${existingRegistration.lastName}
• Email: ${existingRegistration.email}
• Phone: ${existingRegistration.phone || 'Not provided'}
• Department: ${existingRegistration.department || 'Not specified'}
• Experience Level: ${existingRegistration.experience}
• Pricing Tier: ${pricingText}

🎯 **Learning Goals:**
${validatedData.goals || 'Not specified'}

📊 **Referral Source:** ${validatedData.referralSource || 'Direct'}

📧 **Newsletter Status:** ✅ Subscribed (BOOTCAMP_LEAD)

🆔 **Registration ID:** ${updatedRegistration.id}
📅 **Completed At:** ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

📚 **Program Details:**
• 5-Week AI Bootcamp (20 hours total)
• Weekends: Saturday & Sunday, 2 hours each
• Lifetime access to ExplainX AI community
• Industry certification included

🎯 **Next Steps:** Send welcome email with program details and calendar invites`;

    // Send Discord notification using bootcamp-specific webhook
    sendDiscordNotification(
      discordMessage, 
      false, // statusUpdate
      process.env.DISCORD_WEBHOOK_BOOTCAMP_URL || process.env.DISCORD_WEBHOOK_WORKSHOP_URL // fallback to workshop webhook
    ).catch(console.error);

    return NextResponse.json({ 
      success: true, 
      data: {
        id: updatedRegistration.id,
        message: "Bootcamp registration completed successfully! Check your email for program details and next steps.",
      }
    });
  } catch (error) {
    console.error("Bootcamp registration update error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid update data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update bootcamp registration", details: String(error) },
      { status: 500 }
    );
  }
} 