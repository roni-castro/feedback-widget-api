import { ListFeedbackUseCase } from './list.feedback.usecase';
import { SubmitFeedbackUseCase } from './submit.feedback.usecase';

const listFeedbackSpy = jest.fn();
const feedbackRepository = {
  create: jest.fn(),
  list: listFeedbackSpy,
};
const listFeedbackUseCase = new ListFeedbackUseCase(feedbackRepository);

describe('List feedback', () => {
  it('should be able to list feedbacks', async () => {
    await expect(listFeedbackUseCase.execute()).resolves.not.toThrow();

    expect(listFeedbackSpy).toHaveBeenCalledWith();
  });
});
