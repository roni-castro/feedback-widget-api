import { Router } from 'express';
import nodemailer from 'nodemailer';

import { PrismaFeedbackRepository } from '../repositories/prisma.feedbacks.repository';
import { ListFeedbackUseCase } from '../usecases/feedback/list.feedback.usecase';
import { SubmitFeedbackUseCase } from '../usecases/feedback/submit.feedback.usecase';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7c206df8f53765',
    pass: '1ef358e60a1400',
  },
});

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
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository
  );
  submitFeedbackUseCase.execute({ type, comment, screenshot });

  transport.sendMail({
    from: '"Equipe Feedget <oi@feedget.com>',
    to: 'Roni <roni@email.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  res.status(201).json();
});

export default feedbackRouter;
