import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/layouts";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return <DashboardLayout>{children || <Outlet />}</DashboardLayout>;
};

export default Dashboard;
