import { NextRequest, NextResponse } from 'next/server';
import { getShieldedClient } from '@/lib/db';
import crypto from 'crypto';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).providerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { participantId } = await req.json();

    if (!participantId) {
      return NextResponse.json({ error: "Missing participant ID" }, { status: 400 });
    }

    const db = getShieldedClient({
      actorId: (session.user as any).providerId,
      actorRole: (session.user as any).role,
      providerId: (session.user as any).providerId,
      ipAddress: req.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: req.headers.get("user-agent") || "UNKNOWN"
    });

    // 1. Fetch Participant and calculate total verified hours
    const participant = await db.docslipParticipant.findUnique({
      where: { id: participantId },
      include: {
        logs: {
          where: { status: "VERIFIED_PRESENT" }
        }
      }
    });

    if (!participant) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }

    const totalVerifiedHours = participant.logs.reduce((sum, log) => sum + log.hoursCredited, 0);

    // 2. Cryptographic Hash Generation for Court Verifiability
    const hashPayload = `${participant.id}-${totalVerifiedHours}-${Date.now()}-${participant.providerId}`;
    const uniqueHash = crypto.createHash('sha256').update(hashPayload).digest('hex').substring(0, 16);

    // 3. Create the Official Compliance Packet
    const packet = await db.docslipCompliancePacket.create({
      data: {
        participantId: participant.id,
        uniqueHash,
        totalHours: totalVerifiedHours,
        isValid: true
      }
    });

    return NextResponse.json({
      success: true,
      packetUrl: `/verify/${uniqueHash}`,
      packet
    });

  } catch (error: any) {
    console.error("PACKET_GENERATION_FAULT:", error.message);
    return NextResponse.json({ error: error.message }, { status: 403 }); // 403 maps well to CJIS permission faults
  }
}
