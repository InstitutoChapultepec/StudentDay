const express = require('express');
const path = require('path');
const studentsData = require('./students.json');

function parseActivityIds(raw) {
  if (raw == null || raw === '') return [];
  if (Array.isArray(raw)) {
    return raw.map((id) => Number(id)).filter((n) => Number.isInteger(n));
  }
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.map((id) => Number(id)).filter((n) => Number.isInteger(n))
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- In-memory store (replaces Redis for local dev) ---
const store = {
  activityCounts: {},   // activity:id:count
  students: {},         // student:CODE -> registration data
  registrations: [],    // list of registered access codes
  logs: []             // site_logs
};

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

const MAX_CAPS = { 1: 32, 2: 36, 3: 16, 4: 32, 5: 36, 6: 30, 7: 50, 8: 40, 9: 107, 10: 50, 11: 107 };
const ADMIN_PASSWORD = "admin678";

// --- API: GET /api/verify ---
app.get('/api/verify', (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'Falta código de acceso' });

  const accessCode = code.trim().toUpperCase();
  const student = studentsData.find(s => s.accessCode === accessCode);

  if (!student) {
    return res.status(404).json({ error: 'Código inválido o no encontrado.' });
  }

  const previous = store.students[accessCode];
  return res.status(200).json({
    success: true,
    student: { name: student.name, grade: student.grade, group: student.group },
    previousActivityIds: previous ? parseActivityIds(previous.activityIds) : []
  });
});

// --- API: GET /api/activities ---
app.get('/api/activities', (req, res) => {
  const activities = ACTIVITIES_BASE.map(a => ({
    ...a,
    filledSpots: store.activityCounts[a.id] || 0
  }));
  return res.status(200).json({ activities });
});

// --- API: POST /api/register ---
app.post('/api/register', (req, res) => {
  try {
    let { accessCode, activityIds } = req.body;

    if (!accessCode || !Array.isArray(activityIds)) {
      return res.status(400).json({ error: 'Faltan campos requeridos o son inválidos.' });
    }

    accessCode = accessCode.trim().toUpperCase();

    const studentInfo = studentsData.find(s => s.accessCode === accessCode);
    if (!studentInfo) {
      return res.status(401).json({ error: 'Código de acceso inválido.' });
    }

    const caps = { ...MAX_CAPS };
    const previousReg = store.students[accessCode];
    const isUpdate = !!previousReg;
    let oldActivities = [];

    if (isUpdate && previousReg.activityIds) {
      try { oldActivities = JSON.parse(previousReg.activityIds); } catch(e) {}
    }

    // Decrement old activities
    if (isUpdate && oldActivities.length > 0) {
      oldActivities.forEach(id => {
        store.activityCounts[id] = Math.max(0, (store.activityCounts[id] || 0) - 1);
      });
    }

    const registered = [];
    const rejected = [];

    for (const actId of activityIds) {
      const max = caps[actId] || 0;
      const current = (store.activityCounts[actId] || 0) + 1;

      if (current > max) {
        rejected.push(actId);
      } else {
        store.activityCounts[actId] = current;
        registered.push(actId);
      }
    }

    store.students[accessCode] = {
      ...studentInfo,
      activityIds: JSON.stringify(registered),
      timestamp: new Date().toISOString(),
      ip: req.ip
    };

    if (!isUpdate) {
      store.registrations.push(accessCode);
    }

    store.logs.unshift(JSON.stringify({
      event: isUpdate ? 'registration_update' : 'registration_new',
      ip: req.ip,
      timestamp: new Date().toISOString(),
      data: { name: studentInfo.name, accessCode }
    }));
    store.logs = store.logs.slice(0, 1000);

    return res.status(200).json({
      success: true,
      message: rejected.length > 0 ? 'Registro parcial (algunos llenos).' : '¡Registro exitoso!',
      registered,
      rejected,
      isUpdate
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// --- API: POST /api/log ---
app.post('/api/log', (req, res) => {
  const { event, page, data } = req.body;
  store.logs.unshift(JSON.stringify({
    event: event || 'unknown',
    ip: req.ip,
    page: page || 'unknown',
    data: data || {},
    timestamp: new Date().toISOString()
  }));
  store.logs = store.logs.slice(0, 1000);
  return res.status(200).json({ success: true });
});

// --- API: GET /api/logs (admin) ---
app.get('/api/logs', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const logs = store.logs.slice(0, 100).map(l => {
    try { return JSON.parse(l); } catch(e) { return null; }
  }).filter(Boolean);

  return res.status(200).json({ logs });
});

// --- API: GET /api/registrations (admin) ---
app.get('/api/registrations', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const registrations = store.registrations.map(code => {
    const r = store.students[code];
    if (!r) return null;
    return { ...r, activityIds: parseActivityIds(r.activityIds) };
  }).filter(Boolean);

  return res.status(200).json({ registrations });
});

// --- API: POST /api/reset-registrations (admin) ---
app.post('/api/reset-registrations', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const activityIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // Clear student registrations
    (store.registrations || []).forEach((code) => {
      delete store.students[code];
    });
    store.registrations = [];

    // Reset activity counters
    activityIds.forEach((id) => {
      store.activityCounts[id] = 0;
    });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- SPA fallback ---
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  StudentDay dev server running at:\n`);
  console.log(`  → Local:   http://localhost:${PORT}\n`);
  console.log(`  Using in-memory store (data resets on restart)\n`);
});
