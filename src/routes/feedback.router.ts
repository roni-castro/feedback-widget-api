import { Router } from 'express';
import { NodeMailerMailAdapter } from '../adapters/mail/nodemailer/nodemailer.mail.adapter';

import { PrismaFeedbackRepository } from '../repositories/feedback/prisma.feedbacks.repository';
import { ListFeedbackUseCase } from '../usecases/feedback/list.feedback.usecase';
import { SubmitFeedbackUseCase } from '../usecases/feedback/submit.feedback.usecase';

const feedbackRouter = Router();

feedbackRouter.get('/', async (req, res) => {
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const listFeedbackUseCase = new ListFeedbackUseCase(prismaFeedbackRepository);
  const feedbacks = await listFeedbackUseCase.execute();
  res.json(feedbacks);
});

feedbackRouter.post('/', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodeMailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );
  submitFeedbackUseCase.execute({ type, comment, screenshot });

  res.status(201).json();
});

export default feedbackRouter;
