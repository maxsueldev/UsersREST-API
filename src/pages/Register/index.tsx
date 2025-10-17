import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const registerUser = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      setError("Preencha todos os campos para cadastrar");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        setError("Houve um erro nos dados");
        setName("");
        setEmail("");
        setPassword("");
        return;
      }

      // const data = await response.json();

      navigate("/login");
    } catch (error) {
      setError("Erro no servidor");
      return;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        action={registerUser}
        className="flex flex-col items-center bg-white rounded-2xl py-10 px-4"
      >
        <h1 className="text-4xl">Cadastro</h1>
        <TextField
          label="Nome"
          variant="standard"
          sx={{ width: 300 }}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="standard"
          sx={{ width: 300 }}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ width: 300 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Senha:</InputLabel>
          <Input
            id="standard-adornment-password"
            type={"password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <Button variant="contained" sx={{ m: 3 }} type="submit" color="success">
          Cadastrar
        </Button>
        <p>Já tem cadastro? </p>
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
