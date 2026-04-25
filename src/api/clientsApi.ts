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
  const { data } = await httpClient.get<Interest[]>(
    "/api/local/clientes/intereses/listado",
  );
  return data;
};

export const getClientApi = async (clientId: string): Promise<ClientDetail> => {
  const { data } = await httpClient.get<ClientDetail>(
    `/api/local/clientes/${clientId}`,
  );
  return data;
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
