export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot: string | null;
}

export interface FeedbackResponseData {
  type: string;
  comment: string;
  screenshot: string | null;
}
