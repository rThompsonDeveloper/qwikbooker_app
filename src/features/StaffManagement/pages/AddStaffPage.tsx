import React from "react";
import { useNavigate } from "react-router-dom";
import { useStaff } from "../context/StaffContext";
import StaffForm from "../components/StaffForm";
import { StaffMember } from "../types";

const AddStaffPage: React.FC = () => {
  const navigate = useNavigate();
  const { createStaff } = useStaff();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: Omit<StaffMember, "id">) => {
    try {
      setIsSubmitting(true);
      await createStaff(data);
      navigate("/staff");
    } catch (error) {
      console.error("Failed to create staff member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Add New Staff Member
        </h1>
        <StaffForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default AddStaffPage;
