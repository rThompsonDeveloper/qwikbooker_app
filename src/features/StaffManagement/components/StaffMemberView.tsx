import React, { useCallback, useMemo, useState } from "react";
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffFormatting } from "../hooks/useStaffFormatting";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useStaff } from "../context/StaffContext";

const StaffMemberView: React.FC = () => {
  const { currentStaffMember: member, error } = useStaffData();
  const { navigateToEditStaff, navigateToStaffList } = useStaffNavigation();
  const { getStatusColor, formatRole, formatAddress } = useStaffFormatting();
  const { removeStaff } = useStaff();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = useCallback(() => {
    if (member) {
      navigateToEditStaff(member.id);
    }
  }, [navigateToEditStaff, member]);

  const handleDeleteClick = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (member) {
      try {
        setIsDeleting(true);
        await removeStaff(member.id);
        navigateToStaffList();
      } catch (error) {
        console.error("Failed to delete staff member:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  }, [member, removeStaff, navigateToStaffList]);

  const formattedJoinDate = useMemo(
    () => (member ? new Date(member.joinDate).toLocaleDateString() : ""),
    [member?.joinDate]
  );

  const formattedAddress = useMemo(
    () => (member ? formatAddress(member) : ""),
    [member, formatAddress]
  );

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (!member) {
    return <div className="text-center py-4">Staff member not found</div>;
  }

  return (
    <>
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
              <div className="flex space-x-3">
                <Button onClick={handleEditClick} variant="primary" size="md">
                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleDeleteClick} variant="danger" size="md">
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
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
                      {formattedAddress}
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
                      Joined on {formattedJoinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Staff Member"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete {member?.firstName}{" "}
            {member?.lastName}? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(StaffMemberView);
