import { db } from '../db';
import { leaderboard } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function updateLeaderboard(userId: string, impactLevel: number, points: number, txHash: string) {
  // Upsert leaderboard entry
  const existing = await db.query.leaderboard.findFirst({ where: eq(leaderboard.user_id, userId) });
  if (existing) {
    await db.update(leaderboard)
      .set({
        impact_level: impactLevel,
        points,
        last_tx_hash: txHash,
        updated_at: new Date(),
      })
      .where(eq(leaderboard.user_id, userId));
  } else {
    await db.insert(leaderboard).values({
      user_id: userId,
      impact_level: impactLevel,
      points,
      last_tx_hash: txHash,
      updated_at: new Date(),
    });
  }
} 