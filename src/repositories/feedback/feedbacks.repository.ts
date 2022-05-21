import { FeedbackCreateData, FeedbackResponseData } from './models';

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  list: () => Promise<FeedbackResponseData[]>;
}
