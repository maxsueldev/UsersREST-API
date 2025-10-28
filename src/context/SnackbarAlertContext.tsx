import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type SyntheticEvent,
} from "react";

import type { AlertColor } from "@mui/material/Alert";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface SnackbarAlertContextType {
  openAlert: AlertState;
  setOpenAlert: Dispatch<SetStateAction<AlertState>>;
  handleCloseAlert: (event?: SyntheticEvent | Event, reason?: string) => void;
}

export const SnackbarAlertContext = createContext<SnackbarAlertContextType>({
  openAlert: { open: false, message: "", severity: "success" },
  setOpenAlert: () => {},
  handleCloseAlert: () => {},
});

interface SnackbarAlertProviderProps {
  children: ReactNode;
}

export const SnackbarAlertProvider = ({
  children,
}: SnackbarAlertProviderProps) => {
  const [openAlert, setOpenAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseAlert = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };

  return (
    <SnackbarAlertContext.Provider
      value={{ openAlert, setOpenAlert, handleCloseAlert }}
    >
      {children}
    </SnackbarAlertContext.Provider>
  );
};
