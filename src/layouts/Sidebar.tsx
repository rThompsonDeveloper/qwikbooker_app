import React from "react";
import { Menu } from "../features/menu";
import Button from "@/components/ui/Button";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm flex flex-col h-screen">
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Qwikbooker
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lawn Care Pro
            </p>
          </div>
          <Menu />
        </div>
      </nav>
      <div className="p-4">
        <Button
          variant="danger"
          fullWidth
          onClick={handleLogout}
          className="flex items-center justify-center gap-2"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
