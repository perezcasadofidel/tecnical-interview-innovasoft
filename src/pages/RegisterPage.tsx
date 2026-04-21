import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { registerApi } from "../api/authApi";
import { RegisterFormValues, registerSchema } from "../schemas/authSchemas";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues): Promise<void> => {
    setSubmitting(true);

    try {
      const response = await registerApi(values);
      setSuccessMessage(response.message || "Usuario creado correctamente.");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch {
      setErrorMessage(
        "Hubo un inconveniente con la transaccion. Revise la informacion.",
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
      <Card sx={{ width: "100%", maxWidth: 520, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Registro
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Cree una cuenta para usar el sistema
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
              label="Correo"
              fullWidth
              margin="normal"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{ mt: 2, py: 1.2, fontWeight: 700 }}
            >
              {submitting ? "Procesando..." : "REGISTRARSE"}
            </Button>

            <Typography mt={2.5} textAlign="center">
              Ya tiene una cuenta?{" "}
              <Link component={RouterLink} to="/login" underline="hover">
                Inicie Sesión
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3500}
        onClose={() => setErrorMessage("")}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
