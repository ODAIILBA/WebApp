// Universal Admin Page Generator
// Generates basic functional pages for any admin route
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

interface PageConfig {
  path: string
  title: string
  icon: string
  description: string
  statsCards?: Array<{label: string, value: string | number, color?: string}>
  tableColumns?: string[]
  actions?: Array<{label: string, icon: string, color: string, action: string}>
}

export function generateAdminPage(config: PageConfig, data: any[] = []) {
  const {path, title, icon, description, statsCards = [], tableColumns = [], actions = []} = config
  
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${title} - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced(path)}
      
      <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-${icon} mr-3"></i>
            ${title}
          </h1>
          <p class="text-gray-600">${description}</p>
        </div>

        <!-- Stats Cards -->
        ${statsCards.length > 0 ? `
          <div class="grid grid-cols-${Math.min(statsCards.length, 4)} gap-6 mb-6">
            ${statsCards.map((stat, idx) => `
              <div class="bg-white rounded-lg shadow p-6">
                <p class="text-sm text-gray-500">${stat.label}</p>
                <p class="text-3xl font-bold ${stat.color || ''}">${stat.value}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Action Buttons -->
        ${actions.length > 0 ? `
          <div class="flex gap-3 mb-6">
            ${actions.map(action => `
              <button class="bg-${action.color}-600 text-white px-6 py-3 rounded-lg hover:bg-${action.color}-700" onclick="${action.action}">
                <i class="fas fa-${action.icon} mr-2"></i>${action.label}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Data Table -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold">Übersicht</h2>
          </div>
          ${tableColumns.length > 0 ? `
            <table class="w-full">
              <thead class="bg-gray-50 border-b">
                <tr>
                  ${tableColumns.map(col => `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">${col}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.length > 0 ? data.map(item => `
                  <tr class="hover:bg-gray-50 border-b">
                    ${Object.values(item).slice(0, tableColumns.length).map(val => `
                      <td class="px-6 py-4">${val || 'N/A'}</td>
                    `).join('')}
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="${tableColumns.length}" class="px-6 py-12 text-center text-gray-500">
                      <i class="fas fa-inbox text-6xl mb-4 text-gray-300"></i>
                      <p class="text-lg">Keine Daten vorhanden</p>
                      <p class="text-sm mt-2">Diese Funktion wird mit Daten gefüllt, sobald Einträge vorhanden sind.</p>
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          ` : `
            <div class="p-12 text-center text-gray-500">
              <i class="fas fa-${icon} text-6xl mb-4 text-gray-300"></i>
              <p class="text-lg mb-2">${title}</p>
              <p class="text-sm">${description}</p>
              <p class="text-sm mt-4">Konfiguration und Verwaltung für diesen Bereich.</p>
            </div>
          `}
        </div>
      </div>

      <script>
        // Universal functions
        function refreshPage() { location.reload(); }
        function goBack() { window.history.back(); }
        function exportData() { alert('Export-Funktion wird implementiert'); }
        function importData() { alert('Import-Funktion wird implementiert'); }
        function addNew() { alert('Hinzufügen-Funktion wird implementiert'); }
        function editItem(id) { alert('Bearbeiten: ' + id); }
        function deleteItem(id) { if(confirm('Wirklich löschen?')) alert('Löschen: ' + id); }
      </script>
    </body>
    </html>
  `
}
