export const AdminProductImport = () => {
  return `
    <div class="p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold" style="color: var(--navy-dark);">
          <i class="fas fa-file-import mr-2" style="color: var(--gold);"></i>
          WooCommerce Produktimport
        </h2>
        <p class="text-gray-600 mt-2">
          Importieren Sie Produkte aus Ihrer WooCommerce CSV-Export-Datei
        </p>
      </div>

      <!-- Import Instructions -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-info-circle text-blue-500 text-xl"></i>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">Importanweisungen</h3>
            <div class="mt-2 text-sm text-blue-700">
              <ul class="list-disc list-inside space-y-1">
                <li>Unterstützt WooCommerce CSV-Exportformat</li>
                <li>Produkte werden automatisch kategorisiert und gemappt</li>
                <li>Existierende Produkte (gleiche SKU) werden aktualisiert</li>
                <li>Neue Produkte werden hinzugefügt</li>
                <li>Empfohlene Dateigröße: max. 10 MB pro Import</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4" style="color: var(--navy-dark);">
          1. CSV-Datei hochladen
        </h3>

        <!-- File Upload Area -->
        <div id="upload-area" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer">
          <input type="file" id="csv-file" accept=".csv" class="hidden" />
          <div id="upload-placeholder">
            <i class="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
            <p class="text-lg font-semibold text-gray-700 mb-2">
              Klicken Sie hier oder ziehen Sie eine CSV-Datei
            </p>
            <p class="text-sm text-gray-500">
              Unterstützte Formate: .csv (max. 10 MB)
            </p>
          </div>
          <div id="file-info" class="hidden">
            <i class="fas fa-file-csv text-6xl mb-4" style="color: var(--gold);"></i>
            <p class="text-lg font-semibold" style="color: var(--navy-dark);">
              <span id="file-name"></span>
            </p>
            <p class="text-sm text-gray-600 mt-2">
              <span id="file-size"></span> • <span id="file-rows"></span> Zeilen
            </p>
            <button id="change-file" class="mt-4 text-sm" style="color: var(--gold);">
              <i class="fas fa-redo mr-1"></i>Andere Datei wählen
            </button>
          </div>
        </div>
      </div>

      <!-- Import Options -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4" style="color: var(--navy-dark);">
          2. Import-Optionen
        </h3>

        <div class="space-y-4">
          <!-- Language Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Produktsprache
            </label>
            <select id="import-language" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold">
              <option value="de" selected>Deutsch (DE)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>

          <!-- Update Mode -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Update-Modus
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="radio" name="update-mode" value="update" checked class="mr-2 accent-gold" />
                <span class="text-sm">Existierende Produkte aktualisieren</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="update-mode" value="skip" class="mr-2 accent-gold" />
                <span class="text-sm">Existierende Produkte überspringen</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="update-mode" value="new-only" class="mr-2 accent-gold" />
                <span class="text-sm">Nur neue Produkte hinzufügen</span>
              </label>
            </div>
          </div>

          <!-- Batch Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Batch-Größe (Produkte pro Durchlauf)
            </label>
            <input type="number" id="batch-size" value="50" min="10" max="500" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold" />
            <p class="text-xs text-gray-500 mt-1">Kleinere Batches = stabilerer Import, größere = schneller</p>
          </div>
        </div>
      </div>

      <!-- Import Action -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4" style="color: var(--navy-dark);">
          3. Import starten
        </h3>

        <button id="start-import" disabled class="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
          <i class="fas fa-upload mr-2"></i>
          Import starten
        </button>
      </div>

      <!-- Progress Section -->
      <div id="progress-section" class="bg-white rounded-lg shadow-lg p-6 hidden">
        <h3 class="text-lg font-semibold mb-4" style="color: var(--navy-dark);">
          <i class="fas fa-spinner fa-spin mr-2" style="color: var(--gold);"></i>
          Import läuft...
        </h3>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span id="progress-text">Vorbereitung...</span>
            <span id="progress-percentage">0%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div id="progress-bar" class="h-4 rounded-full transition-all duration-300" style="background-color: var(--gold); width: 0%"></div>
          </div>
        </div>

        <!-- Progress Stats -->
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="bg-green-50 rounded-lg p-3 text-center">
            <div class="text-2xl font-bold text-green-600" id="success-count">0</div>
            <div class="text-xs text-green-700">Erfolgreich</div>
          </div>
          <div class="bg-yellow-50 rounded-lg p-3 text-center">
            <div class="text-2xl font-bold text-yellow-600" id="skip-count">0</div>
            <div class="text-xs text-yellow-700">Übersprungen</div>
          </div>
          <div class="bg-red-50 rounded-lg p-3 text-center">
            <div class="text-2xl font-bold text-red-600" id="error-count">0</div>
            <div class="text-xs text-red-700">Fehler</div>
          </div>
        </div>

        <!-- Live Log -->
        <div class="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <div id="import-log" class="text-xs font-mono text-gray-700 space-y-1">
            <!-- Log entries will be added here -->
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div id="results-section" class="bg-white rounded-lg shadow-lg p-6 hidden">
        <div id="success-result" class="hidden">
          <div class="flex items-center mb-4">
            <i class="fas fa-check-circle text-5xl text-green-500 mr-4"></i>
            <div>
              <h3 class="text-2xl font-bold text-green-600">Import erfolgreich!</h3>
              <p class="text-gray-600">Alle Produkte wurden erfolgreich importiert.</p>
            </div>
          </div>
          <div class="bg-green-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-3xl font-bold text-green-600" id="final-success">0</div>
                <div class="text-sm text-green-700">Produkte importiert</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-gray-600" id="final-time">0s</div>
                <div class="text-sm text-gray-600">Dauer</div>
              </div>
            </div>
          </div>
        </div>

        <div id="partial-result" class="hidden">
          <div class="flex items-center mb-4">
            <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mr-4"></i>
            <div>
              <h3 class="text-2xl font-bold text-yellow-600">Import teilweise erfolgreich</h3>
              <p class="text-gray-600">Einige Produkte konnten nicht importiert werden.</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-green-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600" id="final-success-partial">0</div>
              <div class="text-sm text-green-700">Erfolgreich</div>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-600" id="final-skip-partial">0</div>
              <div class="text-sm text-yellow-700">Übersprungen</div>
            </div>
            <div class="bg-red-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-red-600" id="final-error-partial">0</div>
              <div class="text-sm text-red-700">Fehler</div>
            </div>
          </div>

          <!-- Error Details -->
          <div id="error-details" class="bg-red-50 rounded-lg p-4">
            <h4 class="font-semibold text-red-800 mb-2">Fehlerdetails:</h4>
            <div id="error-list" class="text-sm text-red-700 max-h-48 overflow-y-auto">
              <!-- Error list will be populated -->
            </div>
          </div>
        </div>

        <div class="mt-6 flex space-x-4">
          <button id="new-import" class="flex-1 px-6 py-3 rounded-lg font-semibold text-white" style="background-color: var(--gold);">
            <i class="fas fa-redo mr-2"></i>
            Neuer Import
          </button>
          <a href="/admin/products" class="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-700 transition">
            <i class="fas fa-th-list mr-2"></i>
            Zu Produkten
          </a>
        </div>
      </div>
    </div>

    <style>
      :root {
        --navy-dark: #1a2a4e;
        --gold: #d4af37;
      }

      #upload-area.drag-over {
        border-color: var(--gold);
        background-color: rgba(212, 175, 55, 0.05);
      }
    </style>

    <script>
      let selectedFile = null;
      let importRunning = false;

      // File upload handling
      const uploadArea = document.getElementById('upload-area');
      const fileInput = document.getElementById('csv-file');
      const uploadPlaceholder = document.getElementById('upload-placeholder');
      const fileInfo = document.getElementById('file-info');
      const startButton = document.getElementById('start-import');

      uploadArea.addEventListener('click', () => {
        if (!importRunning) {
          fileInput.click();
        }
      });

      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!importRunning) {
          uploadArea.classList.add('drag-over');
        }
      });

      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        if (!importRunning && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          if (file.name.endsWith('.csv')) {
            handleFileSelect(file);
          } else {
            alert('Bitte wählen Sie eine CSV-Datei.');
          }
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFileSelect(e.target.files[0]);
        }
      });

      document.getElementById('change-file').addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      function handleFileSelect(file) {
        selectedFile = file;
        
        // Show file info
        document.getElementById('file-name').textContent = file.name;
        document.getElementById('file-size').textContent = formatFileSize(file.size);
        
        // Count rows
        const reader = new FileReader();
        reader.onload = (e) => {
          const lines = e.target.result.split('\\n').length - 1; // -1 for header
          document.getElementById('file-rows').textContent = lines + ' Produkte';
        };
        reader.readAsText(file);

        uploadPlaceholder.classList.add('hidden');
        fileInfo.classList.remove('hidden');
        
        // Enable start button
        startButton.disabled = false;
        startButton.classList.remove('bg-gray-300', 'text-gray-500', 'cursor-not-allowed');
        startButton.classList.add('text-white');
        startButton.style.backgroundColor = 'var(--gold)';
      }

      function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
      }

      // Start import
      startButton.addEventListener('click', async () => {
        if (!selectedFile || importRunning) return;

        importRunning = true;
        startButton.disabled = true;
        
        // Show progress section
        document.getElementById('progress-section').classList.remove('hidden');
        document.getElementById('results-section').classList.add('hidden');

        // Reset counters
        document.getElementById('success-count').textContent = '0';
        document.getElementById('skip-count').textContent = '0';
        document.getElementById('error-count').textContent = '0';
        document.getElementById('import-log').innerHTML = '';

        try {
          await performImport();
        } catch (error) {
          console.error('Import error:', error);
          addLog('FEHLER: ' + error.message, 'error');
        }
      });

      async function performImport() {
        const startTime = Date.now();
        
        addLog('CSV-Datei wird gelesen...', 'info');
        const csvContent = await selectedFile.text();
        
        addLog('Daten werden an Server gesendet...', 'info');
        
        const formData = new FormData();
        formData.append('csv', csvContent);
        formData.append('language', document.getElementById('import-language').value);
        formData.append('updateMode', document.querySelector('input[name="update-mode"]:checked').value);
        formData.append('batchSize', document.getElementById('batch-size').value);

        try {
          const response = await axios.post('/api/admin/import/woocommerce', formData);
          
          if (response.data.success) {
            const result = response.data.data;
            
            // Update progress
            document.getElementById('progress-bar').style.width = '100%';
            document.getElementById('progress-percentage').textContent = '100%';
            document.getElementById('progress-text').textContent = 'Import abgeschlossen!';

            // Update counters
            document.getElementById('success-count').textContent = result.success;
            document.getElementById('error-count').textContent = result.failed;

            // Calculate time
            const duration = Math.round((Date.now() - startTime) / 1000);

            // Show results
            setTimeout(() => {
              document.getElementById('progress-section').classList.add('hidden');
              document.getElementById('results-section').classList.remove('hidden');

              if (result.failed === 0) {
                document.getElementById('success-result').classList.remove('hidden');
                document.getElementById('final-success').textContent = result.success;
                document.getElementById('final-time').textContent = duration + 's';
              } else {
                document.getElementById('partial-result').classList.remove('hidden');
                document.getElementById('final-success-partial').textContent = result.success;
                document.getElementById('final-error-partial').textContent = result.failed;

                // Show errors
                const errorList = document.getElementById('error-list');
                errorList.innerHTML = result.errors.map(err => 
                  \`<div class="mb-1">• \${err}</div>\`
                ).join('');
              }
            }, 1000);

            addLog(\`Import erfolgreich: \${result.success} Produkte importiert, \${result.failed} Fehler\`, 'success');
          } else {
            throw new Error(response.data.error || 'Import fehlgeschlagen');
          }
        } catch (error) {
          addLog('FEHLER: ' + error.message, 'error');
          document.getElementById('error-count').textContent = '1';
        }

        importRunning = false;
      }

      function addLog(message, type = 'info') {
        const log = document.getElementById('import-log');
        const timestamp = new Date().toLocaleTimeString('de-DE');
        const colors = {
          info: 'text-gray-700',
          success: 'text-green-600',
          error: 'text-red-600',
          warning: 'text-yellow-600'
        };
        
        const entry = document.createElement('div');
        entry.className = colors[type] || colors.info;
        entry.textContent = \`[\${timestamp}] \${message}\`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
      }

      // New import button
      document.getElementById('new-import')?.addEventListener('click', () => {
        location.reload();
      });
    </script>
  `;
};
