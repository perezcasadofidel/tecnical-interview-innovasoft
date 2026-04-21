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
    "api/Authenticate/login",
    payload,
  );
  return data;
};

export const registerApi = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  const { data } = await httpClient.post<RegisterResponse>(
    "api/Authenticate/register",
    payload,
  );
  return data;
};
