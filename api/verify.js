import studentsData from '../students.json';
import { createRedisClient } from './_redis.js';
import { parseActivityIds } from './_activityIds.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'Falta código de acceso' });

  const accessCode = code.trim().toUpperCase();
  const student = studentsData.find(s => s.accessCode === accessCode);

  if (!student) {
    return res.status(404).json({ error: 'Código inválido o no encontrado.' });
  }

  // Return safe subset (no sensitive data other than name/grade)
  let previousActivityIds = [];
  // #region agent log
  const _debug = { redisClientExists: false, hgetallType: null, hgetallKeys: null, hgetallActivityIdsRaw: null, parseError: null };
  // #endregion
  const redis = createRedisClient();
  // #region agent log
  _debug.redisClientExists = !!redis;
  // #endregion
  if (redis) {
    try {
      const previousReg = await redis.hgetall(`student:${accessCode}`);
      // #region agent log
      _debug.hgetallType = previousReg === null ? 'null' : typeof previousReg;
      _debug.hgetallKeys = previousReg && typeof previousReg === 'object' ? Object.keys(previousReg) : null;
      _debug.hgetallActivityIdsRaw = previousReg ? previousReg.activityIds : null;
      // #endregion
      if (previousReg && previousReg.activityIds != null) {
        previousActivityIds = parseActivityIds(previousReg.activityIds);
      }
    } catch (error) {
      // #region agent log
      _debug.parseError = String(error && error.message);
      // #endregion
      previousActivityIds = [];
    }
  }

  return res.status(200).json({
    success: true,
    student: {
      name: student.name,
      grade: student.grade,
      group: student.group
    },
    previousActivityIds,
    _debug
  });
}
