import { createRedisClient } from './_redis.js';

const ADMIN_PASSWORD = "admin678";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const redis = createRedisClient();
    if (!redis) {
      return res.status(503).json({ error: 'Configuración de Redis faltante en el servidor.' });
    }

    const activityIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const codes = await redis.lrange('registrations', 0, -1);

    const p = redis.pipeline();

    // Delete each student hash by access code.
    (codes || []).forEach(code => {
      p.del(`student:${code}`);
    });

    // Reset master list.
    p.del('registrations');

    // Reset all activity counters.
    activityIds.forEach(id => {
      p.set(`activity:${id}:count`, 0);
    });

    await p.exec();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Reset registrations error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

