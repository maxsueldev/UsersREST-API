import { Alert, Card, CardContent, Snackbar } from "@mui/material";
import { useUsers } from "../../hooks/useUsers";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbarAlert } from "../../hooks/useSnackbarAlert";

const System = () => {
  const { getUsers, users, handleDeleteUser, handleEditUser } = useUsers();
  const { openAlert, handleCloseAlert } = useSnackbarAlert();

  useEffect(() => {
    getUsers();
  }, []);

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
      <Card className="max-w-[300px] mt-10 px-10 flex justify-center items-center">
        <CardContent>
          <h2 className="text-4xl font-bold text-center">
            {users.length} Usuários
          </h2>
        </CardContent>
      </Card>

      <Card className="max-w-[700px] mt-6 px-10">
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
