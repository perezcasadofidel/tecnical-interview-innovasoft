import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { LoginFormValues, loginSchema } from "../schemas/authSchemas";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, rememberedUsername } = useAuth();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: rememberedUsername,
      password: "",
      rememberMe: Boolean(rememberedUsername),
    },
  });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setSubmitting(true);

    try {
      await login(
        {
          username: values.username,
          password: values.password,
        },
        values.rememberMe,
      );
      navigate("/", { replace: true });
    } catch {
      setSnackbarMessage(
        "Hubo un inconveniente con la transaccion. Verifique sus credenciales.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(120deg, #0b3c5d 0%, #116466 55%, #1c7293 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 460, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Iniciar Sesión
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Ingrese sus credenciales para continuar
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Usuario"
              fullWidth
              margin="normal"
              {...register("username")}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox {...register("rememberMe")} />}
              label="Recuerdame"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{ mt: 2, py: 1.2, fontWeight: 700 }}
            >
              {submitting ? "Procesando..." : "INICIAR SESIÓN"}
            </Button>

            <Typography mt={2.5} textAlign="center">
              No tiene una cuenta?{" "}
              <Link component={RouterLink} to="/registro" underline="hover">
                Regístrese
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3500}
        onClose={() => setSnackbarMessage("")}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setSnackbarMessage("")}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
