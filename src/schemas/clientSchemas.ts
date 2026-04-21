import { z } from "zod";

export const searchClientSchema = z.object({
  identificacion: z.string().max(20, "Maximo 20 caracteres."),
  nombre: z.string().max(50, "Maximo 50 caracteres."),
});

export type SearchClientFormValues = z.infer<typeof searchClientSchema>;

export const clientSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio.")
    .max(50, "Maximo 50 caracteres."),
  apellidos: z
    .string()
    .min(1, "Los apellidos son obligatorios.")
    .max(100, "Maximo 100 caracteres."),
  identificacion: z
    .string()
    .min(1, "La identificacion es obligatoria.")
    .max(20, "Maximo 20 caracteres."),
  telefonoCelular: z
    .string()
    .min(1, "El telefono celular es obligatorio.")
    .max(20, "Maximo 20 caracteres."),
  otroTelefono: z
    .string()
    .min(1, "El otro telefono es obligatorio.")
    .max(20, "Maximo 20 caracteres."),
  direccion: z
    .string()
    .min(1, "La direccion es obligatoria.")
    .max(200, "Maximo 200 caracteres."),
  fNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria."),
  fAfiliacion: z.string().min(1, "La fecha de afiliacion es obligatoria."),
  sexo: z.enum(["M", "F"]),
  resenaPersonal: z
    .string()
    .min(1, "La resena personal es obligatoria.")
    .max(200, "Maximo 200 caracteres."),
  imagen: z.string(),
  interesFK: z.string().min(1, "Debe seleccionar un interes."),
});

export type ClientFormSchemaValues = z.infer<typeof clientSchema>;
