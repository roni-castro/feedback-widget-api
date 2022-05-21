import { MailAdapter } from '../../adapters/mail/mail.adapter';
import { FeedbacksRepository } from '../../repositories/feedback/feedbacks.repository';

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string | null;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    if (!type) {
      throw new Error('Type is required');
    }
    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot is not a base64');
    }

    await this.feedbackRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
