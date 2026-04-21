import React from "react";
import { Stack, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ minHeight: "60vh", width: "100%" }}
    >
      <Typography variant="h2" fontWeight={800}>
        Bienvenido
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Bienvenido al sistema de mantenimiento de clientes.
      </Typography>
    </Stack>
  );
};

export default HomePage;
