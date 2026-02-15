/**
 * Loading State Management Utilities
 * Provides consistent loading indicators across the application
 */

/**
 * Show full-page loading overlay
 */
export function showPageLoading(message: string = 'Loading...'): void {
  if (typeof window === 'undefined') return;

  // Remove existing overlay
  const existing = document.getElementById('page-loading-overlay');
  if (existing) existing.remove();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'page-loading-overlay';
  overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
  overlay.innerHTML = `
    <div class="bg-white rounded-lg p-8 max-w-sm text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
      <p class="text-gray-700 font-semibold">${escapeHtml(message)}</p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

/**
 * Hide full-page loading overlay
 */
export function hidePageLoading(): void {
  if (typeof window === 'undefined') return;

  const overlay = document.getElementById('page-loading-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

/**
 * Show loading spinner in a specific element
 */
export function showElementLoading(elementId: string, message: string = 'Loading...'): void {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) return;

  // Store original content
  element.dataset.originalContent = element.innerHTML;

  // Show loading spinner
  element.innerHTML = `
    <div class="flex items-center justify-center py-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto mb-3"></div>
        <p class="text-gray-600">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

/**
 * Hide loading spinner and restore original content
 */
export function hideElementLoading(elementId: string): void {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const originalContent = element.dataset.originalContent;
  if (originalContent) {
    element.innerHTML = originalContent;
    delete element.dataset.originalContent;
  }
}

/**
 * Disable button and show loading state
 */
export function setButtonLoading(button: HTMLButtonElement, loading: boolean): void {
  if (loading) {
    button.disabled = true;
    button.dataset.originalContent = button.innerHTML;
    button.innerHTML = `
      <span class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </span>
    `;
  } else {
    button.disabled = false;
    const originalContent = button.dataset.originalContent;
    if (originalContent) {
      button.innerHTML = originalContent;
      delete button.dataset.originalContent;
    }
  }
}

/**
 * Create a loading skeleton for lists
 */
export function createSkeletonLoader(count: number = 3): string {
  const skeletons = Array.from({ length: count }, () => `
    <div class="animate-pulse border rounded-lg p-4">
      <div class="flex space-x-4">
        <div class="rounded-full bg-gray-300 h-12 w-12"></div>
        <div class="flex-1 space-y-3 py-1">
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-300 rounded"></div>
            <div class="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `<div class="space-y-4">${skeletons}</div>`;
}

/**
 * Show table loading state
 */
export function showTableLoading(tbody: HTMLElement, colSpan: number = 5): void {
  tbody.innerHTML = `
    <tr>
      <td colspan="${colSpan}" class="text-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto mb-3"></div>
        <p class="text-gray-600">Loading data...</p>
      </td>
    </tr>
  `;
}

/**
 * Show empty state
 */
export function showEmptyState(
  element: HTMLElement,
  message: string = 'No data found',
  icon: string = 'fa-inbox'
): void {
  element.innerHTML = `
    <div class="text-center py-12">
      <i class="fas ${icon} text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-600 text-lg">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Wrapper for async operations with loading state
 */
export async function withLoading<T>(
  fn: () => Promise<T>,
  loadingMessage?: string
): Promise<T> {
  showPageLoading(loadingMessage);
  try {
    const result = await fn();
    hidePageLoading();
    return result;
  } catch (error) {
    hidePageLoading();
    throw error;
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  if (typeof window === 'undefined') return text;
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
