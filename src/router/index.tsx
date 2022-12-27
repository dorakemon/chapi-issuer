import { Navigate, useRoutes } from "react-router-dom";

import { Issuer } from "@/pages/Issuer";

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/issuer", element: <Issuer /> },
    { path: "*", element: <Navigate to="/issuer" replace /> },
  ];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
