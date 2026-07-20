import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const NOTIFICATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;

interface EmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmail(params: EmailParams): Promise<void> {
  const time = new Date().toLocaleString();

  await emailjs.send(
    SERVICE_ID,
    NOTIFICATION_TEMPLATE_ID,
    {
      name: params.name,
      email: params.email,
      subject: params.subject,
      message: params.message,
      time,
    },
    PUBLIC_KEY,
  );

  await emailjs.send(
    SERVICE_ID,
    AUTOREPLY_TEMPLATE_ID,
    {
      name: params.name,
      subject: params.subject,
      email: params.email,
    },
    PUBLIC_KEY,
  );
}
