import { FeedbacksRepository } from '../../repositories/feedbacks.repository';

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(private feedbackRepository: FeedbacksRepository) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    return this.feedbackRepository.create({ type, comment, screenshot });
  }
}
