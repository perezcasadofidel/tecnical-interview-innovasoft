import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  createClientApi,
  getClientApi,
  getInterestsApi,
  updateClientApi,
} from "../api/clientsApi";
import { useAuth } from "../context/AuthContext";
import { clientSchema, ClientFormSchemaValues } from "../schemas/clientSchemas";
import { Interest } from "../types/client";
import { toDateInputValue } from "../utils/date";
import { toBase64 } from "../utils/file";

const defaultValues: ClientFormSchemaValues = {
  nombre: "",
  apellidos: "",
  identificacion: "",
  telefonoCelular: "",
  otroTelefono: "",
  direccion: "",
  fNacimiento: "",
  fAfiliacion: "",
  sexo: "M",
  resenaPersonal: "",
  imagen: "",
  interesFK: "",
};

const ClientFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useAuth();
  const isEditMode = useMemo<boolean>(() => Boolean(id), [id]);

  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ClientFormSchemaValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const imagePreview = watch("imagen");
  const formId = "client-maintenance-form";

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setLoading(true);

      try {
        if (id) {
          const detail = await getClientApi(id);

          reset({
            nombre: detail.nombre,
            apellidos: detail.apellidos,
            identificacion: detail.identificacion,
            telefonoCelular: detail.telefonoCelular,
            otroTelefono: detail.otroTelefono,
            direccion: detail.direccion,
            fNacimiento: toDateInputValue(detail.fNacimiento),
            fAfiliacion: toDateInputValue(detail.fAfiliacion),
            sexo: detail.sexo,
            resenaPersonal: detail.resenaPersonal,
            imagen: detail.imagen ?? "",
            interesFK: detail.interesesId,
          });
        }

        const loadedInterests = await getInterestsApi();
        setInterests(loadedInterests);
      } catch {
        setErrorMessage(
          "Hubo un inconveniente con la transaccion. No se pudo cargar la informacion.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, reset]);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Limite de 500 KB en base64 (aprox 819200 caracteres)
    const MAX_BASE64_SIZE = 500 * 1024; // 614400 bytes

    try {
      const base64 = await toBase64(file);
      if (base64.length > MAX_BASE64_SIZE) {
        setErrorMessage(
          "La imagen supera el tamaño máximo permitido (500 KB). Por favor, selecciona una imagen más pequeña.",
        );
        setValue("imagen", "", { shouldValidate: true });
        return;
      }
      setValue("imagen", base64, { shouldValidate: true });
    } catch {
      setErrorMessage("Hubo un inconveniente al cargar la imagen.");
    }
  };

  const onSubmit = async (values: ClientFormSchemaValues): Promise<void> => {
    if (!session?.userId) {
      setErrorMessage("No hay sesión activa. Inicie sesión nuevamente.");
      return;
    }

    setLoading(true);

    try {
      if (isEditMode && id) {
        await updateClientApi({
          id,
          nombre: values.nombre,
          apellidos: values.apellidos,
          identificacion: values.identificacion,
          celular: values.telefonoCelular,
          otroTelefono: values.otroTelefono,
          direccion: values.direccion,
          fNacimiento: values.fNacimiento,
          fAfiliacion: values.fAfiliacion,
          sexo: values.sexo,
          resennaPersonal: values.resenaPersonal,
          imagen: values.imagen,
          interesFK: values.interesFK,
          usuarioId: session.userId,
        });
        setSuccessMessage("Cliente actualizado correctamente.");
      } else {
        await createClientApi({
          nombre: values.nombre,
          apellidos: values.apellidos,
          identificacion: values.identificacion,
          celular: values.telefonoCelular,
          otroTelefono: values.otroTelefono,
          direccion: values.direccion,
          fNacimiento: values.fNacimiento,
          fAfiliacion: values.fAfiliacion,
          sexo: values.sexo,
          resennaPersonal: values.resenaPersonal,
          imagen: values.imagen,
          interesFK: values.interesFK,
          usuarioId: session.userId,
        });
        setSuccessMessage("Cliente creado correctamente.");
      }

      setTimeout(() => navigate("/clientes"), 1100);
    } catch {
      setErrorMessage(
        "Hubo un inconveniente con la transaccion. No se pudo guardar.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
      >
        <Typography variant="h4" fontWeight={700}>
          {isEditMode
            ? "Mantenimiento de clientes (Editar)"
            : "Mantenimiento de clientes"}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            type="submit"
            form={formId}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/clientes")}
            disabled={loading}
          >
            Regresar
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box
          component="form"
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Stack spacing={1.5} alignItems="center" sx={{ mt: 1 }}>
                <Avatar
                  src={
                    imagePreview
                      ? `data:image/*;base64,${imagePreview}`
                      : undefined
                  }
                  sx={{ width: 140, height: 140 }}
                />
                <Button variant="outlined" component="label">
                  Cargar imagen
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nombre *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("nombre")}
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Apellidos *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("apellidos")}
                    error={Boolean(errors.apellidos)}
                    helperText={errors.apellidos?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Identificación *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("identificacion")}
                    error={Boolean(errors.identificacion)}
                    helperText={errors.identificacion?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Teléfono celular *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("telefonoCelular")}
                    error={Boolean(errors.telefonoCelular)}
                    helperText={errors.telefonoCelular?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Otro teléfono *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("otroTelefono")}
                    error={Boolean(errors.otroTelefono)}
                    helperText={errors.otroTelefono?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Dirección *"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("direccion")}
                    error={Boolean(errors.direccion)}
                    helperText={errors.direccion?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Fecha de nacimiento *"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("fNacimiento")}
                    error={Boolean(errors.fNacimiento)}
                    helperText={errors.fNacimiento?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Fecha de afiliación *"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("fAfiliacion")}
                    error={Boolean(errors.fAfiliacion)}
                    helperText={errors.fAfiliacion?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.sexo)}>
                    <InputLabel id="sexo-label">Género *</InputLabel>
                    <Controller
                      name="sexo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="sexo-label"
                          label="Genero *"
                        >
                          <MenuItem value="M">Masculino</MenuItem>
                          <MenuItem value="F">Femenino</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.sexo?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={Boolean(errors.interesFK)}>
                    <InputLabel id="interes-label">Intereses *</InputLabel>
                    <Controller
                      name="interesFK"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="interes-label"
                          label="Intereses *"
                        >
                          {interests.map((interest) => (
                            <MenuItem value={interest.id} key={interest.id}>
                              {interest.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.interesFK?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reseña personal *"
                    fullWidth
                    multiline
                    minRows={3}
                    InputLabelProps={{ shrink: true }}
                    {...register("resenaPersonal")}
                    error={Boolean(errors.resenaPersonal)}
                    helperText={errors.resenaPersonal?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>

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
    </Stack>
  );
};

export default ClientFormPage;
