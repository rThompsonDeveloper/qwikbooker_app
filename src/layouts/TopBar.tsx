import React from "react";
import { Breadcrumb } from "../features/breadcrumb";
import { useDarkMode } from "@/context/DarkModeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const TopBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="h-16 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-sm flex items-center px-6">
      <Breadcrumb />
      <button
        onClick={toggleDarkMode}
        className="ml-auto p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        {isDarkMode ? (
          <SunIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
    </header>
  );
};

export default TopBar;
