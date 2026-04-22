import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial demo data...");

  // 1. Create a Provider
  const passwordHash = await bcrypt.hash("demo123", 10);
  
  const provider = await prisma.docslipProvider.upsert({
    where: { email: "director@demo-counseling.com" },
    update: {},
    create: {
      email: "director@demo-counseling.com",
      passwordHash,
      facilityName: "Second Chance Counseling Center",
      stateLicense: "ST-88229F"
    }
  });

  console.log("Provider created:", provider.email);

  // 2. Create Participants
  const participant1 = await prisma.docslipParticipant.create({
    data: {
      providerId: provider.id,
      name: "M. Reynolds",
      courtCaseNumber: "2026-CR-0012A",
      programType: "12-Hour DUI Sub-A",
      programTargetHrs: 12.0
    }
  });

  const participant2 = await prisma.docslipParticipant.create({
    data: {
      providerId: provider.id,
      name: "S. Jenkins",
      courtCaseNumber: "2026-DV-8921",
      programType: "24-Hour Domestic Non-Violence",
      programTargetHrs: 24.0
    }
  });

  console.log("Fake Participants created.");

  // 3. Log a few sessions for Marcus so he has 12 hours total
  const baseDate = Date.now();
  for (let i = 0; i < 6; i++) {
    await prisma.engineAttendanceLog.create({
      data: {
        participantId: participant1.id,
        status: "VERIFIED_PRESENT",
        hoursCredited: 2.0,
        timestamp: new Date(baseDate - (7 - i) * 86400000), // Previous days
      }
    });
  }

  // Log some sessions for Sarah
  await prisma.engineAttendanceLog.create({
    data: {
      participantId: participant2.id,
      status: "VERIFIED_PRESENT",
      hoursCredited: 2.0,
    }
  });

  console.log("Attendance backlogged.");

  console.log("✅ Seed complete! You can log in with director@demo-counseling.com / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
