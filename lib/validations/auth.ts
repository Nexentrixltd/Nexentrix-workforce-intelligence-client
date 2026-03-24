import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Enter a valid work email address" }))
    .refine((email) => email.endsWith("@nexius.com"), {
      message: "Only Nexius work emails are allowed",
    }),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  remember: z.boolean(),
});

export type SignInInput = z.infer<typeof signInSchema>;
