import { Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

export const LandingPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <Button onClick={() => loginWithRedirect()}>Iniciar sesión</Button>;
};
