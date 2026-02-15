/**
 * Centralized Error Handling Utilities
 * Provides consistent error handling across the application
 */

export interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Show user-friendly error toast notification
 */
export function showError(message: string, duration: number = 5000): void {
  // Check if we're in browser environment
  if (typeof window === 'undefined') return;

  // Remove existing error toast
  const existing = document.getElementById('error-toast');
  if (existing) existing.remove();

  // Create error toast
  const toast = document.createElement('div');
  toast.id = 'error-toast';
  toast.className = 'fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md';
  toast.innerHTML = `
    <div class="flex items-start space-x-3">
      <i class="fas fa-exclamation-circle text-xl"></i>
      <div class="flex-1">
        <p class="font-semibold">Error</p>
        <p class="text-sm mt-1">${escapeHtml(message)}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  document.body.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

/**
 * Show success toast notification
 */
export function showSuccess(message: string, duration: number = 3000): void {
  if (typeof window === 'undefined') return;

  const existing = document.getElementById('success-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'success-toast';
  toast.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md';
  toast.innerHTML = `
    <div class="flex items-start space-x-3">
      <i class="fas fa-check-circle text-xl"></i>
      <div class="flex-1">
        <p class="font-semibold">Success</p>
        <p class="text-sm mt-1">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

/**
 * Handle API errors with consistent formatting
 */
export async function handleApiError(error: unknown): Promise<ErrorResponse> {
  // Handle fetch Response errors
  if (error instanceof Response) {
    try {
      const data = await error.json();
      return {
        message: data.message || data.error || 'An error occurred',
        code: data.code,
        status: error.status
      };
    } catch {
      return {
        message: `Error: ${error.statusText || 'Unknown error'}`,
        status: error.status
      };
    }
  }

  // Handle Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'CLIENT_ERROR'
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'UNKNOWN_ERROR'
    };
  }

  // Handle unknown errors
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
}

/**
 * Wrapper for fetch calls with automatic error handling
 */
export async function safeFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: ErrorResponse }> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorResponse = await handleApiError(response);
      showError(errorResponse.message);
      return { error: errorResponse };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    const errorResponse = await handleApiError(error);
    showError(errorResponse.message);
    return { error: errorResponse };
  }
}

/**
 * Wrapper for async operations with error handling
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  errorMessage?: string
): Promise<{ data?: T; error?: ErrorResponse }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    const errorResponse = await handleApiError(error);
    showError(errorMessage || errorResponse.message);
    return { error: errorResponse };
  }
}

/**
 * Log errors to console in development
 */
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
}

/**
 * Escape HTML to prevent XSS in error messages
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Get user-friendly error message based on HTTP status
 */
export function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Please log in to continue.',
    403: 'You don\'t have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This resource already exists.',
    422: 'Validation error. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Service temporarily unavailable.',
    503: 'Service temporarily unavailable.',
  };

  return messages[status] || 'An error occurred. Please try again.';
}
