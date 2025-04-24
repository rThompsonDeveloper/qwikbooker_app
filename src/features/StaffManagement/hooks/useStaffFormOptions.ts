export const useStaffFormOptions = () => {
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "store manager", label: "Store Manager" },
    { value: "staff", label: "Staff" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ];

  return {
    roleOptions,
    statusOptions,
    countryOptions,
  };
};
