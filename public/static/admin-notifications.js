/**
 * SOFTWAREKING24 Admin Notification System
 * Provides toast notifications for success, error, warning, and info messages
 */

class AdminNotificationSystem {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    const doInit = () => {
      if (!document.getElementById('admin-notifications')) {
        this.container = document.createElement('div');
        this.container.id = 'admin-notifications';
        this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
        (document.body || document.documentElement).appendChild(this.container);
      } else {
        this.container = document.getElementById('admin-notifications');
      }
    };
    if (document.body) {
      doInit();
    } else {
      document.addEventListener('DOMContentLoaded', doInit);
    }
  }

  /**
   * Show a notification
   * @param {string} message - The message to display
   * @param {string} type - Type: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duration in milliseconds (0 = permanent)
   */
  show(message, type = 'info', duration = 5000) {
    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add('opacity-100', 'translate-x-0');
    }, 10);

    // Auto-remove
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification);
      }, duration);
    }

    return notification;
  }

  createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `
      transform translate-x-full opacity-0 transition-all duration-300
      min-w-80 max-w-md p-4 rounded-lg shadow-lg
      flex items-start space-x-3
      ${this.getTypeClasses(type)}
    `;

    const icon = this.getIcon(type);
    const closeBtn = this.createCloseButton();

    notification.innerHTML = ` // nosemgrep
      <div class="flex-shrink-0">
        ${icon}
      </div>
      <div class="flex-1">
        <p class="text-sm font-medium">${message}</p>
      </div>
      <div class="flex-shrink-0">
        ${closeBtn}
      </div>
    `;

    // Add close handler
    notification.querySelector('.close-btn').addEventListener('click', () => {
      this.remove(notification);
    });

    return notification;
  }

  getTypeClasses(type) {
    const classes = {
      success: 'bg-green-50 border border-green-200 text-green-800',
      error: 'bg-red-50 border border-red-200 text-red-800',
      warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border border-blue-200 text-blue-800'
    };
    return classes[type] || classes.info;
  }

  getIcon(type) {
    const icons = {
      success: '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
      error: '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
      warning: '<svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
      info: '<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>'
    };
    return icons[type] || icons.info;
  }

  createCloseButton() {
    return `
      <button class="close-btn text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;
  }

  remove(notification) {
    notification.classList.remove('opacity-100', 'translate-x-0');
    notification.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Convenience methods
  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 7000) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration = 6000) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration = 5000) {
    return this.show(message, 'info', duration);
  }

  /**
   * Show notification based on API response
   * @param {Object} response - API response object
   * @param {string} successMessage - Message to show on success
   */
  handleResponse(response, successMessage = 'Operation successful') {
    if (response.success) {
      this.success(successMessage);
    } else {
      this.error(response.error || 'An error occurred');
    }
  }

  /**
   * Clear all notifications
   */
  clearAll() {
    while (this.container.firstChild) {
      this.remove(this.container.firstChild);
    }
  }
}

// Global instance
const AdminNotify = new AdminNotificationSystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminNotify;
}
