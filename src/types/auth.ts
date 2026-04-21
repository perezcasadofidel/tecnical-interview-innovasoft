export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface AuthSession {
  token: string;
  expiration: string;
  userId: string;
  username: string;
}
