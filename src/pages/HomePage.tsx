import React from "react";
import { Stack, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ 
        minHeight: "60vh", 
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        px: 2
      }}
    >
      <Typography 
        variant="h2" 
        fontWeight={800}
        sx={{
          fontSize: { xs: "2rem", sm: "3.5rem" }
        }}
      >
        Bienvenido
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Bienvenido al sistema de mantenimiento de clientes.
      </Typography>
    </Stack>
  );
};

export default HomePage;
