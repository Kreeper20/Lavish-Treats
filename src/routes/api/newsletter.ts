// src/routes/api/subscribe.ts
import { createFileRoute } from '@tanstack/react-router';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const Route = createFileRoute('/api/newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { email} = await request.json();

        const { data, error } = await resend.contacts.create({
          email,
          unsubscribed: false,
        });

        if (error) {
          return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
      },
    },
  },
});