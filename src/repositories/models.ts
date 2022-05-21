export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot: string;
}

export interface FeedbackResponseData {
  type: string;
  comment: string;
  screenshot: string | null;
}
