export interface Interest {
  id: string;
  descripcion: string;
}

export interface ClientListItem {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

export interface SearchClientsRequest {
  identificacion?: string;
  nombre?: string;
  usuarioId: string;
}

export interface ClientDetail {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resenaPersonal: string;
  imagen: string;
  interesesId: string;
}

export interface ClientFormValues {
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resenaPersonal: string;
  imagen: string;
  interesFK: string;
}

export interface CreateClientRequest {
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resennaPersonal: string;
  imagen: string;
  interesFK: string;
  usuarioId: string;
}

export interface UpdateClientRequest {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: "M" | "F";
  resennaPersonal: string;
  imagen: string;
  interesFK: string;
  usuarioId: string;
}
