import { Card, CardContent } from "@mui/material";
import { useUsers } from "../../hooks/useUsers";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

const System = () => {
  const { getUsers, users } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
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
    </div>
  );
};

export default System;
