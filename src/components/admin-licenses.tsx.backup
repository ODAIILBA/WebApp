// License Key Management Component
import type { FC } from 'hono/jsx'

export const AdminLicenses: FC = () => {
  return (
    <div>
      {/* Header Actions */}
      <div class="flex items-center justify-between mb-6">
        <div class="flex gap-3">
          <select class="form-control w-48" id="filter-product">
            <option value="">All Products</option>
            <option value="available">Available Keys</option>
            <option value="sold">Sold Keys</option>
            <option value="used">Used Keys</option>
            <option value="expired">Expired Keys</option>
          </select>
          
          <select class="form-control w-48" id="filter-status">
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="used">Used</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>
        
        <div class="flex gap-3">
          <a href="/admin/licenses/import" class="btn-primary">
            <i class="fas fa-file-upload mr-2"></i> Import CSV
          </a>
          <button class="btn-primary" onclick="exportLicenses()">
            <i class="fas fa-file-download mr-2"></i> Export CSV
          </button>
          <button class="btn-gold" onclick="showAddKeyModal()">
            <i class="fas fa-plus mr-2"></i> Add License Key
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div class="grid md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white rounded-lg p-4 border-l-4 border-green-500">
          <div class="text-sm text-gray-600">Available</div>
          <div class="text-2xl font-bold text-green-600" id="stat-available">0</div>
        </div>
        <div class="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <div class="text-sm text-gray-600">Sold</div>
          <div class="text-2xl font-bold text-blue-600" id="stat-sold">0</div>
        </div>
        <div class="bg-white rounded-lg p-4 border-l-4 border-purple-500">
          <div class="text-sm text-gray-600">Used</div>
          <div class="text-2xl font-bold text-purple-600" id="stat-used">0</div>
        </div>
        <div class="bg-white rounded-lg p-4 border-l-4 border-red-500">
          <div class="text-sm text-gray-600">Expired</div>
          <div class="text-2xl font-bold text-red-600" id="stat-expired">0</div>
        </div>
        <div class="bg-white rounded-lg p-4 border-l-4 border-gray-500">
          <div class="text-sm text-gray-600">Total Keys</div>
          <div class="text-2xl font-bold text-gray-800" id="stat-total">0</div>
        </div>
      </div>
      
      {/* License Keys Table */}
      <div class="admin-card">
        <table class="table" id="licenses-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>License Key</th>
              <th>Product</th>
              <th>Type</th>
              <th>Status</th>
              <th>Activation</th>
              <th>Order</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9" class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
                <p class="text-gray-500">Loading license keys...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        async function loadLicenses() {
          try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/licenses', {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              // Update statistics
              const stats = {
                available: 0,
                sold: 0,
                used: 0,
                expired: 0,
                total: data.data.length
              };
              
              data.data.forEach(key => {
                if (stats[key.status] !== undefined) {
                  stats[key.status]++;
                }
              });
              
              document.getElementById('stat-available').textContent = stats.available;
              document.getElementById('stat-sold').textContent = stats.sold;
              document.getElementById('stat-used').textContent = stats.used;
              document.getElementById('stat-expired').textContent = stats.expired;
              document.getElementById('stat-total').textContent = stats.total;
              
              // Populate table
              const tbody = document.querySelector('#licenses-table tbody');
              tbody.innerHTML = data.data.map(key => \`
                <tr>
                  <td><input type="checkbox" value="\${key.id}" /></td>
                  <td>
                    <code class="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                      \${key.license_key}
                    </code>
                  </td>
                  <td>\${key.product_name || 'N/A'}</td>
                  <td>
                    <span class="badge badge-info">\${key.key_type}</span>
                  </td>
                  <td>
                    <span class="badge \${getStatusBadge(key.status)}">
                      \${key.status}
                    </span>
                  </td>
                  <td>\${key.activation_count} / \${key.activation_limit}</td>
                  <td>
                    \${key.assigned_to_order_id 
                      ? \`<a href="/admin/orders/\${key.assigned_to_order_id}" class="text-blue-600">#\${key.assigned_to_order_id}</a>\`
                      : '-'
                    }
                  </td>
                  <td>\${new Date(key.created_at).toLocaleDateString()}</td>
                  <td>
                    <div class="flex gap-2">
                      <button onclick="viewKey(\${key.id})" 
                              class="text-blue-600 hover:text-blue-700" 
                              title="View Details">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button onclick="revokeKey(\${key.id})" 
                              class="text-red-600 hover:text-red-700"
                              title="Revoke Key">
                        <i class="fas fa-ban"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              \`).join('');
            } else {
              document.querySelector('#licenses-table tbody').innerHTML = \`
                <tr>
                  <td colspan="9" class="text-center py-8">
                    <p class="text-gray-500">No license keys found</p>
                    <button onclick="showAddKeyModal()" class="btn-gold mt-4">
                      <i class="fas fa-plus mr-2"></i> Add License Keys
                    </button>
                  </td>
                </tr>
              \`;
            }
          } catch (error) {
            console.error('Error loading licenses:', error);
          }
        }
        
        function getStatusBadge(status) {
          const badges = {
            available: 'badge-success',
            sold: 'badge-info',
            used: 'badge-warning',
            expired: 'badge-danger',
            revoked: 'badge-danger'
          };
          return badges[status] || 'badge-info';
        }
        
        function showAddKeyModal() {
          alert('Add License Key modal - to be implemented');
        }
        
        function viewKey(id) {
          alert('View key details: ' + id);
        }
        
        function revokeKey(id) {
          if (confirm('Are you sure you want to revoke this license key?')) {
            console.log('Revoke key:', id);
          }
        }
        
        async function exportLicenses() {
          try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/licenses/export', {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'license-keys-' + new Date().toISOString().split('T')[0] + '.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } catch (error) {
            console.error('Error exporting licenses:', error);
            alert('Failed to export license keys');
          }
        }
        
        document.addEventListener('DOMContentLoaded', loadLicenses);
      `}} />
    </div>
  )
}

// CSV Import Component
export const AdminLicenseImport: FC = () => {
  return (
    <div class="max-w-4xl">
      {/* Instructions */}
      <div class="admin-card mb-6 bg-blue-50 border border-blue-200">
        <div class="flex items-start gap-3">
          <i class="fas fa-info-circle text-2xl text-blue-500 mt-1"></i>
          <div>
            <h3 class="font-bold text-blue-900 mb-2">CSV Import Instructions</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• CSV file must contain headers: <code>product_id, license_key, key_type, activation_limit</code></li>
              <li>• Each license key must be unique</li>
              <li>• Product ID must match an existing product</li>
              <li>• Key types: <code>single</code>, <code>volume</code>, <code>oem</code></li>
              <li>• Maximum 1000 keys per import</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Sample CSV */}
      <div class="admin-card mb-6">
        <h3 class="text-lg font-bold mb-4">Sample CSV Format</h3>
        <div class="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>product_id,license_key,key_type,activation_limit
1,XXXXX-XXXXX-XXXXX-XXXXX-XXXXX,single,1
1,YYYYY-YYYYY-YYYYY-YYYYY-YYYYY,single,1
2,ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ,volume,5</pre>
        </div>
        <button class="btn-primary mt-4" onclick="downloadSampleCSV()">
          <i class="fas fa-download mr-2"></i> Download Sample CSV
        </button>
      </div>
      
      {/* Upload Form */}
      <div class="admin-card">
        <h3 class="text-lg font-bold mb-4">Upload CSV File</h3>
        
        <form id="import-form">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <i class="fas fa-file-csv text-5xl text-gray-400 mb-4"></i>
            <p class="text-lg font-medium mb-2">Drag and drop your CSV file here</p>
            <p class="text-sm text-gray-500 mb-4">or</p>
            <input 
              type="file" 
              id="csv-file" 
              accept=".csv" 
              class="hidden"
              onchange="handleFileSelect(event)"
            />
            <label for="csv-file" class="btn-primary cursor-pointer">
              <i class="fas fa-folder-open mr-2"></i> Browse Files
            </label>
          </div>
          
          <div id="file-info" class="hidden mb-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i class="fas fa-file-csv text-2xl text-green-500"></i>
                <div>
                  <div class="font-medium" id="file-name"></div>
                  <div class="text-sm text-gray-500" id="file-size"></div>
                </div>
              </div>
              <button type="button" onclick="clearFile()" class="text-red-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button type="submit" class="btn-gold">
              <i class="fas fa-upload mr-2"></i> Import License Keys
            </button>
            <a href="/admin/licenses" class="btn-primary">
              Cancel
            </a>
          </div>
        </form>
        
        {/* Import Progress */}
        <div id="import-progress" class="hidden mt-6">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
              <i class="fas fa-spinner fa-spin text-blue-500"></i>
              <span class="font-medium">Importing license keys...</span>
            </div>
            <div class="bg-white rounded-full h-2 overflow-hidden">
              <div id="progress-bar" class="bg-blue-500 h-full transition-all" style="width: 0%"></div>
            </div>
            <div class="text-sm text-gray-600 mt-2">
              <span id="progress-text">0 / 0 keys imported</span>
            </div>
          </div>
        </div>
        
        {/* Import Results */}
        <div id="import-results" class="hidden mt-6"></div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        let selectedFile = null;
        
        function handleFileSelect(event) {
          const file = event.target.files[0];
          if (file && file.type === 'text/csv') {
            selectedFile = file;
            document.getElementById('file-info').classList.remove('hidden');
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('file-size').textContent = (file.size / 1024).toFixed(2) + ' KB';
          } else {
            alert('Please select a valid CSV file');
          }
        }
        
        function clearFile() {
          selectedFile = null;
          document.getElementById('csv-file').value = '';
          document.getElementById('file-info').classList.add('hidden');
        }
        
        function downloadSampleCSV() {
          const csv = \`product_id,license_key,key_type,activation_limit
1,XXXXX-XXXXX-XXXXX-XXXXX-XXXXX,single,1
1,YYYYY-YYYYY-YYYYY-YYYYY-YYYYY,single,1
2,ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ,volume,5\`;
          
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'license-keys-sample.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        
        document.getElementById('import-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          if (!selectedFile) {
            alert('Please select a CSV file first');
            return;
          }
          
          const formData = new FormData();
          formData.append('file', selectedFile);
          
          document.getElementById('import-progress').classList.remove('hidden');
          
          try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/licenses/import', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + token
              },
              body: formData
            });
            
            const result = await response.json();
            
            document.getElementById('import-progress').classList.add('hidden');
            
            if (result.success) {
              document.getElementById('import-results').classList.remove('hidden');
              document.getElementById('import-results').innerHTML = \`
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-2xl text-green-500"></i>
                    <div>
                      <h4 class="font-bold text-green-900 mb-2">Import Successful!</h4>
                      <ul class="text-sm text-green-800">
                        <li>✓ \${result.data.imported} license keys imported</li>
                        <li>✓ \${result.data.skipped || 0} duplicate keys skipped</li>
                      </ul>
                      <a href="/admin/licenses" class="btn-gold mt-4 inline-block">
                        View License Keys
                      </a>
                    </div>
                  </div>
                </div>
              \`;
              
              clearFile();
            } else {
              document.getElementById('import-results').classList.remove('hidden');
              document.getElementById('import-results').innerHTML = \`
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div class="flex items-start gap-3">
                    <i class="fas fa-exclamation-circle text-2xl text-red-500"></i>
                    <div>
                      <h4 class="font-bold text-red-900 mb-2">Import Failed</h4>
                      <p class="text-sm text-red-800">\${result.error}</p>
                    </div>
                  </div>
                </div>
              \`;
            }
          } catch (error) {
            console.error('Error importing licenses:', error);
            document.getElementById('import-progress').classList.add('hidden');
            alert('Failed to import license keys');
          }
        });
      `}} />
    </div>
  )
}
