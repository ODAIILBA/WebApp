import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminWebhooksPage(webhooks: any[] = []) {
  const sidebar = AdminSidebarAdvanced('/admin/webhooks')

  const statusBadge = (active: boolean) => active
    ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktiv</span>`
    : `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">Inaktiv</span>`

  const demoWebhooks = webhooks.length > 0 ? webhooks : [
    { id: 1, name: 'Bestellbenachrichtigung', url: 'https://example.com/webhooks/order', events: ['order.created','order.completed'], active: true, secret: 'whsec_...', last_triggered: null },
    { id: 2, name: 'Zahlungs-Webhook', url: 'https://api.example.com/payment-hook', events: ['payment.completed','payment.failed'], active: false, secret: 'whsec_...', last_triggered: null },
  ]

  const eventOptions = [
    { value: 'order.created', label: 'Bestellung erstellt' },
    { value: 'order.completed', label: 'Bestellung abgeschlossen' },
    { value: 'order.cancelled', label: 'Bestellung storniert' },
    { value: 'payment.completed', label: 'Zahlung erfolgreich' },
    { value: 'payment.failed', label: 'Zahlung fehlgeschlagen' },
    { value: 'product.created', label: 'Produkt erstellt' },
    { value: 'product.updated', label: 'Produkt aktualisiert' },
    { value: 'customer.registered', label: 'Kunde registriert' },
    { value: 'license.activated', label: 'Lizenz aktiviert' },
    { value: 'support.ticket_created', label: 'Support-Ticket erstellt' },
  ]

  const rows = demoWebhooks.map((w: any) => `
    <tr class="hover:bg-gray-50 border-b border-gray-100" id="wh-row-${w.id}">
      <td class="px-4 py-3">
        <div class="font-semibold text-sm text-gray-800">${w.name}</div>
        <div class="text-xs text-gray-400 font-mono mt-0.5 truncate max-w-xs">${w.url}</div>
      </td>
      <td class="px-4 py-3">
        <div style="display:flex;flex-wrap:wrap;gap:.25rem">
          ${(w.events || []).map((e: string) => `<span class="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded font-mono">${e}</span>`).join('')}
        </div>
      </td>
      <td class="px-4 py-3">${statusBadge(w.active)}</td>
      <td class="px-4 py-3 text-xs text-gray-400">${w.last_triggered ? new Date(w.last_triggered).toLocaleDateString('de-DE') : 'Nie'}</td>
      <td class="px-4 py-3">
        <div style="display:flex;gap:.4rem">
          <button class="px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs rounded-lg" onclick="editWebhook(${w.id})"><i class="fas fa-edit mr-1"></i>Bearbeiten</button>
          <button class="px-2 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-xs rounded-lg" onclick="testWebhook(${w.id})"><i class="fas fa-paper-plane mr-1"></i>Test</button>
          <button class="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs rounded-lg" onclick="deleteWebhook(${w.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webhooks – SOFTWAREKING24</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body{margin:0;font-family:'Segoe UI',sans-serif;background:#f8fafc}
    .main{margin-left:280px;padding:2rem;min-height:100vh}
    @media(max-width:768px){.main{margin-left:0}}
    .card{background:white;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.07);overflow:hidden;margin-bottom:1.5rem}
    table{width:100%;border-collapse:collapse}
    th{background:#f8fafc;padding:.65rem 1rem;text-align:left;font-size:.72rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e5e7eb}
    td{padding:.75rem 1rem;border-bottom:1px solid #f3f4f6;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    .btn{padding:.55rem 1.25rem;border-radius:8px;border:none;cursor:pointer;font-size:.875rem;font-weight:600;display:inline-flex;align-items:center;gap:.4rem;transition:all .2s}
    .btn-primary{background:#1a2a4e;color:white}.btn-primary:hover{background:#2a3b5e}
    .btn-secondary{background:#f3f4f6;color:#374151}.btn-secondary:hover{background:#e5e7eb}
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;align-items:center;justify-content:center}
    .modal-overlay.show{display:flex}
    .modal-box{background:white;border-radius:14px;padding:1.75rem;width:90%;max-width:580px;max-height:90vh;overflow-y:auto}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
    .modal-header h3{margin:0;font-size:1.05rem;font-weight:700;color:#1a2a4e}
    .modal-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#9ca3af}
    .fg{margin-bottom:1rem}
    .fg label{display:block;font-size:.82rem;font-weight:600;color:#374151;margin-bottom:.3rem}
    .fg .hint{font-size:.74rem;color:#9ca3af;margin-top:.2rem}
    input[type=text],input[type=url],select,textarea{width:100%;padding:.55rem .85rem;border:1px solid #e5e7eb;border-radius:8px;font-size:.875rem;box-sizing:border-box}
    input:focus,select:focus,textarea:focus{outline:none;border-color:#6366f1}
    .modal-footer{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f3f4f6}
    .event-grid{display:grid;grid-template-columns:1fr 1fr;gap:.3rem;border:1px solid #e5e7eb;border-radius:8px;padding:.6rem;max-height:180px;overflow-y:auto}
    @media(max-width:500px){.event-grid{grid-template-columns:1fr}}
    .toast{position:fixed;bottom:1.5rem;right:1.5rem;padding:.75rem 1.25rem;border-radius:8px;font-size:.875rem;font-weight:600;z-index:9999;display:none}
    .toast-success{background:#d1fae5;color:#065f46}
    .toast-error{background:#fee2e2;color:#991b1b}
  </style>
</head>
<body>
  ${sidebar}
  <div class="main">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800"><i class="fas fa-plug text-indigo-600 mr-2"></i>Webhooks</h1>
        <p class="text-gray-500 text-sm mt-1">HTTP-Callbacks für Shop-Ereignisse konfigurieren</p>
      </div>
      <button class="btn btn-primary" onclick="openAddModal()"><i class="fas fa-plus"></i>Webhook hinzufügen</button>
    </div>

    <!-- Info -->
    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-blue-800">
      <i class="fas fa-info-circle mr-2 text-blue-500"></i>
      Webhooks senden HTTP POST-Anfragen an Ihre URL, wenn Ereignisse auftreten. Nutzen Sie den <strong>geheimen Schlüssel</strong> zur Validierung der Anfragen.
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-5">
      ${[
        {label:'Webhooks gesamt',val:demoWebhooks.length,color:'text-gray-800'},
        {label:'Aktiv',val:demoWebhooks.filter((w:any)=>w.active).length,color:'text-green-600'},
        {label:'Inaktiv',val:demoWebhooks.filter((w:any)=>!w.active).length,color:'text-gray-500'},
      ].map(s=>`<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <p class="text-xs text-gray-500 font-medium">${s.label}</p>
        <p class="text-2xl font-bold ${s.color} mt-1">${s.val}</p>
      </div>`).join('')}
    </div>

    <!-- Table -->
    <div class="card">
      <div class="p-4 border-b border-gray-100">
        <h3 class="font-bold text-gray-800"><i class="fas fa-list text-gray-400 mr-2"></i>Konfigurierte Webhooks</h3>
      </div>
      <div class="overflow-x-auto">
        <table>
          <thead><tr><th>Name & URL</th><th>Ereignisse</th><th>Status</th><th>Letzte Auslösung</th><th>Aktionen</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>

    <!-- Docs -->
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600">
      <h4 class="font-bold text-gray-700 mb-2"><i class="fas fa-code mr-2 text-gray-400"></i>Webhook-Format</h4>
      <pre style="background:#1e2130;color:#a8ff78;padding:1rem;border-radius:8px;font-size:.78rem;overflow-x:auto">POST https://your-endpoint.com/webhook
Content-Type: application/json
X-SOFTWAREKING-Signature: sha256=...

{
  "event": "order.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": { "id": 1234, "total": 29.99 }
}</pre>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <div id="wh-modal" class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3><i class="fas fa-plug mr-2 text-indigo-600"></i><span id="modal-title">Webhook hinzufügen</span></h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <input type="hidden" id="wh-id" />
      <div class="fg">
        <label>Name *</label>
        <input type="text" id="wh-name" placeholder="z.B. Bestellbenachrichtigung" />
      </div>
      <div class="fg">
        <label>Endpoint-URL *</label>
        <input type="url" id="wh-url" placeholder="https://your-api.com/webhook" />
        <div class="hint">Die URL, an die HTTP POST-Anfragen gesendet werden</div>
      </div>
      <div class="fg">
        <label>Geheimer Schlüssel</label>
        <input type="text" id="wh-secret" placeholder="Wird automatisch generiert" readonly
          style="background:#f9fafb;font-family:monospace;cursor:pointer" onclick="copySecret(this)" />
        <div class="hint">Klicken zum Kopieren – für HMAC-Signatur-Validierung</div>
      </div>
      <div class="fg">
        <label>Ereignisse *</label>
        <div class="event-grid">
          ${eventOptions.map(e => `<label style="display:flex;align-items:center;gap:.4rem;padding:.3rem;cursor:pointer;font-size:.82rem;color:#374151">
            <input type="checkbox" class="event-check" value="${e.value}" style="width:13px;height:13px;accent-color:#6366f1" />
            ${e.label}
          </label>`).join('')}
        </div>
      </div>
      <div class="fg fg-toggle" style="display:flex;align-items:center;justify-content:space-between">
        <label style="margin:0">Webhook aktivieren</label>
        <label style="position:relative;width:46px;height:24px;flex-shrink:0">
          <input type="checkbox" id="wh-active" checked style="opacity:0;width:0;height:0"/>
          <span style="position:absolute;cursor:pointer;inset:0;background:#e5e7eb;border-radius:999px;transition:.2s"></span>
        </label>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Abbrechen</button>
        <button class="btn btn-primary" onclick="saveWebhook()">Speichern</button>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast toast-' + type; t.style.display = 'block';
      setTimeout(() => t.style.display = 'none', 3000);
    }

    function generateSecret() {
      const arr = new Uint8Array(24);
      crypto.getRandomValues(arr);
      return 'whsec_' + btoa(String.fromCharCode(...arr)).replace(/[+/=]/g, '').slice(0,32);
    }

    function openAddModal() {
      document.getElementById('modal-title').textContent = 'Webhook hinzufügen';
      document.getElementById('wh-id').value = '';
      document.getElementById('wh-name').value = '';
      document.getElementById('wh-url').value = '';
      document.getElementById('wh-secret').value = generateSecret();
      document.querySelectorAll('.event-check').forEach(cb => cb.checked = false);
      document.getElementById('wh-active').checked = true;
      document.getElementById('wh-modal').classList.add('show');
    }

    function closeModal() { document.getElementById('wh-modal').classList.remove('show'); }

    function copySecret(el) {
      navigator.clipboard.writeText(el.value).then(() => showToast('Schlüssel kopiert'));
    }

    function editWebhook(id) {
      document.getElementById('modal-title').textContent = 'Webhook bearbeiten';
      document.getElementById('wh-id').value = id;
      showToast('Bearbeitung geöffnet (Demo)');
      document.getElementById('wh-modal').classList.add('show');
    }

    async function saveWebhook() {
      const name = document.getElementById('wh-name').value;
      const url = document.getElementById('wh-url').value;
      const events = [...document.querySelectorAll('.event-check:checked')].map(cb => cb.value);
      if (!name || !url) { showToast('Name und URL erforderlich', 'error'); return; }
      if (events.length === 0) { showToast('Mindestens ein Ereignis auswählen', 'error'); return; }
      showToast('Webhook gespeichert: ' + name);
      closeModal();
    }

    async function testWebhook(id) {
      showToast('Test-Ping wird gesendet...');
      setTimeout(() => showToast('Test erfolgreich (simuliert)'), 800);
    }

    async function deleteWebhook(id) {
      if (!confirm('Webhook wirklich löschen?')) return;
      document.getElementById('wh-row-' + id)?.remove();
      showToast('Webhook gelöscht');
    }
  </script>
</body>
</html>`
}
