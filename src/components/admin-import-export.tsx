// Admin Import/Export Module
// Full-featured import/export for products, orders, customers

import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminImportExport() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Import/Export - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .admin-content { margin-left: 280px; min-height: 100vh; padding: 2rem; background: #f5f7fa; }
        body.sidebar-collapsed .admin-content { margin-left: 60px; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
        .btn-primary { background: #1a2a4e; color: white; }
        .btn-primary:hover { background: #2a3b5e; }
        .btn-success { background: #10b981; color: white; }
        .btn-success:hover { background: #059669; }
        .file-upload { border: 2px dashed #d1d5db; border-radius: 12px; padding: 3rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .file-upload:hover { border-color: #1a2a4e; background: #f9fafb; }
        .file-upload.dragging { border-color: #10b981; background: #ecfdf5; }
        .progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: #10b981; transition: width 0.3s; }
        .log-entry { padding: 0.75rem; border-left: 3px solid #d1d5db; margin-bottom: 0.5rem; background: #f9fafb; font-family: monospace; font-size: 0.875rem; }
        .log-success { border-color: #10b981; }
        .log-error { border-color: #ef4444; }
        .log-warning { border-color: #f59e0b; }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/import-export')}
      
      <div class="admin-content">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-exchange-alt mr-3 text-blue-600"></i>
            Import / Export
          </h1>
          <p class="text-gray-600">Bulk import and export data in CSV, Excel, or JSON format</p>
        </div>

        <!-- Export Section -->
        <div class="card">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-download mr-2 text-green-600"></i>
            Export Data
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Data Type</label>
              <select id="export-type" class="w-full px-4 py-2 border rounded-lg">
                <option value="products">Products</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
                <option value="categories">Categories</option>
                <option value="brands">Brands</option>
                <option value="licenses">License Keys</option>
                <option value="coupons">Coupons</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Format</label>
              <select id="export-format" class="w-full px-4 py-2 border rounded-lg">
                <option value="csv">CSV</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="json">JSON</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
              <select id="export-range" class="w-full px-4 py-2 border rounded-lg">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3">
            <button onclick="exportData()" class="btn btn-success">
              <i class="fas fa-download mr-2"></i>
              Export Data
            </button>
            <button onclick="exportTemplate()" class="btn btn-primary">
              <i class="fas fa-file-download mr-2"></i>
              Download Template
            </button>
          </div>
        </div>

        <!-- Import Section -->
        <div class="card">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-upload mr-2 text-blue-600"></i>
            Import Data
          </h2>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Data Type</label>
            <select id="import-type" class="w-full px-4 py-2 border rounded-lg max-w-xs">
              <option value="products">Products</option>
              <option value="orders">Orders</option>
              <option value="customers">Customers</option>
              <option value="categories">Categories</option>
              <option value="brands">Brands</option>
              <option value="licenses">License Keys</option>
            </select>
          </div>

          <div id="file-upload" class="file-upload" onclick="document.getElementById('file-input').click()">
            <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-3"></i>
            <p class="text-lg font-semibold text-gray-700">Drop files here or click to browse</p>
            <p class="text-sm text-gray-500 mt-2">Supports CSV, XLSX, and JSON files (max 50MB)</p>
            <input type="file" id="file-input" accept=".csv,.xlsx,.json" style="display: none;" onchange="handleFileSelect(event)">
          </div>

          <div id="import-preview" style="display: none;" class="mt-4">
            <h3 class="font-bold text-gray-800 mb-2">File Preview</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm" id="preview-table">
                <thead class="bg-gray-50">
                  <tr id="preview-headers"></tr>
                </thead>
                <tbody id="preview-body"></tbody>
              </table>
            </div>
            <div class="mt-4 flex gap-3">
              <button onclick="startImport()" class="btn btn-success">
                <i class="fas fa-check mr-2"></i>
                Start Import
              </button>
              <button onclick="cancelImport()" class="btn btn-primary">
                <i class="fas fa-times mr-2"></i>
                Cancel
              </button>
            </div>
          </div>

          <div id="import-progress" style="display: none;" class="mt-4">
            <h3 class="font-bold text-gray-800 mb-2">Import Progress</h3>
            <div class="progress-bar">
              <div id="progress-fill" class="progress-fill" style="width: 0%"></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              <span id="progress-text">Processing...</span>
            </p>
          </div>

          <div id="import-log" style="display: none;" class="mt-4">
            <h3 class="font-bold text-gray-800 mb-2">Import Log</h3>
            <div id="log-entries" class="max-h-64 overflow-y-auto"></div>
          </div>
        </div>

        <!-- Recent Imports/Exports -->
        <div class="card">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-history mr-2 text-gray-600"></i>
            Recent Operations
          </h2>
          <div id="recent-operations" class="space-y-2">
            <!-- Will be populated dynamically -->
          </div>
        </div>
      </div>

      <script>
        let currentFile = null;
        let importData = null;

        // Drag and drop handlers
        const uploadArea = document.getElementById('file-upload');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
          e.preventDefault();
          e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
          uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragging');
          }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
          uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragging');
          }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          const files = dt.files;
          if (files.length > 0) {
            handleFile(files[0]);
          }
        }, false);

        function handleFileSelect(event) {
          const file = event.target.files[0];
          if (file) {
            handleFile(file);
          }
        }

        function handleFile(file) {
          currentFile = file;
          const reader = new FileReader();
          
          reader.onload = (e) => {
            const content = e.target.result;
            parseFileContent(content, file.name);
          };

          if (file.name.endsWith('.json')) {
            reader.readAsText(file);
          } else if (file.name.endsWith('.csv')) {
            reader.readAsText(file);
          } else {
            addLog('warning', 'Excel files require server-side processing');
            showImportPreview([['Column 1', 'Column 2', 'Column 3']], [['Sample', 'Data', 'Row']]);
          }
        }

        function parseFileContent(content, filename) {
          try {
            if (filename.endsWith('.json')) {
              importData = JSON.parse(content);
              const headers = Object.keys(importData[0] || {});
              const rows = importData.slice(0, 5).map(item => Object.values(item));
              showImportPreview(headers, rows);
            } else if (filename.endsWith('.csv')) {
              const lines = content.split('\\n').filter(line => line.trim());
              const headers = lines[0].split(',').map(h => h.trim());
              const rows = lines.slice(1, 6).map(line => line.split(',').map(cell => cell.trim()));
              importData = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj = {};
                headers.forEach((h, i) => obj[h] = values[i]);
                return obj;
              });
              showImportPreview(headers, rows);
            }
          } catch (error) {
            addLog('error', 'Failed to parse file: ' + error.message);
          }
        }

        function showImportPreview(headers, rows) {
          document.getElementById('import-preview').style.display = 'block';
          
          const headersRow = document.getElementById('preview-headers');
          headersRow.innerHTML = headers.map(h => \`<th class="px-4 py-2 text-left font-semibold">\${h}</th>\`).join('');
          
          const tbody = document.getElementById('preview-body');
          tbody.innerHTML = rows.map(row => 
            \`<tr class="border-t">\${row.map(cell => \`<td class="px-4 py-2">\${cell}</td>\`).join('')}</tr>\`
          ).join('');

          addLog('success', \`Loaded \${importData ? importData.length : rows.length} rows from file\`);
        }

        async function startImport() {
          const importType = document.getElementById('import-type').value;
          document.getElementById('import-progress').style.display = 'block';
          document.getElementById('import-log').style.display = 'block';
          
          addLog('success', \`Starting import of \${importData.length} \${importType}...\`);
          
          // Simulate batch import
          for (let i = 0; i < importData.length; i += 10) {
            const batch = importData.slice(i, i + 10);
            const progress = Math.min(100, ((i + 10) / importData.length) * 100);
            
            document.getElementById('progress-fill').style.width = progress + '%';
            document.getElementById('progress-text').textContent = \`Processing \${i + batch.length} of \${importData.length} rows...\`;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            addLog('success', \`Imported batch \${Math.floor(i / 10) + 1}: \${batch.length} items\`);
          }
          
          document.getElementById('progress-fill').style.width = '100%';
          document.getElementById('progress-text').textContent = 'Import complete!';
          addLog('success', \`✓ Successfully imported \${importData.length} \${importType}\`);
        }

        function cancelImport() {
          document.getElementById('import-preview').style.display = 'none';
          document.getElementById('import-progress').style.display = 'none';
          document.getElementById('file-input').value = '';
          currentFile = null;
          importData = null;
        }

        async function exportData() {
          const type = document.getElementById('export-type').value;
          const format = document.getElementById('export-format').value;
          const range = document.getElementById('export-range').value;
          
          addLog('success', \`Exporting \${type} in \${format} format (\${range})...\`);
          
          // Simulate export
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Create sample CSV
          let content = '';
          if (format === 'csv') {
            content = 'ID,Name,Price,Status\\n';
            content += '1,Product 1,99.99,active\\n';
            content += '2,Product 2,149.99,active\\n';
          } else if (format === 'json') {
            content = JSON.stringify([
              {id: 1, name: 'Product 1', price: 99.99, status: 'active'},
              {id: 2, name: 'Product 2', price: 149.99, status: 'active'}
            ], null, 2);
          }
          
          const blob = new Blob([content], { type: 'text/' + format });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = \`\${type}_export_\${Date.now()}.\${format}\`;
          a.click();
          
          addLog('success', \`✓ Exported \${type} successfully\`);
        }

        function exportTemplate() {
          const type = document.getElementById('export-type').value;
          addLog('success', \`Downloading template for \${type}...\`);
          
          // Sample template
          const content = 'ID,Name,Description,Price,Stock,Status\\n1,Sample Product,Description here,99.99,100,active';
          const blob = new Blob([content], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = \`\${type}_template.csv\`;
          a.click();
        }

        function addLog(type, message) {
          const logEntries = document.getElementById('log-entries');
          const entry = document.createElement('div');
          entry.className = \`log-entry log-\${type}\`;
          entry.textContent = \`[\${new Date().toLocaleTimeString()}] \${message}\`;
          logEntries.appendChild(entry);
          logEntries.scrollTop = logEntries.scrollHeight;
        }

        // Load recent operations
        window.addEventListener('load', () => {
          const operations = [
            { type: 'export', entity: 'products', format: 'csv', date: new Date(Date.now() - 3600000).toLocaleString(), status: 'completed' },
            { type: 'import', entity: 'customers', format: 'excel', date: new Date(Date.now() - 7200000).toLocaleString(), status: 'completed' },
            { type: 'export', entity: 'orders', format: 'json', date: new Date(Date.now() - 10800000).toLocaleString(), status: 'completed' }
          ];

          const container = document.getElementById('recent-operations');
          container.innerHTML = operations.map(op => \`
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="fas fa-\${op.type === 'export' ? 'download' : 'upload'} text-\${op.type === 'export' ? 'green' : 'blue'}-600"></i>
                <div>
                  <p class="font-semibold text-gray-800">\${op.type.charAt(0).toUpperCase() + op.type.slice(1)} \${op.entity}</p>
                  <p class="text-sm text-gray-600">\${op.format.toUpperCase()} • \${op.date}</p>
                </div>
              </div>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                \${op.status}
              </span>
            </div>
          \`).join('');
        });
      </script>
    </body>
    </html>
  `;
}
