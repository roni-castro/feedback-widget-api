import { FeedbacksRepository } from '../../repositories/feedback/feedbacks.repository';

export class ListFeedbackUseCase {
  constructor(private feedbackRepository: FeedbacksRepository) {}

  async execute() {
    return this.feedbackRepository.list();
  }
}
