import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      navigate("/system");
    }
  }, [navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const checkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Email ou senha inválido");
        setEmail("");
        setPassword("");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/system");
    } catch (err: any) {
      console.log(err);
      setError("Erro no servidor");
      setEmail("");
      setPassword("");
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
        {error && <p className="text-red-400 mt-4">{error}</p>}

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
    </div>
  );
};

export default Login;
