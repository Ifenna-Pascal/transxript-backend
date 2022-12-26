export interface MailProps {
  from?: string;
  to: string;
  subject?: string;
  template?: string;
  attachments?: object[];
}

export interface MailOptions {
  to: string;
  fullname: string;
  password: string;
  url?: string;
}
