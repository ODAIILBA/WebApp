/**
 * Authentication Manager
 * Handles user login, registration, logout, and session management
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.init();
  }

  /**
   * Initialize auth manager - check for existing session
   */
  init() {
    // Load token from localStorage
    this.token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user_data');
    
    if (this.token && userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
        this.checkTokenExpiry();
        this.updateUI();
      } catch (e) {
        console.error('Failed to parse user data:', e);
        this.logout();
      }
    }
  }

  /**
   * Check if token is expired
   */
  checkTokenExpiry() {
    const expiresAt = localStorage.getItem('token_expires_at');
    if (expiresAt && Date.now() > parseInt(expiresAt)) {
      console.log('Token expired, logging out');
      this.logout();
    }
  }

  /**
   * Show login modal
   */
  showLoginModal() {
    const existingModal = document.getElementById('auth-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <style>
        .text-gold { color: #d4af37 !important; }
        .border-gold { border-color: #d4af37 !important; }
        .bg-navy { background: linear-gradient(135deg, #1a2a4e 0%, #2d3e6f 100%) !important; }
        .bg-navy:hover { opacity: 0.9; }
        input:focus { border-color: #d4af37 !important; box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important; }
      </style>
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative" style="border-top: 4px solid #d4af37;">
        <button onclick="authManager.closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <i class="fas fa-times text-xl"></i>
        </button>
        
        <div id="auth-tabs" class="flex border-b border-gray-200 mb-6">
          <button id="login-tab" class="flex-1 py-3 px-4 text-center font-semibold border-b-3 transition-all" style="border-bottom: 3px solid #d4af37; color: #1a2a4e;" onclick="authManager.switchTab('login')">
            Anmelden
          </button>
          <button id="register-tab" class="flex-1 py-3 px-4 text-center font-semibold text-gray-600 hover:text-gray-800 transition-colors" onclick="authManager.switchTab('register')">
            Registrieren
          </button>
        </div>

        <!-- Login Form -->
        <div id="login-form" class="auth-form">
          <h2 class="text-2xl font-bold mb-6">Willkommen zurück!</h2>
          
          <form onsubmit="authManager.handleLogin(event)">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2">E-Mail</label>
              <input type="email" id="login-email" required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                placeholder="ihre@email.de">
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2">Passwort</label>
              <input type="password" id="login-password" required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                placeholder="••••••••">
            </div>

            <div class="flex items-center justify-between mb-6">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-gold focus:ring-2">
                <span class="ml-2 text-sm text-gray-600">Angemeldet bleiben</span>
              </label>
              <a href="#" class="text-sm text-gold hover:underline">Passwort vergessen?</a>
            </div>

            <div id="login-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"></div>

            <button type="submit" class="w-full bg-navy hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-colors">
              Anmelden
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Noch kein Konto? 
            <a href="#" onclick="authManager.switchTab('register'); return false;" class="font-semibold hover:underline transition-colors" style="color: #d4af37;">
              Jetzt registrieren
            </a>
          </p>
        </div>

        <!-- Register Form -->
        <div id="register-form" class="auth-form hidden">
          <h2 class="text-2xl font-bold mb-6">Konto erstellen</h2>
          
          <form onsubmit="authManager.handleRegister(event)">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Vorname</label>
                <input type="text" id="register-firstname" required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                  placeholder="Max">
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Nachname</label>
                <input type="text" id="register-lastname" required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                  placeholder="Mustermann">
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2">E-Mail</label>
              <input type="email" id="register-email" required 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                placeholder="max@mustermann.de">
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2">Passwort</label>
              <input type="password" id="register-password" required minlength="8"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                placeholder="Min. 8 Zeichen">
              <p class="text-xs text-gray-500 mt-1">Mindestens 8 Zeichen</p>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2">Passwort bestätigen</label>
              <input type="password" id="register-password-confirm" required minlength="8"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-2 focus:border-transparent"
                placeholder="Passwort wiederholen">
            </div>

            <div class="mb-6">
              <label class="flex items-start">
                <input type="checkbox" required class="mt-1 rounded border-gray-300 text-gold focus:ring-2">
                <span class="ml-2 text-sm text-gray-600">
                  Ich akzeptiere die <a href="#" class="text-gold hover:underline">AGB</a> und die 
                  <a href="#" class="text-gold hover:underline">Datenschutzerklärung</a>
                </span>
              </label>
            </div>

            <div id="register-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"></div>

            <button type="submit" class="w-full bg-navy hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-colors">
              Konto erstellen
            </button>
          </form>

          <p class="mt-4 text-center text-sm text-gray-600">
            Bereits registriert? 
            <a href="#" onclick="authManager.switchTab('login'); return false;" class="font-semibold hover:underline transition-colors" style="color: #d4af37;">
              Jetzt anmelden
            </a>
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  /**
   * Switch between login and register tabs
   */
  switchTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (tab === 'login') {
      loginTab.className = 'flex-1 py-2 px-4 text-center font-semibold border-b-2 border-gold text-gold';
      registerTab.className = 'flex-1 py-2 px-4 text-center font-semibold text-gray-600 hover:text-gray-800';
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      loginTab.className = 'flex-1 py-2 px-4 text-center font-semibold text-gray-600 hover:text-gray-800';
      registerTab.className = 'flex-1 py-2 px-4 text-center font-semibold border-b-2 border-gold text-gold';
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
    }
  }

  /**
   * Close auth modal
   */
  closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.remove();
    }
  }

  /**
   * Handle login form submission
   */
  async handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    try {
      errorDiv.classList.add('hidden');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // Save auth data
        this.token = data.data.token;
        this.currentUser = data.data.user;
        
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));
        localStorage.setItem('token_expires_at', data.data.expiresAt.toString());

        // Update UI
        this.updateUI();
        this.closeModal();

        // Show success message
        this.showNotification('Erfolgreich angemeldet!', 'success');

        // Reload page if on profile/dashboard
        if (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/profil')) {
          window.location.reload();
        }
      } else {
        errorDiv.textContent = data.error || 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.';
        errorDiv.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Login error:', error);
      errorDiv.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
      errorDiv.classList.remove('hidden');
    }
  }

  /**
   * Handle registration form submission
   */
  async handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('register-firstname').value;
    const lastName = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const errorDiv = document.getElementById('register-error');

    // Validate passwords match
    if (password !== passwordConfirm) {
      errorDiv.textContent = 'Die Passwörter stimmen nicht überein.';
      errorDiv.classList.remove('hidden');
      return;
    }

    try {
      errorDiv.classList.add('hidden');
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName
        })
      });

      const data = await response.json();

      if (data.success) {
        // Save auth data (API auto-logs in after registration)
        this.token = data.data.token;
        this.currentUser = data.data.user;
        
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));
        localStorage.setItem('token_expires_at', data.data.expiresAt.toString());

        // Update UI
        this.updateUI();
        this.closeModal();

        // Show success message
        this.showNotification('Konto erfolgreich erstellt und angemeldet!', 'success');

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        errorDiv.textContent = data.error || 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
        errorDiv.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Registration error:', error);
      errorDiv.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
      errorDiv.classList.remove('hidden');
    }
  }

  /**
   * Logout user
   */
  logout() {
    this.token = null;
    this.currentUser = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token_expires_at');

    this.updateUI();
    this.showNotification('Sie wurden abgemeldet.', 'info');

    // Redirect to home if on protected page
    if (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/profil')) {
      window.location.href = '/';
    }
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return this.token && this.currentUser;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Get auth token
   */
  getToken() {
    return this.token;
  }

  /**
   * Update UI based on auth state
   */
  updateUI() {
    const authButtons = document.querySelectorAll('[data-auth-button]');
    const userMenu = document.querySelectorAll('[data-user-menu]');
    const protectedContent = document.querySelectorAll('[data-auth-required]');

    if (this.isLoggedIn()) {
      // Hide login/register buttons
      authButtons.forEach(btn => {
        if (btn.dataset.authButton === 'login' || btn.dataset.authButton === 'register') {
          btn.style.display = 'none';
        }
      });

      // Show user menu
      userMenu.forEach(menu => {
        menu.style.display = 'block';
        
        // Update user name
        const nameElement = menu.querySelector('[data-user-name]');
        if (nameElement) {
          nameElement.textContent = `${this.currentUser.first_name} ${this.currentUser.last_name}`;
        }

        // Update user email
        const emailElement = menu.querySelector('[data-user-email]');
        if (emailElement) {
          emailElement.textContent = this.currentUser.email;
        }
      });

      // Show protected content
      protectedContent.forEach(el => {
        el.style.display = 'block';
      });
    } else {
      // Show login/register buttons
      authButtons.forEach(btn => {
        if (btn.dataset.authButton === 'login' || btn.dataset.authButton === 'register') {
          btn.style.display = 'inline-block';
        }
      });

      // Hide user menu
      userMenu.forEach(menu => {
        menu.style.display = 'none';
      });

      // Hide protected content
      protectedContent.forEach(el => {
        el.style.display = 'none';
      });
    }
  }

  /**
   * Show notification message
   */
  showNotification(message, type = 'info') {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };

    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity`;
    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Make authenticated API request
   */
  async fetchWithAuth(url, options = {}) {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${this.token}`
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      this.logout();
      throw new Error('Session expired');
    }

    return response;
  }
}

// Initialize global auth manager
const authManager = new AuthManager();

// Auto-update UI on page load
document.addEventListener('DOMContentLoaded', () => {
  authManager.updateUI();
});
stener('DOMContentLoaded', () => {
  authManager.updateUI();
});
;
stener('DOMContentLoaded', () => {
  authManager.updateUI();
});
;
