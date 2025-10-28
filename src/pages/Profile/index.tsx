import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useUsers } from "../../hooks/useUsers";
import { useSnackbarAlert } from "../../hooks/useSnackbarAlert";

const Profile = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    editMode,
    setEditMode,
    handleUpdate,
    getUserFromLocalStorage,
  } = useUsers();

  const { handleCloseAlert, openAlert } = useSnackbarAlert();

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <Card className="max-w-[600px] mx-auto mt-10 px-10">
        <CardContent>
          <h2 className="text-4xl font-bold mb-6 text-center">
            Perfil do Usuário
          </h2>
          <div className="flex justify-between flex-wrap">
            <div className="flex gap-4">
              <Avatar sx={{ width: 60, height: 60 }} />
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editMode}
                />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="m-auto md:m-0">
              {editMode ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdate}
                >
                  Salvar
                </Button>
              ) : (
                <EditIcon
                  className="cursor-pointer text-gray-600 hover:text-black"
                  onClick={handleEditToggle}
                />
              )}
            </div>
          </div>
        </CardContent>

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
      </Card>
    </>
  );
};

export default Profile;
