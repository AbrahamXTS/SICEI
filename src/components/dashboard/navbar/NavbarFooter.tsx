import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Flex, Menu, Text } from "@mantine/core";
import { IconLogout2 } from "@tabler/icons-react";

export const NavbarFooter = () => {
  const { logout, user } = useAuth0();

  return (
    <Menu width="target">
      <Menu.Target>
        <Button
          color="gray"
          fullWidth
          h="3rem"
          leftSection={<Avatar name={user?.name} src={user?.picture} />}
          variant="subtle"
        >
          <Flex align="flex-start" direction="column">
            <Text c="dark" fw="500" size="sm">
              {user?.name}
            </Text>

            <Text c="dimmed" size="xs">
              {user?.email}
            </Text>
          </Flex>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Cuenta</Menu.Label>
        <Menu.Item
          leftSection={<IconLogout2 size="1rem" />}
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: import.meta.env.VITE_APPLICATION_HOST,
              },
            })
          }
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
