import axios from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (axios.isAxiosError(error)) {
    return "Hubo un inconveniente con la transaccion. Intente nuevamente.";
  }

  return fallback;
};
