import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

// Using the PROFESSIONAL STYLE advanced sidebar (all sections, hierarchical)
// This ensures ALL admin pages use the same consistent sidebar
export function AdminSidebarWorking(currentPath: string = '/admin') {
  return AdminSidebarAdvanced(currentPath);
}
