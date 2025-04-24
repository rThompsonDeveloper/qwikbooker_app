import React from "react";
import StaffList from "./components/StaffList";

const StaffManager: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Staff Management
        </h1>
        <div className="flex items-center space-x-4">
          {/* Add any header actions here */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <StaffList />
      </div>
    </div>
  );
};

export default StaffManager;
