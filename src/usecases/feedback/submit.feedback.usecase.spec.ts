import { SubmitFeedbackUseCase } from './submit.feedback.usecase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedbackRepository = {
  create: createFeedbackSpy,
  list: async () => {
    return [];
  },
};
const mailAdapter = {
  sendMail: sendMailSpy,
};
const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  feedbackRepository,
  mailAdapter
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    const data = {
      type: 'BUG',
      comment: 'my comment',
      screenshot: 'data:image/png;base64,45rfe32r234123',
    };
    await expect(submitFeedbackUseCase.execute(data)).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith(data);
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not to be able to submit feedback with invalid screenshot data', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'any comment',
        screenshot: 'invalidFormat.png',
      })
    ).rejects.toThrow();
  });

  it('should not to be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'my comment',
        screenshot: 'data:image/png;base64,45rfe32r234123',
      })
    ).rejects.toThrow();
  });

  it('should not to be able to submit feedback without a comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,45rfe32r234123',
      })
    ).rejects.toThrow();
  });
});
