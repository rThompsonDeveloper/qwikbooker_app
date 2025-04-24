import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface MenuItemProps {
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: MenuItemProps[];
}

const MenuItem: React.FC<MenuItemProps> = ({ label, path, icon, submenu }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  const isActive =
    location.pathname === path ||
    (submenu && submenu.some((item) => location.pathname === item.path));

  const toggleSubmenu = (e: React.MouseEvent) => {
    if (submenu) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  return (
    <li>
      <Link
        to={path}
        onClick={toggleSubmenu}
        className={`flex items-center justify-between px-4 py-3 rounded-md transition-colors duration-200 ${
          isActive
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <div className="flex items-center">
          {icon && (
            <span
              className={`mr-3 ${
                isActive
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {icon}
            </span>
          )}
          <span className="font-medium">{label}</span>
        </div>
        {submenu && (
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              isSubmenuOpen ? "transform rotate-180" : ""
            }`}
          />
        )}
      </Link>
      {submenu && isSubmenuOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          {submenu.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
