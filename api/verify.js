import studentsData from '../students.json';
import { createRedisClient } from './_redis.js';

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
  const redis = createRedisClient();
  if (redis) {
    try {
      const previousReg = await redis.hgetall(`student:${accessCode}`);
      if (previousReg && previousReg.activityIds) {
        previousActivityIds = JSON.parse(previousReg.activityIds);
      }
    } catch (error) {
      // Non-blocking: still allow verification even if Redis read fails.
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
    previousActivityIds
  });
}
