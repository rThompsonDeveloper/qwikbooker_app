import React, { useMemo } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableColumn } from "@/components/table";
import StaffListSkeleton from "./StaffListSkeleton";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffFormatting } from "../hooks/useStaffFormatting";
import { StaffMember } from "../context/StaffContext";

const StaffList: React.FC = () => {
  const { staff, loading, error } = useStaffData();
  const { navigateToStaffMember } = useStaffNavigation();
  const { getStatusColor, formatRole } = useStaffFormatting();

  const columns = useMemo<TableColumn<(typeof staff)[0]>[]>(
    () => [
      {
        key: "staff",
        header: "Staff Member",
        render: (member) => (
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {member.firstName} {member.lastName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatRole(member.role)}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "store",
        header: "Assigned Store",
        render: (member) => (
          <div className="text-gray-900 dark:text-white">
            {member.assignedStore ? member.assignedStore.name : "Not assigned"}
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        align: "right",
        render: (member) => (
          <span
            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
              member.status
            )}`}
          >
            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
          </span>
        ),
      },
    ],
    [formatRole, getStatusColor]
  );

  if (loading) {
    return <StaffListSkeleton />;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (staff.length === 0) {
    return <div className="text-center py-4">No staff members found</div>;
  }

  return (
    <Table<StaffMember>
      columns={columns}
      data={staff}
      keyExtractor={(item) => item.id}
      onRowClick={navigateToStaffMember}
    />
  );
};

export default React.memo(StaffList);
