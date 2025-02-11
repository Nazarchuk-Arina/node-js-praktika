import { Router } from 'express';
import authRouter from './auth.js';
import studentsRouter from './students.js';

const router = Router();

router.use('/students', studentsRouter);
router.use('/auth', authRouter);

export default router;
