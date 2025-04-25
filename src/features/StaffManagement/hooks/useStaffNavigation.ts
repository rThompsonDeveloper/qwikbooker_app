import { useNavigate } from "react-router-dom";
import { StaffMember } from "../types";

export const useStaffNavigation = () => {
  const navigate = useNavigate();

  const navigateToStaffMember = (memberOrId: StaffMember | string) => {
    const id = typeof memberOrId === "string" ? memberOrId : memberOrId.id;
    navigate(`/staff/${id}`);
  };

  const navigateToEditStaff = (memberOrId: StaffMember | string) => {
    const id = typeof memberOrId === "string" ? memberOrId : memberOrId.id;
    navigate(`/staff/${id}/edit`);
  };

  const navigateToStaffList = () => {
    navigate("/staff");
  };

  return {
    navigateToStaffMember,
    navigateToEditStaff,
    navigateToStaffList,
  };
};
