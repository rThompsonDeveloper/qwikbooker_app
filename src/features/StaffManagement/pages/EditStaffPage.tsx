import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStaff } from "../context/StaffContext";
import StaffForm from "../components/StaffForm";
import { StaffMember } from "../types";

const EditStaffPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { staff, editStaff } = useStaff();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);

  useEffect(() => {
    const member = staff.find((m) => m.id === id);
    if (member) {
      setStaffMember(member);
    } else {
      // Handle case where staff member is not found
      navigate("/staff");
    }
  }, [id, staff, navigate]);

  const handleSubmit = async (data: Omit<StaffMember, "id">) => {
    if (!id) return;
    try {
      setIsSubmitting(true);
      await editStaff(id, data);
      navigate("/staff");
    } catch (error) {
      console.error("Failed to update staff member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!staffMember) {
    return null; // Or a loading state
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Staff Member
        </h1>
        <StaffForm
          initialValues={staffMember}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditStaffPage;
