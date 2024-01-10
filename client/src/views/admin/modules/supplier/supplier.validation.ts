import * as z from "zod";

const supplierValidation = z.object({
  name: z.string().refine((value) => /^[a-zA-Z\s]{0,64}$/.test(value), {
    message:
      "Invalid name. It should be 3 to 64 characters long and contain only letters and spaces.",
  }),
  email: z.string().email("Invalid email address"),
  contact: z.string().refine((value) => /^[0-9]{11}$/.test(value), {
    message:
      "Invalid phone number. It should be 11 digits and contain only numeric characters.",
  }),
});

export default supplierValidation;
