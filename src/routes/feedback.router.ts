import { Router } from 'express';
import { prisma } from '../prisma';

const feedbackRouter = Router();

feedbackRouter.get('/', async (req, res) => {
  const feedbacks = await prisma.feedback.findMany();
  res.json(feedbacks);
});

feedbackRouter.post('/', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const response = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  res.status(201).json(response);
});

export default feedbackRouter;
