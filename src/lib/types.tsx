import { z } from 'zod';

export const ContactUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  phone: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone']).optional(),
});


type ContactUserFormType = z.infer<typeof ContactUserFormSchema>;

export interface Props {
  title: string;
  subTitle: string;
  apiCall: (values: ContactUserFormType) => any;
}