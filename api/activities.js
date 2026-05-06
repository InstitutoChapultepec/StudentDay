import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Base definitions
const ACTIVITIES_BASE = [
  { id: 1, name: "Ajedrez", emoji: "♟️", category: "academic", day: "Lunes", time: "Después de examen", maxParticipants: 32, rules: ["Partidas con reloj", "Sistema suizo"] },
  { id: 2, name: "Tochito", emoji: "🏈", category: "sports", day: "Lunes", time: "Después de examen", maxParticipants: 36, rules: ["4 equipos de 6"] },
  { id: 3, name: "Ping Pong", emoji: "🏓", category: "sports", day: "Martes", time: "Después de examen", maxParticipants: 16, rules: ["Partidos al mejor de 3"] },
  { id: 4, name: "Básquet", emoji: "🏀", category: "sports", day: "Martes", time: "Después de examen", maxParticipants: 32, rules: ["4 integrantes, 3 en cancha"] },
  { id: 5, name: "Fútbol", emoji: "⚽", category: "sports", day: "Miércoles", time: "Después de examen", maxParticipants: 36, rules: ["6 integrantes, 5 en cancha"] },
  { id: 6, name: "Voleibol", emoji: "🏐", category: "sports", day: "Miércoles", time: "Después de examen", maxParticipants: 30, rules: [] }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Fetch dynamic config if exists (for admin overrides), fallback to base
    const customConfig = await redis.get("activities_config");
    let activities = customConfig || ACTIVITIES_BASE;

    // 2. Fetch live counts using pipeline
    const p = redis.pipeline();
    activities.forEach(a => p.get(`activity:${a.id}:count`));
    const counts = await p.exec();

    // 3. Merge counts
    activities = activities.map((a, i) => ({
      ...a,
      filledSpots: parseInt(counts[i] || 0)
    }));

    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Redis Error:", error);
    // Graceful fallback
    const fallbackActivities = ACTIVITIES_BASE.map(a => ({ ...a, filledSpots: 0 }));
    return res.status(200).json({ activities: fallbackActivities, fallback: true });
  }
}
