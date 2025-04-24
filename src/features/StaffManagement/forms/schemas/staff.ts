import { z } from "zod";

export const staffMemberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  role: z.enum(["admin", "store manager", "staff"]),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  assignedStore: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  status: z.enum(["active", "pending", "inactive"]),
  joinDate: z.string().min(1, "Join date is required"),
});

export type StaffMemberFormData = z.infer<typeof staffMemberSchema>;
