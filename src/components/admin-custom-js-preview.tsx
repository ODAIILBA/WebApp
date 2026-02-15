import { html } from 'hono/html'

export function AdminCustomJSPreview(jsData: any) {
  const jsCode = jsData?.js_code || ''
  const jsName = jsData?.name || 'JS Preview'
  const executionType = jsData?.execution_type || 'immediate'
  const placement = jsData?.placement || 'footer'
  
  return html`<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Preview: ${jsName} - SOFTWAREKING24</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --navy-ultra-dark: #0a1628;
            --navy-dark: #1a2a4e;
            --navy-medium: #2d3e6f;
            --navy-light: #435991;
            --gold: #d4af37;
            --gold-light: #e8c966;
            --gold-dark: #b8941f;
        }

        body {
            background: linear-gradient(135deg, var(--navy-ultra-dark) 0%, var(--navy-dark) 100%);
            min-height: 100vh;
        }

        .console-log {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            line-height: 1.6;
            max-height: 400px;
            overflow-y: auto;
        }

        .console-entry {
            margin-bottom: 8px;
            padding: 4px 8px;
            border-left: 3px solid #569cd6;
        }

        .console-log-entry { border-left-color: #569cd6; }
        .console-warn-entry { border-left-color: #ffa500; color: #ffa500; }
        .console-error-entry { border-left-color: #f44336; color: #f44336; }
        .console-info-entry { border-left-color: #2196f3; color: #2196f3; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
            animation: fadeIn 0.6s ease;
        }
    </style>
    
    ${placement === 'header' ? html`
    <!-- CUSTOM JS FROM DATABASE (HEADER) -->
    <script id="custom-preview-js-header">
        ${executionType === 'immediate' ? jsCode : ''}
    </script>
    ` : ''}
</head>
<body class="font-sans">
    <!-- Preview Header Banner -->
    <div class="bg-blue-500 text-white py-3 px-4 text-center font-bold sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fas fa-code"></i>
                <span>JS Preview Mode: <strong>${jsName}</strong></span>
                <span class="text-sm bg-white/20 px-2 py-1 rounded">
                    ${placement === 'header' ? 'Header' : 'Footer'} | ${executionType}
                </span>
            </div>
            <div class="flex gap-2">
                <button onclick="toggleConsole()" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-1 rounded transition">
                    <i class="fas fa-terminal mr-1"></i> Console
                </button>
                <button onclick="window.close()" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-1 rounded transition">
                    <i class="fas fa-times mr-1"></i> Schließen
                </button>
                <button onclick="window.history.back()" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-1 rounded transition">
                    <i class="fas fa-arrow-left mr-1"></i> Zurück
                </button>
            </div>
        </div>
    </div>

    <!-- Console Output Panel (Hidden by default) -->
    <div id="console-panel" class="hidden bg-navy-ultra-dark border-b border-gold sticky top-14 z-40 animate-fadeIn">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between mb-3">
                <h3 class="text-gold font-bold">
                    <i class="fas fa-terminal mr-2"></i>
                    Console Output
                </h3>
                <button onclick="clearConsoleDisplay()" class="text-gray-400 hover:text-white text-sm">
                    <i class="fas fa-trash mr-1"></i> Clear
                </button>
            </div>
            <div id="console-output" class="console-log">
                <div class="text-gray-500 text-sm">Waiting for console output...</div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Info Card -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8 animate-fadeIn">
            <h2 class="text-2xl font-bold text-navy-dark mb-4">
                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                JavaScript Test Environment
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-bold text-navy-dark mb-2">Script Information:</h3>
                    <ul class="space-y-1 text-gray-600 text-sm">
                        <li><strong>Name:</strong> ${jsName}</li>
                        <li><strong>Placement:</strong> ${placement === 'header' ? 'Header (before </head>)' : 'Footer (before </body>)'}</li>
                        <li><strong>Execution:</strong> ${executionType}</li>
                        <li><strong>Status:</strong> <span class="text-green-600 font-bold">Active in Preview</span></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold text-navy-dark mb-2">Test Features:</h3>
                    <ul class="space-y-1 text-gray-600 text-sm">
                        <li>✅ Console logging captured</li>
                        <li>✅ Error handling enabled</li>
                        <li>✅ Interactive test elements below</li>
                        <li>✅ Click "Console" to view output</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Interactive Test Elements -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Test Buttons -->
            <div class="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-navy-dark mb-4">
                    <i class="fas fa-mouse-pointer text-gold mr-2"></i>
                    Interactive Test Buttons
                </h3>
                <div class="space-y-3">
                    <button id="test-btn-1" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition font-bold">
                        <i class="fas fa-flask mr-2"></i>
                        Test Button 1
                    </button>
                    <button id="test-btn-2" class="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition font-bold">
                        <i class="fas fa-check mr-2"></i>
                        Test Button 2
                    </button>
                    <button id="test-btn-3" class="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition font-bold">
                        <i class="fas fa-star mr-2"></i>
                        Test Button 3
                    </button>
                </div>
            </div>

            <!-- Test Form -->
            <div class="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-navy-dark mb-4">
                    <i class="fas fa-wpforms text-gold mr-2"></i>
                    Test Form
                </h3>
                <form id="test-form" class="space-y-3">
                    <input type="text" 
                           id="test-input" 
                           placeholder="Enter something..." 
                           class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
                    <input type="email" 
                           placeholder="Your email..." 
                           class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
                    <button type="submit" class="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-3 px-4 rounded-lg transition">
                        <i class="fas fa-paper-plane mr-2"></i>
                        Submit Form
                    </button>
                </form>
            </div>

            <!-- Product Card (Test Element) -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                <img src="https://placehold.co/400x200/1a2a4e/d4af37?text=Product+Test" alt="Test Product" class="w-full">
                <div class="p-6">
                    <h4 class="text-lg font-bold text-navy-dark mb-2">Test Product</h4>
                    <p class="text-gray-600 text-sm mb-4">This is a sample product card for testing your JavaScript</p>
                    <button class="product-btn w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-2 px-4 rounded-lg transition">
                        Add to Cart
                    </button>
                </div>
            </div>

            <!-- Event Trigger Zone -->
            <div class="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <h3 class="text-xl font-bold text-navy-dark mb-4">
                    <i class="fas fa-bolt text-gold mr-2"></i>
                    Event Test Zone
                </h3>
                <div id="hover-zone" class="bg-gray-100 p-8 rounded-lg text-center mb-3 cursor-pointer hover:bg-gray-200 transition">
                    <i class="fas fa-hand-pointer text-3xl text-gray-400 mb-2"></i>
                    <p class="text-gray-600 font-bold">Hover or Click Me</p>
                </div>
                <div id="scroll-trigger" class="bg-blue-100 p-8 rounded-lg text-center cursor-pointer hover:bg-blue-200 transition">
                    <i class="fas fa-arrows-alt-v text-3xl text-blue-400 mb-2"></i>
                    <p class="text-blue-600 font-bold">Scroll Test Element</p>
                </div>
            </div>
        </div>

        <!-- Code Display -->
        <div class="bg-white rounded-lg shadow-lg p-6 mt-8 animate-fadeIn">
            <h3 class="text-xl font-bold text-navy-dark mb-4">
                <i class="fas fa-code text-gold mr-2"></i>
                JavaScript Code Being Tested
            </h3>
            <pre class="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm"><code>${jsCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
    </div>

    ${placement === 'footer' ? html`
    <!-- CUSTOM JS FROM DATABASE (FOOTER) -->
    <script id="custom-preview-js-footer">
        ${executionType === 'immediate' ? jsCode : ''}
        
        ${executionType === 'domready' ? html`
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                ${jsCode}
            });
        } else {
            ${jsCode}
        }
        ` : ''}
        
        ${executionType === 'load' ? html`
        window.addEventListener('load', function() {
            ${jsCode}
        });
        ` : ''}
    </script>
    ` : ''}

    <!-- Console Capture & Preview Controls -->
    <script>
        // Capture console output
        const consoleOutput = document.getElementById('console-output');
        const originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info
        };

        function addConsoleEntry(type, args) {
            const entry = document.createElement('div');
            entry.className = \`console-entry console-\${type}-entry\`;
            entry.textContent = Array.from(args).map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            if (consoleOutput.querySelector('.text-gray-500')) {
                consoleOutput.innerHTML = '';
            }
            
            consoleOutput.appendChild(entry);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }

        console.log = function(...args) {
            originalConsole.log.apply(console, args);
            addConsoleEntry('log', args);
        };

        console.warn = function(...args) {
            originalConsole.warn.apply(console, args);
            addConsoleEntry('warn', args);
        };

        console.error = function(...args) {
            originalConsole.error.apply(console, args);
            addConsoleEntry('error', args);
        };

        console.info = function(...args) {
            originalConsole.info.apply(console, args);
            addConsoleEntry('info', args);
        };

        function toggleConsole() {
            const panel = document.getElementById('console-panel');
            panel.classList.toggle('hidden');
        }

        function clearConsoleDisplay() {
            consoleOutput.innerHTML = '<div class="text-gray-500 text-sm">Console cleared...</div>';
        }

        // Add default event listeners for testing
        document.getElementById('test-btn-1')?.addEventListener('click', function() {
        });

        document.getElementById('test-btn-2')?.addEventListener('click', function() {
        });

        document.getElementById('test-btn-3')?.addEventListener('click', function() {
        });

        document.getElementById('test-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputValue = document.getElementById('test-input').value;
            if (inputValue) {
            }
        });

        document.getElementById('hover-zone')?.addEventListener('mouseenter', function() {
        });

        document.getElementById('hover-zone')?.addEventListener('click', function() {
        });

        // Log preview start
    </script>
</body>
</html>`
}
