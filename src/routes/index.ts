import { Router } from 'express';
import feedbackRouter from './feedback.router';

const router = Router();

router.use('/feedback', feedbackRouter);

export default router;
