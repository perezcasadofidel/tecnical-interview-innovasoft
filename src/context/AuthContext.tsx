import React, { createContext, useContext, useMemo, useState } from "react";

import { AUTH_STORAGE_KEY, REMEMBER_USERNAME_KEY } from "../constants/storage";
import { loginApi, logoutApi } from "../api/authApi";
import { AuthSession, LoginRequest } from "../types/auth";

interface AuthContextValue {
  session: AuthSession | null;
  rememberedUsername: string;
  isAuthenticated: boolean;
  login: (payload: LoginRequest, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const getInitialSession = (): AuthSession | null => {
  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const getRememberedUsername = (): string => {
  return localStorage.getItem(REMEMBER_USERNAME_KEY) ?? "";
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [session, setSession] = useState<AuthSession | null>(() =>
    getInitialSession(),
  );
  const [rememberedUsername, setRememberedUsername] = useState<string>(() =>
    getRememberedUsername(),
  );

  const login = async (
    payload: LoginRequest,
    rememberMe: boolean,
  ): Promise<void> => {
    const response = await loginApi(payload);

    const nextSession: AuthSession = {
      token: response.token,
      expiration: response.expiration,
      userId: response.userid,
      username: response.username,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);

    if (rememberMe) {
      localStorage.setItem(REMEMBER_USERNAME_KEY, payload.username);
      setRememberedUsername(payload.username);
    } else {
      localStorage.removeItem(REMEMBER_USERNAME_KEY);
      setRememberedUsername("");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutApi();
    } catch {
      // Se limpia la sesion local aunque falle el endpoint de logout.
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      rememberedUsername,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [session, rememberedUsername],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }

  return context;
};
