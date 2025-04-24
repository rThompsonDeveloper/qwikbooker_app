import React from "react";
import Breadcrumb from "../../breadcrumb/components/Breadcrumb";

const TopBar: React.FC = () => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
      <Breadcrumb />
      <div className="flex items-center space-x-4">
        {/* Add any additional top bar items here */}
      </div>
    </div>
  );
};

export default TopBar;
