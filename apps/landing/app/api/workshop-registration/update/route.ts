import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../../lib/discord-notify";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

// Beehiiv API configuration
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

async function subscribeToBeehiiv(data: {
  email: string;
  firstName: string;
  lastName: string;
  department?: string;
}) {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    throw new Error('Beehiiv API configuration missing');
  }

  const beehiivPayload = {
    email: data.email,
    reactivate_existing: false,
    send_welcome_email: true,
    utm_source: 'explainx_workshop',
    utm_medium: 'workshop_registration',
    utm_campaign: 'workshop_leads',
    referring_site: 'https://explainx.ai/workshops',
    custom_fields: [
      {
        name: "Subscriber Type",
        value: "WORKSHOP_LEAD"
      },
      {
        name: "First Name",
        value: data.firstName
      },
      {
        name: "Last Name", 
        value: data.lastName
      },
      ...(data.department ? [{
        name: "Department",
        value: data.department
      }] : [])
    ]
  };

  const response = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(beehiivPayload),
  });

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch (parseError) {
      const responseText = await response.text().catch(() => 'Unable to read response text');
      throw new Error(`Beehiiv API error: ${response.status} - ${responseText}`);
    }
    throw new Error(errorData?.message || `Beehiiv API error: ${response.status}`);
  }

  return await response.json();
}

const workshopUpdateSchema = z.object({
  registrationId: z.string().min(1, "Registration ID is required"),
  goals: z.string().optional(),
  referralSource: z.string().optional(),
});

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const validatedData = workshopUpdateSchema.parse(body);

    // Find the existing registration
    const existingRegistration = await prisma.workshopRegistration.findUnique({
      where: { id: validatedData.registrationId }
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    // Update workshop registration with additional details
    const updatedRegistration = await prisma.workshopRegistration.update({
      where: { id: validatedData.registrationId },
      data: {
        goals: validatedData.goals,
        referralSource: validatedData.referralSource,
      },
    });

    // Always handle newsletter subscription (mandatory for workshop registration)
    let newsletterSubscription = null;
    let beehiivResponse = null;

    try {
      // Try to create newsletter subscriber in database
      try {
        newsletterSubscription = await prisma.newsletterSubscriber.create({
          data: {
            email: existingRegistration.email,
            subscriberType: 'WORKSHOP_LEAD',
          },
        });
      } catch (dbError) {
        // Handle unique constraint violation (duplicate email)
        if (dbError instanceof Prisma.PrismaClientKnownRequestError && dbError.code === 'P2002') {
          // Email already exists in our database, fetch the existing record
          newsletterSubscription = await prisma.newsletterSubscriber.findUnique({
            where: { email: existingRegistration.email }
          });
        } else {
          throw dbError; // Re-throw if it's a different database error
        }
      }

      // Subscribe to Beehiiv (mandatory)
      beehiivResponse = await subscribeToBeehiiv({
        email: existingRegistration.email,
        firstName: existingRegistration.firstName,
        lastName: existingRegistration.lastName,
        department: existingRegistration.department || undefined,
      });
    } catch (newsletterError) {
      // Fail the entire registration if newsletter subscription fails
      console.error('Newsletter subscription failed:', newsletterError instanceof Error ? newsletterError.message : String(newsletterError));
      return NextResponse.json(
        { error: "Registration failed: Newsletter subscription is required for workshop registration. Please try again." },
        { status: 500 }
      );
    }

    // Create complete Discord notification for step 2
    const discordMessage = `✅ **Workshop Registration Complete - Step 2 Finished**
    
👤 **Student Details:**
• Name: ${existingRegistration.firstName} ${existingRegistration.lastName}
• Email: ${existingRegistration.email}
• Phone: ${existingRegistration.phone || 'Not provided'}
• Department: ${existingRegistration.department || 'Not specified'}

📊 **Experience & Goals:**
• AI Experience Level: ${existingRegistration.experience}
• Learning Goals: ${validatedData.goals || 'Not specified'}
• How they found us: ${validatedData.referralSource || 'Not specified'}

📧 **Newsletter Subscription:** ✅ Subscribed (Mandatory)
• Beehiiv ID: ${beehiivResponse.data?.id}

🆔 **Registration ID:** ${updatedRegistration.id}
📅 **Completed At:** ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

**Next Steps:** Send workshop details and calendar invite to the registered email.`;

    // Send Discord notification using workshop-specific webhook
    sendDiscordNotification(
      discordMessage, 
      false, // statusUpdate
      process.env.DISCORD_WEBHOOK_WORKSHOP_URL // custom webhook for workshop registrations
    ).catch(console.error);

    return NextResponse.json({ 
      success: true, 
      data: {
        id: updatedRegistration.id,
        message: "Registration completed successfully! Check your email for workshop details and newsletter welcome.",
        newsletterSubscribed: true,
        beehiivId: beehiivResponse.data?.id,
      }
    });
  } catch (error) {
    console.error("Workshop registration update error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid update data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update workshop registration", details: String(error) },
      { status: 500 }
    );
  }
} 