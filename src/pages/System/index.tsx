import { Alert, Card, CardContent, Snackbar } from "@mui/material";
import { useUsers } from "../../hooks/useUsers";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbarAlert } from "../../hooks/useSnackbarAlert";

const System = () => {
  const { getUsers, users, updateUser, deleteUser, setUsers } = useUsers();
  const { openAlert, setOpenAlert, handleCloseAlert } = useSnackbarAlert();

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditUser = async (id: string) => {
    const user = users.find((u) => u._id === id);
    if (!user) return;
    const newName = prompt("Novo nome:", user.name);
    const newEmail = prompt("Novo email:", user.email);
    if (newName && newEmail) {
      try {
        const updatedUser = await updateUser({
          ...user,
          name: newName,
          email: newEmail,
        });

        setUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );

        setOpenAlert({
          open: true,
          message: "Usuário alterado com sucesso!",
          severity: "success",
        });
      } catch (error) {
        setOpenAlert({
          open: true,
          message: `Erro ao atualizar usuário: ${error}`,
          severity: "error",
        });
        console.error("Erro ao atualizar usuário:", error);
      }
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Deseja excluir este usuário?")) deleteUser(id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2 mt-3">
          <EditIcon
            className="cursor-pointer"
            color="primary"
            onClick={() => handleEditUser(params.row.id)}
          />
          <DeleteIcon
            className="cursor-pointer"
            color="error"
            onClick={() => handleDeleteUser(params.row.id)}
          />
        </div>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id, // DataGrid exige "id"
    name: user.name,
    email: user.email,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex gap-4 flex-wrap">
      <Card className="max-w-[300px] mt-10 px-10">
        <CardContent>
          <h2 className="text-4xl font-bold text-center">
            {users.length} Usuários
          </h2>
        </CardContent>
      </Card>

      <Card className="w-full mt-6 px-10">
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </CardContent>
      </Card>

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

export default System;
