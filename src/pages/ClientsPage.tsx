import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { deleteClientApi, searchClientsApi } from "../api/clientsApi";
import { useAuth } from "../context/AuthContext";
import {
  SearchClientFormValues,
  searchClientSchema,
} from "../schemas/clientSchemas";
import { ClientListItem } from "../types/client";

const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SearchClientFormValues>({
    resolver: zodResolver(searchClientSchema),
    defaultValues: {
      identificacion: "",
      nombre: "",
    },
  });

  const hasConfirmDialog = useMemo<boolean>(
    () => Boolean(selectedClientId),
    [selectedClientId],
  );

  const fetchClients = useCallback(
    async (values?: SearchClientFormValues): Promise<void> => {
      if (!session?.userId) {
        return;
      }

      setLoading(true);

      try {
        const data = await searchClientsApi({
          usuarioId: session.userId,
          identificacion: values?.identificacion || undefined,
          nombre: values?.nombre || undefined,
        });
        setClients(data);
      } catch {
        setErrorMessage(
          "Hubo un inconveniente con la transaccion. No fue posible cargar clientes.",
        );
      } finally {
        setLoading(false);
      }
    },
    [session?.userId],
  );

  useEffect(() => {
    const currentValues = getValues();
    fetchClients(currentValues);
  }, [fetchClients, getValues]);

  const onSubmit = async (values: SearchClientFormValues): Promise<void> => {
    await fetchClients(values);
  };

  const onDelete = async (): Promise<void> => {
    if (!selectedClientId) {
      return;
    }

    try {
      await deleteClientApi(selectedClientId);
      setSuccessMessage("El cliente fue eliminado correctamente.");
      setSelectedClientId("");
      await fetchClients(getValues());
    } catch {
      setErrorMessage(
        "Hubo un inconveniente con la transaccion. No se pudo eliminar.",
      );
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
          Consulta Clientes
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/clientes/nuevo")}
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Regresar
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2.5, borderRadius: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              label="Identificación"
              {...register("identificacion")}
              error={Boolean(errors.identificacion)}
              helperText={errors.identificacion?.message}
              fullWidth
            />
            <TextField
              label="Nombre"
              {...register("nombre")}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre?.message}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ height: 56, width: "50%" }}
            >
              Buscar
            </Button>
          </Stack>
        </Box>
      </Paper>

      <div className="max-w-100">
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            width: "100%",
            overflowX: "auto",
            maxWidth: "100vw",
          }}
        >
          <Table sx={{ minWidth: 200 }}>
            <TableHead>
              <TableRow>
                <TableCell>Identificación</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography
                      color="text.secondary"
                      textAlign="center"
                      py={2}
                    >
                      No hay registros para mostrar.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id} hover>
                    <TableCell>{client.identificacion}</TableCell>
                    <TableCell>
                      {client.nombre} {client.apellidos}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Editar"
                          onClick={() =>
                            navigate(`/clientes/${client.id}/editar`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          aria-label="Eliminar"
                          onClick={() => setSelectedClientId(client.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={hasConfirmDialog} onClose={() => setSelectedClientId("")}>
        <DialogTitle>Eliminar cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta seguro de eliminar este cliente? Esta accion no se puede
            deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedClientId("")}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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

export default ClientsPage;
