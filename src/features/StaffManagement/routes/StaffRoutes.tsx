import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import StaffList from "../components/StaffList";
import StaffMemberView from "../components/StaffMemberView";
import AddStaffPage from "../pages/AddStaffPage";
import EditStaffPage from "../pages/EditStaffPage";

const StaffRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<StaffList />} />
        <Route path="new" element={<AddStaffPage />} />
        <Route path=":id" element={<StaffMemberView />} />
        <Route path=":id/edit" element={<EditStaffPage />} />
      </Route>
    </Routes>
  );
};

export default StaffRoutes;
