import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

function groupByProduct(items: any[]) {
  const map = new Map<number, any>()
  items.forEach(item => {
    if (!map.has(item.product_id)) {
      map.set(item.product_id, {
        product_id: item.product_id,
        product_name: item.product_name || 'Unbekanntes Produkt',
        image_url: item.image_url,
        category: item.category,
        price: item.price,
        wishlist_count: 0,
        customer_names: [] as string[]
      })
    }
    const p = map.get(item.product_id)!
    p.wishlist_count++
    if (item.customer_name) p.customer_names.push(item.customer_name)
  })
  return Array.from(map.values())
    .map(p => ({ ...p, customers: p.customer_names.join(', ') }))
    .sort((a, b) => b.wishlist_count - a.wishlist_count)
}

function groupByCustomer(items: any[]) {
  const map = new Map<number, any>()
  items.forEach(item => {
    if (!map.has(item.user_id)) {
      map.set(item.user_id, {
        user_id: item.user_id,
        customer_name: item.customer_name || 'Unbekannt',
        customer_email: item.customer_email,
        count: 0,
        total_value: 0,
        product_names: [] as string[]
      })
    }
    const c = map.get(item.user_id)!
    c.count++
    c.total_value += item.price || 0
    if (item.product_name) c.product_names.push(item.product_name)
  })
  return Array.from(map.values())
    .map(c => ({ ...c, products: c.product_names.join(', ') }))
    .sort((a, b) => b.count - a.count)
}

function buildProductRows(items: any[], stats: any): string {
  const grouped = groupByProduct(items)
  const maxCount = Math.max(...grouped.map(p => p.wishlist_count), 1)
  const totalItems = Math.max(stats.total || 1, 1)

  return grouped.map(p => {
    const pct = Math.min(100, Math.round((p.wishlist_count / maxCount) * 100))
    const sharePct = Math.round((p.wishlist_count / totalItems) * 100)
    const badgeClass = p.wishlist_count >= 3 ? 'badge-red' : p.wishlist_count >= 2 ? 'badge-blue' : 'badge-green'
    const imgSrc = p.image_url || '/static/placeholder.png'
    const price = (p.price || 0).toFixed(2)
    return `<tr> // nosemgrep
      <td>
        <div class="flex items-center gap-3">
          <img src="${imgSrc}" class="product-img" onerror="this.src='/static/placeholder.png'" />
          <div>
            <div class="font-semibold text-gray-800">${p.product_name}</div>
            <div class="text-xs text-gray-400">ID #${p.product_id}</div>
          </div>
        </div>
      </td>
      <td class="text-gray-500">${p.category || '–'}</td>
      <td class="font-semibold text-blue-600">€${price}</td>
      <td><span class="badge ${badgeClass}"><i class="fas fa-heart mr-1"></i>${p.wishlist_count}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="heat-bar"><div class="heat-fill" style="width:${pct}%"></div></div>
          <span class="text-xs text-gray-500">${sharePct}%</span>
        </div>
      </td>
      <td class="text-gray-500 text-xs">${p.customers}</td>
    </tr>`
  }).join('')
}

function buildCustomerRows(items: any[]): string {
  const grouped = groupByCustomer(items)
  return grouped.map(c => {
    const initial = (c.customer_name || '?')[0].toUpperCase()
    const totalVal = (c.total_value || 0).toFixed(2)
    return `<tr> // nosemgrep
      <td>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">${initial}</div>
          <span class="font-semibold text-gray-800">${c.customer_name}</span>
        </div>
      </td>
      <td class="text-gray-500">${c.customer_email || '–'}</td>
      <td><span class="badge badge-blue"><i class="fas fa-heart mr-1"></i>${c.count}</span></td>
      <td class="font-semibold text-green-600">€${totalVal}</td>
      <td class="text-gray-500 text-xs max-w-xs truncate">${c.products}</td>
    </tr>`
  }).join('')
}

export function AdminWishlist(items: any[], stats: any) {
  const sidebarHtml = AdminSidebarAdvanced('/admin/wishlist')
  const productRows = buildProductRows(items, stats)
  const customerRows = buildCustomerRows(items)

  return `<!DOCTYPE html> // nosemgrep
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wunschlisten – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; font-family: 'Segoe UI', sans-serif; background: #f8fafc; }
    .main-content { margin-left: 280px; padding: 2rem; min-height: 100vh; }
    @media (max-width: 768px) { .main-content { margin-left: 0; } }
    .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb; }
    td { padding: 0.875rem 1rem; border-bottom: 1px solid #f3f4f6; font-size: 0.875rem; color: #374151; vertical-align: middle; }
    tr:hover td { background: #fafafa; }
    .product-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: #f3f4f6; }
    .badge { padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .badge-green { background: #d1fae5; color: #065f46; }
    .heat-bar { height: 6px; border-radius: 3px; background: #e5e7eb; overflow: hidden; width: 80px; display: inline-block; }
    .heat-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #f59e0b, #ef4444); }
  </style>
</head>
<body>
  ${sidebarHtml}
  <div class="main-content">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-heart text-red-500"></i> Wunschlisten
        </h1>
        <p class="text-gray-500 text-sm mt-1">Meistgewünschte Produkte und Kundeninteressen</p>
      </div>
      <button onclick="location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-sync-alt"></i> Aktualisieren
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Gesamt Einträge</p>
        <p class="text-2xl font-bold text-gray-800">${stats.total || 0}</p>
        <i class="fas fa-heart text-red-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Einzigartige Produkte</p>
        <p class="text-2xl font-bold text-blue-600">${stats.unique_products || 0}</p>
        <i class="fas fa-box text-blue-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Aktive Kunden</p>
        <p class="text-2xl font-bold text-green-600">${stats.unique_customers || 0}</p>
        <i class="fas fa-users text-green-400 text-xl mt-1"></i>
      </div>
      <div class="stat-card">
        <p class="text-sm text-gray-500 mb-1">Meistgewünscht</p>
        <p class="text-lg font-bold text-orange-600 truncate">${stats.top_product || '–'}</p>
        <i class="fas fa-star text-orange-400 text-xl mt-1"></i>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-4">
      <button id="tab-btn-products" class="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white" onclick="showTab('products')">Produkt-Übersicht</button>
      <button id="tab-btn-customers" class="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border" onclick="showTab('customers')">Kunden-Übersicht</button>
    </div>

    <!-- Products Tab -->
    <div id="tab-products" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="font-semibold text-gray-700">Meistgewünschte Produkte</h2>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Kategorie</th>
              <th>Preis</th>
              <th>Wunschlisten</th>
              <th>Beliebtheit</th>
              <th>Kunden</th>
            </tr>
          </thead>
          <tbody>${productRows || '<tr><td colspan="6" class="text-center py-12 text-gray-400"><i class="fas fa-heart-broken text-3xl mb-2 block"></i>Keine Einträge</td></tr>'}</tbody>
        </table>
      </div>
    </div>

    <!-- Customers Tab -->
    <div id="tab-customers" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="font-semibold text-gray-700">Wunschlisten nach Kunden</h2>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Kunde</th>
              <th>E-Mail</th>
              <th>Anzahl Wünsche</th>
              <th>Gesamtwert</th>
              <th>Produkte</th>
            </tr>
          </thead>
          <tbody>${customerRows || '<tr><td colspan="5" class="text-center py-12 text-gray-400">Keine Kunden gefunden</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    function showTab(name) {
      document.getElementById('tab-products').classList.toggle('hidden', name !== 'products');
      document.getElementById('tab-customers').classList.toggle('hidden', name !== 'customers');
      document.getElementById('tab-btn-products').className = name === 'products'
        ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white'
        : 'px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border';
      document.getElementById('tab-btn-customers').className = name === 'customers'
        ? 'px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white'
        : 'px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-600 border';
    }
  </script>
</body>
</html>`
}
