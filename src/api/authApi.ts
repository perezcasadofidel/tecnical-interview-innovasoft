import { httpClient } from "./httpClient";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

export const loginApi = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await httpClient.post<LoginResponse>(
    "/api/local/auth/login",
    payload,
  );
  return data;
};

export const registerApi = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  const { data } = await httpClient.post<RegisterResponse>(
    "/api/local/auth/register",
    payload,
  );
  return data;
};

export const logoutApi = async (): Promise<void> => {
  await httpClient.post("/api/local/auth/logout");
};

export const healthApi = async (): Promise<void> => {
  await httpClient.get("/api/local/health");
};
