import { mailOptions, transporter } from './config';
import { MailOptions } from './mailer.interface';

async function sendRegistrationMail(prop: MailOptions) {
  const { fullname, to, password } = prop;
  const mailer = await transporter();
  const options = await mailOptions(to, 'registration', 'Your Login Details', `Login Details- ${new Date()}`, {
    password,
    fullname,
  });
  const mail = await mailer.sendMail(options);
  return mail;
}

export { sendRegistrationMail };
