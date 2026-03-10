import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminEmailMarketing() {
  const sidebar = AdminSidebarAdvanced('/admin/email-marketing')

  return `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Marketing - Admin - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .campaign-card {
            transition: all 0.3s ease;
        }
        .campaign-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 50;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }
        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background-color: #fefefe;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }
    </style>
</head>
<body class="bg-gray-50">
    ${sidebar}
    
    <div style="margin-left: 280px; padding: 2rem;">
        <!-- Header -->
        <div class="mb-6 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    <i class="fas fa-envelope mr-3 text-blue-600"></i>
                    Email Marketing
                </h1>
                <p class="text-gray-600">Kampagnen verwalten und Performance überwachen</p>
            </div>
            <div class="flex space-x-2">
                <button onclick="openTemplateModal()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                    <i class="fas fa-palette mr-2"></i>
                    Vorlagen
                </button>
                <button onclick="openSubscriberModal()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                    <i class="fas fa-users mr-2"></i>
                    Abonnenten
                </button>
                <button onclick="openCampaignModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    <i class="fas fa-plus mr-2"></i>
                    Neue Kampagne
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" id="statsCards">
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="bg-white rounded-lg shadow p-6 animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>

        <!-- Performance Chart -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h3 class="text-lg font-semibold mb-4">Kampagnen-Performance</h3>
            <canvas id="performanceChart" height="80"></canvas>
        </div>

        <!-- Campaigns List -->
        <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-xl font-semibold">Alle Kampagnen</h2>
                <div class="flex space-x-2">
                    <select id="statusFilter" onchange="filterCampaigns()" class="px-4 py-2 border rounded-lg">
                        <option value="">Alle Status</option>
                        <option value="draft">Entwurf</option>
                        <option value="scheduled">Geplant</option>
                        <option value="sending">Wird versendet</option>
                        <option value="sent">Versendet</option>
                        <option value="paused">Pausiert</option>
                    </select>
                    <input type="text" id="searchInput" oninput="filterCampaigns()" placeholder="Kampagne suchen..." class="px-4 py-2 border rounded-lg">
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kampagne</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typ</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versendet</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Geöffnet</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Klicks</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Umsatz</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody id="campaignsTable" class="divide-y divide-gray-200">
                        <tr>
                            <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin mr-2"></i>Lädt Kampagnen...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Create Campaign Modal -->
    <div id="campaignModal" class="modal">
        <div class="modal-content">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">Neue Kampagne erstellen</h3>
                <button onclick="closeCampaignModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="campaignForm" onsubmit="saveCampaign(event)">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kampagnenname</label>
                        <input type="text" name="name" required class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Betreff</label>
                        <input type="text" name="subject" required class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kampagnentyp</label>
                        <select name="campaign_type" class="w-full px-3 py-2 border rounded-lg">
                            <option value="promotional">Werbung</option>
                            <option value="welcome">Willkommen</option>
                            <option value="abandoned_cart">Warenkorbabbrecher</option>
                            <option value="newsletter">Newsletter</option>
                            <option value="transactional">Transaktional</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Vorlage</label>
                        <select name="template_id" id="templateSelect" class="w-full px-3 py-2 border rounded-lg">
                            <option value="">Vorlage wählen...</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Von Name</label>
                        <input type="text" name="from_name" value="SOFTWAREKING24" class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Von E-Mail</label>
                        <input type="email" name="from_email" value="noreply@softwareking24.com" class="w-full px-3 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select name="status" class="w-full px-3 py-2 border rounded-lg">
                            <option value="draft">Entwurf</option>
                            <option value="scheduled">Geplant</option>
                            <option value="sending">Wird versendet</option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-2">
                    <button type="button" onclick="closeCampaignModal()" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
                        Abbrechen
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <i class="fas fa-save mr-2"></i>Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Templates Modal -->
    <div id="templateModal" class="modal">
        <div class="modal-content" style="max-width: 800px;">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">E-Mail Vorlagen</h3>
                <button onclick="closeTemplateModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="templatesList" class="grid grid-cols-2 gap-4">
                <div class="text-center py-8 col-span-2">
                    <i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Subscribers Modal -->
    <div id="subscriberModal" class="modal">
        <div class="modal-content" style="max-width: 900px;">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">E-Mail Abonnenten</h3>
                <button onclick="closeSubscriberModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="mb-4">
                <button onclick="showAddSubscriberForm()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <i class="fas fa-plus mr-2"></i>Abonnent hinzufügen
                </button>
            </div>
            <div id="subscribersList" class="overflow-y-auto" style="max-height: 60vh;">
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                </div>
            </div>
        </div>
    </div>

    <script>
        let campaigns = [];
        let templates = [];
        let subscribers = [];
        let dashboardStats = null;
        let performanceChart = null;

        // Load all data on page load
        async function loadData() {
            try {
                await Promise.all([
                    loadDashboardStats(),
                    loadCampaigns(),
                    loadTemplates()
                ]);
            } catch (error) {
                console.error('Error loading data:', error);
                showToast('Fehler beim Laden der Daten', 'error');
            }
        }

        // Load dashboard statistics
        async function loadDashboardStats() {
            try {
                const response = await axios.get('/api/email/dashboard');
                if (response.data.success) {
                    dashboardStats = response.data.stats;
                    renderDashboardStats();
                }
            } catch (error) {
                console.error('Error loading dashboard stats:', error);
            }
        }

        // Render dashboard stats cards
        function renderDashboardStats() {
            if (!dashboardStats) return;

            const totalSent = dashboardStats.total_sent || 0;
            const avgOpenRate = dashboardStats.recent_campaigns.length > 0
                ? (dashboardStats.recent_campaigns.reduce((sum, c) => sum + (c.total_sent > 0 ? (c.total_opened / c.total_sent) * 100 : 0), 0) / dashboardStats.recent_campaigns.length).toFixed(1)
                : 0;
            const avgClickRate = dashboardStats.recent_campaigns.length > 0
                ? (dashboardStats.recent_campaigns.reduce((sum, c) => sum + (c.total_sent > 0 ? (c.total_clicked / c.total_sent) * 100 : 0), 0) / dashboardStats.recent_campaigns.length).toFixed(1)
                : 0;

            document.getElementById('statsCards').innerHTML = \`
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Versendete E-Mails</p>
                        <i class="fas fa-paper-plane text-2xl text-blue-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-blue-600">\${totalSent.toLocaleString()}</p>
                    <p class="text-sm text-gray-500 mt-2">\${dashboardStats.total_campaigns} Kampagnen</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Durchschn. Öffnungsrate</p>
                        <i class="fas fa-envelope-open text-2xl text-green-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-green-600">\${avgOpenRate}%</p>
                    <p class="text-sm text-gray-500 mt-2">Alle Kampagnen</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Durchschn. Klickrate</p>
                        <i class="fas fa-mouse-pointer text-2xl text-purple-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-purple-600">\${avgClickRate}%</p>
                    <p class="text-sm text-gray-500 mt-2">Alle Kampagnen</p>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-gray-500 text-sm">Generierter Umsatz</p>
                        <i class="fas fa-euro-sign text-2xl text-yellow-600"></i>
                    </div>
                    <p class="text-3xl font-bold text-yellow-600">€\${(dashboardStats.total_revenue || 0).toLocaleString()}</p>
                    <p class="text-sm text-gray-500 mt-2">\${dashboardStats.active_subscribers} Abonnenten</p>
                </div>
            \`;
        }

        // Load campaigns
        async function loadCampaigns() {
            try {
                const response = await axios.get('/api/email/campaigns');
                if (response.data.success) {
                    campaigns = response.data.campaigns;
                    renderCampaigns();
                    renderPerformanceChart();
                }
            } catch (error) {
                console.error('Error loading campaigns:', error);
                document.getElementById('campaignsTable').innerHTML = \`
                    <tr><td colspan="8" class="px-6 py-4 text-center text-red-500">
                        <i class="fas fa-exclamation-circle mr-2"></i>Fehler beim Laden
                    </td></tr>
                \`;
            }
        }

        // Render campaigns table
        function renderCampaigns() {
            const table = document.getElementById('campaignsTable');
            
            if (campaigns.length === 0) {
                table.innerHTML = \`
                    <tr><td colspan="8" class="px-6 py-4 text-center text-gray-500">
                        Keine Kampagnen vorhanden
                    </td></tr>
                \`;
                return;
            }

            table.innerHTML = campaigns.map(campaign => {
                const openRate = campaign.total_sent > 0 
                    ? ((campaign.total_opened / campaign.total_sent) * 100).toFixed(1) 
                    : 0;
                const clickRate = campaign.total_sent > 0 
                    ? ((campaign.total_clicked / campaign.total_sent) * 100).toFixed(1) 
                    : 0;
                
                const statusColors = {
                    'draft': 'gray',
                    'scheduled': 'blue',
                    'sending': 'yellow',
                    'sent': 'green',
                    'paused': 'orange',
                    'cancelled': 'red'
                };
                const statusTexts = {
                    'draft': 'Entwurf',
                    'scheduled': 'Geplant',
                    'sending': 'Wird versendet',
                    'sent': 'Versendet',
                    'paused': 'Pausiert',
                    'cancelled': 'Abgebrochen'
                };
                const typeTexts = {
                    'promotional': 'Werbung',
                    'welcome': 'Willkommen',
                    'abandoned_cart': 'Warenkorb',
                    'newsletter': 'Newsletter',
                    'transactional': 'Transaktion'
                };

                const statusColor = statusColors[campaign.status] || 'gray';
                const statusText = statusTexts[campaign.status] || campaign.status;
                const typeText = typeTexts[campaign.campaign_type] || campaign.campaign_type;
                
                return \`
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                        <div>
                            <div class="font-semibold text-gray-900">\${campaign.name}</div>
                            <div class="text-sm text-gray-500">\${campaign.subject}</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="text-sm text-gray-600">\${typeText}</span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 bg-\${statusColor}-100 text-\${statusColor}-800 text-xs rounded-full">
                            \${statusText}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-semibold">\${(campaign.total_sent || 0).toLocaleString()}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div>
                            <div class="font-semibold">\${(campaign.total_opened || 0).toLocaleString()}</div>
                            <div class="text-xs text-gray-500">\${openRate}%</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div>
                            <div class="font-semibold">\${(campaign.total_clicked || 0).toLocaleString()}</div>
                            <div class="text-xs text-gray-500">\${clickRate}%</div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-semibold text-green-600">€\${(campaign.revenue_generated || 0).toLocaleString()}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex space-x-2">
                            <button onclick="viewCampaign(\${campaign.id})" class="text-blue-600 hover:text-blue-800" title="Ansehen">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editCampaign(\${campaign.id})" class="text-green-600 hover:text-green-800" title="Bearbeiten">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="duplicateCampaign(\${campaign.id})" class="text-purple-600 hover:text-purple-800" title="Duplizieren">
                                <i class="fas fa-copy"></i>
                            </button>
                            <button onclick="deleteCampaign(\${campaign.id})" class="text-red-600 hover:text-red-800" title="Löschen">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                \`;
            }).join('');
        }

        // Render performance chart
        function renderPerformanceChart() {
            if (performanceChart) {
                performanceChart.destroy();
            }

            const ctx = document.getElementById('performanceChart').getContext('2d');
            const topCampaigns = campaigns.slice(0, 10);

            performanceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: topCampaigns.map(c => c.name),
                    datasets: [
                        {
                            label: 'Öffnungsrate (%)',
                            data: topCampaigns.map(c => c.total_sent > 0 ? ((c.total_opened / c.total_sent) * 100).toFixed(1) : 0),
                            backgroundColor: 'rgba(34, 197, 94, 0.5)',
                            borderColor: 'rgba(34, 197, 94, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Klickrate (%)',
                            data: topCampaigns.map(c => c.total_sent > 0 ? ((c.total_clicked / c.total_sent) * 100).toFixed(1) : 0),
                            backgroundColor: 'rgba(168, 85, 247, 0.5)',
                            borderColor: 'rgba(168, 85, 247, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Load templates
        async function loadTemplates() {
            try {
                const response = await axios.get('/api/email/templates');
                if (response.data.success) {
                    templates = response.data.templates;
                    populateTemplateSelect();
                }
            } catch (error) {
                console.error('Error loading templates:', error);
            }
        }

        // Populate template select
        function populateTemplateSelect() {
            const select = document.getElementById('templateSelect');
            select.innerHTML = '<option value="">Vorlage wählen...</option>' +
                templates.map(t => \`<option value="\${t.id}">\${t.name}</option>\`).join('');
        }

        // Filter campaigns
        function filterCampaigns() {
            const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            const filtered = campaigns.filter(campaign => {
                const matchesStatus = !statusFilter || campaign.status === statusFilter;
                const matchesSearch = !searchTerm || 
                    campaign.name.toLowerCase().includes(searchTerm) ||
                    campaign.subject.toLowerCase().includes(searchTerm);
                return matchesStatus && matchesSearch;
            });

            campaigns = filtered;
            renderCampaigns();
        }

        // Modal functions
        function openCampaignModal() {
            document.getElementById('campaignModal').classList.add('show');
        }

        function closeCampaignModal() {
            document.getElementById('campaignModal').classList.remove('show');
            document.getElementById('campaignForm').reset();
        }

        function openTemplateModal() {
            document.getElementById('templateModal').classList.add('show');
            loadTemplatesList();
        }

        function closeTemplateModal() {
            document.getElementById('templateModal').classList.remove('show');
        }

        function openSubscriberModal() {
            document.getElementById('subscriberModal').classList.add('show');
            loadSubscribersList();
        }

        function closeSubscriberModal() {
            document.getElementById('subscriberModal').classList.remove('show');
        }

        // Load templates list for modal
        async function loadTemplatesList() {
            const container = document.getElementById('templatesList');
            try {
                const response = await axios.get('/api/email/templates');
                if (response.data.success) {
                    container.innerHTML = response.data.templates.map(t => \`
                        <div class="border rounded-lg p-4 hover:shadow-lg transition">
                            <h4 class="font-semibold mb-2">\${t.name}</h4>
                            <p class="text-sm text-gray-600 mb-3">\${t.description || 'Keine Beschreibung'}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">\${t.template_type}</span>
                                <button onclick="useTemplate(\${t.id})" class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading templates:', error);
                container.innerHTML = '<p class="text-red-500 col-span-2 text-center">Fehler beim Laden</p>';
            }
        }

        // Load subscribers list for modal
        async function loadSubscribersList() {
            const container = document.getElementById('subscribersList');
            try {
                const response = await axios.get('/api/email/subscribers');
                if (response.data.success) {
                    subscribers = response.data.subscribers;
                    container.innerHTML = \`
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quelle</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                \${subscribers.map(s => \`
                                    <tr>
                                        <td class="px-4 py-2">\${s.email}</td>
                                        <td class="px-4 py-2">\${s.first_name || ''} \${s.last_name || ''}</td>
                                        <td class="px-4 py-2">
                                            <span class="px-2 py-1 bg-\${s.status === 'active' ? 'green' : 'gray'}-100 text-\${s.status === 'active' ? 'green' : 'gray'}-800 text-xs rounded-full">
                                                \${s.status}
                                            </span>
                                        </td>
                                        <td class="px-4 py-2">\${s.subscription_source || '-'}</td>
                                        <td class="px-4 py-2">
                                            <button onclick="deleteSubscriber(\${s.id})" class="text-red-600 hover:text-red-800">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                \`).join('')}
                            </tbody>
                        </table>
                    \`;
                }
            } catch (error) {
                console.error('Error loading subscribers:', error);
                container.innerHTML = '<p class="text-red-500 text-center">Fehler beim Laden</p>';
            }
        }

        // Save campaign
        async function saveCampaign(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await axios.post('/api/email/campaigns', data);
                if (response.data.success) {
                    showToast('Kampagne erfolgreich erstellt', 'success');
                    closeCampaignModal();
                    loadCampaigns();
                }
            } catch (error) {
                console.error('Error saving campaign:', error);
                showToast('Fehler beim Speichern', 'error');
            }
        }

        // Campaign actions
        function viewCampaign(id) {
            const campaign = campaigns.find(c => c.id === id);
            if (campaign) {
                alert('Kampagnen-Details:\\n\\n' + JSON.stringify(campaign, null, 2));
            }
        }

        function editCampaign(id) {
            showToast('Bearbeitungsfunktion wird implementiert', 'info');
        }

        function duplicateCampaign(id) {
            showToast('Duplizierungsfunktion wird implementiert', 'info');
        }

        async function deleteCampaign(id) {
            if (!confirm('Möchten Sie diese Kampagne wirklich löschen?')) return;

            try {
                const response = await axios.delete(\`/api/email/campaigns/\${id}\`);
                if (response.data.success) {
                    showToast('Kampagne gelöscht', 'success');
                    loadCampaigns();
                }
            } catch (error) {
                console.error('Error deleting campaign:', error);
                showToast('Fehler beim Löschen', 'error');
            }
        }

        async function deleteSubscriber(id) {
            if (!confirm('Abonnent wirklich löschen?')) return;

            try {
                const response = await axios.delete(\`/api/email/subscribers/\${id}\`);
                if (response.data.success) {
                    showToast('Abonnent gelöscht', 'success');
                    loadSubscribersList();
                }
            } catch (error) {
                console.error('Error deleting subscriber:', error);
                showToast('Fehler beim Löschen', 'error');
            }
        }

        function useTemplate(id) {
            document.getElementById('templateSelect').value = id;
            closeTemplateModal();
            openCampaignModal();
        }

        function showAddSubscriberForm() {
            showToast('Funktion wird implementiert', 'info');
        }

        // Toast notification
        function showToast(message, type = 'info') {
            const colors = {
                success: 'bg-green-500',
                error: 'bg-red-500',
                info: 'bg-blue-500'
            };
            
            const toast = document.createElement('div');
            toast.className = \`fixed bottom-4 right-4 \${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50\`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadData();
        });
    </script>
</body>
</html>`;
}
