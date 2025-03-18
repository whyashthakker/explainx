import { NextRequest, NextResponse } from "next/server";

// Store job statuses in memory (consider using a database in production)
let jobStatuses: Record<string, string> = {};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { task_id, status } = data;

    if (!task_id || !status) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Update job status
    jobStatuses[task_id] = status;
    console.log(jobStatuses)

    return NextResponse.json({ message: "Job status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Function to get job status (used in client-side polling)
export async function GET(req: NextRequest) {
  const task_id = req.nextUrl.searchParams.get("task_id");

  if (!task_id || !jobStatuses[task_id]) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json({ status: jobStatuses[task_id] }, { status: 200 });
}
