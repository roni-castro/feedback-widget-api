import { prisma } from '../prisma';
import { FeedbacksRepository } from './feedbacks.repository';
import { FeedbackCreateData } from './models';

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    await prisma.feedback.create({
      data,
    });
  }

  async list() {
    return prisma.feedback.findMany();
  }
}
