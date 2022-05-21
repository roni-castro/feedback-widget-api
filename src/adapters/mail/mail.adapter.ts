import { SendEmailData } from './models';

export interface MailAdapter {
  sendMail: (requestData: SendEmailData) => Promise<void>;
}
