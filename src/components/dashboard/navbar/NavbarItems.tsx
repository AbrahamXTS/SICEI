import { NavLink as NavLinkMantine } from "@mantine/core";
import { NavLink } from "react-router";

import { NAVBAR_ITEMS, NavbarItemType } from "@/configurations";

export const NavbarItems = () => {
  return <>{renderNavLinks(NAVBAR_ITEMS)}</>;
};

const renderNavLinks = (links: NavbarItemType[]) => {
  return links.map(({ icon, label, url, children }) => {
    const Icon = icon;

    return (
      <NavLinkMantine
        component={NavLink}
        defaultOpened
        end
        key={url}
        label={label}
        leftSection={<Icon size="1rem" stroke={1.5} />}
        to={url}
      >
        {children && renderNavLinks(children)}
      </NavLinkMantine>
    );
  });
};
