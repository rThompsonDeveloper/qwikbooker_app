import { z } from "zod";

// Address schema
const addressSchema = z.object({
  street: z
    .string()
    .min(1, "Street address is required")
    .describe("Street address for staff member"),
  city: z.string().min(1, "City is required").describe("City for staff member"),
  state: z
    .string()
    .min(1, "State is required")
    .describe("State for staff member"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .describe("ZIP code for staff member"),
  country: z
    .string()
    .min(1, "Country is required")
    .describe("Country for staff member"),
});

// Staff member schema
export const staffMemberSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .describe("First name of staff member"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .describe("Last name of staff member"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .describe("Email address for staff member"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .describe("Phone number for staff member"),
  role: z
    .enum(["admin", "store manager", "staff"], {
      required_error: "Please select a role",
    })
    .describe("Role of staff member"),
  address: addressSchema.describe("Address information for staff member"),
  assignedStore: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional()
    .describe("Store assigned to staff member"),
  status: z
    .enum(["active", "inactive", "pending"], {
      required_error: "Please select a status",
    })
    .describe("Current status of staff member"),
  joinDate: z
    .string()
    .min(1, "Join date is required")
    .describe("Date staff member joined the organization"),
});

export type StaffMemberFormData = z.infer<typeof staffMemberSchema>;
