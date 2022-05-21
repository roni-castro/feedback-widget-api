import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.listen(3333, () => {
  console.log('Server running');
});

app.get('/feedback', async (req, res) => {
  const feedbacks = await prisma.feedbacks.findMany();
  res.json(feedbacks);
});
