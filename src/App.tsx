import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { ErrorProvider } from "@/context/ErrorContext";
import StaffManager from "@/features/StaffManagement/StaffManager";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<div>Dashboard Content</div>} />
              <Route path="staff/*" element={<StaffManager />} />
              <Route path="stores" element={<div>Stores Content</div>} />
            </Route>
          </Routes>
        </DarkModeProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
