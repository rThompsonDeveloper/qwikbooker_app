import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, StaffManager } from "@/pages";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { StaffProvider } from "@/features/StaffManagement/context/StaffContext";
import StaffMemberView from "@/features/StaffManagement/components/StaffMemberView";
import StaffEditForm from "@/features/StaffManagement/forms/StaffEditForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <StaffProvider>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<div>Dashboard Content</div>} />
              <Route path="staff" element={<StaffManager />} />
              <Route path="staff/:id" element={<StaffMemberView />} />
              <Route path="staff/:id/edit" element={<StaffEditForm />} />
              <Route path="stores" element={<div>Stores Content</div>} />
            </Route>
          </Routes>
        </StaffProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
};

export default App;
