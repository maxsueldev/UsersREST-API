import {
  Alert,
  Button,
  FormControl,
  Input,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { useSnackbarAlert } from "../../hooks/useSnackbarAlert";

const Register = () => {
  const {
    registerUser,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useUsers();

  const { openAlert, handleCloseAlert } = useSnackbarAlert();

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

        {/* {error && <p className="text-red-400 mt-4">{error}</p>} */}

        <Button variant="contained" sx={{ m: 3 }} type="submit" color="success">
          Cadastrar
        </Button>
        <p>Já tem cadastro? </p>
        <Link to="/login" className="text-blue-500">
          Login
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

export default Register;
