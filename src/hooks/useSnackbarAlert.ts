import { useContext } from "react";
import { SnackbarAlertContext } from "../context/SnackbarAlertContext";

export const useSnackbarAlert = () => {
  const context = useContext(SnackbarAlertContext);

  if (!context) {
    throw new Error(
      "useSnackbarAlert deve ser usado dentro de um <SnackbarAlertProvider>"
    );
  }

  return context;
};
