import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

const Header = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { user, logout } = useUsers();

  const settings = ["Perfil", "Sair"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center">
      <HomeIcon
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer", fontSize: 35 }}
      />
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
            alt={user?.name}
          >
            {user?.name ? user.name[0].toUpperCase() : "?"}
          </Avatar>
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => {
                handleCloseUserMenu();
                if (setting === "Perfil") {
                  navigate("/profile");
                } else if (setting === "Sair") {
                  logout();
                }
              }}
            >
              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </header>
  );
};

export default Header;
