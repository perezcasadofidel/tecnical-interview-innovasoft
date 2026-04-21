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
    "api/Cliente/Listado",
    payload,
  );
  return data;
};

export const deleteClientApi = async (clientId: string): Promise<void> => {
  await httpClient.delete(`api/Cliente/Eliminar/${clientId}`);
};

export const getInterestsApi = async (): Promise<Interest[]> => {
  const { data } = await httpClient.get<Interest[]>("api/Intereses/Listado");
  return data;
};

export const getClientApi = async (clientId: string): Promise<ClientDetail> => {
  const { data } = await httpClient.get<ClientDetail>(
    `api/Cliente/Obtener/${clientId}`,
  );
  return data;
};

export const createClientApi = async (
  payload: CreateClientRequest,
): Promise<void> => {
  await httpClient.post("api/Cliente/Crear", payload);
};

export const updateClientApi = async (
  payload: UpdateClientRequest,
): Promise<void> => {
  await httpClient.post("api/Cliente/Actualizar", payload);
};
