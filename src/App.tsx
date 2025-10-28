import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PrivateLayout from "./layouts/PrivateLayout";
import System from "./pages/System";
import Profile from "./pages/Profile";
import { UsersProvider } from "./context/UsersContext";
import { SnackbarAlertProvider } from "./context/SnackbarAlertContext";

function App() {
  return (
    <BrowserRouter>
      <SnackbarAlertProvider>
        <UsersProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <PrivateLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<System />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UsersProvider>
      </SnackbarAlertProvider>
    </BrowserRouter>
  );
}

export default App;
