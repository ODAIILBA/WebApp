// ============================================
// ADVANCED FIREWALL SYSTEM - Frontend JavaScript
// ============================================

let currentRules = [];
let currentAnalytics = null;
let currentSuggestions = [];

// Initialize page
async function initFirewallPage() {
  await Promise.all([
    loadRules(),
    loadAnalytics(),
    loadSuggestions()
  ]);
  
  // Auto-refresh every 30 seconds
  setInterval(() => {
    loadAnalytics();
    loadSuggestions();
  }, 30000);
}

// Load all firewall rules
async function loadRules() {
  try {
    const res = await axios.get('/api/admin/firewall/rules');
    if (res.data.success) {
      currentRules = res.data.rules;
      renderRules();
    }
  } catch (error) {
    console.error('Error loading rules:', error);
  }
}

// Render rules list with drag-and-drop
function renderRules() {
  const container = document.getElementById('rules-container');
  if (!container) return;
  
  container.innerHTML = currentRules.map((rule, index) => `
    <div class="rule-card ${rule.action}" data-rule-id="${rule.id}" draggable="true">
      <div class="rule-header">
        <div class="rule-priority">#${index + 1}</div>
        <div class="rule-info">
          <h4>${rule.rule_name}</h4>
          <span class="rule-type">${rule.target_type}: ${rule.target_value}</span>
        </div>
        <div class="rule-actions">
          <button onclick="toggleRule(${rule.id})" class="btn-icon" title="Aktiv/Inaktiv">
            <i class="fas fa-${rule.is_active ? 'toggle-on' : 'toggle-off'}"></i>
          </button>
          <button onclick="testRule(${rule.id})" class="btn-icon" title="Testen">
            <i class="fas fa-flask"></i>
          </button>
          <button onclick="duplicateRule(${rule.id})" class="btn-icon" title="Duplizieren">
            <i class="fas fa-copy"></i>
          </button>
          <button onclick="deleteRule(${rule.id})" class="btn-icon" title="Löschen">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="rule-stats">
        <span><i class="fas fa-bullseye"></i> ${rule.hit_count || 0} Treffer</span>
        <span><i class="fas fa-clock"></i> ${rule.last_triggered || 'Nie'}</span>
      </div>
    </div>
  `).join('');
  
  setupDragAndDrop();
}

// Setup drag-and-drop for rule priority
function setupDragAndDrop() {
  const rules = document.querySelectorAll('.rule-card');
  rules.forEach(rule => {
    rule.addEventListener('dragstart', handleDragStart);
    rule.addEventListener('dragover', handleDragOver);
    rule.addEventListener('drop', handleDrop);
    rule.addEventListener('dragend', handleDragEnd);
  });
}

let draggedElement = null;

function handleDragStart(e) {
  draggedElement = this;
  this.style.opacity = '0.4';
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDrop(e) {
  e.stopPropagation();
  if (draggedElement !== this) {
    const allRules = [...document.querySelectorAll('.rule-card')];
    const draggedIndex = allRules.indexOf(draggedElement);
    const targetIndex = allRules.indexOf(this);
    
    if (draggedIndex < targetIndex) {
      this.parentNode.insertBefore(draggedElement, this.nextSibling);
    } else {
      this.parentNode.insertBefore(draggedElement, this);
    }
    
    updateRulePriorities();
  }
  return false;
}

function handleDragEnd() {
  this.style.opacity = '1';
}

async function updateRulePriorities() {
  const ruleElements = document.querySelectorAll('.rule-card');
  const newOrder = Array.from(ruleElements).map((el, index) => ({
    id: parseInt(el.dataset.ruleId),
    priority: index + 1
  }));
  
  try {
    await axios.post('/api/admin/firewall/rules/reorder', { rules: newOrder });
    await loadRules();
  } catch (error) {
    alert('Fehler beim Aktualisieren der Prioritäten');
  }
}

// Toggle rule active status
async function toggleRule(id) {
  try {
    await axios.post(`/api/admin/firewall/rules/${id}/toggle`);
    await loadRules();
  } catch (error) {
    alert('Fehler beim Umschalten der Regel');
  }
}

// Duplicate rule
async function duplicateRule(id) {
  try {
    await axios.post(`/api/admin/firewall/rules/${id}/duplicate`);
    await loadRules();
  } catch (error) {
    alert('Fehler beim Duplizieren der Regel');
  }
}

// Delete rule
async function deleteRule(id) {
  if (!confirm('Regel wirklich löschen?')) return;
  
  try {
    await axios.delete(`/api/admin/firewall/rules/${id}`);
    await loadRules();
  } catch (error) {
    alert('Fehler beim Löschen der Regel');
  }
}

// Test rule simulation
async function testRule(id) {
  const rule = currentRules.find(r => r.id === id);
  if (!rule) return;
  
  const testRequest = {
    ip: prompt('Test-IP-Adresse:', '192.168.1.100'),
    country: prompt('Test-Land (Code):', 'DE'),
    path: prompt('Test-URL-Pfad:', '/api/login'),
    method: prompt('HTTP-Methode:', 'POST'),
    userAgent: prompt('User-Agent:', 'Mozilla/5.0')
  };
  
  try {
    const res = await axios.post('/api/admin/firewall/rules/test', { rule, testRequest });
    if (res.data.success) {
      alert(`Test-Ergebnis:\n\nMatched: ${res.data.matched}\nAction: ${res.data.action}\nReason: ${res.data.reason}`);
    }
  } catch (error) {
    alert('Fehler beim Testen der Regel');
  }
}

// Load live analytics
async function loadAnalytics() {
  try {
    const res = await axios.get('/api/admin/firewall/analytics');
    if (res.data.success) {
      currentAnalytics = res.data;
      renderAnalytics();
    }
  } catch (error) {
    console.error('Error loading analytics:', error);
  }
}

// Render analytics dashboard
function renderAnalytics() {
  if (!currentAnalytics) return;
  
  // Update stats cards
  document.getElementById('stat-blocked-today').textContent = currentAnalytics.stats.blockedToday;
  document.getElementById('stat-top-ip').textContent = currentAnalytics.stats.topBlockedIP;
  document.getElementById('stat-top-country').textContent = currentAnalytics.topCountries[0]?.country_code || 'N/A';
  document.getElementById('stat-rpm').textContent = currentAnalytics.stats.requestsPerMinute;
  
  // Render timeline chart
  renderTimelineChart(currentAnalytics.timeline);
  
  // Render top IPs table
  renderTopIPsTable(currentAnalytics.topIPs);
}

// Render timeline chart with Chart.js
function renderTimelineChart(timeline) {
  const canvas = document.getElementById('timeline-chart');
  if (!canvas) return;
  
  if (window.timelineChart) {
    window.timelineChart.destroy();
  }
  
  window.timelineChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: timeline.map(t => t.hour),
      datasets: [{
        label: 'Total Requests',
        data: timeline.map(t => t.total),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }, {
        label: 'Blocked',
        data: timeline.map(t => t.blocked),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Render top IPs table
function renderTopIPsTable(topIPs) {
  const tbody = document.getElementById('top-ips-table');
  if (!tbody) return;
  
  tbody.innerHTML = topIPs.map((ip, index) => `
    <tr>
      <td>${index + 1}</td>
      <td class="font-mono">${ip.ip_address}</td>
      <td><span class="badge badge-red">${ip.count}</span></td>
      <td>${new Date(ip.last_seen).toLocaleString('de-DE')}</td>
      <td>
        <button onclick="blockIP('${ip.ip_address}')" class="btn btn-sm btn-red">
          <i class="fas fa-ban"></i> Blockieren
        </button>
      </td>
    </tr>
  `).join('');
}

// Block IP address
async function blockIP(ip) {
  const duration = prompt('Blockierungsdauer (Stunden):', '24');
  if (!duration) return;
  
  try {
    await axios.post('/api/admin/firewall/rules', {
      rule_name: `Auto-Block: ${ip}`,
      rule_type: 'block',
      target_type: 'ip_address',
      target_value: ip,
      action: 'block',
      conditions: { duration: `${duration}h` }
    });
    alert(`IP ${ip} wurde für ${duration} Stunden blockiert`);
    await loadRules();
  } catch (error) {
    alert('Fehler beim Blockieren der IP');
  }
}

// Load AI security suggestions
async function loadSuggestions() {
  try {
    const res = await axios.get('/api/admin/firewall/ai-suggestions');
    if (res.data.success) {
      currentSuggestions = res.data.suggestions;
      renderSuggestions();
    }
  } catch (error) {
    console.error('Error loading suggestions:', error);
  }
}

// Render AI suggestions
function renderSuggestions() {
  const container = document.getElementById('ai-suggestions');
  if (!container) return;
  
  if (currentSuggestions.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">Keine Bedrohungen erkannt ✅</p>';
    return;
  }
  
  container.innerHTML = currentSuggestions.map(sug => `
    <div class="suggestion-card severity-${sug.severity}">
      <div class="suggestion-header">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>${sug.title}</h4>
        <span class="badge badge-${sug.severity === 'high' ? 'red' : 'yellow'}">${sug.severity.toUpperCase()}</span>
      </div>
      <p>${sug.description}</p>
      <button onclick="applySuggestion(${JSON.stringify(sug).replace(/"/g, '&quot;')})" class="btn btn-sm btn-primary">
        <i class="fas fa-check"></i> Vorschlag anwenden
      </button>
    </div>
  `).join('');
}

// Apply AI suggestion
async function applySuggestion(suggestion) {
  const action = suggestion.suggestedAction;
  
  try {
    if (action.type === 'block_ip') {
      await axios.post('/api/admin/firewall/rules', {
        rule_name: `AI-Block: ${suggestion.title}`,
        rule_type: 'block',
        target_type: 'ip_address',
        target_value: action.value,
        action: 'block',
        conditions: { duration: action.duration, auto_created: true }
      });
    }
    alert('Vorschlag erfolgreich angewendet!');
    await loadRules();
    await loadSuggestions();
  } catch (error) {
    alert('Fehler beim Anwenden des Vorschlags');
  }
}

// Apply security preset
async function applyPreset(presetName) {
  if (!confirm(`Preset "${presetName}" wirklich anwenden?`)) return;
  
  try {
    await axios.post(`/api/admin/firewall/presets/${presetName}/apply`);
    alert(`Preset "${presetName}" erfolgreich angewendet!`);
    await loadRules();
  } catch (error) {
    alert('Fehler beim Anwenden des Presets');
  }
}

// Emergency lockdown toggle
let lockdownActive = false;

async function toggleEmergencyLockdown() {
  lockdownActive = !lockdownActive;
  
  if (lockdownActive && !confirm('⚠️ NOTFALL-SPERRE AKTIVIEREN?\n\nAlle Zugriffe außer Ihrer IP werden blockiert!')) {
    lockdownActive = false;
    return;
  }
  
  try {
    await axios.post('/api/admin/firewall/emergency-lockdown', { enabled: lockdownActive });
    
    const btn = document.getElementById('emergency-lockdown-btn');
    if (btn) {
      btn.className = lockdownActive ? 'btn btn-lg btn-success' : 'btn btn-lg btn-red';
      btn.innerHTML = lockdownActive 
        ? '<i class="fas fa-unlock"></i> Notfall-Sperre DEAKTIVIEREN'
        : '<i class="fas fa-lock"></i> Notfall-Sperre AKTIVIEREN';
    }
    
    alert(lockdownActive ? '🔒 Notfall-Sperre AKTIVIERT' : '🔓 Notfall-Sperre DEAKTIVIERT');
  } catch (error) {
    alert('Fehler beim Umschalten der Notfall-Sperre');
    lockdownActive = !lockdownActive;
  }
}

// Show rule creation modal
function showCreateRuleModal() {
  document.getElementById('rule-modal').classList.remove('hidden');
}

// Hide rule creation modal
function hideCreateRuleModal() {
  document.getElementById('rule-modal').classList.add('hidden');
}

// Create new rule
async function createRule() {
  const form = document.getElementById('create-rule-form');
  const formData = new FormData(form);
  
  const ruleData = {
    rule_name: formData.get('rule_name'),
    target_type: formData.get('target_type'),
    target_value: formData.get('target_value'),
    action: formData.get('action'),
    conditions: {
      operator: formData.get('operator'),
      logic: formData.get('logic')
    }
  };
  
  try {
    await axios.post('/api/admin/firewall/rules', ruleData);
    alert('Regel erfolgreich erstellt!');
    hideCreateRuleModal();
    form.reset();
    await loadRules();
  } catch (error) {
    alert('Fehler beim Erstellen der Regel');
  }
}

// Show logs modal
async function showLogsModal() {
  try {
    const res = await axios.get('/api/admin/firewall/logs?limit=100');
    if (res.data.success) {
      const logs = res.data.logs;
      const tbody = document.getElementById('logs-table-body');
      tbody.innerHTML = logs.map(log => `
        <tr>
          <td class="font-mono text-sm">${log.ip_address}</td>
          <td><span class="badge badge-gray">${log.country_code || 'N/A'}</span></td>
          <td class="text-sm">${log.request_path}</td>
          <td><span class="badge badge-yellow">${log.attack_type || 'N/A'}</span></td>
          <td><span class="badge badge-${log.is_blocked ? 'red' : 'green'}">${log.is_blocked ? 'Blockiert' : 'Erlaubt'}</span></td>
          <td class="text-sm">${new Date(log.created_at).toLocaleString('de-DE')}</td>
        </tr>
      `).join('');
      
      document.getElementById('logs-modal').classList.remove('hidden');
    }
  } catch (error) {
    alert('Fehler beim Laden der Logs');
  }
}

// Hide logs modal
function hideLogsModal() {
  document.getElementById('logs-modal').classList.add('hidden');
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirewallPage);
} else {
  initFirewallPage();
}
