import { MailAdapter } from '../mail.adapter';
import nodemailer from 'nodemailer';
import { SendEmailData } from '../models';

const nodemailerConfig = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7c206df8f53765',
    pass: '1ef358e60a1400',
  },
};

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendEmailData) {
    const transport = nodemailer.createTransport(nodemailerConfig);
    await transport.sendMail({
        from: '"Equipe Feedget <oi@feedget.com>',
        to: 'Roni <roni@email.com>',
        subject,
        html: body,
      });
  }
}
