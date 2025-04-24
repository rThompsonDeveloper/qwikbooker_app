import { menuIcons } from "./icons";

export interface MenuRoute {
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: MenuRoute[];
}

export const menuRoutes: MenuRoute[] = [
  { label: "Home", path: "/", icon: menuIcons.dashboard },
  {
    label: "Stores",
    path: "/stores",
    icon: menuIcons.stores,
    submenu: [
      { label: "All Stores", path: "/stores" },
      { label: "Add New Store", path: "/stores/new" },
      { label: "Analytics", path: "/stores/analytics" },
    ],
  },
  {
    label: "Services",
    path: "/services",
    icon: menuIcons.services,
    submenu: [
      { label: "All Services", path: "/services" },
      { label: "Add New Service", path: "/services/new" },
    ],
  },
  {
    label: "Staff",
    path: "/staff",
    icon: menuIcons.staff,
    submenu: [
      { label: "All Staff", path: "/staff" },
      { label: "Add New Staff", path: "/staff/new" },
      { label: "Roles & Permissions", path: "/staff/roles" },
    ],
  },
  { label: "Settings", path: "/settings", icon: menuIcons.settings },
];
