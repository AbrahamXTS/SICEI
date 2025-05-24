import { useAuth0 } from "@auth0/auth0-react";
import { Center, Loader } from "@mantine/core";
import { Navigate, Outlet } from "react-router";

export const ProtectRoute = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader type="dots" />
      </Center>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
