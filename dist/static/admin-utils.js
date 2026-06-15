/**
 * SOFTWAREKING24 Admin Utilities
 * Common functions for admin panel operations
 */

const AdminUtils = {
  /**
   * Make an API request with proper error handling
   * @param {string} url - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} Response data
   */
  async apiRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  },

  /**
   * GET request
   */
  async get(url) {
    return this.apiRequest(url, { method: 'GET' });
  },

  /**
   * POST request
   */
  async post(url, data) {
    return this.apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * PUT request
   */
  async put(url, data) {
    return this.apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  /**
   * DELETE request
   */
  async delete(url) {
    return this.apiRequest(url, { method: 'DELETE' });
  },

  /**
   * Format currency
   */
  formatCurrency(amount, currency = 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  /**
   * Format date
   */
  formatDate(date, format = 'short') {
    const d = new Date(date);
    const options = format === 'short' 
      ? { year: 'numeric', month: '2-digit', day: '2-digit' }
      : { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    return new Intl.DateTimeFormat('de-DE', options).format(d);
  },

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Confirm action with modal
   */
  async confirm(message, title = 'Bestätigung erforderlich') {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
      modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
          <p class="text-gray-600 mb-6">${message}</p>
          <div class="flex justify-end space-x-3">
            <button class="cancel-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Abbrechen
            </button>
            <button class="confirm-btn px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Bestätigen
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector('.cancel-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve(false);
      });

      modal.querySelector('.confirm-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve(true);
      });

      // Close on background click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          resolve(false);
        }
      });
    });
  },

  /**
   * Show loading state
   */
  showLoading(element, text = 'Laden...') {
    if (!element) return;
    
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = `
      <svg class="animate-spin inline-block w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      ${text}
    `;
  },

  /**
   * Hide loading state
   */
  hideLoading(element) {
    if (!element || !element.dataset.originalText) return;
    
    element.disabled = false;
    element.textContent = element.dataset.originalText;
    delete element.dataset.originalText;
  },

  /**
   * Validate form data
   */
  validateForm(formData, rules) {
    const errors = {};
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = formData[field];
      
      if (rule.required && (!value || value.trim() === '')) {
        errors[field] = `${rule.label} ist erforderlich`;
        continue;
      }
      
      if (rule.min && value.length < rule.min) {
        errors[field] = `${rule.label} muss mindestens ${rule.min} Zeichen haben`;
      }
      
      if (rule.max && value.length > rule.max) {
        errors[field] = `${rule.label} darf maximal ${rule.max} Zeichen haben`;
      }
      
      if (rule.email && value && !this.isValidEmail(value)) {
        errors[field] = `${rule.label} muss eine gültige E-Mail-Adresse sein`;
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        errors[field] = rule.patternMessage || `${rule.label} hat ein ungültiges Format`;
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  /**
   * Validate email
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Get form data as object
   */
  getFormData(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      // Handle checkboxes
      if (formElement.elements[key]?.type === 'checkbox') {
        data[key] = formElement.elements[key].checked ? 1 : 0;
      } else {
        data[key] = value;
      }
    }
    
    return data;
  },

  /**
   * Populate form with data
   */
  populateForm(formElement, data) {
    for (const [key, value] of Object.entries(data)) {
      const element = formElement.elements[key];
      if (!element) continue;
      
      if (element.type === 'checkbox') {
        element.checked = !!value;
      } else if (element.type === 'radio') {
        const radio = formElement.querySelector(`input[name="${key}"][value="${value}"]`);
        if (radio) radio.checked = true;
      } else {
        element.value = value || '';
      }
    }
  },

  /**
   * Create pagination HTML
   */
  createPagination(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';
    
    let html = '<div class="flex items-center justify-center space-x-2 mt-6">';
    
    // Previous button
    html += `
      <button 
        class="pagination-btn px-3 py-2 rounded-lg border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}"
        data-page="${currentPage - 1}"
        ${currentPage === 1 ? 'disabled' : ''}
      >
        <i class="fas fa-chevron-left"></i>
      </button>
    `;
    
    // Page numbers
    const maxVisible = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    if (startPage > 1) {
      html += `<button class="pagination-btn px-3 py-2 rounded-lg border hover:bg-gray-100" data-page="1">1</button>`;
      if (startPage > 2) html += '<span class="px-2">...</span>';
    }
    
    for (let i = startPage; i <= endPage; i++) {
      html += `
        <button 
          class="pagination-btn px-3 py-2 rounded-lg border ${i === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}"
          data-page="${i}"
        >
          ${i}
        </button>
      `;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += '<span class="px-2">...</span>';
      html += `<button class="pagination-btn px-3 py-2 rounded-lg border hover:bg-gray-100" data-page="${totalPages}">${totalPages}</button>`;
    }
    
    // Next button
    html += `
      <button 
        class="pagination-btn px-3 py-2 rounded-lg border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}"
        data-page="${currentPage + 1}"
        ${currentPage === totalPages ? 'disabled' : ''}
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    `;
    
    html += '</div>';
    
    // Attach event listeners
    setTimeout(() => {
      document.querySelectorAll('.pagination-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          const page = parseInt(btn.dataset.page);
          if (page >= 1 && page <= totalPages) {
            onPageChange(page);
          }
        });
      });
    }, 0);
    
    return html;
  },

  /**
   * Export table to CSV
   */
  exportToCSV(data, filename = 'export.csv') {
    if (!data || !data.length) return;
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(h => {
          const value = row[h]?.toString() || '';
          return value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  },

  /**
   * Handle file upload
   */
  async uploadFile(file, endpoint = '/api/admin/upload') {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });
    
    return response.json();
  },

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminUtils;
}
