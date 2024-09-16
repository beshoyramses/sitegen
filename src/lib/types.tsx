export type ContactUserFormSchema = {
  name: string;       // User's full name
  email: string;      // User's email address
  message: string;    // Message content
  phone?: string;     // Optional phone number
  preferredContactMethod?: 'email' | 'phone'; // Optional preferred contact method
};
