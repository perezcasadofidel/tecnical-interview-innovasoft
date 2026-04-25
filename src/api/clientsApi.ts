import { httpClient } from "./httpClient";
import {
  ClientDetail,
  ClientListItem,
  CreateClientRequest,
  Interest,
  SearchClientsRequest,
  UpdateClientRequest,
} from "../types/client";

type ClientsApiResponse =
  | ClientListItem[]
  | {
      data?: unknown;
      clientes?: unknown;
      items?: unknown;
      results?: unknown;
    };

const normalizeClientList = (
  response: ClientsApiResponse,
): ClientListItem[] => {
  if (Array.isArray(response)) {
    return response;
  }

  const candidates = [
    response.data,
    response.clientes,
    response.items,
    response.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as ClientListItem[];
    }
  }

  throw new Error("La respuesta de clientes no tiene el formato esperado.");
};

type InterestsApiResponse =
  | Interest[]
  | {
      data?: unknown;
      intereses?: unknown;
      items?: unknown;
      results?: unknown;
    };

const normalizeInterestList = (response: InterestsApiResponse): Interest[] => {
  if (Array.isArray(response)) {
    return response;
  }

  const candidates = [
    response.data,
    response.intereses,
    response.items,
    response.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as Interest[];
    }
  }

  throw new Error("La respuesta de intereses no tiene el formato esperado.");
};

type ClientDetailRaw = Record<string, unknown>;

type ClientDetailApiResponse =
  | ClientDetailRaw
  | {
      data?: unknown;
      cliente?: unknown;
      item?: unknown;
      result?: unknown;
    };

const asString = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }

  if (value == null) {
    return "";
  }

  return String(value);
};

const normalizeClientDetail = (
  response: ClientDetailApiResponse,
): ClientDetail => {
  const raw = (
    "data" in response
      ? (response.data ?? response.cliente ?? response.item ?? response.result)
      : response
  ) as unknown;

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(
      "La respuesta de detalle de cliente no tiene el formato esperado.",
    );
  }

  const detail = raw as ClientDetailRaw;
  const sexoRaw = detail.sexo;

  return {
    id: asString(detail.id),
    nombre: asString(detail.nombre),
    apellidos: asString(detail.apellidos),
    identificacion: asString(detail.identificacion),
    telefonoCelular: asString(detail.telefonoCelular ?? detail.celular),
    otroTelefono: asString(detail.otroTelefono),
    direccion: asString(detail.direccion),
    fNacimiento: asString(detail.fNacimiento),
    fAfiliacion: asString(detail.fAfiliacion),
    sexo: sexoRaw === "F" ? "F" : "M",
    resenaPersonal: asString(detail.resenaPersonal ?? detail.resennaPersonal),
    imagen: asString(detail.imagen),
    interesesId: asString(detail.interesesId ?? detail.interesFK),
  };
};

export const searchClientsApi = async (
  payload: SearchClientsRequest,
): Promise<ClientListItem[]> => {
  const { data } = await httpClient.post<ClientsApiResponse>(
    "/api/local/clientes/listado",
    payload,
  );
  return normalizeClientList(data);
};

export const deleteClientApi = async (clientId: string): Promise<void> => {
  await httpClient.delete(`/api/local/clientes/${clientId}`);
};

export const getInterestsApi = async (): Promise<Interest[]> => {
  const { data } = await httpClient.get<InterestsApiResponse>(
    "/api/local/clientes/intereses/listado",
  );
  return normalizeInterestList(data);
};

export const getClientApi = async (clientId: string): Promise<ClientDetail> => {
  const { data } = await httpClient.get<ClientDetailApiResponse>(
    `/api/local/clientes/${clientId}`,
  );
  return normalizeClientDetail(data);
};

export const createClientApi = async (
  payload: CreateClientRequest,
): Promise<void> => {
  await httpClient.post("/api/local/clientes", payload);
};

export const updateClientApi = async (
  payload: UpdateClientRequest,
): Promise<void> => {
  const { id, ...body } = payload;
  await httpClient.put(`/api/local/clientes/${id}`, body);
};
