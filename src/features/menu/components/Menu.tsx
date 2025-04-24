import React from "react";
import MenuItem from "./MenuItem";
import { menuRoutes } from "../routes";

const Menu: React.FC = () => {
  return (
    <ul className="space-y-2">
      {menuRoutes.map((route, index) => (
        <MenuItem
          key={index}
          label={route.label}
          path={route.path}
          icon={route.icon}
          submenu={route.submenu}
        />
      ))}
    </ul>
  );
};

export default Menu;
