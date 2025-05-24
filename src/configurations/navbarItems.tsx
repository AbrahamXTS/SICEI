import { Icon, IconHome } from "@tabler/icons-react";

export interface NavbarItemType {
  children?: NavbarItemType[];
  icon: Icon;
  label: string;
  url: string;
}

export const NAVBAR_ITEMS: NavbarItemType[] = [
  {
    label: "Inicio",
    url: "/dashboard",
    icon: IconHome,
  },
];
