import { StaffMember } from "../types";

export const useStaffFormatting = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "store manager":
        return "Store Manager";
      case "staff":
        return "Staff";
      default:
        return role;
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatFullName = (member: StaffMember) => {
    return `${member.firstName} ${member.lastName}`;
  };

  const formatAddress = (member: StaffMember) => {
    return `${member.address.street}, ${member.address.city}, ${member.address.state} ${member.address.zipCode}`;
  };

  return {
    getStatusColor,
    formatRole,
    formatStatus,
    formatFullName,
    formatAddress,
  };
};
