export function AdminSidebar(currentPath: string = '/admin') {
  const menuItems = [
    { path: '/admin', icon: 'chart-line', label: 'Dashboard' },
    { path: '/admin/products', icon: 'box-open', label: 'Produkte' },
    { path: '/admin/orders', icon: 'shopping-cart', label: 'Bestellungen' },
    { path: '/admin/customers', icon: 'users', label: 'Kunden' },
    { path: '/admin/licenses', icon: 'key', label: 'Lizenzen' },
    { path: '/admin/sliders', icon: 'images', label: 'Slider' },
    { path: '/admin/homepage-sections', icon: 'th-large', label: 'Homepage' },
    { path: '/admin/pages', icon: 'file-alt', label: 'Seiten' },
    { path: '/admin/footer', icon: 'shoe-prints', label: 'Footer' },
    { path: '/admin/contact-messages', icon: 'envelope', label: 'Kontakt' },
    { path: '/admin/notifications', icon: 'bell', label: 'Benachrichtigungen' },
    { path: '/admin/settings', icon: 'cog', label: 'Einstellungen' }
  ];

  return `
    <div class="admin-sidebar">
      <div class="p-6 border-b border-gray-700">
        <h2 class="text-xl font-bold" style="color: var(--gold)">SOFTWAREKING24</h2>
        <p class="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>
      <nav class="p-4">
        ${menuItems.map(item => `
          <a href="${item.path}" class="admin-nav-item ${currentPath === item.path ? 'active' : ''}">
            <i class="fas fa-${item.icon} mr-3"></i>
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
}
