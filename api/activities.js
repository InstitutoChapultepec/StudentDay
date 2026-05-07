import { createRedisClient } from './_redis.js';
import { parseActivityIds } from './_activityIds.js';

// Base definitions
const ACTIVITIES_BASE = [
  { id: 1, name: "Ajedrez", emoji: "♟️", category: "academic", day: "Lunes", desc: "Torneo de ajedrez entre todas las secciones. Demuestra tu estrategia.", time: "Después de examen", maxParticipants: 32, rules: ["Partidas con reloj (10 minutos por jugador).", "Sistema suizo a 5 rondas.", "El organizador Murguía será el juez principal."] },
  { id: 2, name: "Tochito", emoji: "🏈", category: "sports", day: "Lunes", desc: "Partidos de tochito bandera por equipos organizados por Many.", time: "Después de examen", maxParticipants: 36, rules: ["4 equipos de 6 integrantes (5 en cancha).", "Se nombrarán los capitanes (Many) y ellos formarán su equipo, máximo 2 alumnos de un mismo grado.", "Dos grupos de 3 (round robin). Los ganadores de c/grupo juegan la final.", "Los grupos se formarán por sorteo."] },
  { id: 3, name: "Ping Pong", emoji: "🏓", category: "sports", day: "Martes", desc: "Gran final del torneo de ping pong. ¡Solo los mejores!", time: "Después de examen", maxParticipants: 16, rules: ["Partidos al mejor de 3 sets (hasta 11 puntos).", "Torneo de eliminación directa.", "Trae tu propia raqueta (opcional).", "Los grupos se formarán por sorteo."] },
  { id: 4, name: "Básquet", emoji: "🏀", category: "sports", day: "Martes", desc: "Final del torneo de básquetbol 3v3 con Mauricio.", time: "Después de examen", maxParticipants: 32, rules: ["Participarán los primeros 32 jugadores en registrarse.", "4 integrantes, 3 en cancha.", "Se nombrarán los capitanes y ellos formarán su equipo.", "2 grupos de 4 (round robin), los ganadores de cada grupo jugarán la final.", "Los grupos se formarán por sorteo."] },
  { id: 5, name: "Fútbol", emoji: "⚽", category: "sports", day: "Miércoles", desc: "La gran final del torneo de fútbol con Ramón y Camacho.", time: "Después de examen", maxParticipants: 36, rules: ["Participan los primeros 6 equipos en registrarse.", "6 integrantes, 5 en cancha, máximo 2 alumnos de un mismo grado por equipo.", "2 grupos de 3 equipos (round robin), el 1ro y 2do lugar de cada grupo jugarán la siguiente ronda.", "Los grupos se formarán por sorteo."] },
  { id: 6, name: "Voleibol", emoji: "🏐", category: "sports", day: "Miércoles", desc: "Final del torneo de voleibol organizado por Carlos.", time: "Después de examen", maxParticipants: 30, rules: ["Participarán los primeros 6 equipos en registrarse.", "5 integrantes, 4 en cancha, máximo 2 alumnos de un mismo grado.", "2 grupos de 3 (round robin), los dos primeros lugares de cada grupo jugarán la siguiente ronda.", "Los grupos se formarán por sorteo."] },
  { id: 7, name: "Globos", emoji: "🎈", category: "fun", day: "Jueves", desc: "Competencia de globos entre secciones con Camacho.", time: "Después de examen", maxParticipants: 50, rules: ["Participación por equipos.", "Se revelarán los retos en el momento.", "¡Prepárate para mojarte!"] },
  { id: 8, name: "Videojuegos", emoji: "🎮", category: "fun", day: "Jueves", desc: "Torneo de videojuegos con Hugo y Temo. ¡Trae tu mejor estrategia!", time: "Después de examen", maxParticipants: 40, rules: ["Torneo de Minecraft BedWars.", "Máximo 10 equipos de 5 integrantes", "Lleva tu propio control/mouse/teclado si lo prefieres.", "Eliminación directa.", "Los equipos se formarán por sorteo."] },
  { id: 9, name: "Búsqueda del tesoro", emoji: "🗺️", category: "fun", day: "Jueves", desc: "Búsqueda de pistas y tesoros por todo el campus con Jorge y Paco.", time: "Después de examen", maxParticipants: 107, rules: ["Individual, no por equipos.", "Se prohíbe correr en los pasillos.", "El chapulin jamas estara dentro de un aula u oficina", "El primer alumno en encontrar al chapulin dorado gana"] },
  { id: 10, name: "Pista comando", emoji: "🏃", category: "sports", day: "Jueves", desc: "Circuito de obstáculos y retos físicos", time: "Después de examen", maxParticipants: 50, rules: ["Máximo 10 equipos de 5 integrantes.", "Detalles del recorrido se darán por separado.", "Orden de participación: del último al primero en inscribirse.", "Ropa deportiva obligatoria."] },
  { id: 11, name: "Beyond / Fiesta", emoji: "🎉", category: "fun", day: "Viernes", desc: "¡El gran cierre de la Semana del Estudiante! Música, comida y diversión.", time: "Todo el día", maxParticipants: 107, rules: ["Entrada libre para todos los estudiantes.", "Habrá comida, música y actividades sorpresa.", "¡Disfruta el último día!"] }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const redis = createRedisClient();
    if (!redis) {
      const fallbackActivities = ACTIVITIES_BASE.map(a => ({ ...a, filledSpots: 0 }));
      return res.status(200).json({ activities: fallbackActivities, fallback: true, redisDisabled: true });
    }

    // 1. Fetch dynamic config if exists (for admin overrides), fallback to base
    const customConfig = await redis.get("activities_config");
    let activities = customConfig || ACTIVITIES_BASE;

    // 2. Compute filled spots from the authoritative registrations list.
    // This avoids any drift between "activity:*:count" counters and actual student records.
    const codes = await redis.lrange('registrations', 0, -1);
    const uniqueCodes = [...new Set(codes || [])];

    const p = redis.pipeline();
    uniqueCodes.forEach(code => p.hgetall(`student:${code}`));
    const results = await p.exec();

    const counts = {};
    results
      .filter(Boolean)
      .forEach((r) => {
        const ids = parseActivityIds(r.activityIds);
        ids.forEach((id) => {
          counts[id] = (counts[id] || 0) + 1;
        });
      });

    // 3. Merge counts into activity objects
    activities = activities.map((a) => ({
      ...a,
      filledSpots: counts[a.id] || 0
    }));

    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Redis Error:", error);
    // Graceful fallback
    const fallbackActivities = ACTIVITIES_BASE.map(a => ({ ...a, filledSpots: 0 }));
    return res.status(200).json({ activities: fallbackActivities, fallback: true });
  }
}
