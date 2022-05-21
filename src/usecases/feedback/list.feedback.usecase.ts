import { FeedbacksRepository } from '../../repositories/feedbacks.repository';

export class ListFeedbackUseCase {
  constructor(private feedbackRepository: FeedbacksRepository) {}

  async execute() {
    return this.feedbackRepository.list();
  }
}
