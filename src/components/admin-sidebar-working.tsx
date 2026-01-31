export function AdminSidebarWorking(currentPath: string = '/admin') {
  // ONLY WORKING PAGES - 12 functional admin pages
  const menuStructure = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'tachometer-alt',
      path: '/admin',
      children: [
        { path: '/admin', label: 'Übersicht', icon: 'chart-line' }
      ]
    },
    {
      id: 'orders',
      label: 'Bestellungen',
      icon: 'shopping-cart',
      children: [
        { path: '/admin/orders/completed', label: 'Abgeschlossen', icon: 'check-circle' },
        { path: '/admin/orders/cancelled', label: 'Storniert', icon: 'times-circle' },
        { path: '/admin/shipping-status', label: 'Versandstatus (Digital)', icon: 'truck' }
      ]
    },
    {
      id: 'licenses',
      label: 'Lizenzen',
      icon: 'key',
      children: [
        { path: '/admin/license-assignments', label: 'Schlüssel-Zuweisung', icon: 'user-tag' }
      ]
    },
    {
      id: 'customers',
      label: 'Kunden',
      icon: 'users',
      children: [
        { path: '/admin/customers', label: 'Alle Kunden', icon: 'list' }
      ]
    },
    {
      id: 'payments',
      label: 'Zahlungen',
      icon: 'credit-card',
      children: [
        { path: '/admin/payments', label: 'Zahlungsübersicht', icon: 'list' },
        { path: '/admin/payment-providers', label: 'Zahlungsanbieter', icon: 'building' },
        { path: '/admin/payment-methods', label: 'Zahlungsmethoden', icon: 'wallet' },
        { path: '/admin/checkout-settings', label: 'Checkout-Einstellungen', icon: 'shopping-cart' },
        { path: '/admin/currencies', label: 'Währungen', icon: 'money-bill-wave' },
        { path: '/admin/subscriptions', label: 'Abonnements', icon: 'sync-alt' },
        { path: '/admin/fraud-prevention', label: 'Betrugsprävention', icon: 'shield-alt' }
      ]
    }
  ];

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/admin' && currentPath === '/admin') return true;
    if (path !== '/admin' && currentPath.startsWith(path)) return true;
    return false;
  };

  // Generate menu items HTML
  const generateMenuItems = (items: any[], level = 0) => {
    return items.map(item => {
      const active = isActive(item.path);
      const hasChildren = item.children && item.children.length > 0;
      
      if (hasChildren) {
        const isAnyChildActive = item.children.some((child: any) => isActive(child.path));
        return `
          <div class="mb-2">
            <div class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded cursor-pointer" 
                 onclick="this.nextElementSibling.classList.toggle('hidden')">
              <i class="fas fa-${item.icon} w-5"></i>
              <span class="ml-3 flex-1">${item.label}</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
            <div class="${isAnyChildActive ? '' : 'hidden'} ml-4 mt-1">
              ${generateMenuItems(item.children, level + 1)}
            </div>
          </div>
        `;
      } else {
        const activeClass = active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700';
        return `
          <a href="${item.path}" class="flex items-center px-4 py-2 ${activeClass} rounded mb-1">
            <i class="fas fa-${item.icon} w-5"></i>
            <span class="ml-3">${item.label}</span>
            ${active ? '<i class="fas fa-check ml-auto text-sm"></i>' : ''}
          </a>
        `;
      }
    }).join('');
  };

  return `
    <div class="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white overflow-y-auto shadow-lg">
      <!-- Header -->
      <div class="p-6 border-b border-gray-700">
        <a href="/admin" class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <i class="fas fa-crown text-white text-xl"></i>
          </div>
          <div>
            <h1 class="text-lg font-bold">SOFTWAREKING24</h1>
            <p class="text-xs text-gray-400">Admin Panel</p>
          </div>
        </a>
      </div>

      <!-- Working Pages Notice -->
      <div class="px-4 py-3 bg-green-900 border-l-4 border-green-500 m-4 rounded">
        <div class="flex items-start">
          <i class="fas fa-check-circle text-green-400 mt-1"></i>
          <div class="ml-3">
            <p class="text-sm font-semibold text-green-200">Nur funktionierende Seiten</p>
            <p class="text-xs text-green-300 mt-1">12 aktive Admin-Seiten</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4">
        ${generateMenuItems(menuStructure)}
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-700 mt-8">
        <div class="text-xs text-gray-400 space-y-2">
          <div class="flex items-center justify-between">
            <span>Bundle:</span>
            <span class="text-white font-mono">2,288 KB</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Aktive Seiten:</span>
            <span class="text-green-400 font-bold">12</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Version:</span>
            <span class="text-white">1.0.0</span>
          </div>
        </div>
        <a href="/" class="mt-4 flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
          <i class="fas fa-home mr-2"></i>
          Zur Website
        </a>
      </div>
    </div>
  `;
}
