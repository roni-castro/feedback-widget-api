import { Router } from 'express';
import { prisma } from '../prisma';
import nodemailer from 'nodemailer';

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
  const feedbacks = await prisma.feedback.findMany();
  res.json(feedbacks);
});

feedbackRouter.post('/', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

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

  res.status(201).json({ data: feedback });
});

export default feedbackRouter;
