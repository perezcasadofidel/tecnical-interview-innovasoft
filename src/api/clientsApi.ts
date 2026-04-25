import { httpClient } from "./httpClient";
import {
  ClientDetail,
  ClientListItem,
  CreateClientRequest,
  Interest,
  SearchClientsRequest,
  UpdateClientRequest,
} from "../types/client";

export const searchClientsApi = async (
  payload: SearchClientsRequest,
): Promise<ClientListItem[]> => {
  const { data } = await httpClient.post<ClientListItem[]>(
    "/api/local/clientes/listado",
    payload,
  );
  return data;
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
