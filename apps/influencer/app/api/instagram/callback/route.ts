// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.json({ error: "No code provided" }, { status: 400 });
//   }

//   try {
//     const response = await fetch(
//       "https://api.instagram.com/oauth/access_token",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           client_id: process.env.INSTAGRAM_CLIENT_ID!,
//           client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
//           grant_type: "authorization_code",
//           redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
//           code,
//         }),
//       },
//     );

//     const data = await response.json();
//     console.log("insta access " + data);

//     if (!response.ok) {
//       throw new Error(data.error_message || "Failed to exchange code");
//     }

//     // Store the access token securely (e.g., in your database)
//     // Return success response
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Instagram auth error:", error);
//     return NextResponse.json(
//       { error: "Authentication failed" },
//       { status: 500 },
//     );
//   }
// }
//
//
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.INSTAGRAM_CLIENT_ID!,
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
          grant_type: "authorization_code",
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
          code,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.error_message },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      access_token: data.access_token,
      user_id: data.user_id,
    });
  } catch (error) {
    console.error("Instagram auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 },
    );
  }
}
