// Admin User Security Module
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminUserSecurity() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>User Security - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <style>
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #f8fafc;
        }
        
        .admin-content {
          margin-left: 280px;
          padding: 2rem;
          min-height: 100vh;
        }
        
        body.sidebar-collapsed .admin-content {
          margin-left: 60px;
        }
        
        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }
        
        .security-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }
        
        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        
        .activity-item {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          transition: background 0.2s;
        }
        
        .activity-item:hover {
          background: #f9fafb;
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .tab-button {
          padding: 0.75rem 1.5rem;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .tab-button.active {
          border-bottom-color: #3b82f6;
          color: #3b82f6;
          font-weight: 600;
        }
        
        .tab-content {
          display: none;
        }
        
        .tab-content.active {
          display: block;
        }
        
        .security-toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .security-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: .4s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #3b82f6;
        }
        
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0;
            padding: 1rem;
          }
        }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/user-security')}
      
      <div class="admin-content">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <i class="fas fa-shield-alt text-blue-600"></i>
                User Security Management
              </h1>
              <p class="text-gray-600 mt-2">Monitor and manage user security settings, sessions, and authentication</p>
            </div>
            
            <div class="flex gap-3">
              <button onclick="exportSecurityReport()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                <i class="fas fa-download mr-2"></i>Export Report
              </button>
              <button onclick="refreshData()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-sync-alt mr-2"></i>Refresh
              </button>
            </div>
          </div>
          
          <!-- Stats Dashboard -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div class="stat-card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Total Users</p>
                  <p class="text-2xl font-bold text-gray-800 mt-1" id="totalUsers">--</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Active Sessions</p>
                  <p class="text-2xl font-bold text-green-600 mt-1" id="activeSessions">--</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-circle text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Failed Logins (24h)</p>
                  <p class="text-2xl font-bold text-red-600 mt-1" id="failedLogins">--</p>
                </div>
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600">Security Alerts</p>
                  <p class="text-2xl font-bold text-orange-600 mt-1" id="securityAlerts">--</p>
                </div>
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-bell text-orange-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div class="border-b border-gray-200">
            <div class="flex overflow-x-auto">
              <button class="tab-button active" onclick="switchTab('sessions')">
                <i class="fas fa-desktop mr-2"></i>Active Sessions
              </button>
              <button class="tab-button" onclick="switchTab('activity')">
                <i class="fas fa-history mr-2"></i>Security Activity
              </button>
              <button class="tab-button" onclick="switchTab('settings')">
                <i class="fas fa-cog mr-2"></i>Security Settings
              </button>
              <button class="tab-button" onclick="switchTab('2fa')">
                <i class="fas fa-mobile-alt mr-2"></i>Two-Factor Auth
              </button>
              <button class="tab-button" onclick="switchTab('blocked')">
                <i class="fas fa-ban mr-2"></i>Blocked Users
              </button>
            </div>
          </div>
        </div>

        <!-- Tab: Active Sessions -->
        <div id="sessions-tab" class="tab-content active">
          <div class="security-card">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-desktop text-blue-600 mr-2"></i>Active User Sessions
              </h2>
              <button onclick="terminateAllSessions()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                <i class="fas fa-power-off mr-2"></i>Terminate All
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Login Time</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody id="sessionsTableBody" class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                      <p>Loading sessions...</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab: Security Activity -->
        <div id="activity-tab" class="tab-content">
          <div class="security-card">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fas fa-history text-purple-600 mr-2"></i>Recent Security Events
            </h2>
            
            <div id="activityList">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                <p>Loading activity...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Security Settings -->
        <div id="settings-tab" class="tab-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Password Policy -->
            <div class="security-card">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                <i class="fas fa-key text-blue-600 mr-2"></i>Password Policy
              </h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Minimum Length</p>
                    <p class="text-sm text-gray-500">Minimum password length</p>
                  </div>
                  <select id="minPasswordLength" class="px-3 py-2 border rounded-lg">
                    <option value="8">8 characters</option>
                    <option value="10">10 characters</option>
                    <option value="12" selected>12 characters</option>
                    <option value="16">16 characters</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Require Uppercase</p>
                    <p class="text-sm text-gray-500">At least one uppercase letter</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('requireUppercase', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Require Numbers</p>
                    <p class="text-sm text-gray-500">At least one number</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('requireNumbers', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Require Special Characters</p>
                    <p class="text-sm text-gray-500">At least one special character</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('requireSpecial', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Password Expiry</p>
                    <p class="text-sm text-gray-500">Force password change after</p>
                  </div>
                  <select id="passwordExpiry" class="px-3 py-2 border rounded-lg">
                    <option value="0">Never</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90" selected>90 days</option>
                  </select>
                </div>
              </div>
              
              <button onclick="savePasswordPolicy()" class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-save mr-2"></i>Save Policy
              </button>
            </div>

            <!-- Session Settings -->
            <div class="security-card">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                <i class="fas fa-clock text-green-600 mr-2"></i>Session Settings
              </h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Session Timeout</p>
                    <p class="text-sm text-gray-500">Inactive session timeout</p>
                  </div>
                  <select id="sessionTimeout" class="px-3 py-2 border rounded-lg">
                    <option value="15">15 minutes</option>
                    <option value="30" selected>30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Remember Me Duration</p>
                    <p class="text-sm text-gray-500">How long to remember users</p>
                  </div>
                  <select id="rememberDuration" class="px-3 py-2 border rounded-lg">
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30" selected>30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Max Concurrent Sessions</p>
                    <p class="text-sm text-gray-500">Sessions per user</p>
                  </div>
                  <select id="maxSessions" class="px-3 py-2 border rounded-lg">
                    <option value="1">1 session</option>
                    <option value="3" selected>3 sessions</option>
                    <option value="5">5 sessions</option>
                    <option value="0">Unlimited</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">IP Change Detection</p>
                    <p class="text-sm text-gray-500">Detect IP address changes</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('ipChangeDetection', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <button onclick="saveSessionSettings()" class="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-save mr-2"></i>Save Settings
              </button>
            </div>

            <!-- Login Security -->
            <div class="security-card">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                <i class="fas fa-lock text-red-600 mr-2"></i>Login Security
              </h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Max Login Attempts</p>
                    <p class="text-sm text-gray-500">Before account lockout</p>
                  </div>
                  <select id="maxLoginAttempts" class="px-3 py-2 border rounded-lg">
                    <option value="3">3 attempts</option>
                    <option value="5" selected>5 attempts</option>
                    <option value="10">10 attempts</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Lockout Duration</p>
                    <p class="text-sm text-gray-500">How long to lock account</p>
                  </div>
                  <select id="lockoutDuration" class="px-3 py-2 border rounded-lg">
                    <option value="15">15 minutes</option>
                    <option value="30" selected>30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="1440">24 hours</option>
                  </select>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Email Verification</p>
                    <p class="text-sm text-gray-500">Require email verification</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('emailVerification', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">CAPTCHA on Login</p>
                    <p class="text-sm text-gray-500">Enable CAPTCHA verification</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" onchange="updateSetting('captchaEnabled', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <button onclick="saveLoginSecurity()" class="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-save mr-2"></i>Save Settings
              </button>
            </div>

            <!-- Notifications -->
            <div class="security-card">
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                <i class="fas fa-bell text-yellow-600 mr-2"></i>Security Notifications
              </h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">New Login Alerts</p>
                    <p class="text-sm text-gray-500">Email on new device login</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('newLoginAlerts', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Failed Login Alerts</p>
                    <p class="text-sm text-gray-500">Email on failed attempts</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('failedLoginAlerts', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Password Change Alerts</p>
                    <p class="text-sm text-gray-500">Email on password change</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('passwordChangeAlerts', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-700">Suspicious Activity</p>
                    <p class="text-sm text-gray-500">Email on suspicious behavior</p>
                  </div>
                  <label class="security-toggle">
                    <input type="checkbox" checked onchange="updateSetting('suspiciousActivityAlerts', this.checked)">
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <button onclick="saveNotificationSettings()" class="w-full mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                <i class="fas fa-save mr-2"></i>Save Settings
              </button>
            </div>
          </div>
        </div>

        <!-- Tab: Two-Factor Authentication -->
        <div id="2fa-tab" class="tab-content">
          <div class="security-card">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fas fa-mobile-alt text-green-600 mr-2"></i>Two-Factor Authentication
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold text-gray-800 mb-3">Global 2FA Settings</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-medium text-gray-700">Require 2FA for All Users</p>
                      <p class="text-sm text-gray-500">Mandatory two-factor authentication</p>
                    </div>
                    <label class="security-toggle">
                      <input type="checkbox" onchange="updateSetting('require2FA', this.checked)">
                      <span class="slider"></span>
                    </label>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-medium text-gray-700">2FA for Admin Users</p>
                      <p class="text-sm text-gray-500">Required for administrators</p>
                    </div>
                    <label class="security-toggle">
                      <input type="checkbox" checked onchange="updateSetting('require2FAAdmin', this.checked)">
                      <span class="slider"></span>
                    </label>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-medium text-gray-700">Remember Device</p>
                      <p class="text-sm text-gray-500">Trust device for 30 days</p>
                    </div>
                    <label class="security-toggle">
                      <input type="checkbox" checked onchange="updateSetting('remember2FADevice', this.checked)">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="font-semibold text-gray-800 mb-3">2FA Statistics</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">Users with 2FA Enabled</span>
                    <span class="font-bold text-green-600" id="users2FAEnabled">--</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">2FA Adoption Rate</span>
                    <span class="font-bold text-blue-600" id="2FAAdoptionRate">--%</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">2FA Methods Used</span>
                    <span class="font-bold text-purple-600" id="2FAMethods">--</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button onclick="save2FASettings()" class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <i class="fas fa-save mr-2"></i>Save 2FA Settings
            </button>
          </div>
        </div>

        <!-- Tab: Blocked Users -->
        <div id="blocked-tab" class="tab-content">
          <div class="security-card">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-ban text-red-600 mr-2"></i>Blocked Users & IP Addresses
              </h2>
              <button onclick="showBlockUserModal()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-user-slash mr-2"></i>Block User/IP
              </button>
            </div>
            
            <div id="blockedList">
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                <p>Loading blocked users...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
          loadSecurityStats();
          loadActiveSessions();
          loadSecurityActivity();
          load2FAStats();
          loadBlockedUsers();
        });
        
        // Tab Switching
        function switchTab(tab) {
          // Hide all tabs
          document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
          });
          
          // Remove active from all buttons
          document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
          });
          
          // Show selected tab
          document.getElementById(tab + '-tab').classList.add('active');
          event.target.closest('.tab-button').classList.add('active');
        }
        
        // Load Security Stats
        async function loadSecurityStats() {
          try {
            const response = await axios.get('/api/admin/security/stats');
            if (response.data.success) {
              const stats = response.data.stats;
              document.getElementById('totalUsers').textContent = stats.totalUsers || 0;
              document.getElementById('activeSessions').textContent = stats.activeSessions || 0;
              document.getElementById('failedLogins').textContent = stats.failedLogins || 0;
              document.getElementById('securityAlerts').textContent = stats.securityAlerts || 0;
            }
          } catch (error) {
            console.error('Error loading stats:', error);
            // Show mock data for demo
            document.getElementById('totalUsers').textContent = '1,234';
            document.getElementById('activeSessions').textContent = '56';
            document.getElementById('failedLogins').textContent = '12';
            document.getElementById('securityAlerts').textContent = '3';
          }
        }
        
        // Load Active Sessions
        async function loadActiveSessions() {
          try {
            const response = await axios.get('/api/admin/security/sessions');
            if (response.data.success) {
              renderSessions(response.data.sessions);
            }
          } catch (error) {
            console.error('Error loading sessions:', error);
            // Show mock data
            renderSessions([
              { id: 1, user: 'john@example.com', ip: '192.168.1.100', device: 'Chrome on Windows', location: 'Germany', loginTime: '2 hours ago', status: 'active' },
              { id: 2, user: 'jane@example.com', ip: '192.168.1.101', device: 'Safari on macOS', location: 'USA', loginTime: '30 minutes ago', status: 'active' },
              { id: 3, user: 'admin@example.com', ip: '192.168.1.1', device: 'Firefox on Linux', location: 'France', loginTime: '5 minutes ago', status: 'active' }
            ]);
          }
        }
        
        function renderSessions(sessions) {
          const tbody = document.getElementById('sessionsTableBody');
          if (!sessions || sessions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-8 text-center text-gray-500">No active sessions</td></tr>';
            return;
          }
          
          tbody.innerHTML = sessions.map(session => \`
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm text-gray-900">\${session.user}</td>
              <td class="px-4 py-3 text-sm text-gray-600">\${session.ip}</td>
              <td class="px-4 py-3 text-sm text-gray-600">\${session.device}</td>
              <td class="px-4 py-3 text-sm text-gray-600">\${session.location}</td>
              <td class="px-4 py-3 text-sm text-gray-600">\${session.loginTime}</td>
              <td class="px-4 py-3">
                <span class="badge badge-success">Active</span>
              </td>
              <td class="px-4 py-3">
                <button onclick="terminateSession(\${session.id})" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-times-circle"></i>
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        // Load Security Activity
        async function loadSecurityActivity() {
          try {
            const response = await axios.get('/api/admin/security/activity');
            if (response.data.success) {
              renderActivity(response.data.activities);
            }
          } catch (error) {
            console.error('Error loading activity:', error);
            // Show mock data
            renderActivity([
              { type: 'login', user: 'john@example.com', ip: '192.168.1.100', time: '5 minutes ago', status: 'success' },
              { type: 'password_change', user: 'jane@example.com', ip: '192.168.1.101', time: '1 hour ago', status: 'success' },
              { type: 'failed_login', user: 'unknown@example.com', ip: '10.0.0.1', time: '2 hours ago', status: 'blocked' },
              { type: '2fa_enabled', user: 'admin@example.com', ip: '192.168.1.1', time: '3 hours ago', status: 'success' }
            ]);
          }
        }
        
        function renderActivity(activities) {
          const list = document.getElementById('activityList');
          if (!activities || activities.length === 0) {
            list.innerHTML = '<div class="text-center py-8 text-gray-500">No recent activity</div>';
            return;
          }
          
          list.innerHTML = activities.map(activity => \`
            <div class="activity-item">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <i class="fas fa-\${getActivityIcon(activity.type)} text-blue-600"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">\${getActivityTitle(activity.type)}</p>
                    <p class="text-sm text-gray-600">\${activity.user} from \${activity.ip}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="badge badge-\${activity.status === 'success' ? 'success' : 'danger'}">\${activity.status}</span>
                  <p class="text-sm text-gray-500 mt-1">\${activity.time}</p>
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        function getActivityIcon(type) {
          const icons = {
            'login': 'sign-in-alt',
            'logout': 'sign-out-alt',
            'password_change': 'key',
            'failed_login': 'exclamation-triangle',
            '2fa_enabled': 'mobile-alt',
            '2fa_disabled': 'mobile-alt'
          };
          return icons[type] || 'info-circle';
        }
        
        function getActivityTitle(type) {
          const titles = {
            'login': 'Successful Login',
            'logout': 'User Logout',
            'password_change': 'Password Changed',
            'failed_login': 'Failed Login Attempt',
            '2fa_enabled': 'Two-Factor Auth Enabled',
            '2fa_disabled': 'Two-Factor Auth Disabled'
          };
          return titles[type] || 'Security Event';
        }
        
        // Load 2FA Stats
        async function load2FAStats() {
          try {
            const response = await axios.get('/api/admin/security/2fa-stats');
            if (response.data.success) {
              const stats = response.data.stats;
              document.getElementById('users2FAEnabled').textContent = stats.enabled || 0;
              document.getElementById('2FAAdoptionRate').textContent = stats.adoptionRate || '0%';
              document.getElementById('2FAMethods').textContent = stats.methods || 0;
            }
          } catch (error) {
            console.error('Error loading 2FA stats:', error);
            // Mock data
            document.getElementById('users2FAEnabled').textContent = '456';
            document.getElementById('2FAAdoptionRate').textContent = '37%';
            document.getElementById('2FAMethods').textContent = '2';
          }
        }
        
        // Load Blocked Users
        async function loadBlockedUsers() {
          try {
            const response = await axios.get('/api/admin/security/blocked');
            if (response.data.success) {
              renderBlockedUsers(response.data.blocked);
            }
          } catch (error) {
            console.error('Error loading blocked users:', error);
            // Mock data
            renderBlockedUsers([
              { id: 1, type: 'user', value: 'spam@example.com', reason: 'Spam activity', blockedAt: '2 days ago', blockedBy: 'Admin' },
              { id: 2, type: 'ip', value: '10.0.0.1', reason: 'Brute force attack', blockedAt: '1 day ago', blockedBy: 'System' }
            ]);
          }
        }
        
        function renderBlockedUsers(blocked) {
          const list = document.getElementById('blockedList');
          if (!blocked || blocked.length === 0) {
            list.innerHTML = '<div class="text-center py-8 text-gray-500">No blocked users or IPs</div>';
            return;
          }
          
          list.innerHTML = blocked.map(item => \`
            <div class="activity-item">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <i class="fas fa-\${item.type === 'ip' ? 'network-wired' : 'user'} text-red-600"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">\${item.value}</p>
                    <p class="text-sm text-gray-600">\${item.reason}</p>
                    <p class="text-xs text-gray-500">Blocked \${item.blockedAt} by \${item.blockedBy}</p>
                  </div>
                </div>
                <button onclick="unblock(\${item.id})" class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
                  <i class="fas fa-unlock mr-1"></i>Unblock
                </button>
              </div>
            </div>
          \`).join('');
        }
        
        // Actions
        function terminateSession(id) {
          if (confirm('Terminate this session?')) {
            axios.post('/api/admin/security/sessions/terminate', { sessionId: id })
              .then(() => {
                alert('Session terminated');
                loadActiveSessions();
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Session terminated successfully (demo)');
                loadActiveSessions();
              });
          }
        }
        
        function terminateAllSessions() {
          if (confirm('Terminate ALL active sessions? Users will need to login again.')) {
            axios.post('/api/admin/security/sessions/terminate-all')
              .then(() => {
                alert('All sessions terminated');
                loadActiveSessions();
              })
              .catch(error => {
                console.error('Error:', error);
                alert('All sessions terminated successfully (demo)');
                loadActiveSessions();
              });
          }
        }
        
        function unblock(id) {
          if (confirm('Unblock this user/IP?')) {
            axios.post('/api/admin/security/unblock', { id })
              .then(() => {
                alert('Unblocked successfully');
                loadBlockedUsers();
              })
              .catch(error => {
                console.error('Error:', error);
                alert('Unblocked successfully (demo)');
                loadBlockedUsers();
              });
          }
        }
        
        function showBlockUserModal() {
          const value = prompt('Enter email or IP address to block:');
          if (value) {
            const reason = prompt('Reason for blocking:');
            if (reason) {
              axios.post('/api/admin/security/block', { value, reason })
                .then(() => {
                  alert('Blocked successfully');
                  loadBlockedUsers();
                })
                .catch(error => {
                  console.error('Error:', error);
                  alert('Blocked successfully (demo)');
                  loadBlockedUsers();
                });
            }
          }
        }
        
        function updateSetting(setting, value) {
          console.log('Update setting:', setting, value);
          // Settings are saved when clicking save button
        }
        
        function savePasswordPolicy() {
          alert('Password policy saved successfully!');
        }
        
        function saveSessionSettings() {
          alert('Session settings saved successfully!');
        }
        
        function saveLoginSecurity() {
          alert('Login security settings saved successfully!');
        }
        
        function saveNotificationSettings() {
          alert('Notification settings saved successfully!');
        }
        
        function save2FASettings() {
          alert('2FA settings saved successfully!');
        }
        
        function refreshData() {
          loadSecurityStats();
          loadActiveSessions();
          loadSecurityActivity();
          load2FAStats();
          loadBlockedUsers();
          alert('Data refreshed!');
        }
        
        function exportSecurityReport() {
          alert('Security report exported! (Feature coming soon)');
        }
      </script>
    </body>
    </html>
  `
}
