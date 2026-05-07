import { createRedisClient } from './_redis.js';
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
      return res.status(200).json({ logs: [], redisDisabled: true });
    }

    const rawLogs = await redis.lrange('site_logs', 0, 100); // Get latest 100 logs
    const logs = rawLogs.map(l => {
      try { return JSON.parse(l); } catch(e) { return null; }
    }).filter(Boolean);

    return res.status(200).json({ logs });
  } catch (error) {
    console.error("Logs API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
