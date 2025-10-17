import { Button } from "@mui/material";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center">
      <FaHome className="text-4xl" />
      <Button variant="text" onClick={logout}>
        Sair
      </Button>
    </header>
  );
};

export default Header;
