import { createRedisClient } from './_redis.js';

const ADMIN_PASSWORD = "admin678";

// Default settings
const DEFAULT_SETTINGS = {
  eventName: "Semana del Estudiante",
  eventSubtitle: "Una semana llena de competencias, creatividad y espíritu escolar.",
  statActivities: 12,
  statStudents: 107,
  statDays: 5,
  examDays: "Lunes, Martes, Miércoles"
};

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const redis = createRedisClient();
    if (!redis) {
      if (req.method === 'GET') {
        return res.status(200).json({ settings: DEFAULT_SETTINGS, fallback: true, redisDisabled: true });
      }
      return res.status(500).json({ error: 'Redis disabled' });
    }

    if (req.method === 'POST') {
      const authHeader = req.headers['authorization'];
      if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { settings } = req.body;
      if (!settings) {
        return res.status(400).json({ error: 'Invalid settings payload' });
      }

      await redis.set("site_settings", settings);
      return res.status(200).json({ success: true });
    }

    // GET Request
    const customSettings = await redis.get("site_settings");
    return res.status(200).json({ settings: customSettings || DEFAULT_SETTINGS });

  } catch (error) {
    console.error("Redis Error:", error);
    // Graceful fallback
    return res.status(200).json({ settings: DEFAULT_SETTINGS, fallback: true });
  }
}
