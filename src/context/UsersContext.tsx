import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../interface/User";
import { useSnackbarAlert } from "../hooks/useSnackbarAlert";

interface UsersContextType {
  checkLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  registerUser: (formData: FormData) => Promise<void>;
  updateUser: (user: User) => Promise<User>;
  deleteUser: (id: string) => void;
  handleUpdate: () => void;
  getUserFromLocalStorage: () => void;
  logout: () => void;
  getUsers: () => Promise<void>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  loading: boolean;
}

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const { setOpenAlert } = useSnackbarAlert();

  const checkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Email ou senha inválido");
        setOpenAlert({
          open: true,
          message: "Email ou senha inválido",
          severity: "error",
        });
        setEmail("");
        setPassword("");
        setLoading(false);
        return;
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setEmail("");
      setPassword("");
      // setOpenAlert({
      //   open: true,
      //   message: "Seja bem-vindo!",
      //   severity: "success",
      // });
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setError("Erro no servidor");
      setOpenAlert({
        open: true,
        message: "Erro no servidor",
        severity: "error",
      });
      setEmail("");
      setPassword("");

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (name === "" || email === "" || password === "") {
      setError("Preencha todos os campos para cadastrar");
      setOpenAlert({
        open: true,
        message: "Preencha todos os campos para cadastrar",
        severity: "error",
      });
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
        setOpenAlert({
          open: true,
          message: "Houve um erro nos dados",
          severity: "error",
        });
        setName("");
        setEmail("");
        setPassword("");
        return;
      }

      // const data = await response.json();

      setEmail("");
      setPassword("");
      setName("");

      setOpenAlert({
        open: true,
        message: "Usuário cadastrado com sucesso!",
        severity: "success",
      });
      // navigate("/login");
    } catch (error) {
      setError("Erro no servidor");
      setOpenAlert({
        open: true,
        message: "Erro no servidor",
        severity: "error",
      });
      return;
    }
  };

  const updateUser = async (user: User) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        setOpenAlert({
          open: true,
          message: `Erro ao atualizar usuário: ${response.status}`,
          severity: "error",
        });
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
      }

      const updatedUser: User = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setOpenAlert({
        open: true,
        message: "Usuário atualizado com sucesso!",
        severity: "success",
      });

      return updatedUser;
    } catch (error) {
      setOpenAlert({
        open: true,
        message: `Erro ao salvar usuário: ${error}`,
        severity: "error",
      });
      console.error("Erro ao salvar usuário:", error);
      throw error;
    }
  };

  const handleUpdate = () => {
    if (!user) return;

    const updatedUser: User = { ...user, name, email };
    updateUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setName(parsedUser.name);
        setEmail(parsedUser.email);
      } catch (error) {
        console.error("Erro ao buscar usuário no localstorage:", error);
        setUser(null);
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);

      if (!response.ok) throw new Error("Erro ao buscar usuários");

      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao pegar dados dos usuários:", error);
      setOpenAlert({
        open: true,
        message: `Erro ao pegar dados dos usuários: ${error}`,
        severity: "error",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteUser = () => {};

  return (
    <UsersContext.Provider
      value={{
        checkLogin,
        registerUser,
        updateUser,
        deleteUser,
        handleUpdate,
        getUserFromLocalStorage,
        logout,
        getUsers,
        users,
        setUsers,
        editMode,
        setEditMode,
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        error,
        loading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
