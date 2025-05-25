import {
  ActionIcon,
  AppShell,
  Box,
  Center,
  Container,
  Drawer,
  Flex,
  Image,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutSidebar } from "@tabler/icons-react";
import { Outlet } from "react-router";

import { NavbarFooter, NavbarItems } from "@/components/dashboard/navbar";
import { BRAND_LOGO_SRC } from "@/configurations";

export const DashboardLayout = () => {
  const { colors } = useMantineTheme();
  const [isNavbarOpen, { close: closeNavbar, open: openNavbar }] =
    useDisclosure();

  return (
    <AppShell
      header={{
        height: "4rem",
      }}
    >
      <AppShell.Header bg="secondary">
        <Flex align="center" h="100%" px="md">
          <ActionIcon onClick={openNavbar} variant="subtle">
            <IconLayoutSidebar color="white" />
          </ActionIcon>
        </Flex>
      </AppShell.Header>

      <Drawer
        keepMounted
        onClose={closeNavbar}
        opened={isNavbarOpen}
        size="xs"
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 60px)",
            paddingBottom: "0rem",
          },
        }}
      >
        <Center mb="1rem">
          <Image src={BRAND_LOGO_SRC} h="7rem" w="7rem" />
        </Center>

        <ScrollArea flex={1} mb="1rem">
          <NavbarItems />
        </ScrollArea>

        <Box mb="1rem">
          <NavbarFooter />
        </Box>
      </Drawer>

      <AppShell.Main bg={colors.gray[0]}>
        <Container pb="xl" size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
