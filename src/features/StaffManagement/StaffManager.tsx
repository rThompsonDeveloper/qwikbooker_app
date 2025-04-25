import React from "react";
import { StaffProvider } from "./context/StaffContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import StaffRoutes from "./routes/StaffRoutes";

const StaffManager: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StaffProvider>
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex-none flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staff Management
          </h1>
          <Button
            onClick={() => navigate("/staff/new")}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Staff
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <StaffRoutes />
        </div>
      </div>
    </StaffProvider>
  );
};

export default StaffManager;
