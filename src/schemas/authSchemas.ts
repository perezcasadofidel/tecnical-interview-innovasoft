import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio."),
  password: z.string().min(1, "La contrasena es obligatoria."),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio."),
  email: z.string().email("Debe ingresar un correo valido."),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres.")
    .max(20, "La contrasena no debe superar los 20 caracteres.")
    .regex(/[A-Z]/, "La contrasena debe incluir al menos una mayuscula.")
    .regex(/[a-z]/, "La contrasena debe incluir al menos una minuscula.")
    .regex(/[0-9]/, "La contrasena debe incluir al menos un numero."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
