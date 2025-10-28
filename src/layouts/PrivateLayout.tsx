import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";

const PrivateLayout = () => {
  const { getUserFromLocalStorage } = useUsers();

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
