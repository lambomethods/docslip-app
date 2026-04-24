import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getShieldedClient, baseClient } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).providerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { participantId, hoursCredited } = await req.json();

    if (!participantId) {
      return NextResponse.json({ error: "Participant ID is required" }, { status: 400 });
    }

    const db = getShieldedClient({
      actorId: (session.user as any).providerId,
      actorRole: (session.user as any).role,
      providerId: (session.user as any).providerId,
      ipAddress: req.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: req.headers.get("user-agent") || "UNKNOWN"
    });

    // 1. Verify the Participant belongs to this Provider
    // The wrapper automatically appends `where: { providerId: session.providerId }`
    const participant = await db.docslipParticipant.findUnique({
      where: { id: participantId }
    });

    if (!participant) {
      return NextResponse.json({ error: "Participant not found or unauthorized." }, { status: 403 });
    }

    // 2. We use baseClient for Engine Attendance Log because it currently does not have a providerId
    // on its schema, so the Shielded Client would crash trying to push `where: { providerId }` into it.
    // However, we just verified the Participant ownership manually above!
    // NOTE: Ideally, the engine table has the provider ID natively or we use a separate safe extension.
    const log = await baseClient.engineAttendanceLog.create({
      data: {
        participantId: participant.id,
        status: "VERIFIED_PRESENT",
        hoursCredited: hoursCredited || 1.0,
      }
    });

    // 3. Manually push to the Access Log to maintain the shield guarantees
    await baseClient.shieldSystemAccessLog.create({
      data: {
        actorId: (session.user as any).providerId,
        actorRole: (session.user as any).role,
        actionType: "CREATE",
        resourceType: "ATTENDANCE_LOG",
        isBreakGlass: false,
        ipAddress: req.headers.get("x-forwarded-for") || "127.0.0.1",
        userAgent: req.headers.get("user-agent") || "UNKNOWN"
      }
    });

    return NextResponse.json({ success: true, log });

  } catch (error: any) {
    console.error("CHECK_IN_FAULT:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
