import { z } from 'zod';

export const ContactUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type GetMediaFiles = () => Promise<File[]>;
