import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: "linear-gradient(145deg, #e6edf7 0%, #dbe6f4 100%)",
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h2" fontWeight={800} color="primary">
          404
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Pagina no encontrada
        </Typography>
        <Typography color="text.secondary" maxWidth={460}>
          La ruta solicitada no existe o no tiene permisos para visualizarla.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
