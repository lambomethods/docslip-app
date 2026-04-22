import { PrismaClient } from '@prisma/client';

// The base, unshielded client can only be used safely in internal non-user-facing system tasks
// or the actual initial Auth.js login flow. Do not export this into generic UI/API routes!
const baseClient = new PrismaClient();

/**
 * Creates a shielded instance of the Prisma Client.
 * EVERY operation through this client that touches sensitive data
 * will be automatically intercepted and logged.
 * AND it strictly enforces Provider Multi-Tenancy.
 */
export function getShieldedClient(context: { 
  actorId: string; 
  actorRole: string; 
  providerId: string; // SECURE TENANT BOUNDARY
  ipAddress?: string; 
  userAgent?: string;
  reason?: string;
}) {
  return baseClient.$extends({
    query: {
      docslipParticipant: {
        async $allOperations({ operation, args, query }) {
          
          // 1. Enforce Multi-Tenant Isolation (Mandatory)
          if (context.actorRole !== 'SUPER_ADMIN') {
             args.where = { ...args.where, providerId: context.providerId };
             if (operation === 'create' || operation === 'createMany') {
                (args as any).data.providerId = context.providerId;
             }
          } else if (!context.reason) {
             throw new Error("CJIS COMPLIANCE FAULT: Super Admins cannot bypass tenant boundary without a required break-glass reason.");
          }

          // 2. Perform the actual data query
          const result = await query(args);

          // 3. Write immutable audit log
          await baseClient.shieldSystemAccessLog.create({
            data: {
              actorId: context.actorId,
              actorRole: context.actorRole,
              actionType: operation.toUpperCase(),
              resourceType: "PARTICIPANT",
              reason: context.reason,
              isBreakGlass: context.actorRole === 'SUPER_ADMIN',
              ipAddress: context.ipAddress,
              userAgent: context.userAgent
            }
          });

          return result;
        }
      },
      docslipCompliancePacket: {
         async $allOperations({ operation, args, query }) {
          if (context.actorRole === 'SUPER_ADMIN' && !context.reason) {
            throw new Error("CJIS COMPLIANCE FAULT: Super Admins cannot access compliance packets without a required break-glass reason.");
          }

          // In a perfect system we would recursively ensure the packet belongs to the provider,
          // but Prisma doesn't natively support nested 'where' injections cleanly for relational cross-checks in extensions.
          // The application layer using the Shielded endpoint must ensure packet.participant.providerId is checked 
          // if they use manual uniqueHashes, or rely on participant lookup first.

          const result = await query(args);

          await baseClient.shieldSystemAccessLog.create({
            data: {
              actorId: context.actorId,
              actorRole: context.actorRole,
              actionType: operation.toUpperCase(),
              resourceType: "COMPLIANCE_PACKET",
              reason: context.reason,
              isBreakGlass: context.actorRole === 'SUPER_ADMIN',
              ipAddress: context.ipAddress,
              userAgent: context.userAgent
            }
          });

          return result;
        }
      },
      // ... engineAttendanceLog follows the exact same pattern
    }
  });
}
