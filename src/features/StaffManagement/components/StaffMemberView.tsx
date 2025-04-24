import React from "react";
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffFormatting } from "../hooks/useStaffFormatting";

const StaffMemberView: React.FC = () => {
  const { currentStaffMember: member, error } = useStaffData();
  const { navigateToEditStaff } = useStaffNavigation();
  const { getStatusColor, formatRole, formatAddress } = useStaffFormatting();

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (!member) {
    return <div className="text-center py-4">Staff member not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="w-16 h-16 text-gray-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {member.firstName} {member.lastName}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    {formatRole(member.role)}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      member.status
                    )}`}
                  >
                    {member.status.charAt(0).toUpperCase() +
                      member.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigateToEditStaff(member.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {member.phoneNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {member.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatAddress(member)}
                  </span>
                </div>
              </div>
            </div>

            {/* Store Assignment */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Store Assignment
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <BuildingStorefrontIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {member.assignedStore
                      ? member.assignedStore.name
                      : "Not assigned"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Joined on {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMemberView;
