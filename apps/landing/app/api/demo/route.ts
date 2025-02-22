// app/api/demo/route.ts
// test
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDiscordNotification } from "../../../lib/discord-notify";

const demoBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  teamSize: z.enum(["1", "2-5", "6-20", "21-50", "50+"]).optional(),
  monthlyBudget: z
    .enum(["0-1000", "1000-5000", "5000-10000", "10000+"])
    .optional(),
  goals: z.string().optional(),
  source: z.string().optional(),
  utmParams: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_term: z.string().optional(),
    })
    .optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  timeline: z.enum(["immediately", "1-3 months", "3-6 months", "6+ months"]).optional(),
  requirements: z.string().optional(),
  preferredContactMethod: z.enum(["email", "phone", "either"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = demoBookingSchema.parse(body);

    // Format data for Discord notification
    const discordMessage = `
🎯 New Demo Booking Request

👤 Contact Information
• Name: ${validatedData.name}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone || "Not provided"}
• Preferred Contact: ${validatedData.preferredContactMethod || "Not specified"}
• Company: ${validatedData.company}
• Role: ${validatedData.role || "Not specified"}
• Industry: ${validatedData.industry || "Not specified"}

📊 Company Details
• Team Size: ${validatedData.teamSize || "Not specified"}
• Monthly Budget: ${validatedData.monthlyBudget || "Not specified"}
• Timeline: ${validatedData.timeline || "Not specified"}

🎯 Project Information
• Goals: ${validatedData.goals || "No specific goals mentioned"}
• Requirements: ${validatedData.requirements || "No specific requirements mentioned"}

📈 Source Information
• Source: ${validatedData.source || "Direct"}
${
  validatedData.utmParams
    ? `• Campaign: ${validatedData.utmParams.utm_campaign || "N/A"}
• Medium: ${validatedData.utmParams.utm_medium || "N/A"}
• Source: ${validatedData.utmParams.utm_source || "N/A"}`
    : ""
}
    `;

    // Send notification to Discord
    await sendDiscordNotification(discordMessage);

    // Save to database if needed
    // const booking = await prisma.demoBooking.create({
    //   data: {
    //     name: validatedData.name,
    //     email: validatedData.email,
    //     company: validatedData.company,
    //     role: validatedData.role,
    //     teamSize: validatedData.teamSize,
    //     monthlyBudget: validatedData.monthlyBudget,
    //     goals: validatedData.goals,
    //     source: validatedData.source,
    //     utmParams: validatedData.utmParams,
    //     status: "PENDING"
    //   },
    // });

    // Optional: Send confirmation email
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: "Demo Booking Confirmation - ExplainX",
    //   template: "demo-booking-confirmation",
    //   data: {
    //     name: validatedData.name,
    //     company: validatedData.company
    //   }
    // });

    return NextResponse.json({
      success: true,
      message: "Demo booking request received",
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
      },
    });
  } catch (error) {
    console.error("Demo booking error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to process demo booking",
        message: "An unexpected error occurred while processing your request",
      },
      { status: 500 },
    );
  }
}

// Optional: Add GET method to fetch available time slots or check booking status
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 },
    );
  }

  try {
    // const booking = await prisma.demoBooking.findFirst({
    //   where: { email },
    //   orderBy: { createdAt: 'desc' }
    // });

    return NextResponse.json({
      success: true,
      // data: booking
      data: { status: "MOCK_DATA" },
    });
  } catch (error) {
    console.error("Error fetching demo booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking information" },
      { status: 500 },
    );
  }
}

