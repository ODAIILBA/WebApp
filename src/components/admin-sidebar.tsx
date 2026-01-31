import { AdminSidebarWorking } from './admin-sidebar-working'

// Now points to the working sidebar (15 functional pages only)
export function AdminSidebar(currentPath: string = '/admin') {
  return AdminSidebarWorking(currentPath);
}
