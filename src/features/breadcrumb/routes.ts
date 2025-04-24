export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Map of path segments to their display labels
const pathLabels: Record<string, string> = {
  "": "Home", // Root path
  dashboard: "Dashboard",
  settings: "Settings",
  profile: "Profile",
  users: "Users",
  bookings: "Bookings",
  calendar: "Calendar",
  reports: "Reports",
};

export const getBreadcrumbItems = (currentPath: string): BreadcrumbItem[] => {
  // Remove leading slash and split path into segments
  const segments = currentPath.replace(/^\/+/, "").split("/");

  // Always start with home
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // Build up the path as we go through segments
  let currentPathBuilder = "";

  segments.forEach((segment, index) => {
    // Skip empty segments
    if (!segment) return;

    currentPathBuilder += `/${segment}`;

    // Get the display label, defaulting to a capitalized version of the segment
    const label =
      pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    // Only add href if it's not the last segment
    const href = index < segments.length - 1 ? currentPathBuilder : undefined;

    items.push({ label, href });
  });

  return items;
};
