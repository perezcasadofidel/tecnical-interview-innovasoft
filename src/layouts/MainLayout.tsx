import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;
const desktopNavbarHeight = 88;
const mobileNavbarHeight = 64;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = (): void => {
    setMobileOpen((prev) => !prev);
  };

  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  const drawer = (
    <Box>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              width: { xs: 64, sm: 140 },
              height: { xs: 64, sm: 140 },
              bgcolor: "grey.400",
              mb: { xs: 0.5, sm: 0 },
            }}
          >
            <PersonIcon
              sx={{ fontSize: { xs: 36, sm: 72 }, color: "common.white" }}
            />
          </Avatar>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              textAlign: "center",
              wordBreak: "break-word",
              maxWidth: "100%",
            }}
          >
            {session?.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              textAlign: "center",
              width: "100%",
              letterSpacing: 1,
              mt: { xs: 0.5, sm: 0 },
            }}
          >
            Menú
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            selected={location.pathname === "/"}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/clientes"
            selected={location.pathname.startsWith("/clientes")}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Consulta Clientes" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f3f6fb" }}>
      <AppBar
        position="fixed"
        sx={{
          height: { xs: mobileNavbarHeight, sm: desktopNavbarHeight },
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: `${mobileNavbarHeight}px !important`,
              sm: `${desktopNavbarHeight}px !important`,
            },
            px: { xs: 1, sm: 2 },
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              minWidth: 0,
              fontSize: { xs: "0.95rem", sm: "1.25rem" },
            }}
          >
            Gestión de clientes
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              ml: 0.5,
              flexShrink: 0,
            }}
          >
            <LogoutIcon />
          </IconButton>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          mt: { sm: `${desktopNavbarHeight}px` },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: `${mobileNavbarHeight}px`,
              height: `calc(100% - ${mobileNavbarHeight}px)`,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: `${desktopNavbarHeight}px`,
              height: `calc(100% - ${desktopNavbarHeight}px)`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: {
            xs: `${mobileNavbarHeight}px`,
            sm: `${desktopNavbarHeight}px`,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
