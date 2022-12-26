import * as nodemailer from 'nodemailer';
import * as hsb from 'nodemailer-express-handlebars';
import { object } from 'zod';
import { APP_NAME, NO_REPLY, PASSWORD } from '../../constants';

const viewPath = __dirname + '/templates/views/';
const partialsPath = __dirname + '/templates/partials';

async function transporter() {
  const account = {
    user: NO_REPLY,
    pass: PASSWORD,
  };
  return nodemailer
    .createTransport({
      host: 'smtppro.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
    .use(
      'compile',
      hsb.default({
        viewEngine: {
          extname: '.handlebars',
          layoutsDir: viewPath,
          partialsDir: partialsPath,
          defaultLayout: false,
        },
        viewPath: viewPath,
        extName: '.handlebars',
      }),
    );
}

async function mailOptions(to: string, template: string, title: string, subject: string, props?: object) {
  const options = {
    from: `${APP_NAME}<${NO_REPLY}>`,
    to: to,
    subject: subject,
    template: template,
    context: {
      ...props,
      title: `${title}`,
    },
  };
  return options;
}

export { mailOptions, transporter };
