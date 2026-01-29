import { AdminSidebar } from './admin-sidebar'

export function AdminCoupons() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gutscheinverwaltung - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root {
            --navy-dark: #1a2a4e;
            --gold: #d4af37;
        }
        
        .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--navy-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .admin-content {
            margin-left: 260px;
            min-height: 100vh;
            background: #f5f7fa;
            padding: 30px;
        }
        
        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            transform: translateY(-2px);
        }
        
        .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: var(--navy-dark);
            margin: 8px 0;
        }
        
        .stat-label {
            color: #64748b;
            font-size: 14px;
            font-weight: 500;
        }
        
        .btn-primary {
            background: var(--navy-dark);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-primary:hover {
            background: #0f1936;
            transform: translateY(-1px);
        }
        
        .btn-success {
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        
        .btn-danger {
            background: #ef4444;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-active {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge-expired {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .badge-inactive {
            background: #f1f5f9;
            color: #475569;
        }
        
        .badge-percentage {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-fixed {
            background: #fef3c7;
            color: #92400e;
        }
        
        .coupon-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 16px;
            transition: all 0.3s;
        }
        
        .coupon-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--navy-dark);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--navy-dark);
            outline: none;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .checkbox-group input[type="checkbox"] {
            width: auto;
        }
    </style>
</head>
<body>
    ${AdminSidebar('/admin/coupons')}
    
    <div class="admin-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <div>
                <h1 style="font-size: 28px; font-weight: 700; color: var(--navy-dark); margin-bottom: 8px;">
                    <i class="fas fa-ticket-alt" style="color: var(--gold); margin-right: 12px;"></i>
                    Gutscheinverwaltung
                </h1>
                <p style="color: #64748b;">Gutscheine und Aktionscodes verwalten</p>
            </div>
            <button onclick="openCreateModal()" class="btn-primary">
                <i class="fas fa-plus mr-2"></i>Gutschein erstellen
            </button>
        </div>
        
        <!-- Stats Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card">
                <div class="stat-label">Gesamt Gutscheine</div>
                <div class="stat-value" id="stat-total">0</div>
                <div style="color: #10b981; font-size: 14px; margin-top: 8px;">
                    <i class="fas fa-ticket-alt"></i> Alle Codes
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Aktive Gutscheine</div>
                <div class="stat-value" id="stat-active">0</div>
                <div style="color: #10b981; font-size: 14px; margin-top: 8px;">
                    <i class="fas fa-check-circle"></i> Gültig
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Einlösungen</div>
                <div class="stat-value" id="stat-uses">0</div>
                <div style="color: #3b82f6; font-size: 14px; margin-top: 8px;">
                    <i class="fas fa-chart-line"></i> Gesamt verwendet
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-label">Gesamtrabatt</div>
                <div class="stat-value" id="stat-discount">€0</div>
                <div style="color: #f59e0b; font-size: 14px; margin-top: 8px;">
                    <i class="fas fa-euro-sign"></i> Gewährt
                </div>
            </div>
        </div>
        
        <!-- Filters -->
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--navy-dark);">
                        <i class="fas fa-filter mr-2"></i>Status
                    </label>
                    <select id="filter-status" onchange="loadCoupons()" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px;">
                        <option value="all">Alle</option>
                        <option value="active">Aktiv</option>
                        <option value="expired">Abgelaufen</option>
                        <option value="inactive">Inaktiv</option>
                    </select>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--navy-dark);">
                        <i class="fas fa-tag mr-2"></i>Typ
                    </label>
                    <select id="filter-type" onchange="loadCoupons()" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px;">
                        <option value="all">Alle</option>
                        <option value="percentage">Prozent</option>
                        <option value="fixed">Festbetrag</option>
                    </select>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--navy-dark);">
                        <i class="fas fa-search mr-2"></i>Suche
                    </label>
                    <input type="text" id="filter-search" placeholder="Code oder Beschreibung..." 
                           onkeyup="loadCoupons()" 
                           style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px;">
                </div>
            </div>
        </div>
        
        <!-- Coupons List -->
        <div id="coupons-list"></div>
    </div>
    
    <!-- Create/Edit Modal -->
    <div id="coupon-modal" class="modal">
        <div class="modal-content">
            <h2 style="font-size: 24px; font-weight: 700; color: var(--navy-dark); margin-bottom: 24px;">
                <span id="modal-title">Gutschein erstellen</span>
            </h2>
            
            <form id="coupon-form" onsubmit="saveCoupon(event)">
                <input type="hidden" id="coupon-id">
                
                <div class="form-group">
                    <label>Gutscheincode *</label>
                    <input type="text" id="coupon-code" required 
                           placeholder="z.B. SOMMER2024" 
                           style="text-transform: uppercase;">
                    <small style="color: #64748b; font-size: 12px;">Automatisch in Großbuchstaben umgewandelt</small>
                </div>
                
                <div class="form-group">
                    <label>Beschreibung</label>
                    <textarea id="coupon-description" rows="2" 
                              placeholder="z.B. Sommerrabatt für alle Produkte"></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Rabatttyp *</label>
                        <select id="coupon-discount-type" required onchange="updateDiscountLabel()">
                            <option value="percentage">Prozent (%)</option>
                            <option value="fixed">Festbetrag (€)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label id="discount-value-label">Rabattwert * (%)</label>
                        <input type="number" id="coupon-discount-value" required 
                               min="0" step="0.01" placeholder="z.B. 10">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Gültig ab</label>
                        <input type="datetime-local" id="coupon-starts-at">
                    </div>
                    
                    <div class="form-group">
                        <label>Gültig bis</label>
                        <input type="datetime-local" id="coupon-expires-at">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Maximale Verwendungen</label>
                        <input type="number" id="coupon-max-uses" min="1" 
                               placeholder="Leer = unbegrenzt">
                    </div>
                    
                    <div class="form-group">
                        <label>Pro Kunde</label>
                        <input type="number" id="coupon-max-uses-per-customer" 
                               min="1" value="1" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Mindestbestellwert (€)</label>
                    <input type="number" id="coupon-minimum-order" min="0" step="0.01" 
                           placeholder="z.B. 50.00">
                </div>
                
                <div class="form-group">
                    <div class="checkbox-group">
                        <input type="checkbox" id="coupon-stackable">
                        <label style="margin: 0;">Kombinierbar mit anderen Gutscheinen</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-group">
                        <input type="checkbox" id="coupon-active" checked>
                        <label style="margin: 0;">Gutschein aktiv</label>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 30px;">
                    <button type="submit" class="btn-primary" style="flex: 1;">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                    <button type="button" onclick="closeModal()" 
                            style="flex: 1; padding: 12px 24px; border: 2px solid #e2e8f0; background: white; 
                                   color: #64748b; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Abbrechen
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        let coupons = [];
        
        async function loadStats() {
            try {
                const res = await axios.get('/api/admin/coupons/stats');
                if (res.data.success) {
                    const stats = res.data.data;
                    document.getElementById('stat-total').textContent = stats.total || 0;
                    document.getElementById('stat-active').textContent = stats.active || 0;
                    document.getElementById('stat-uses').textContent = stats.total_uses || 0;
                    document.getElementById('stat-discount').textContent = 
                        '€' + (stats.total_discount_given || 0).toFixed(2);
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        
        async function loadCoupons() {
            try {
                const status = document.getElementById('filter-status').value;
                const discountType = document.getElementById('filter-type').value;
                const search = document.getElementById('filter-search').value;
                
                const params = new URLSearchParams();
                if (status !== 'all') params.append('status', status);
                if (discountType !== 'all') params.append('discount_type', discountType);
                if (search) params.append('search', search);
                
                const res = await axios.get('/api/admin/coupons?' + params.toString());
                
                if (res.data.success) {
                    coupons = res.data.data;
                    renderCoupons();
                }
            } catch (error) {
                console.error('Error loading coupons:', error);
                alert('Fehler beim Laden der Gutscheine');
            }
        }
        
        function renderCoupons() {
            const container = document.getElementById('coupons-list');
            
            if (coupons.length === 0) {
                container.innerHTML = \`
                    <div style="background: white; border-radius: 12px; padding: 60px; text-align: center;">
                        <i class="fas fa-ticket-alt" style="font-size: 64px; color: #e2e8f0; margin-bottom: 20px;"></i>
                        <p style="color: #64748b; font-size: 18px;">Keine Gutscheine gefunden</p>
                        <button onclick="openCreateModal()" class="btn-primary" style="margin-top: 20px;">
                            <i class="fas fa-plus mr-2"></i>Ersten Gutschein erstellen
                        </button>
                    </div>
                \`;
                return;
            }
            
            container.innerHTML = coupons.map(coupon => {
                const now = new Date();
                const expiresAt = coupon.expires_at ? new Date(coupon.expires_at) : null;
                const isExpired = expiresAt && expiresAt < now;
                const isActive = coupon.is_active && !isExpired;
                
                const statusBadge = isExpired ? 
                    '<span class="badge badge-expired">Abgelaufen</span>' :
                    coupon.is_active ? 
                        '<span class="badge badge-active">Aktiv</span>' :
                        '<span class="badge badge-inactive">Inaktiv</span>';
                
                const typeBadge = coupon.discount_type === 'percentage' ?
                    \`<span class="badge badge-percentage">\${coupon.discount_value}% Rabatt</span>\` :
                    \`<span class="badge badge-fixed">€\${coupon.discount_value} Rabatt</span>\`;
                
                const usageText = coupon.max_uses ? 
                    \`\${coupon.total_uses || 0} / \${coupon.max_uses}\` :
                    \`\${coupon.total_uses || 0}\`;
                
                return \`
                    <div class="coupon-card">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                                    <h3 style="font-size: 20px; font-weight: 700; color: var(--navy-dark); font-family: monospace;">
                                        \${coupon.code}
                                    </h3>
                                    \${statusBadge}
                                    \${typeBadge}
                                </div>
                                
                                \${coupon.description ? \`
                                    <p style="color: #64748b; margin-bottom: 12px;">\${coupon.description}</p>
                                \` : ''}
                                
                                <div style="display: flex; gap: 24px; flex-wrap: wrap; font-size: 14px; color: #64748b;">
                                    <div>
                                        <i class="fas fa-chart-line" style="margin-right: 6px;"></i>
                                        <strong>Verwendet:</strong> \${usageText}
                                    </div>
                                    
                                    \${coupon.minimum_order_value ? \`
                                        <div>
                                            <i class="fas fa-euro-sign" style="margin-right: 6px;"></i>
                                            <strong>Min:</strong> €\${parseFloat(coupon.minimum_order_value).toFixed(2)}
                                        </div>
                                    \` : ''}
                                    
                                    \${coupon.expires_at ? \`
                                        <div>
                                            <i class="fas fa-calendar" style="margin-right: 6px;"></i>
                                            <strong>Gültig bis:</strong> \${new Date(coupon.expires_at).toLocaleDateString('de-DE')}
                                        </div>
                                    \` : ''}
                                    
                                    \${coupon.is_stackable ? \`
                                        <div>
                                            <i class="fas fa-layer-group" style="margin-right: 6px;"></i>
                                            <strong>Kombinierbar</strong>
                                        </div>
                                    \` : ''}
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 8px;">
                                <button onclick="editCoupon(\${coupon.id})" class="btn-success">
                                    <i class="fas fa-edit"></i> Bearbeiten
                                </button>
                                <button onclick="toggleCoupon(\${coupon.id}, \${coupon.is_active})" 
                                        class="btn-primary" style="padding: 8px 16px;">
                                    <i class="fas fa-power-off"></i>
                                </button>
                                <button onclick="deleteCoupon(\${coupon.id})" class="btn-danger">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                \`;
            }).join('');
        }
        
        function openCreateModal() {
            document.getElementById('modal-title').textContent = 'Gutschein erstellen';
            document.getElementById('coupon-form').reset();
            document.getElementById('coupon-id').value = '';
            document.getElementById('coupon-active').checked = true;
            document.getElementById('coupon-modal').classList.add('active');
        }
        
        async function editCoupon(id) {
            try {
                const res = await axios.get(\`/api/admin/coupons/\${id}\`);
                if (res.data.success) {
                    const coupon = res.data.data;
                    
                    document.getElementById('modal-title').textContent = 'Gutschein bearbeiten';
                    document.getElementById('coupon-id').value = coupon.id;
                    document.getElementById('coupon-code').value = coupon.code;
                    document.getElementById('coupon-description').value = coupon.description || '';
                    document.getElementById('coupon-discount-type').value = coupon.discount_type;
                    document.getElementById('coupon-discount-value').value = coupon.discount_value;
                    document.getElementById('coupon-starts-at').value = coupon.starts_at ? 
                        coupon.starts_at.replace(' ', 'T').substring(0, 16) : '';
                    document.getElementById('coupon-expires-at').value = coupon.expires_at ? 
                        coupon.expires_at.replace(' ', 'T').substring(0, 16) : '';
                    document.getElementById('coupon-max-uses').value = coupon.max_uses || '';
                    document.getElementById('coupon-max-uses-per-customer').value = coupon.max_uses_per_customer || 1;
                    document.getElementById('coupon-minimum-order').value = coupon.minimum_order_value || '';
                    document.getElementById('coupon-stackable').checked = coupon.is_stackable;
                    document.getElementById('coupon-active').checked = coupon.is_active;
                    
                    updateDiscountLabel();
                    document.getElementById('coupon-modal').classList.add('active');
                }
            } catch (error) {
                console.error('Error loading coupon:', error);
                alert('Fehler beim Laden des Gutscheins');
            }
        }
        
        async function saveCoupon(event) {
            event.preventDefault();
            
            const id = document.getElementById('coupon-id').value;
            const data = {
                code: document.getElementById('coupon-code').value.toUpperCase(),
                description: document.getElementById('coupon-description').value,
                discount_type: document.getElementById('coupon-discount-type').value,
                discount_value: parseFloat(document.getElementById('coupon-discount-value').value),
                starts_at: document.getElementById('coupon-starts-at').value || null,
                expires_at: document.getElementById('coupon-expires-at').value || null,
                max_uses: parseInt(document.getElementById('coupon-max-uses').value) || null,
                max_uses_per_customer: parseInt(document.getElementById('coupon-max-uses-per-customer').value),
                minimum_order_value: parseFloat(document.getElementById('coupon-minimum-order').value) || null,
                is_stackable: document.getElementById('coupon-stackable').checked,
                is_active: document.getElementById('coupon-active').checked
            };
            
            try {
                const url = id ? \`/api/admin/coupons/\${id}\` : '/api/admin/coupons';
                const method = id ? 'put' : 'post';
                
                const res = await axios[method](url, data);
                
                if (res.data.success) {
                    alert(id ? 'Gutschein aktualisiert!' : 'Gutschein erstellt!');
                    closeModal();
                    loadCoupons();
                    loadStats();
                }
            } catch (error) {
                console.error('Error saving coupon:', error);
                alert(error.response?.data?.error || 'Fehler beim Speichern');
            }
        }
        
        async function toggleCoupon(id, currentStatus) {
            try {
                const res = await axios.put(\`/api/admin/coupons/\${id}\`, {
                    is_active: !currentStatus
                });
                
                if (res.data.success) {
                    loadCoupons();
                    loadStats();
                }
            } catch (error) {
                console.error('Error toggling coupon:', error);
                alert('Fehler beim Ändern des Status');
            }
        }
        
        async function deleteCoupon(id) {
            if (!confirm('Gutschein wirklich löschen?')) return;
            
            try {
                const res = await axios.delete(\`/api/admin/coupons/\${id}\`);
                
                if (res.data.success) {
                    alert('Gutschein gelöscht!');
                    loadCoupons();
                    loadStats();
                }
            } catch (error) {
                console.error('Error deleting coupon:', error);
                alert(error.response?.data?.error || 'Fehler beim Löschen');
            }
        }
        
        function closeModal() {
            document.getElementById('coupon-modal').classList.remove('active');
        }
        
        function updateDiscountLabel() {
            const type = document.getElementById('coupon-discount-type').value;
            const label = document.getElementById('discount-value-label');
            const input = document.getElementById('coupon-discount-value');
            
            if (type === 'percentage') {
                label.textContent = 'Rabattwert * (%)';
                input.setAttribute('max', '100');
                input.setAttribute('placeholder', 'z.B. 10');
            } else {
                label.textContent = 'Rabattwert * (€)';
                input.removeAttribute('max');
                input.setAttribute('placeholder', 'z.B. 5.00');
            }
        }
        
        // Load data on page load
        document.addEventListener('DOMContentLoaded', () => {
            loadStats();
            loadCoupons();
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    </script>
</body>
</html>
  `
}
