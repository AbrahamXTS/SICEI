import {
  Icon,
  IconChalkboardTeacher,
  IconHome,
  IconSchool,
  IconSettings,
  IconSubscript,
} from "@tabler/icons-react";

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
  {
    label: "Administración",
    url: "/dashboard/admin",
    icon: IconSettings,
    children: [
      {
        label: "Profesores",
        url: "/dashboard/admin/teachers",
        icon: IconChalkboardTeacher,
      },
      {
        label: "Estudiantes",
        url: "/dashboard/admin/students",
        icon: IconSchool,
      },
      {
        label: "Asignaturas",
        url: "/dashboard/admin/subjects",
        icon: IconSubscript,
      },
    ],
  },
];
