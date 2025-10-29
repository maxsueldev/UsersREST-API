import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useSnackbarAlert } from "../../hooks/useSnackbarAlert";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { checkLogin, email, setEmail, password, setPassword, loading } =
    useUsers();

  const { handleCloseAlert, openAlert } = useSnackbarAlert();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      navigate("/");
    }
  }, [navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={checkLogin}
        className="flex flex-col items-center bg-white rounded-2xl py-10 px-4"
      >
        <h1 className="text-4xl">Login</h1>
        <TextField
          label="Email: "
          variant="standard"
          sx={{ width: 300 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ width: 300 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Senha:</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {loading && <CircularProgress className="mt-6" />}
        {/* {error && <p className="text-red-400 mt-4">{error}</p>} */}

        <Button
          variant="contained"
          sx={{ m: 3 }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando" : "Entrar"}
        </Button>

        <p>Não tem uma conta? </p>
        <Link to="/register" className="text-blue-500">
          Cadastrar
        </Link>
      </form>

      <Snackbar
        open={openAlert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={openAlert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
