// Admin Pages Batch 1: Orders, Licenses, Customers
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function OrdersCompletedPage(orders: any) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <title>Abgeschlossene Bestellungen - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced('/admin/orders/completed')}
      <div style="margin-left: 280px; padding: 2rem;">
        <h1 class="text-3xl font-bold mb-6"><i class="fas fa-check-circle text-green-600 mr-3"></i>Abgeschlossene Bestellungen</h1>
        <div class="grid grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Abgeschlossen</p>
            <p class="text-3xl font-bold text-green-600">${orders.length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Gesamtumsatz</p>
            <p class="text-2xl font-bold">€${orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0).toFixed(2)}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <button class="w-full bg-blue-600 text-white px-4 py-2 rounded" onclick="window.print()">
              <i class="fas fa-print mr-2"></i>Drucken
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">Bestellnr.</th>
                <th class="px-6 py-3 text-left">Kunde</th>
                <th class="px-6 py-3 text-left">Betrag</th>
                <th class="px-6 py-3 text-left">Abgeschlossen</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length > 0 ? orders.map(o => `
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-mono text-sm">${o.order_number}</td>
                  <td class="px-6 py-4">${o.customer_name || 'N/A'}</td>
                  <td class="px-6 py-4 font-bold">€${parseFloat(o.total_amount || 0).toFixed(2)}</td>
                  <td class="px-6 py-4 text-sm">${new Date(o.updated_at).toLocaleDateString('de-DE')}</td>
                </tr>
              `).join('') : '<tr><td colspan="4" class="text-center py-12 text-gray-500">Keine Bestellungen</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function OrdersCancelledPage(orders: any) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <title>Stornierte Bestellungen - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced('/admin/orders/cancelled')}
      <div style="margin-left: 280px; padding: 2rem;">
        <h1 class="text-3xl font-bold mb-6"><i class="fas fa-times-circle text-red-600 mr-3"></i>Stornierte Bestellungen</h1>
        <div class="grid grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Storniert</p>
            <p class="text-3xl font-bold text-red-600">${orders.length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Verlorener Umsatz</p>
            <p class="text-2xl font-bold text-red-600">€${orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0).toFixed(2)}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <button class="w-full bg-yellow-600 text-white px-4 py-2 rounded" onclick="alert('Export wird implementiert')">
              <i class="fas fa-file-export mr-2"></i>Exportieren
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">Bestellnr.</th>
                <th class="px-6 py-3 text-left">Kunde</th>
                <th class="px-6 py-3 text-left">Betrag</th>
                <th class="px-6 py-3 text-left">Storniert am</th>
                <th class="px-6 py-3 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length > 0 ? orders.map(o => `
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-mono text-sm">${o.order_number}</td>
                  <td class="px-6 py-4">${o.customer_name || 'N/A'}</td>
                  <td class="px-6 py-4 font-bold">€${parseFloat(o.total_amount || 0).toFixed(2)}</td>
                  <td class="px-6 py-4 text-sm">${new Date(o.updated_at).toLocaleDateString('de-DE')}</td>
                  <td class="px-6 py-4">
                    <button class="text-blue-600" onclick="if(confirm('Reaktivieren?')) fetch('/api/admin/orders/${o.id}',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:'pending'})}).then(r=>r.ok?location.reload():alert('Fehler'))">
                      <i class="fas fa-redo"></i> Reaktivieren
                    </button>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="5" class="text-center py-12 text-gray-500">Keine stornierten Bestellungen</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function ShippingStatusPage(shipments: any) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <title>Versandstatus - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced('/admin/shipping-status')}
      <div style="margin-left: 280px; padding: 2rem;">
        <h1 class="text-3xl font-bold mb-6"><i class="fas fa-shipping-fast text-purple-600 mr-3"></i>Versandstatus (Digital)</h1>
        <div class="grid grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Versendungen</p>
            <p class="text-3xl font-bold">${shipments.length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Lizenzen vergeben</p>
            <p class="text-3xl font-bold text-green-600">${shipments.reduce((s, o) => s + parseInt(o.license_count || 0), 0)}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Heute</p>
            <p class="text-2xl font-bold text-blue-600">${shipments.filter(o => new Date(o.updated_at).toDateString() === new Date().toDateString()).length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <button class="w-full bg-purple-600 text-white px-4 py-2 rounded" onclick="location.reload()">
              <i class="fas fa-sync mr-2"></i>Aktualisieren
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">Bestellung</th>
                <th class="px-6 py-3 text-left">Kunde</th>
                <th class="px-6 py-3 text-left">Lizenzen</th>
                <th class="px-6 py-3 text-left">Status</th>
                <th class="px-6 py-3 text-left">Versendet</th>
              </tr>
            </thead>
            <tbody>
              ${shipments.length > 0 ? shipments.map(s => `
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-mono text-sm">${s.order_number}</td>
                  <td class="px-6 py-4">
                    <div class="font-medium">${s.customer_name}</div>
                    <div class="text-sm text-gray-500">${s.customer_email}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${s.license_count} Lizenzen</span>
                  </td>
                  <td class="px-6 py-4">
                    ${s.order_status === 'completed' ? 
                      '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Zugestellt</span>' :
                      '<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Ausstehend</span>'
                    }
                  </td>
                  <td class="px-6 py-4 text-sm">${new Date(s.updated_at).toLocaleDateString('de-DE')}</td>
                </tr>
              `).join('') : '<tr><td colspan="5" class="text-center py-12 text-gray-500">Keine Versendungen</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function LicenseAssignmentsPage(assignments: any) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <title>Lizenz-Zuweisungen - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced('/admin/license-assignments')}
      <div style="margin-left: 280px; padding: 2rem;">
        <h1 class="text-3xl font-bold mb-6"><i class="fas fa-user-tag text-indigo-600 mr-3"></i>Lizenz-Zuweisungen</h1>
        <div class="grid grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Zuweisungen</p>
            <p class="text-3xl font-bold">${assignments.length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Aktiv</p>
            <p class="text-3xl font-bold text-green-600">${assignments.filter(a => a.status === 'active').length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Ausstehend</p>
            <p class="text-2xl font-bold text-yellow-600">${assignments.filter(a => a.status === 'pending').length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <button class="w-full bg-indigo-600 text-white px-4 py-2 rounded" onclick="alert('Neue Zuweisung')">
              <i class="fas fa-plus mr-2"></i>Neue Zuweisung
            </button>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">Lizenz</th>
                <th class="px-6 py-3 text-left">Zugewiesen an</th>
                <th class="px-6 py-3 text-left">Produkt</th>
                <th class="px-6 py-3 text-left">Status</th>
                <th class="px-6 py-3 text-left">Datum</th>
                <th class="px-6 py-3 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              ${assignments.length > 0 ? assignments.map(a => `
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-mono text-sm">${a.license_key || 'N/A'}</td>
                  <td class="px-6 py-4">${a.assigned_to || 'Unzugewiesen'}</td>
                  <td class="px-6 py-4">${a.product_name || 'N/A'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs rounded-full ${a.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${a.status}</span>
                  </td>
                  <td class="px-6 py-4 text-sm">${a.assigned_at ? new Date(a.assigned_at).toLocaleDateString('de-DE') : 'N/A'}</td>
                  <td class="px-6 py-4">
                    <button class="text-red-600" onclick="if(confirm('Zuweisung aufheben?')) alert('Wird aufgehoben')">
                      <i class="fas fa-times"></i> Aufheben
                    </button>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="6" class="text-center py-12 text-gray-500">Keine Zuweisungen</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function CustomersPage(customers: any) {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <title>Kunden - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
    </head>
    <body class="bg-gray-50">
      ${AdminSidebarAdvanced('/admin/customers')}
      <div style="margin-left: 280px; padding: 2rem;">
        <h1 class="text-3xl font-bold mb-6"><i class="fas fa-users text-blue-600 mr-3"></i>Kunden</h1>
        <div class="grid grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Gesamt Kunden</p>
            <p class="text-3xl font-bold">${customers.length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Aktiv</p>
            <p class="text-3xl font-bold text-green-600">${customers.filter(c => c.is_active).length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-sm text-gray-500">Neue (7 Tage)</p>
            <p class="text-2xl font-bold text-blue-600">${customers.filter(c => (Date.now() - new Date(c.created_at).getTime()) < 7*24*60*60*1000).length}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <input type="search" placeholder="Suchen..." class="w-full border rounded px-3 py-2" oninput="filterCustomers(this.value)">
          </div>
        </div>
        <div class="bg-white rounded-lg shadow">
          <table class="w-full" id="customersTable">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">Name</th>
                <th class="px-6 py-3 text-left">E-Mail</th>
                <th class="px-6 py-3 text-left">Registriert</th>
                <th class="px-6 py-3 text-left">Bestellungen</th>
                <th class="px-6 py-3 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              ${customers.length > 0 ? customers.map(c => `
                <tr class="border-b hover:bg-gray-50 customer-row" data-name="${c.first_name} ${c.last_name}" data-email="${c.email}">
                  <td class="px-6 py-4">${c.first_name} ${c.last_name}</td>
                  <td class="px-6 py-4">${c.email}</td>
                  <td class="px-6 py-4 text-sm">${new Date(c.created_at).toLocaleDateString('de-DE')}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">${c.order_count || 0}</span>
                  </td>
                  <td class="px-6 py-4">
                    <button class="text-blue-600 mr-3" onclick="window.location.href='/admin/customers/${c.id}'">
                      <i class="fas fa-eye"></i> Anzeigen
                    </button>
                    <button class="text-gray-600" onclick="alert('Bearbeiten: ${c.id}')">
                      <i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="5" class="text-center py-12 text-gray-500">Keine Kunden</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
      <script>
        function filterCustomers(term) {
          const rows = document.querySelectorAll('.customer-row');
          const search = term.toLowerCase();
          rows.forEach(row => {
            const name = row.dataset.name.toLowerCase();
            const email = row.dataset.email.toLowerCase();
            row.style.display = (name.includes(search) || email.includes(search)) ? '' : 'none';
          });
        }
      </script>
    </body>
    </html>
  `;
}
