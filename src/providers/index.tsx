import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>{children}</Router>
    </Suspense>
  );
};
