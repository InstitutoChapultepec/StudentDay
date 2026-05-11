/* ===== GLOBAL SETTINGS ===== */
let SITE_SETTINGS = {
  eventName: "Semana del Estudiante",
  eventSubtitle: "Una semana llena de competencias, creatividad y espíritu escolar.",
  statActivities: 12,
  statStudents: 107,
  statDays: 5,
  examDays: "Lunes, Martes, Miércoles"
};

async function fetchSettings() {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data.settings) {
      SITE_SETTINGS = data.settings;
      applySettingsToDOM();
    }
  } catch(e) { console.error("Error fetching settings", e); }
}

function applySettingsToDOM() {
  const el = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerHTML = val; }
  const attr = (id, val) => { if(document.getElementById(id)) document.getElementById(id).dataset.count = val; }
  
  el("heroTitle", `${SITE_SETTINGS.eventName}<br /><span class="highlight">Estudiante</span>`);
  el("heroSubtitle", `${SITE_SETTINGS.eventSubtitle}<br />¿Estás listo para crear recuerdos?`);
  
  el("statActivitiesNumber", SITE_SETTINGS.statActivities);
  attr("statActivitiesNumber", SITE_SETTINGS.statActivities);
  el("statStudentsNumber", SITE_SETTINGS.statStudents);
  attr("statStudentsNumber", SITE_SETTINGS.statStudents);
  el("statDaysNumber", SITE_SETTINGS.statDays);
  attr("statDaysNumber", SITE_SETTINGS.statDays);
  
  const v = (id, val) => { if(document.getElementById(id)) document.getElementById(id).value = val; }
  v("settingEventName", SITE_SETTINGS.eventName);
  v("settingEventSubtitle", SITE_SETTINGS.eventSubtitle);
  v("settingStatActivities", SITE_SETTINGS.statActivities);
  v("settingStatStudents", SITE_SETTINGS.statStudents);
  v("settingStatDays", SITE_SETTINGS.statDays);
  v("settingExamDays", SITE_SETTINGS.examDays);
}

fetchSettings();

/* ===== DATA ===== */
let ACTIVITIES = [
  {
    id: 1, name: "Ajedrez", emoji: "♟️", category: "academic", day: "Lunes", desc: "Torneo de ajedrez entre todas las secciones. Demuestra tu estrategia.", time: "Después de examen", maxParticipants: 32, filledSpots: 0, rules: [
      "Partidas con reloj (10 minutos por jugador).",
      "Sistema suizo a 5 rondas.",
      "El organizador Murguía será el juez principal."
    ]
  },
  {
    id: 2, name: "Tochito", emoji: "🏈", category: "sports", day: "Lunes", desc: "Partidos de tochito bandera por equipos organizados por Many.", time: "Después de examen", maxParticipants: 36, filledSpots: 0, rules: [
      "4 equipos de 6 integrantes (5 en cancha).",
      "Se nombrarán los capitanes (Many) y ellos formarán su equipo, máximo 2 alumnos de un mismo grado.",
      "Dos grupos de 3 (round robin). Los ganadores de c/grupo juegan la final.",
      "Los grupos se formarán por sorteo."
    ]
  },
  {
    id: 3, name: "Ping Pong", emoji: "🏓", category: "sports", day: "Martes", desc: "Gran final del torneo de ping pong. ¡Solo los mejores!", time: "Después de examen", maxParticipants: 16, filledSpots: 0, rules: [
      "Partidos al mejor de 3 sets (hasta 11 puntos).",
      "Torneo de eliminación directa.",
      "Trae tu propia raqueta (opcional).", "Los grupos se formarán por sorteo."
    ]
  },
  {
    id: 4, name: "Básquet", emoji: "🏀", category: "sports", day: "Martes", desc: "Final del torneo de básquetbol 3v3 con Mauricio.", time: "Después de examen", maxParticipants: 32, filledSpots: 0, rules: [
      "Participarán los primeros 32 jugadores en registrarse.",
      "4 integrantes, 3 en cancha.",
      "Se nombrarán los capitanes y ellos formarán su equipo.",
      "2 grupos de 4 (round robin), los ganadores de cada grupo jugarán la final.",
      "Los grupos se formarán por sorteo."
    ]
  },
  {
    id: 5, name: "Fútbol", emoji: "⚽", category: "sports", day: "Miércoles", desc: "La gran final del torneo de fútbol con Ramón y Camacho.", time: "Después de examen", maxParticipants: 36, filledSpots: 0, rules: [
      "Participan los primeros 6 equipos en registrarse.",
      "6 integrantes, 5 en cancha, máximo 2 alumnos de un mismo grado por equipo.",
      "2 grupos de 3 equipos (round robin), el 1ro y 2do lugar de cada grupo jugarán la siguiente ronda.",
      "Los grupos se formarán por sorteo."
    ]
  },
  {
    id: 6, name: "Voleibol", emoji: "🏐", category: "sports", day: "Miércoles", desc: "Final del torneo de voleibol organizado por Carlos.", time: "Después de examen", maxParticipants: 30, filledSpots: 0, rules: [
      "Participarán los primeros 6 equipos en registrarse.",
      "5 integrantes, 4 en cancha, máximo 2 alumnos de un mismo grado.",
      "2 grupos de 3 (round robin), los dos primeros lugares de cada grupo jugarán la siguiente ronda.",
      "Los grupos se formarán por sorteo."
    ]
  },
  {
    id: 7, name: "Globos", emoji: "🎈", category: "fun", day: "Jueves", desc: "Competencia de globos entre secciones con Camacho.", time: "Después de examen", maxParticipants: 50, filledSpots: 0, rules: [
      "Participación por equipos.",
      "Se revelarán los retos en el momento.",
      "¡Prepárate para mojarte!"
    ]
  },
  {
    id: 8, name: "Videojuegos", emoji: "🎮", category: "fun", day: "Jueves", desc: "Torneo de videojuegos con Hugo y Temo. ¡Trae tu mejor estrategia!", time: "Después de examen", maxParticipants: 40, filledSpots: 0, rules: [
      "Torneo de Minecraft BedWars.",
	  "Máximo 10 equipos de 5 integrantes", 
      "Lleva tu propio control/mouse/teclado si lo prefieres.",
      "Eliminación directa.",
	  "Los equipos se formarán por sorteo."
    ]
  },
  {
    id: 9, name: "Búsqueda del tesoro", emoji: "🗺️", category: "fun", day: "Jueves", desc: "Búsqueda de pistas y tesoros por todo el campus con Jorge y Paco.", time: "Después de examen", maxParticipants: 107, filledSpots: 0, rules: [
      "Individual, no por equipos.",
      "Se prohíbe correr en los pasillos.",
      "El chapulin jamas estara dentro de un aula u oficina",
      "El primer alumno en encontrar al chapulin dorado gana"
    ]
  },
  {
    id: 10, name: "Pista comando", emoji: "🏃", category: "sports", day: "Jueves", desc: "Circuito de obstáculos y retos físicos", time: "Después de examen", maxParticipants: 50, filledSpots: 0, rules: [
      "Máximo 10 equipos de 5 integrantes.",
      "Detalles del recorrido se darán por separado.",
      "Orden de participación: del último al primero en inscribirse.",
      "Ropa deportiva obligatoria."
    ]
  },
  {
    id: 11, name: "Beyond / Fiesta", emoji: "🎉", category: "fun", day: "Viernes", desc: "¡El gran cierre de la Semana del Estudiante! Música, comida y diversión.", time: "Todo el día", maxParticipants: 107, filledSpots: 0, rules: [
      "Entrada libre para todos los estudiantes.",
      "Habrá comida, música y actividades sorpresa.",
      "¡Disfruta el último día!"
    ]
  },
];


const WINNERS = [];

const PLACE_EMOJI = { 1: "🥇", 2: "🥈", 3: "🥉" };
const WINNER_CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "sports", label: "🏅 Deportes" },
  { key: "arts", label: "🎨 Artes" },
  { key: "academic", label: "📚 Académico" },
  { key: "fun", label: "🎉 Diversión" },
];

/* SCHEDULE DATA is now dynamically generated from ACTIVITIES */

/* ===== DOM REFS ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ===== NAVIGATION ===== */
function navigateTo(pageId) {
  $$(".page").forEach((p) => p.classList.remove("page--active"));
  const target = $(`#page-${pageId}`);
  if (target) {
    target.classList.remove("page--active");
    // Force re-trigger animation
    void target.offsetWidth;
    target.classList.add("page--active");
  }
  $$(".nav-link").forEach((l) => {
    l.classList.toggle("active", l.dataset.page === pageId);
  });
  // Close mobile menu
  $("#navLinks").classList.remove("open");
  $("#hamburger").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Confetti on winners page
  if (pageId === "winners" && typeof launchConfetti === "function") {
    setTimeout(launchConfetti, 300);
  }
}

// Nav link clicks
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (link) {
    e.preventDefault();
    navigateTo(link.dataset.page);
  }
});

// Hamburger toggle
$("#hamburger").addEventListener("click", () => {
  $("#hamburger").classList.toggle("open");
  $("#navLinks").classList.toggle("open");
});

/* ===== HERO PARTICLES ===== */
(function initParticles() {
  const container = $("#particles");
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.width = p.style.height = Math.random() * 10 + 4 + "px";
    p.style.animationDelay = Math.random() * 6 + "s";
    p.style.animationDuration = 4 + Math.random() * 5 + "s";
    container.appendChild(p);
  }
})();

/* ===== STAT COUNTER ===== */
function animateCounters() {
  $$(".stat-card__number").forEach((el) => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current + (target >= 100 ? "+" : "");
    }, 30);
  });
}
animateCounters();

/* ===== COUNTDOWN ===== */
const EVENT_DATE = new Date("2026-05-18T08:00:00");

function updateCountdown() {
  const now = new Date();
  let diff = EVENT_DATE - now;
  if (diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  $("#cd-days").textContent = String(d).padStart(2, "0");
  $("#cd-hours").textContent = String(h).padStart(2, "0");
  $("#cd-mins").textContent = String(m).padStart(2, "0");
  $("#cd-secs").textContent = String(s).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== ACTIVITIES ===== */
const TAG_CLASS = { sports: "tag-sports", arts: "tag-arts", academic: "tag-academic", fun: "tag-fun" };
const TAG_LABEL = { sports: "Deportes", arts: "Artes", academic: "Académico", fun: "Diversión" };

function renderActivities(filter = "all") {
  const grid = $("#activitiesGrid");
  const filtered = filter === "all" ? ACTIVITIES : ACTIVITIES.filter((a) => a.category === filter);
  grid.innerHTML = filtered
    .map((a) => {
      const isFull = a.filledSpots >= a.maxParticipants;
      const spotsLeft = a.maxParticipants - a.filledSpots;
      const pct = Math.round((a.filledSpots / a.maxParticipants) * 100);
      return `
    <div class="activity-card ${isFull ? "activity-card--full" : ""}" data-category="${a.category}">
      <div class="activity-card__banner">${a.emoji}</div>
      <div class="activity-card__body">
        <div class="activity-card__top-row">
          <span class="activity-card__tag ${TAG_CLASS[a.category]}">${TAG_LABEL[a.category] || a.category}</span>
          <span class="activity-card__status ${isFull ? "status--full" : "status--open"}">
            <span class="status-dot"></span>
            ${isFull ? "Lleno" : `${spotsLeft} lugar${spotsLeft === 1 ? "" : "es"} disponible${spotsLeft === 1 ? "" : "s"}`}
          </span>
        </div>
        <h3 class="activity-card__title">${a.name}</h3>
        <p class="activity-card__desc">${a.desc}</p>
        <div class="activity-card__capacity">
          <div class="capacity-bar">
            <div class="capacity-bar__fill ${isFull ? "capacity-bar__fill--full" : ""}" style="width:${pct}%"></div>
          </div>
          <span class="capacity-label">${a.filledSpots} / ${a.maxParticipants} participantes</span>
        </div>
        <div class="activity-card__meta">
          <span>⏰ ${a.time}</span>
          <button class="rules-btn" data-activity-id="${a.id}">📋 Ver Reglas</button>
        </div>
      </div>
    </div>`;
    })
    .join("");
}
renderActivities();

// Fetch live activities data
async function fetchActivities() {
  try {
    const res = await fetch('/api/activities');
    const data = await res.json();
    if (data.activities) {
      const incoming = JSON.stringify(data.activities);
      if (incoming === JSON.stringify(ACTIVITIES)) return;
      ACTIVITIES = data.activities;
      renderActivities($$(".filter-btn.active")[0]?.dataset.filter || "all");
      if ($("#page-register").classList.contains("page--active")) {
        renderRegisterChecklist();
      }
    }
  } catch (error) {
    console.error("Failed to fetch live activities:", error);
  }
}

// Initial fetch & polling
fetchActivities();
setInterval(fetchActivities, 30000);

// Log page views
fetch('/api/log', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: 'page_view', page: 'home' })
}).catch(() => {});

// Log navigation
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-page]");
  if (link) {
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view', page: link.dataset.page })
    }).catch(() => {});
  }
});

// Filter buttons (only if filter bar exists)
const filterBar = $("#filterBar");
if (filterBar) {
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderActivities(btn.dataset.filter);
  });
}

/* ===== RULES MODAL ===== */
function openRulesModal(activityId) {
  const activity = ACTIVITIES.find((a) => a.id === activityId);
  if (!activity) return;

  const isFull = activity.filledSpots >= activity.maxParticipants;
  const modal = $("#rulesModal");
  $("#rulesModal-emoji").textContent = activity.emoji;
  $("#rulesModal-title").textContent = activity.name;
  $("#rulesModal-status").className = `activity-card__status ${isFull ? "status--full" : "status--open"}`;
  $("#rulesModal-status").innerHTML = `<span class="status-dot"></span>${isFull ? "Lleno" : (activity.maxParticipants - activity.filledSpots) + " lugares disponibles"}`;
  $("#rulesModal-list").innerHTML = activity.rules
    .map((r, i) => `<li><span class="rule-num">${i + 1}</span><span>${r}</span></li>`)
    .join("");
  $("#rulesModal-capacity").textContent = `${activity.filledSpots} / ${activity.maxParticipants} participantes`;
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

function closeRulesModal() {
  $("#rulesModal").classList.remove("modal--open");
  document.body.style.overflow = "";
}

// Delegated click for rules buttons
document.addEventListener("click", (e) => {
  const rulesBtn = e.target.closest(".rules-btn");
  if (rulesBtn) {
    e.stopPropagation();
    openRulesModal(parseInt(rulesBtn.dataset.activityId));
    return;
  }
  // Close modal on backdrop or close button click
  if (e.target.closest(".modal__close") || e.target.classList.contains("modal-overlay")) {
    closeRulesModal();
  }
});

// Close modal on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRulesModal();
});

/* ===== REGISTER FORM ===== */
let currentStudent = null;
let currentAccessCode = "";
let registrationSelection = new Set();

function renderRegisterChecklist() {
  const container = $("#regChecklist");
  if (!container) return;

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  let html = "";

  days.forEach(day => {
    const dayActivities = ACTIVITIES.filter(a => a.day === day);
    if (dayActivities.length === 0) return;

    const isSingleOptionalDay = ["Lunes", "Martes", "Miércoles"].includes(day);
    // Radios can't be toggled off; we use checkboxes + enforce max 1 per day.
    const inputType = isSingleOptionalDay ? "checkbox" : "checkbox";
    const inputName = `activity_${day}`;

    let itemsHtml = dayActivities.map(a => {
      const isFull = a.filledSpots >= a.maxParticipants;
      const spotsLeft = a.maxParticipants - a.filledSpots;
      const isSelected = registrationSelection.has(a.id);
      
      return `
        <label class="checklist-item ${isFull ? "checklist-item--disabled" : ""}">
          <input type="${inputType}" name="${inputName}" value="${a.id}" ${isFull && !isSelected ? "disabled" : ""} ${isSelected ? "checked" : ""}>
          <div class="checklist-item__content">
            <span class="checklist-item__emoji">${a.emoji}</span>
            <span class="checklist-item__name">${a.name}</span>
            <span class="checklist-item__spots">${isFull ? "Lleno" : spotsLeft + " lugares"}</span>
          </div>
        </label>
      `;
    }).join("");

    html += `
      <div class="checklist-group">
        <div class="checklist-group__header">${day} ${isSingleOptionalDay ? '<span class="optional">(Elige 1 opcional)</span>' : '<span class="optional">(Opcional)</span>'}</div>
        <div class="checklist-group__items">
          ${itemsHtml}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
renderRegisterChecklist();

function syncRegistrationSelectionFromDOM() {
  registrationSelection = new Set(
    Array.from(document.querySelectorAll("#regChecklist input:checked"))
      .map((input) => parseInt(input.value))
      .filter((id) => Number.isInteger(id))
  );
}

const regChecklist = $("#regChecklist");
if (regChecklist) {
  const optionalDays = ["Lunes", "Martes", "Miércoles"];
  regChecklist.addEventListener("change", (e) => {
    const target = e.target;
    // Enforce "max 1 per optional day" by unchecking the rest in the same day group.
    if (
      target &&
      target.matches &&
      target.matches('input[type="checkbox"][name^="activity_"]')
    ) {
      const dayKey = target.name.replace("activity_", "");
      if (optionalDays.includes(dayKey) && target.checked) {
        const groupInputs = regChecklist.querySelectorAll(
          `input[type="checkbox"][name="${target.name}"]`
        );
        groupInputs.forEach((i) => {
          if (i !== target) i.checked = false;
        });
      }
    }

    syncRegistrationSelectionFromDOM();
  });
}

// Removed the spots indicator logic since the checklist handles it natively

// STEP 1: Verify Access Code
$("#verifyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = $("#accessCode").value.trim().toUpperCase();
  const errorEl = $("#verifyError");
  const btn = $("#verifyBtn");
  
  errorEl.textContent = "";
  btn.classList.add("loading");
  btn.textContent = "Verificando…";

  try {
    const res = await fetch(`/api/verify?code=${encodeURIComponent(code)}`);
    const data = await res.json();

    if (data.success) {
      currentStudent = data.student;
      currentAccessCode = code;
      registrationSelection = new Set(Array.isArray(data.previousActivityIds) ? data.previousActivityIds : []);

      
      
      // Update UI
      $("#displayStudentName").textContent = currentStudent.name;
      $("#displayStudentDetails").textContent = `${currentStudent.grade} — ${currentStudent.group || 'N/A'}`;
      
      $("#registerStep1").style.display = "none";
      $("#registerStep2").style.display = "block";

      // Render immediately so previous selections are visible before any async refresh.
      renderRegisterChecklist();

      // Refresh checklist with latest counts
      fetchActivities();
    } else {
      errorEl.textContent = data.error || "Código inválido.";
    }
  } catch (err) {
    errorEl.textContent = "Error de conexión. Intenta de nuevo.";
  } finally {
    btn.classList.remove("loading");
    btn.textContent = "Verificar Código";
  }
});

// Back to Step 1
$("#backToStep1Btn").addEventListener("click", () => {
  currentStudent = null;
  currentAccessCode = "";
  registrationSelection = new Set();
  $("#accessCode").value = "";
  $("#registerStep2").style.display = "none";
  $("#registerStep1").style.display = "block";
});

// STEP 2: Submit Registration
$("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (!currentAccessCode) return;

  const selectedInputs = document.querySelectorAll('#regChecklist input:checked');
  if (selectedInputs.length === 0) {
    alert("Por favor selecciona al menos una actividad.");
    return;
  }

  const activityIds = Array.from(selectedInputs).map(input => parseInt(input.value));
  const btn = $("#submitBtn");
  btn.textContent = "Registrando...";
  btn.disabled = true;

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessCode: currentAccessCode,
        activityIds: activityIds
      })
    });
    const data = await res.json();

    // (instrumentation removed)

    if (res.ok && data.success) {
      // Build confirmation
      const isUpdate = data.isUpdate ? " (Actualizado)" : "";
      $("#confirmMsg").textContent = `¡${currentStudent.name}, tu registro fue exitoso!${isUpdate}`;
      
      if (data.rejected && data.rejected.length > 0) {
        $("#confirmMsg").textContent += " Nota: Algunas actividades estaban llenas y fueron ignoradas.";
      }
      
      const registeredActs = data.registered.map(id => ACTIVITIES.find(a => a.id === id)).filter(Boolean);
      const detailsHtml = registeredActs.map(a => `
        <div class="confirm-detail">
          <span class="confirm-detail__label">${a.day}</span>
          <span class="confirm-detail__value">${a.emoji} ${a.name}</span>
        </div>
      `).join("");

      $("#confirmDetails").innerHTML = detailsHtml + `
        <div class="confirm-detail"><span class="confirm-detail__label">Grado</span><span class="confirm-detail__value">${currentStudent.grade}</span></div>
        <div class="confirm-detail"><span class="confirm-detail__label">Estado</span><span class="confirm-detail__value confirm-detail__value--success">✅ Confirmado</span></div>
      `;

      // Show confirmation, hide form
      $("#registerStep2").style.display = "none";
      $("#confirmCard").classList.add("confirm-card--visible");

      // Show toast
      const toast = $("#toast");
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3500);
      }

      // Refresh activity checklist & activities page to reflect new spot count
      fetchActivities();
    } else {
      alert(data.error || "Ocurrió un error al registrar.");
    }
  } catch (err) {
    alert("Error de conexión. Intenta de nuevo.");
  } finally {
    btn.textContent = "Enviar Registro";
    btn.disabled = false;
  }
});

// "Register Another" button
$("#confirmNewBtn").addEventListener("click", () => {
  $("#confirmCard").classList.remove("confirm-card--visible");
  currentStudent = null;
  currentAccessCode = "";
  $("#accessCode").value = "";
  $("#registerStep1").style.display = "block";
  $("#registerForm").reset();
});

/* ===== BRACKETS ===== */
// Editable bracket data — each sport has an 8-team single elimination bracket
const BRACKETS_DATA = {
  basketball: {
    sport: "Básquet 3v3",
    emoji: "🏀",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  soccer: {
    sport: "Fútbol",
    emoji: "⚽",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  volleyball: {
    sport: "Voleibol",
    emoji: "🏐",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  chess: {
    sport: "Ajedrez",
    emoji: "♟️",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  videogames: {
    sport: "Videojuegos",
    emoji: "🎮",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  pingpong: {
    sport: "Ping Pong",
    emoji: "🏓",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
  tochito: {
    sport: "Tochito",
    emoji: "🏈",
    teams: [
      { seed: 1, name: "TBD" },
      { seed: 2, name: "TBD" },
      { seed: 3, name: "TBD" },
      { seed: 4, name: "TBD" },
      { seed: 5, name: "TBD" },
      { seed: 6, name: "TBD" },
      { seed: 7, name: "TBD" },
      { seed: 8, name: "TBD" },
    ],
    rounds: [
      {
        title: "Cuartos de Final", matches: [
          { team1: 0, team2: 7, score1: 0, score2: 0 },
          { team1: 3, team2: 4, score1: 0, score2: 0 },
          { team1: 1, team2: 6, score1: 0, score2: 0 },
          { team1: 2, team2: 5, score1: 0, score2: 0 },
        ]
      },
      {
        title: "Semifinales", matches: [
          { team1: 0, team2: 3, score1: 0, score2: 0 },
          { team1: 1, team2: 2, score1: 0, score2: 0 },
        ]
      },
      {
        title: "🏆 Final", matches: [
          { team1: 0, team2: 1, score1: 0, score2: 0 },
        ]
      },
    ],
  },
};

// Keep a working copy for edits
let bracketsLive = JSON.parse(JSON.stringify(BRACKETS_DATA));
let currentSport = "basketball";

function getWinner(match) {
  if (match.pen1 !== undefined) return match.pen1 > match.pen2 ? 1 : 2;
  return match.score1 > match.score2 ? 1 : (match.score2 > match.score1 ? 2 : 0);
}

function resolveBracketTeam(data, roundIndex, matchIndex, side) {
  const roundMatch = data.rounds[roundIndex].matches[matchIndex];
  const teamIdx = side === 1 ? roundMatch.team1 : roundMatch.team2;

  if (roundIndex === 0) {
    return data.teams[teamIdx];
  }

  // For semifinal/final rounds, derive participants from previous-round winners.
  const sourceMatchIndex = side === 1 ? matchIndex * 2 : (matchIndex * 2) + 1;
  const prevRoundMatch = data.rounds[roundIndex - 1].matches[sourceMatchIndex];
  if (!prevRoundMatch) return data.teams[teamIdx];

  const winner = getWinner(prevRoundMatch);
  if (winner === 1) return data.teams[prevRoundMatch.team1];
  if (winner === 2) return data.teams[prevRoundMatch.team2];

  return {
    seed: "?",
    name: `Ganador M${sourceMatchIndex + 1}`,
  };
}

function renderBracket(sport, targetEl, editMode) {
  currentSport = sport;
  const data = bracketsLive[sport];
  const tree = targetEl || $("#bracketTree");
  const banner = $("#championBanner");

  let html = "";
  data.rounds.forEach((round, ri) => {
    const isFinal = ri === data.rounds.length - 1;
    html += `<div class="bracket-round ${isFinal ? "bracket-round--final" : ""}">`;
    html += `<div class="bracket-round__label">${round.title}</div>`;

    round.matches.forEach((m, mi) => {
      const t1 = resolveBracketTeam(data, ri, mi, 1);
      const t2 = resolveBracketTeam(data, ri, mi, 2);
      const w = getWinner(m);
      const penStr1 = m.pen1 !== undefined ? ` (${m.pen1})` : "";
      const penStr2 = m.pen2 !== undefined ? ` (${m.pen2})` : "";

      html += `<div class="bracket-match">`;
      if (editMode) {
        html += `<div class="bracket-team">
          <span class="bracket-team__seed">#${t1.seed}</span>
          <span class="bracket-team__name">${t1.name}</span>
          <input type="number" class="bracket-edit-score" value="${m.score1}" data-round="${ri}" data-match="${mi}" data-side="1" min="0" />
        </div>`;
        html += `<div class="bracket-team">
          <span class="bracket-team__seed">#${t2.seed}</span>
          <span class="bracket-team__name">${t2.name}</span>
          <input type="number" class="bracket-edit-score" value="${m.score2}" data-round="${ri}" data-match="${mi}" data-side="2" min="0" />
        </div>`;
      } else {
        html += `<div class="bracket-team ${w === 1 ? "winner" : (w === 2 ? "loser" : "")}">
          <span class="bracket-team__seed">#${t1.seed}</span>
          <span class="bracket-team__name">${t1.name}</span>
          <span class="bracket-team__score">${m.score1}${penStr1}</span>
        </div>`;
        html += `<div class="bracket-team ${w === 2 ? "winner" : (w === 1 ? "loser" : "")}">
          <span class="bracket-team__seed">#${t2.seed}</span>
          <span class="bracket-team__name">${t2.name}</span>
          <span class="bracket-team__score">${m.score2}${penStr2}</span>
        </div>`;
      }
      html += `</div>`;
    });

    html += `</div>`;
  });

  tree.innerHTML = html;

  if (!targetEl && banner) {
    const finalMatch = data.rounds[data.rounds.length - 1].matches[0];
    const fw = getWinner(finalMatch);
    if (fw) {
      const champion = fw === 1 ? data.teams[finalMatch.team1] : data.teams[finalMatch.team2];
      banner.innerHTML = `
        <div class="champion-inner">
          <span class="champion-inner__trophy">🏆</span>
          <div class="champion-inner__text">
            <span class="champion-inner__label">Campeón de ${data.sport}</span>
            <span class="champion-inner__name">${champion.name}</span>
          </div>
        </div>`;
    } else {
      banner.innerHTML = "";
    }
  }
}

// Tab switching
$$(".bracket-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".bracket-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderBracket(tab.dataset.bracket);
  });
});

renderBracket("basketball");

/* ===== OLD ADMIN PANEL (removed) ===== */

/* ===== SCHEDULE ===== */
function renderSchedule() {
  const container = $("#scheduleDays");
  if (!container) return;
  
  const daysOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const grouped = {};
  
  ACTIVITIES.forEach(act => {
    const day = act.day || "Lunes";
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(act);
  });
  
  const examDaysList = (SITE_SETTINGS.examDays || "").split(",").map(d => d.trim().toLowerCase());

  let html = "";
  daysOrder.forEach(dayName => {
    if (!grouped[dayName] || grouped[dayName].length === 0) return;
    
    const hasExam = examDaysList.includes(dayName.toLowerCase());
    
    html += `<div class="day-card">`;
    html += `<div class="day-card__header"><span class="day-card__day">${dayName}</span></div>`;
    
    if (hasExam) {
      html += `<div class="day-card__exam">📝 Examen — Primeras 2 horas</div>`;
    }
    
    html += `<div class="day-card__activities">`;
    grouped[dayName].forEach((act, ai) => {
      const orgLine = act.organizer ? `<div class="sched-activity__org">Organiza: ${act.organizer}</div>` : "";
      html += `
        <div class="sched-activity" data-idx="${dayName}-${ai}">
          <div class="sched-activity__row">
            <span class="sched-activity__emoji">${act.emoji}</span>
            <div class="sched-activity__info">
              <div class="sched-activity__name">${act.name}</div>
              ${orgLine}
            </div>
            <span class="sched-activity__chevron">▼</span>
          </div>
          <div class="sched-activity__detail">
            <dl class="sched-detail-grid">
              <dt>📍 Lugar</dt><dd>${act.location || "—"}</dd>
              <dt>🕐 Horario</dt><dd>${act.time || "—"}</dd>
            </dl>
            <p class="sched-activity__desc">${act.desc || act.description || ""}</p>
          </div>
        </div>`;
    });
    html += `</div></div>`;
  });
  
  container.innerHTML = html;
}

// Initial render
setTimeout(() => {
  renderSchedule();
}, 500);

// Activity expansion toggle
document.addEventListener("click", (e) => {
  const row = e.target.closest(".sched-activity__row");
  if (!row) return;
  const activity = row.closest(".sched-activity");
  if (activity) activity.classList.toggle("sched-activity--expanded");
});

/* ===== WINNERS ===== */
// Render category filter buttons
function renderWinnerFilters() {
  const container = $("#winnersFilters");
  if (!container) return;
  container.innerHTML = WINNER_CATEGORIES.map(
    (cat) => `<button class="winner-filter-btn ${cat.key === "all" ? "active" : ""}" data-cat="${cat.key}">${cat.label}</button>`
  ).join("");
}
renderWinnerFilters();

function renderWinners(category = "all") {
  const grid = $("#winnersGrid");
  const filtered = category === "all" ? WINNERS : WINNERS.filter((w) => w.category === category);
  grid.innerHTML = filtered.map(
    (w) => `
    <div class="winner-card">
      <img class="winner-card__photo" src="${w.photo}" alt="${w.name}" loading="lazy" />
      <div class="winner-card__body">
        <div class="winner-card__badge-row">
          <div class="winner-card__place place-${w.place}">${PLACE_EMOJI[w.place]}</div>
        </div>
        <div class="winner-card__name">${w.name}</div>
        <div class="winner-card__team">${w.team}</div>
        <div class="winner-card__activity">${w.emoji} ${w.activity}</div>
      </div>
    </div>`
  ).join("");
}
renderWinners();

// Category filter clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".winner-filter-btn");
  if (!btn) return;
  $$(".winner-filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderWinners(btn.dataset.cat);
});

/* ===== CONFETTI ===== */
let confettiRunning = false;
function launchConfetti() {
  if (confettiRunning) return;
  confettiRunning = true;
  const canvas = $("#confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  const colors = ["#10b981", "#fbbf24", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899"];
  const particles = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 3 + 1.5,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 6,
      opacity: 1,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rv;
      if (frame > 100) p.opacity -= 0.008;
      if (p.opacity <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiRunning = false;
    }
  }
  draw();
}



/* ===== NAVBAR SCROLL EFFECT ===== */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = $("#navbar");
  const scrollY = window.scrollY;
  if (scrollY > 10) {
    navbar.style.boxShadow = "0 2px 20px rgba(6,78,59,0.08)";
  } else {
    navbar.style.boxShadow = "none";
  }
  lastScroll = scrollY;
});

/* ===== ADMIN PANEL ===== */
const ADMIN_PASSWORD = "admin678";
let adminAuthenticated = false;

// --- Auth ---
$("#adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const pw = $("#adminPassword").value;
  if (pw === ADMIN_PASSWORD) {
    adminAuthenticated = true;
    $("#adminGate").style.display = "none";
    $("#adminDashboard").style.display = "block";
    renderAdminActivities();
    renderAdminWinners();
    renderAdminRegistrations();
    loadAdminBracketEditor();
  } else {
    $("#adminLoginError").textContent = "❌ Contraseña incorrecta";
    $("#adminPassword").value = "";
  }
});

// --- Admin Tabs ---
$$(".admin-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".admin-tab").forEach(t => t.classList.remove("active"));
    $$(".admin-tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    $(`#adminTab-${tab.dataset.adminTab}`).classList.add("active");
    
    // Refresh content on tab switch
    if (tab.dataset.adminTab === "activities") renderAdminActivities();
    if (tab.dataset.adminTab === "winners") renderAdminWinners();
    if (tab.dataset.adminTab === "registrations") fetchAdminRegistrations();
    if (tab.dataset.adminTab === "brackets") loadAdminBracketEditor();
    if (tab.dataset.adminTab === "logs") fetchAdminLogs();
  });
});

// --- Admin Modals ---
document.addEventListener("click", (e) => {
  const closeBtn = e.target.closest("[data-close-modal]");
  if (closeBtn) {
    $(`#${closeBtn.dataset.closeModal}`).classList.remove("modal--open");
    return;
  }
  // Close on overlay click
  if (e.target.classList.contains("admin-modal-overlay")) {
    e.target.classList.remove("modal--open");
  }
});

// ============ ACTIVITIES MANAGEMENT ============
async function saveActivitiesToBackend() {
  try {
    const res = await fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({ activities: ACTIVITIES })
    });
    if (!res.ok) throw new Error("Failed to save activities");
  } catch (err) {
    console.error(err);
    alert("Error al guardar actividades en la base de datos.");
  }
}

function renderAdminActivities() {
  const tbody = $("#adminActivitiesBody");
  tbody.innerHTML = ACTIVITIES.map(a => `
    <tr>
      <td class="emoji-cell">${a.emoji}</td>
      <td><strong>${a.name}</strong></td>
      <td>${a.day || "—"}</td>
      <td>${TAG_LABEL[a.category] || a.category}</td>
      <td>${a.maxParticipants}</td>
      <td>${a.filledSpots}</td>
      <td class="actions-cell">
        <button class="admin-action-btn" onclick="openEditActivity(${a.id})">✏️ Editar</button>
        <button class="admin-action-btn admin-action-btn--danger" onclick="deleteActivity(${a.id})">🗑️</button>
      </td>
    </tr>
  `).join("");
}

function openEditActivity(id) {
  const a = ACTIVITIES.find(x => x.id === id);
  if (!a) return;
  $("#activityModalTitle").textContent = "Editar Actividad";
  $("#editActivityId").value = a.id;
  $("#editActivityEmoji").value = a.emoji;
  $("#editActivityName").value = a.name;
  $("#editActivityDay").value = a.day || "Lunes";
  $("#editActivityCategory").value = a.category;
  $("#editActivityDesc").value = a.desc || a.description || "";
  $("#editActivityLocation").value = a.location || "";
  $("#editActivityOrganizer").value = a.organizer || "";
  $("#editActivityMax").value = a.maxParticipants;
  $("#editActivityTime").value = a.time;
  $("#editActivityRules").value = (a.rules || []).join("\n");
  $("#activityEditModal").classList.add("modal--open");
}

function openAddActivity() {
  $("#activityModalTitle").textContent = "Nueva Actividad";
  $("#editActivityId").value = "";
  $("#editActivityEmoji").value = "";
  $("#editActivityName").value = "";
  $("#editActivityDay").value = "Lunes";
  $("#editActivityCategory").value = "sports";
  $("#editActivityDesc").value = "";
  $("#editActivityLocation").value = "";
  $("#editActivityOrganizer").value = "";
  $("#editActivityMax").value = "";
  $("#editActivityTime").value = "Después de examen";
  $("#editActivityRules").value = "";
  $("#activityEditModal").classList.add("modal--open");
}

$("#addActivityBtn").addEventListener("click", openAddActivity);

$("#activityEditForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = $("#editActivityId").value;
  const data = {
    emoji: $("#editActivityEmoji").value || "📌",
    name: $("#editActivityName").value,
    day: $("#editActivityDay").value,
    category: $("#editActivityCategory").value,
    desc: $("#editActivityDesc").value,
    location: $("#editActivityLocation").value,
    organizer: $("#editActivityOrganizer").value,
    maxParticipants: parseInt($("#editActivityMax").value) || 20,
    time: $("#editActivityTime").value,
    rules: $("#editActivityRules").value.split("\n").filter(r => r.trim()),
  };

  if (id) {
    // Edit existing
    const idx = ACTIVITIES.findIndex(a => a.id === parseInt(id));
    if (idx !== -1) {
      data.id = parseInt(id);
      data.filledSpots = ACTIVITIES[idx].filledSpots;
      ACTIVITIES[idx] = data;
    }
  } else {
    // New activity
    const maxId = ACTIVITIES.reduce((max, a) => Math.max(max, a.id), 0);
    data.id = maxId + 1;
    data.filledSpots = 0;
    ACTIVITIES.push(data);
  }

  // Persist & refresh
  saveToLocalStorage();
  await saveActivitiesToBackend();
  renderAdminActivities();
  renderActivities($$(".filter-btn.active")[0]?.dataset.filter || "all");
  renderRegisterChecklist();
  $("#activityEditModal").classList.remove("modal--open");
});

async function deleteActivity(id) {
  if (!confirm("¿Eliminar esta actividad?")) return;
  const idx = ACTIVITIES.findIndex(a => a.id === id);
  if (idx !== -1) {
    ACTIVITIES.splice(idx, 1);
    saveToLocalStorage();
    await saveActivitiesToBackend();
    renderAdminActivities();
    renderActivities($$(".filter-btn.active")[0]?.dataset.filter || "all");
    renderRegisterChecklist();
  }
}

// ============ BRACKETS MANAGEMENT ============
let adminBracketEditMode = false;

function loadAdminBracketEditor() {
  const sport = $("#adminBracketSport").value;
  const visual = $("#adminBracketVisual");
  const teamsSection = $("#adminBracketTeams");
  const actions = $("#adminBracketActions");
  const editBtn = $("#adminBracketEdit");
  $("#adminBracketFeedback").textContent = "";

  if (adminBracketEditMode) {
    editBtn.textContent = "Vista previa";
    editBtn.classList.add("btn--outline");
    editBtn.classList.remove("btn--primary");
    actions.style.display = "";
    teamsSection.style.display = "";
    renderAdminTeamsGrid(sport);
    renderBracket(sport, visual, true);
  } else {
    editBtn.textContent = "Editar";
    editBtn.classList.remove("btn--outline");
    editBtn.classList.add("btn--primary");
    actions.style.display = "none";
    teamsSection.style.display = "none";
    renderBracket(sport, visual, false);
  }
}

function renderAdminTeamsGrid(sport) {
  const data = bracketsLive[sport];
  const grid = $("#adminTeamsGrid");
  grid.innerHTML = data.teams.map((t, i) =>
    `<div class="admin-team-row">
      <label>#${t.seed}</label>
      <input type="text" class="bracket-edit-name" value="${t.name}" data-team-idx="${i}" />
    </div>`
  ).join("");
}

$("#adminBracketSport").addEventListener("change", () => {
  adminBracketEditMode = false;
  loadAdminBracketEditor();
});

$("#adminBracketEdit").addEventListener("click", () => {
  adminBracketEditMode = !adminBracketEditMode;
  loadAdminBracketEditor();
});

$("#adminBracketSave").addEventListener("click", () => {
  const sport = $("#adminBracketSport").value;
  const data = bracketsLive[sport];
  const feedback = $("#adminBracketFeedback");

  const nameInputs = $$("#adminBracketTeams .bracket-edit-name");
  nameInputs.forEach((input) => {
    const idx = parseInt(input.dataset.teamIdx);
    data.teams[idx].name = input.value.trim() || "TBD";
  });

  const scoreInputs = $$("#adminBracketVisual .bracket-edit-score");
  scoreInputs.forEach((input) => {
    const ri = parseInt(input.dataset.round);
    const mi = parseInt(input.dataset.match);
    const side = input.dataset.side;
    const val = parseInt(input.value) || 0;
    if (side === "1") data.rounds[ri].matches[mi].score1 = val;
    else data.rounds[ri].matches[mi].score2 = val;
  });

  saveToLocalStorage();
  adminBracketEditMode = false;
  loadAdminBracketEditor();
  renderBracket(sport);
  feedback.textContent = "✅ Cambios guardados correctamente";
  feedback.className = "admin-feedback admin-feedback--success";
});

$("#adminBracketCancel").addEventListener("click", () => {
  adminBracketEditMode = false;
  loadAdminBracketEditor();
});

// ============ WINNERS MANAGEMENT ============
let winnerPhotoData = null;

function renderAdminWinners() {
  const grid = $("#adminWinnersGrid");
  grid.innerHTML = WINNERS.map((w, i) => `
    <div class="admin-winner-card">
      <img class="admin-winner-card__photo" src="${w.photo}" alt="${w.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e2e8f0%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2240%22>${w.emoji}</text></svg>'" />
      <div class="admin-winner-card__info">
        <div class="admin-winner-card__name">${w.emoji} ${w.name}</div>
        <div class="admin-winner-card__activity">${w.activity} — ${w.team}</div>
      </div>
      <div class="admin-winner-card__actions">
        <button class="admin-action-btn" onclick="openEditWinner(${i})">✏️</button>
        <button class="admin-action-btn admin-action-btn--danger" onclick="deleteWinner(${i})">🗑️</button>
      </div>
    </div>
  `).join("");
}

function openEditWinner(index) {
  const w = WINNERS[index];
  if (!w) return;
  winnerPhotoData = null;
  $("#winnerModalTitle").textContent = "Editar Ganador";
  $("#editWinnerIndex").value = index;
  $("#editWinnerEmoji").value = w.emoji;
  $("#editWinnerActivity").value = w.activity;
  $("#editWinnerName").value = w.name;
  $("#editWinnerTeam").value = w.team;
  $("#editWinnerPlace").value = w.place;
  $("#editWinnerCategory").value = w.category;
  $("#editWinnerPhoto").value = "";
  $("#winnerPhotoPreview").innerHTML = w.photo ? `<img src="${w.photo}" alt="preview" />` : "";
  $("#winnerEditModal").classList.add("modal--open");
}

function openAddWinner() {
  winnerPhotoData = null;
  $("#winnerModalTitle").textContent = "Nuevo Ganador";
  $("#editWinnerIndex").value = "-1";
  $("#editWinnerEmoji").value = "";
  $("#editWinnerActivity").value = "";
  $("#editWinnerName").value = "";
  $("#editWinnerTeam").value = "";
  $("#editWinnerPlace").value = "1";
  $("#editWinnerCategory").value = "sports";
  $("#editWinnerPhoto").value = "";
  $("#winnerPhotoPreview").innerHTML = "";
  $("#winnerEditModal").classList.add("modal--open");
}

$("#addWinnerBtn").addEventListener("click", openAddWinner);

// Photo preview
$("#editWinnerPhoto").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    winnerPhotoData = ev.target.result;
    $("#winnerPhotoPreview").innerHTML = `<img src="${winnerPhotoData}" alt="preview" />`;
  };
  reader.readAsDataURL(file);
});

$("#winnerEditForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const index = parseInt($("#editWinnerIndex").value);
  const data = {
    emoji: $("#editWinnerEmoji").value || "🏆",
    activity: $("#editWinnerActivity").value,
    name: $("#editWinnerName").value,
    team: $("#editWinnerTeam").value,
    place: parseInt($("#editWinnerPlace").value),
    category: $("#editWinnerCategory").value,
    photo: winnerPhotoData || (index >= 0 ? WINNERS[index].photo : ""),
  };

  if (index >= 0) {
    WINNERS[index] = data;
  } else {
    WINNERS.push(data);
  }

  saveToLocalStorage();
  renderAdminWinners();
  renderWinners($$(".winner-filter-btn.active")[0]?.dataset.cat || "all");
  $("#winnerEditModal").classList.remove("modal--open");
});

function deleteWinner(index) {
  if (!confirm("¿Eliminar este ganador?")) return;
  WINNERS.splice(index, 1);
  saveToLocalStorage();
  renderAdminWinners();
  renderWinners($$(".winner-filter-btn.active")[0]?.dataset.cat || "all");
}

// ============ REGISTRATIONS SUMMARY ============
async function fetchAdminRegistrations() {
  try {
    const res = await fetch('/api/registrations', {
      headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    
    // We can show raw registration lists here or aggregate them.
    // For now, let's just keep the aggregate view from ACTIVITIES logic, but we could list them out.
    renderAdminRegistrations();
  } catch (err) {
    console.error("Error fetching registrations", err);
    renderAdminRegistrations();
  }
}

function renderAdminRegistrations() {
  const tbody = $("#adminRegistrationsBody");
  tbody.innerHTML = ACTIVITIES.map(a => {
    const spotsLeft = a.maxParticipants - a.filledSpots;
    const isFull = spotsLeft <= 0;
    return `
      <tr>
        <td>${a.emoji} ${a.name}</td>
        <td>${a.day || "—"}</td>
        <td>${a.filledSpots}</td>
        <td>${a.maxParticipants}</td>
        <td>${Math.max(0, spotsLeft)}</td>
        <td><span class="status-badge ${isFull ? "status-badge--full" : "status-badge--open"}">${isFull ? "Lleno" : "Abierto"}</span></td>
        <td><button class="admin-action-btn" onclick="downloadActivityList(${a.id})">📥 CSV</button></td>
      </tr>
    `;
  }).join("");
}

// ============ RESET REGISTRATIONS ============
$("#adminResetRegistrations")?.addEventListener("click", async () => {
  const confirmation = prompt("ATENCIÓN: Esta acción borrará todos los registros de estudiantes. Escribe 'RESETEAR' para confirmar:");
  if (confirmation !== "RESETEAR") {
    alert("Cancelado. No se escribio 'RESETEAR'.");
    return;
  }
  try {
    const res = await fetch('/api/reset-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({})
    });

    if (!res.ok) throw new Error("Reset failed");

    // Refresh UI after reset.
    await fetchActivities();
    renderAdminRegistrations();
    if ($("#page-admin")?.classList.contains("page--active")) {
      fetchAdminRegistrations();
    }

    alert("✅ Registros restaurados correctamente.");
  } catch (err) {
    console.error("Reset registrations error:", err);
    alert("Error al restaurar registros. Intenta de nuevo.");
  }
});

// ============ DOWNLOAD ACTIVITY LIST ============
async function downloadActivityList(activityId) {
  try {
    const res = await fetch('/api/registrations', {
      headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();

    const activity = ACTIVITIES.find(a => a.id === activityId);
    if (!activity) return;

    const filtered = (data.registrations || []).filter(r =>
      Array.isArray(r.activityIds) && r.activityIds.includes(activityId)
    );

    const header = "Nombre,Grado,Grupo,Código,Fecha de Registro";
    const rows = filtered.map(r =>
      `"${r.name || ""}","${r.grade || ""}","${r.group || ""}","${r.accessCode || ""}","${r.timestamp || ""}"`
    );
    const csv = [header, ...rows].join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activity.name.toLowerCase().replace(/\s+/g, "_")}_inscritos.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error descargando lista:", err);
    alert("Error al descargar la lista. Intenta de nuevo.");
  }
}

// ============ LOGS SUMMARY ============
async function fetchAdminLogs() {
  const tbody = $("#adminLogsBody");
  tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Cargando logs...</td></tr>`;
  try {
    const res = await fetch('/api/logs', {
      headers: { 'Authorization': `Bearer ${ADMIN_PASSWORD}` }
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    
    if (data.logs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hay logs registrados.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = data.logs.map(log => `
      <tr>
        <td>${new Date(log.timestamp).toLocaleString()}</td>
        <td>${log.ip}</td>
        <td><span class="status-badge" style="background:#e2e8f0;color:#0f172a;">${log.event}</span></td>
        <td>${JSON.stringify(log.data || {})}</td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#dc2626;">Error cargando logs.</td></tr>`;
  }
}

$("#refreshLogsBtn")?.addEventListener("click", fetchAdminLogs);

// ============ LOCALSTORAGE PERSISTENCE ============
function saveToLocalStorage() {
  try {
    localStorage.setItem("sd_activities", JSON.stringify(ACTIVITIES));
    localStorage.setItem("sd_winners", JSON.stringify(WINNERS));
    localStorage.setItem("sd_brackets", JSON.stringify(bracketsLive));
  } catch (e) {
    console.warn("localStorage save failed:", e);
  }
}

function loadFromLocalStorage() {
  try {
    const acts = localStorage.getItem("sd_activities");
    if (acts) {
      const parsed = JSON.parse(acts);
      ACTIVITIES.length = 0;
      parsed.forEach(a => ACTIVITIES.push(a));
    }
    const wins = localStorage.getItem("sd_winners");
    if (wins) {
      const parsed = JSON.parse(wins);
      WINNERS.length = 0;
      parsed.forEach(w => WINNERS.push(w));
    }
    const bkts = localStorage.getItem("sd_brackets");
    if (bkts) {
      const parsed = JSON.parse(bkts);
      Object.keys(parsed).forEach(sport => {
        bracketsLive[sport] = parsed[sport];
      });
    }
  } catch (e) {
    console.warn("localStorage load failed:", e);
  }
}

// Load persisted data on startup
loadFromLocalStorage();
// Re-render all views with persisted data
renderActivities("all");
renderRegisterChecklist();
renderWinners("all");
renderBracket(currentSport);

 / /   = = = = = = = = = = = =   S E T T I N G S   M A N A G E M E N T   = = = = = = = = = = = = 
 $ ( " # s a v e S e t t i n g s B t n " ) ? . a d d E v e n t L i s t e n e r ( " c l i c k " ,   a s y n c   ( )   = >   { 
     c o n s t   n e w S e t t i n g s   =   { 
         e v e n t N a m e :   $ ( " # s e t t i n g E v e n t N a m e " ) . v a l u e   | |   " S e m a n a   d e l   E s t u d i a n t e " , 
         e v e n t S u b t i t l e :   $ ( " # s e t t i n g E v e n t S u b t i t l e " ) . v a l u e   | |   " U n a   s e m a n a   l l e n a   d e   c o m p e t e n c i a s . . . " , 
         s t a t A c t i v i t i e s :   p a r s e I n t ( $ ( " # s e t t i n g S t a t A c t i v i t i e s " ) . v a l u e )   | |   1 2 , 
         s t a t S t u d e n t s :   p a r s e I n t ( $ ( " # s e t t i n g S t a t S t u d e n t s " ) . v a l u e )   | |   1 0 7 , 
         s t a t D a y s :   p a r s e I n t ( $ ( " # s e t t i n g S t a t D a y s " ) . v a l u e )   | |   5 , 
         e x a m D a y s :   $ ( " # s e t t i n g E x a m D a y s " ) . v a l u e   | |   " " 
     } ; 
 
     t r y   { 
         c o n s t   r e s   =   a w a i t   f e t c h ( " / a p i / s e t t i n g s " ,   { 
             m e t h o d :   " P O S T " , 
             h e a d e r s :   { 
                 " C o n t e n t - T y p e " :   " a p p l i c a t i o n / j s o n " , 
                 " A u t h o r i z a t i o n " :   ` B e a r e r   $ { A D M I N _ P A S S W O R D } ` 
             } , 
             b o d y :   J S O N . s t r i n g i f y ( {   s e t t i n g s :   n e w S e t t i n g s   } ) 
         } ) ; 
 
         i f   ( ! r e s . o k )   t h r o w   n e w   E r r o r ( " F a i l e d   t o   s a v e   s e t t i n g s " ) ; 
 
         S I T E _ S E T T I N G S   =   n e w S e t t i n g s ; 
         a p p l y S e t t i n g s T o D O M ( ) ; 
         r e n d e r S c h e d u l e ( ) ;   / /   R e f r e s h   s c h e d u l e   e x a m   b a d g e s 
 
         c o n s t   f e e d b a c k   =   $ ( " # a d m i n S e t t i n g s F e e d b a c k " ) ; 
         f e e d b a c k . t e x t C o n t e n t   =   " '  C o n f i g u r a c i � n   g u a r d a d a   e x i t o s a m e n t e . " ; 
         f e e d b a c k . c l a s s N a m e   =   " a d m i n - f e e d b a c k   a d m i n - f e e d b a c k - - s u c c e s s " ; 
         s e t T i m e o u t ( ( )   = >   {   f e e d b a c k . t e x t C o n t e n t   =   " " ;   } ,   3 0 0 0 ) ; 
 
     }   c a t c h   ( e r r )   { 
         c o n s o l e . e r r o r ( e r r ) ; 
         c o n s t   f e e d b a c k   =   $ ( " # a d m i n S e t t i n g s F e e d b a c k " ) ; 
         f e e d b a c k . t e x t C o n t e n t   =   " L'  E r r o r   a l   g u a r d a r   l a   c o n f i g u r a c i � n . " ; 
         f e e d b a c k . c l a s s N a m e   =   " a d m i n - f e e d b a c k   a d m i n - f e e d b a c k - - e r r o r " ; 
     } 
 } ) ; 
  
 