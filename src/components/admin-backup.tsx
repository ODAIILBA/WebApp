export function AdminBackup() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backup & Restore - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
            :root {
                --navy-dark: #132C46;
                --gold: #D9A50B;
            }
            body {
                background: #f8fafc;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .stat-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: all 0.3s;
            }
            .stat-card:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                transform: translateY(-2px);
            }
            .backup-item {
                background: white;
                border-radius: 8px;
                padding: 1rem;
                border-left: 4px solid var(--gold);
                transition: all 0.2s;
            }
            .backup-item:hover {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .progress-bar {
                height: 8px;
                background: #e5e7eb;
                border-radius: 4px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: var(--gold);
                transition: width 0.3s;
            }
            .btn-primary {
                background: var(--navy-dark);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
            }
            .btn-primary:hover {
                background: #0f1f33;
                transform: translateY(-1px);
            }
            .btn-success {
                background: #10b981;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                transition: all 0.2s;
            }
            .btn-success:hover {
                background: #059669;
            }
            .btn-danger {
                background: #ef4444;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                transition: all 0.2s;
            }
            .btn-danger:hover {
                background: #dc2626;
            }
            .badge {
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .badge-success { background: #d1fae5; color: #065f46; }
            .badge-warning { background: #fef3c7; color: #92400e; }
            .badge-error { background: #fee2e2; color: #991b1b; }
        </style>
    </head>
    <body>
        ${AdminSidebarAdvanced('/admin/backup')}
        
        <div class="ml-80 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold" style="color: var(--navy-dark);">
                            <i class="fas fa-database mr-3"></i>Backup & Wiederherstellung
                        </h1>
                        <p class="text-gray-600 mt-2">Datenbank-Backups erstellen und wiederherstellen</p>
                    </div>
                    <button onclick="createBackup()" class="btn-primary">
                        <i class="fas fa-plus mr-2"></i>Neues Backup erstellen
                    </button>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-4 gap-6 mb-8">
                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Gesamt Backups</p>
                                <p class="text-3xl font-bold mt-1" style="color: var(--navy-dark);" id="stat-total">0</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(19, 44, 70, 0.1);">
                                <i class="fas fa-database text-xl" style="color: var(--navy-dark);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Letztes Backup</p>
                                <p class="text-lg font-bold mt-1" style="color: var(--navy-dark);" id="stat-last">-</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(217, 165, 11, 0.1);">
                                <i class="fas fa-clock text-xl" style="color: var(--gold);"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Gesamt Größe</p>
                                <p class="text-xl font-bold mt-1" style="color: var(--navy-dark);" id="stat-size">0 MB</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(16, 185, 129, 0.1);">
                                <i class="fas fa-hard-drive text-xl text-green-600"></i>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm">Auto-Backup</p>
                                <p class="text-xl font-bold mt-1" style="color: var(--navy-dark);" id="stat-auto">Täglich</p>
                            </div>
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(59, 130, 246, 0.1);">
                                <i class="fas fa-sync text-xl text-blue-600"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Backup Progress (hidden by default) -->
                <div id="backup-progress" class="stat-card mb-8" style="display: none;">
                    <div class="flex items-center justify-between mb-2">
                        <p class="font-semibold">Backup wird erstellt...</p>
                        <p id="progress-percent">0%</p>
                    </div>
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>

                <!-- Backup List -->
                <div class="stat-card">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold" style="color: var(--navy-dark);">
                            <i class="fas fa-list mr-2"></i>Backup-Verlauf
                        </h2>
                        <div class="flex gap-2">
                            <button onclick="filterBackups('all')" class="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200">
                                Alle
                            </button>
                            <button onclick="filterBackups('manual')" class="px-4 py-2 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-100">
                                Manuell
                            </button>
                            <button onclick="filterBackups('auto')" class="px-4 py-2 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-100">
                                Automatisch
                            </button>
                        </div>
                    </div>

                    <div id="backup-list" class="space-y-4">
                        <!-- Backups will be loaded here -->
                    </div>
                </div>
            </div>
        </div>

        <script>
            const backups = [
                {
                    id: 1,
                    name: 'backup_2026-02-02_14-30',
                    type: 'manual',
                    size: '145.8 MB',
                    date: '2026-02-02 14:30:00',
                    status: 'success',
                    tables: 15,
                    records: 45320
                },
                {
                    id: 2,
                    name: 'backup_2026-02-02_03-00',
                    type: 'auto',
                    size: '143.2 MB',
                    date: '2026-02-02 03:00:00',
                    status: 'success',
                    tables: 15,
                    records: 44890
                },
                {
                    id: 3,
                    name: 'backup_2026-02-01_03-00',
                    type: 'auto',
                    size: '141.5 MB',
                    date: '2026-02-01 03:00:00',
                    status: 'success',
                    tables: 15,
                    records: 44123
                },
                {
                    id: 4,
                    name: 'backup_2026-01-31_15-45',
                    type: 'manual',
                    size: '139.8 MB',
                    date: '2026-01-31 15:45:00',
                    status: 'success',
                    tables: 15,
                    records: 43567
                },
                {
                    id: 5,
                    name: 'backup_2026-01-31_03-00',
                    type: 'auto',
                    size: '138.9 MB',
                    date: '2026-01-31 03:00:00',
                    status: 'success',
                    tables: 15,
                    records: 43210
                }
            ];

            let currentFilter = 'all';

            function loadBackups() {
                const filtered = currentFilter === 'all' 
                    ? backups 
                    : backups.filter(b => b.type === currentFilter);

                const backupList = document.getElementById('backup-list');
                
                if (filtered.length === 0) {
                    backupList.innerHTML = '<p class="text-center text-gray-500 py-8">Keine Backups gefunden</p>';
                    return;
                }

                backupList.innerHTML = filtered.map(backup => \`
                    <div class="backup-item">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-3">
                                    <i class="fas fa-file-archive text-2xl" style="color: var(--gold);"></i>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <p class="font-semibold">\${backup.name}</p>
                                            <span class="badge \${backup.type === 'auto' ? 'badge-success' : 'badge-warning'}">
                                                \${backup.type === 'auto' ? 'Automatisch' : 'Manuell'}
                                            </span>
                                            <span class="badge badge-success">
                                                <i class="fas fa-check-circle mr-1"></i>Erfolgreich
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-600 mt-1">
                                            <i class="far fa-clock mr-1"></i>\${new Date(backup.date).toLocaleString('de-DE')}
                                            <span class="mx-2">•</span>
                                            <i class="fas fa-database mr-1"></i>\${backup.size}
                                            <span class="mx-2">•</span>
                                            <i class="fas fa-table mr-1"></i>\${backup.tables} Tabellen
                                            <span class="mx-2">•</span>
                                            <i class="fas fa-list mr-1"></i>\${backup.records.toLocaleString('de-DE')} Einträge
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="downloadBackup(\${backup.id})" class="btn-success">
                                    <i class="fas fa-download mr-1"></i>Download
                                </button>
                                <button onclick="restoreBackup(\${backup.id})" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                                    <i class="fas fa-undo mr-1"></i>Wiederherstellen
                                </button>
                                <button onclick="deleteBackup(\${backup.id})" class="btn-danger">
                                    <i class="fas fa-trash mr-1"></i>Löschen
                                </button>
                            </div>
                        </div>
                    </div>
                \`).join('');

                // Update stats
                const totalSize = backups.reduce((sum, b) => sum + parseFloat(b.size), 0);
                document.getElementById('stat-total').textContent = backups.length;
                document.getElementById('stat-last').textContent = new Date(backups[0].date).toLocaleDateString('de-DE');
                document.getElementById('stat-size').textContent = totalSize.toFixed(1) + ' MB';
            }

            function filterBackups(type) {
                currentFilter = type;
                
                // Update button styles
                document.querySelectorAll('[onclick^="filterBackups"]').forEach(btn => {
                    btn.classList.remove('bg-gray-100', 'font-medium');
                    btn.classList.add('text-gray-600');
                });
                event.target.classList.add('bg-gray-100', 'font-medium');
                event.target.classList.remove('text-gray-600');
                
                loadBackups();
            }

            function createBackup() {
                const progress = document.getElementById('backup-progress');
                const fill = document.getElementById('progress-fill');
                const percent = document.getElementById('progress-percent');
                
                progress.style.display = 'block';
                
                let width = 0;
                const interval = setInterval(() => {
                    width += 10;
                    fill.style.width = width + '%';
                    percent.textContent = width + '%';
                    
                    if (width >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            progress.style.display = 'none';
                            alert('Backup erfolgreich erstellt!');
                            // Add new backup to list
                            const newBackup = {
                                id: backups.length + 1,
                                name: \`backup_\${new Date().toISOString().slice(0,10)}_\${new Date().toTimeString().slice(0,5).replace(':', '-')}\`,
                                type: 'manual',
                                size: '146.2 MB',
                                date: new Date().toISOString(),
                                status: 'success',
                                tables: 15,
                                records: 45420
                            };
                            backups.unshift(newBackup);
                            loadBackups();
                        }, 500);
                    }
                }, 200);
            }

            function downloadBackup(id) {
                const backup = backups.find(b => b.id === id);
                alert(\`Download wird gestartet: \${backup.name}\`);
            }

            function restoreBackup(id) {
                const backup = backups.find(b => b.id === id);
                if (confirm(\`Möchten Sie wirklich das Backup "\${backup.name}" wiederherstellen? Dies überschreibt alle aktuellen Daten!\`)) {
                    alert('Wiederherstellung gestartet. Dies kann einige Minuten dauern...');
                }
            }

            function deleteBackup(id) {
                const backup = backups.find(b => b.id === id);
                if (confirm(\`Möchten Sie das Backup "\${backup.name}" wirklich löschen?\`)) {
                    const index = backups.findIndex(b => b.id === id);
                    backups.splice(index, 1);
                    loadBackups();
                }
            }

            // Load backups on page load
            loadBackups();
        </script>
    </body>
    </html>
  `.trim();
}

import { AdminSidebarAdvanced } from './admin-sidebar-advanced';
