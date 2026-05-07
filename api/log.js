import { createRedisClient } from './_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const redis = createRedisClient();
    if (!redis) {
      // Keep logging non-blocking even without Redis.
      return res.status(200).json({ success: true, skipped: true });
    }

    const { event, page, data } = req.body;
    const ip = req.headers['x-forwarded-for'] || 'unknown';
    
    const logEntry = {
      event: event || 'unknown',
      ip,
      page: page || 'unknown',
      data: data || {},
      timestamp: new Date().toISOString()
    };

    await redis.lpush('site_logs', JSON.stringify(logEntry));
    await redis.ltrim('site_logs', 0, 999); // Keep last 1000 logs

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Log API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
