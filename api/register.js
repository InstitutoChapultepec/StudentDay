import { Redis } from '@upstash/redis';
import studentsData from '../students.json';

const redis = Redis.fromEnv();

// We need the max caps to enforce hard limits
const MAX_CAPS = {
  1: 32, 2: 36, 3: 16, 4: 32, 5: 36, 6: 30
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    let { accessCode, activityIds } = req.body;
    
    if (!accessCode || !Array.isArray(activityIds)) {
      return res.status(400).json({ error: 'Faltan campos requeridos o son inválidos.' });
    }

    accessCode = accessCode.trim().toUpperCase();

    // 1. Verify Access Code against our valid students.json map
    const studentInfo = studentsData.find(s => s.accessCode === accessCode);
    if (!studentInfo) {
      return res.status(401).json({ error: 'Código de acceso inválido.' });
    }

    // 2. Fetch custom config limits if they exist (admin overrides)
    const customConfig = await redis.get("activities_config");
    const caps = { ...MAX_CAPS };
    if (customConfig && Array.isArray(customConfig)) {
      customConfig.forEach(a => {
        caps[a.id] = a.maxParticipants;
      });
    }

    // 3. Check for previous registration (to overwrite)
    const previousReg = await redis.hgetall(`student:${accessCode}`);
    const isUpdate = !!previousReg;
    let oldActivities = [];
    
    if (isUpdate && previousReg.activityIds) {
      try {
        oldActivities = JSON.parse(previousReg.activityIds);
      } catch(e) {}
    }

    // 4. Try to book the new activities atomically
    const registered = [];
    const rejected = [];

    // Simple approach: INCR and if > cap, DECR
    for (const actId of activityIds) {
      // If they already had it, they keep it (no increment needed for capacity check, but 
      // it's easier to completely DECR all old ones first, then INCR all new ones).
      // Let's do that:
    }

    // Better approach for updates: 
    // - DECR all old activities
    if (isUpdate && oldActivities.length > 0) {
      const pDecr = redis.pipeline();
      oldActivities.forEach(id => pDecr.decr(`activity:${id}:count`));
      await pDecr.exec();
    }

    // - INCR all new activities, check limits
    for (const actId of activityIds) {
      const max = caps[actId] || 0;
      const currentCount = await redis.incr(`activity:${actId}:count`);
      
      if (currentCount > max) {
        // Overbooked! Roll back this activity.
        await redis.decr(`activity:${actId}:count`);
        rejected.push(actId);
      } else {
        registered.push(actId);
      }
    }

    // 5. Save the final student registration
    const newReg = {
      ...studentInfo,
      activityIds: JSON.stringify(registered),
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || 'unknown'
    };

    const p = redis.pipeline();
    p.hset(`student:${accessCode}`, newReg);
    if (!isUpdate) {
      p.rpush('registrations', accessCode); // Add to master list if new
    }
    await p.exec();

    // Log the event
    await redis.lpush('site_logs', JSON.stringify({
      event: isUpdate ? 'registration_update' : 'registration_new',
      ip: newReg.ip,
      timestamp: newReg.timestamp,
      data: { name: studentInfo.name, accessCode }
    }));
    await redis.ltrim('site_logs', 0, 999); // Keep last 1000 logs

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
}
