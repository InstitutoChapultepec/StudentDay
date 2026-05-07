import { createRedisClient } from './_redis.js';
import { parseActivityIds } from './_activityIds.js';
const ADMIN_PASSWORD = "admin678";

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const redis = createRedisClient();
    if (!redis) {
      return res.status(200).json({ registrations: [], redisDisabled: true });
    }

    const codes = await redis.lrange('registrations', 0, -1);
    if (!codes || codes.length === 0) {
      return res.status(200).json({ registrations: [] });
    }

    const uniqueCodes = [...new Set(codes)];

    const p = redis.pipeline();
    uniqueCodes.forEach(code => p.hgetall(`student:${code}`));
    const results = await p.exec();

    // Map and parse activityIds
    const registrations = results.filter(Boolean).map(r => ({
      ...r,
      activityIds: parseActivityIds(r.activityIds)
    }));

    return res.status(200).json({ registrations });
  } catch (error) {
    console.error("Registrations API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
