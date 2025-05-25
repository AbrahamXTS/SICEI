import { useAuth0 } from "@auth0/auth0-react";
import {
  Anchor,
  AppShell,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Navigate } from "react-router";

export const LandingPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader type="dots" />
      </Center>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AppShell
      header={{
        height: "8rem",
      }}
    >
      <AppShell.Header bd="0">
        <Flex h="100%">
          <Flex
            align="center"
            justify={{ base: "center", sm: "flex-start" }}
            px="md"
            w={{ base: "100%", sm: "auto" }}
          >
            <Image src="/full-logo.svg" h="7rem" w="auto" />
          </Flex>

          <Stack gap="0" visibleFrom="sm" w="100%">
            <Flex align="center" bg="primary" h="100%" px="md">
              <Text c="white" ff="Times new Romans" fz="xl" fw="bold">
                "Luz, Ciencia y Verdad"
              </Text>
            </Flex>

            <Flex align="center" bg="secondary" h="100%" justify="space-evenly">
              <Anchor c="white" href="#">
                Manual de usuarios
              </Anchor>
              <Anchor c="white" href="#">
                Aviso de privacidad
              </Anchor>
              <Anchor c="white" href="#">
                Contacto
              </Anchor>
            </Flex>
          </Stack>
        </Flex>
      </AppShell.Header>

      <AppShell.Main
        bg="linear-gradient(rgba(0, 46, 95, 0.6), rgba(0, 46, 95, 0.6)), url(/landing-background.jpg)"
        bgp="center center"
        bgr="no-repeat"
        bgsz="cover"
      >
        <Container h="calc(100vh - 8rem)" size="xl">
          <Flex
            align={{ base: "center", sm: "flex-start" }}
            direction="column"
            gap="lg"
            h="100%"
            justify="center"
            w={{ base: "100%", sm: "50%" }}
          >
            <Title c="white" order={2} tt="uppercase">
              Bienvenido al Sistema de Información y Control Escolar
              Institucional
            </Title>

            <Button
              onClick={() => loginWithRedirect()}
              size="md"
              w={{ base: "100%", sm: "fit-content" }}
            >
              Iniciar sesión
            </Button>
          </Flex>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
