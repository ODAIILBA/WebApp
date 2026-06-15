/**
 * Product Reviews System - JavaScript
 * Handles review submission, display, sorting, filtering, and voting
 */

(function() {
  'use strict';

  window.ReviewsManager = {
    currentProductId: null,
    currentUserId: null,
    currentPage: 1,
    currentSort: 'newest',
    currentRatingFilter: null,

    /**
     * Initialize reviews system for a product
     */
    init: function(productId, userId = null) {
      this.currentProductId = productId;
      this.currentUserId = userId;
      
      this.loadReviewStats();
      this.loadReviews();
      this.setupEventListeners();
      
      if (userId) {
        this.setupReviewForm();
      }
    },

    /**
     * Load review statistics
     */
    loadReviewStats: async function() {
      try {
        const response = await axios.get(`/api/reviews/product/${this.currentProductId}/stats`);
        
        if (response.data.success) {
          this.renderReviewStats(response.data.data);
        }
      } catch (error) {
        console.error('Error loading review stats:', error);
      }
    },

    /**
     * Render review statistics
     */
    renderReviewStats: function(stats) {
      const container = document.getElementById('review-stats');
      if (!container) return;

      const { totalReviews, averageRating, verifiedPurchases, ratingBreakdown } = stats;

      container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 class="text-2xl font-bold text-navy-dark mb-4">
            <i class="fas fa-star text-gold mr-2"></i>
            Kundenbewertungen
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Overall Rating -->
            <div class="text-center">
              <div class="text-6xl font-bold text-navy-dark mb-2">
                ${averageRating.toFixed(1)}
              </div>
              <div class="flex justify-center mb-2">
                ${this.renderStars(Math.round(averageRating), 'text-2xl')}
              </div>
              <div class="text-gray-600">
                ${totalReviews} ${totalReviews === 1 ? 'Bewertung' : 'Bewertungen'}
              </div>
              <div class="text-sm text-green-600 mt-2">
                <i class="fas fa-shield-check mr-1"></i>
                ${verifiedPurchases} verifizierte Käufe
              </div>
            </div>

            <!-- Rating Breakdown -->
            <div class="space-y-2">
              ${ratingBreakdown.map(item => `
                <div class="flex items-center">
                  <span class="w-12 text-sm text-gray-600">${item.rating} ${this.renderStars(1, 'text-xs')}</span>
                  <div class="flex-1 mx-3">
                    <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-gold transition-all duration-300" style="width: ${item.percentage}%"></div>
                    </div>
                  </div>
                  <span class="w-16 text-sm text-gray-600 text-right">${item.count} (${item.percentage}%)</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Filter by Rating -->
          <div class="mt-6 flex flex-wrap gap-2">
            <button 
              onclick="ReviewsManager.filterByRating(null)" 
              class="rating-filter-btn ${!this.currentRatingFilter ? 'active' : ''} px-4 py-2 rounded-lg border-2 transition"
            >
              Alle anzeigen
            </button>
            ${[5, 4, 3, 2, 1].map(rating => `
              <button 
                onclick="ReviewsManager.filterByRating(${rating})" 
                class="rating-filter-btn ${this.currentRatingFilter === rating ? 'active' : ''} px-4 py-2 rounded-lg border-2 transition flex items-center"
              >
                ${this.renderStars(rating, 'text-sm')}
                <span class="ml-2">${rating} Sterne</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    },

    /**
     * Load reviews
     */
    loadReviews: async function() {
      try {
        const container = document.getElementById('reviews-list');
        if (!container) return;

        // Show loading
        container.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-4xl text-gold"></i></div>';

        const params = new URLSearchParams({
          page: this.currentPage.toString(),
          limit: '10',
          sort: this.currentSort
        });

        if (this.currentRatingFilter) {
          params.append('rating', this.currentRatingFilter.toString());
        }

        const response = await axios.get(`/api/reviews/product/${this.currentProductId}?${params.toString()}`);
        
        if (response.data.success) {
          this.renderReviews(response.data.data, response.data.pagination);
        } else {
          container.innerHTML = '<div class="text-center py-8 text-gray-500">Fehler beim Laden der Bewertungen</div>';
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        const container = document.getElementById('reviews-list');
        if (container) {
          container.innerHTML = '<div class="text-center py-8 text-red-500">Fehler beim Laden der Bewertungen</div>';
        }
      }
    },

    /**
     * Render reviews list
     */
    renderReviews: function(reviews, pagination) {
      const container = document.getElementById('reviews-list');
      if (!container) return;

      if (reviews.length === 0) {
        container.innerHTML = `
          <div class="text-center py-12">
            <i class="fas fa-comments text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">Noch keine Bewertungen</h3>
            <p class="text-gray-500">Seien Sie der Erste, der dieses Produkt bewertet!</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <!-- Sort Controls -->
        <div class="mb-6 flex items-center justify-between">
          <div class="text-gray-600">
            ${pagination.total} ${pagination.total === 1 ? 'Bewertung' : 'Bewertungen'}
          </div>
          <select 
            id="review-sort" 
            onchange="ReviewsManager.changeSort(this.value)"
            class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition"
          >
            <option value="newest" ${this.currentSort === 'newest' ? 'selected' : ''}>Neueste zuerst</option>
            <option value="helpful" ${this.currentSort === 'helpful' ? 'selected' : ''}>Hilfreichste zuerst</option>
            <option value="highest" ${this.currentSort === 'highest' ? 'selected' : ''}>Höchste Bewertung</option>
            <option value="lowest" ${this.currentSort === 'lowest' ? 'selected' : ''}>Niedrigste Bewertung</option>
          </select>
        </div>

        <!-- Reviews -->
        <div class="space-y-4">
          ${reviews.map(review => this.renderReviewCard(review)).join('')}
        </div>

        <!-- Pagination -->
        ${this.renderPagination(pagination)}
      `;
    },

    /**
     * Render a single review card
     */
    renderReviewCard: function(review) {
      const date = new Date(review.created_at).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                ${this.renderStars(review.rating, 'text-lg')}
                ${review.is_verified_purchase ? `
                  <span class="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    <i class="fas fa-shield-check mr-1"></i>
                    Verifizierter Kauf
                  </span>
                ` : ''}
              </div>
              <h4 class="text-lg font-bold text-navy-dark mb-1">${this.escapeHtml(review.title)}</h4>
              <div class="text-sm text-gray-500">
                Von ${this.escapeHtml(review.first_name)} am ${date}
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="text-gray-700 mb-4 leading-relaxed">
            ${this.escapeHtml(review.content)}
          </div>

          <!-- Images -->
          ${review.images && review.images.length > 0 ? `
            <div class="flex flex-wrap gap-2 mb-4">
              ${review.images.map(img => `
                <img 
                  src="${img.image_url}" 
                  alt="Review image" 
                  class="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  onclick="ReviewsManager.showImageModal('${img.image_url}')"
                />
              `).join('')}
            </div>
          ` : ''}

          <!-- Helpful Votes -->
          <div class="flex items-center space-x-4 pt-4 border-t border-gray-200">
            <span class="text-sm text-gray-600">War diese Bewertung hilfreich?</span>
            <button 
              onclick="ReviewsManager.voteReview(${review.id}, true)"
              class="vote-btn flex items-center space-x-1 px-3 py-1 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition"
            >
              <i class="far fa-thumbs-up"></i>
              <span>${review.helpful_count || 0}</span>
            </button>
            <button 
              onclick="ReviewsManager.voteReview(${review.id}, false)"
              class="vote-btn flex items-center space-x-1 px-3 py-1 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition"
            >
              <i class="far fa-thumbs-down"></i>
              <span>${review.unhelpful_count || 0}</span>
            </button>
          </div>
        </div>
      `;
    },

    /**
     * Render pagination
     */
    renderPagination: function(pagination) {
      if (pagination.totalPages <= 1) return '';

      const pages = [];
      for (let i = 1; i <= pagination.totalPages; i++) {
        if (
          i === 1 || 
          i === pagination.totalPages || 
          (i >= pagination.page - 1 && i <= pagination.page + 1)
        ) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }

      return `
        <div class="flex justify-center space-x-2 mt-6">
          ${pages.map(page => {
            if (page === '...') {
              return '<span class="px-3 py-2 text-gray-400">...</span>';
            }
            return `
              <button 
                onclick="ReviewsManager.goToPage(${page})"
                class="px-4 py-2 rounded-lg transition ${
                  page === pagination.page
                    ? 'bg-gold text-white'
                    : 'bg-white border-2 border-gray-200 hover:border-gold'
                }"
              >
                ${page}
              </button>
            `;
          }).join('')}
        </div>
      `;
    },

    /**
     * Setup review form
     */
    setupReviewForm: function() {
      const form = document.getElementById('review-form');
      if (!form) return;

      // Star rating interaction
      const stars = form.querySelectorAll('.star-rating i');
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.setRating(index + 1);
        });
        star.addEventListener('mouseenter', () => {
          this.highlightStars(index + 1);
        });
      });

      form.addEventListener('mouseleave', () => {
        const rating = parseInt(document.getElementById('review-rating').value) || 0;
        this.highlightStars(rating);
      });

      // Form submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitReview();
      });
    },

    /**
     * Set star rating
     */
    setRating: function(rating) {
      document.getElementById('review-rating').value = rating;
      this.highlightStars(rating);
    },

    /**
     * Highlight stars
     */
    highlightStars: function(count) {
      const stars = document.querySelectorAll('.star-rating i');
      stars.forEach((star, index) => {
        if (index < count) {
          star.classList.remove('far');
          star.classList.add('fas', 'text-gold');
        } else {
          star.classList.remove('fas', 'text-gold');
          star.classList.add('far');
        }
      });
    },

    /**
     * Submit review
     */
    submitReview: async function() {
      const rating = parseInt(document.getElementById('review-rating').value);
      const title = document.getElementById('review-title').value.trim();
      const content = document.getElementById('review-content').value.trim();

      if (!rating) {
        alert('Bitte wählen Sie eine Bewertung aus');
        return;
      }

      if (!title) {
        alert('Bitte geben Sie einen Titel ein');
        return;
      }

      if (!content || content.length < 20) {
        alert('Bitte geben Sie eine Bewertung mit mindestens 20 Zeichen ein');
        return;
      }

      try {
        const submitBtn = document.querySelector('#review-form button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';

        const response = await axios.post('/api/reviews', {
          productId: this.currentProductId,
          userId: this.currentUserId,
          rating,
          title,
          content
        });

        if (response.data.success) {
          alert('Vielen Dank für Ihre Bewertung!');
          document.getElementById('review-form').reset();
          this.setRating(0);
          this.loadReviewStats();
          this.loadReviews();
        } else {
          alert(response.data.error || 'Fehler beim Senden der Bewertung');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Fehler beim Senden der Bewertung. Bitte versuchen Sie es später erneut.');
      } finally {
        const submitBtn = document.querySelector('#review-form button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Bewertung absenden';
      }
    },

    /**
     * Vote on review
     */
    voteReview: async function(reviewId, isHelpful) {
      if (!this.currentUserId) {
        alert('Bitte melden Sie sich an, um Bewertungen zu bewerten');
        return;
      }

      try {
        const response = await axios.post(`/api/reviews/${reviewId}/vote`, {
          userId: this.currentUserId,
          isHelpful
        });

        if (response.data.success) {
          this.loadReviews(); // Reload to show updated counts
        }
      } catch (error) {
        console.error('Error voting on review:', error);
      }
    },

    /**
     * Filter by rating
     */
    filterByRating: function(rating) {
      this.currentRatingFilter = rating;
      this.currentPage = 1;
      this.loadReviews();
      this.loadReviewStats(); // Reload stats to update button states
    },

    /**
     * Change sort
     */
    changeSort: function(sort) {
      this.currentSort = sort;
      this.currentPage = 1;
      this.loadReviews();
    },

    /**
     * Go to page
     */
    goToPage: function(page) {
      this.currentPage = page;
      this.loadReviews();
      // Scroll to reviews
      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
      // Add any additional event listeners here
    },

    /**
     * Render stars
     */
    renderStars: function(count, classes = '') {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += `<i class="fas fa-star ${i < count ? 'text-gold' : 'text-gray-300'} ${classes}"></i>`;
      }
      return stars;
    },

    /**
     * Escape HTML
     */
    escapeHtml: function(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    /**
     * Show image modal
     */
    showImageModal: function(imageUrl) {
      // Simple modal implementation
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="relative max-w-4xl max-h-screen p-4">
          <button 
            onclick="this.closest('.fixed').remove()"
            class="absolute top-8 right-8 text-white text-4xl hover:text-gray-300 transition"
          >
            <i class="fas fa-times"></i>
          </button>
          <img src="${imageUrl}" alt="Review image" class="max-w-full max-h-screen rounded-lg" />
        </div>
      `;
      modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
      };
      document.body.appendChild(modal);
    }
  };
})();
