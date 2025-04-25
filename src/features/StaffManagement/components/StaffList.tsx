import React, { useMemo, useCallback, useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableColumn } from "@/components/table";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffFormatting } from "../hooks/useStaffFormatting";
import { StaffMember } from "../types";
import { useDebounce } from "@/hooks/useDebounce";

const StaffList: React.FC = () => {
  const { staff, loadMore, isLoading, hasMore, search } = useStaffData();
  const { navigateToStaffMember } = useStaffNavigation();
  const { getStatusColor, formatRole } = useStaffFormatting();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    search(debouncedSearchTerm);
  }, [debouncedSearchTerm, search]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadMore();
    }
  }, [loadMore, isLoading, hasMore]);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Staff Members
        </h2>
        <input
          type="text"
          placeholder="Search staff..."
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table<StaffMember>
        columns={columns}
        data={staff}
        keyExtractor={(item) => item.id}
        onRowClick={navigateToStaffMember}
        onEndReached={handleLoadMore}
        isLoading={isLoading}
      />
    </div>
  );
};

export default React.memo(StaffList);
