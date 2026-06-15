/**
 * QUICK WINS BUNDLE - Homepage Enhancements
 * 
 * Features:
 * 1. Dynamic slider with database integration
 * 2. Lazy loading images
 * 3. Enhanced hover effects
 * 4. Mobile-responsive navigation
 */

// ============================================
// QUICK WIN 1: Dynamic Slider with Auto-play
// ============================================

class DynamicSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId)
    this.currentSlide = 0
    this.slides = []
    this.autoPlayInterval = null
    this.options = {
      autoPlay: options.autoPlay !== false,
      interval: options.interval || 5000,
      transitionDuration: options.transitionDuration || 600,
      ...options
    }
    
    this.init()
  }
  
  async init() {
    try {
      // Fetch slides from API
      const response = await fetch('/api/homepage/sliders')
      const data = await response.json()
      
      if (data.success && data.data && data.data.length > 0) {
        this.slides = data.data
        this.render()
        this.attachEvents()
        
        if (this.options.autoPlay && this.slides.length > 1) {
          this.startAutoPlay()
        }
      } else {
        // Fallback to static content if no slides
        console.log('No dynamic slides found, using static content')
      }
    } catch (error) {
      console.error('Error loading slider:', error)
      // Graceful degradation - keep static content
    }
  }
  
  render() {
    if (!this.container) return
    
    const slidesHTML = this.slides.map((slide, index) => `
      <div class="slider-slide ${index === 0 ? 'active' : ''}" 
           data-slide-index="${index}"
           style="background: ${slide.background_color || '#1a2a4e'}; 
                  ${slide.background_image ? `background-image: url(${slide.background_image}); background-size: cover; background-position: center;` : ''}">
        <div class="slider-overlay"></div>
        <div class="slider-content">
          <div class="inline-block animate-slideDown">
            <span class="bg-gold text-white px-4 py-2 rounded-full text-sm font-bold inline-flex items-center">
              <i class="fas fa-star mr-2"></i>
              Über 50.000 zufriedene Kunden
            </span>
          </div>
          
          <h1 class="slider-title animate-fadeIn" style="color: ${slide.text_color || '#ffffff'}">
            ${slide.title}
            ${slide.subtitle ? `<span class="block text-gold mt-2">${slide.subtitle}</span>` : ''}
          </h1>
          
          <p class="slider-description animate-fadeIn" style="color: ${slide.text_color || '#ffffff'}; animation-delay: 0.2s;">
            ${slide.description}
          </p>
          
          ${slide.button_text && slide.button_link ? `
            <div class="slider-actions animate-slideUp" style="animation-delay: 0.4s;">
              <a href="${slide.button_link}" class="btn-slider-primary">
                <i class="fas fa-shopping-bag mr-3"></i>
                ${slide.button_text}
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('')
    
    const navigationHTML = this.slides.length > 1 ? `
      <div class="slider-navigation">
        <button class="slider-nav-btn slider-prev" aria-label="Previous slide">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="slider-dots">
          ${this.slides.map((_, index) => `
            <button class="slider-dot ${index === 0 ? 'active' : ''}" 
                    data-slide="${index}" 
                    aria-label="Go to slide ${index + 1}"></button>
          `).join('')}
        </div>
        <button class="slider-nav-btn slider-next" aria-label="Next slide">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    ` : ''
    
    this.container.innerHTML = `
      <div class="slider-wrapper">
        ${slidesHTML}
      </div>
      ${navigationHTML}
    `
  }
  
  attachEvents() {
    // Previous button
    const prevBtn = this.container.querySelector('.slider-prev')
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide())
    }
    
    // Next button
    const nextBtn = this.container.querySelector('.slider-next')
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide())
    }
    
    // Dots
    const dots = this.container.querySelectorAll('.slider-dot')
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index))
    })
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay())
    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoPlay) this.startAutoPlay()
    })
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide()
      if (e.key === 'ArrowRight') this.nextSlide()
    })
    
    // Touch/Swipe support
    this.addTouchSupport()
  }
  
  addTouchSupport() {
    let touchStartX = 0
    let touchEndX = 0
    
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX
    })
    
    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX
      this.handleSwipe()
    })
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) this.nextSlide()
      if (touchEndX > touchStartX + 50) this.prevSlide()
    }
    
    this.handleSwipe = handleSwipe
  }
  
  goToSlide(index) {
    const slides = this.container.querySelectorAll('.slider-slide')
    const dots = this.container.querySelectorAll('.slider-dot')
    
    slides[this.currentSlide].classList.remove('active')
    dots[this.currentSlide]?.classList.remove('active')
    
    this.currentSlide = index
    
    slides[this.currentSlide].classList.add('active')
    dots[this.currentSlide]?.classList.add('active')
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }
  
  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.options.interval)
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

// ============================================
// QUICK WIN 2: Lazy Loading Images
// ============================================

function initLazyLoading() {
  // Add loading="lazy" to all images that don't have it
  const images = document.querySelectorAll('img:not([loading])')
  images.forEach(img => {
    img.setAttribute('loading', 'lazy')
    
    // Add blur-up placeholder effect
    if (!img.classList.contains('no-lazy')) {
      img.classList.add('lazy-image')
      
      // Create placeholder
      const placeholder = document.createElement('div')
      placeholder.className = 'lazy-placeholder'
      placeholder.style.background = 'linear-gradient(135deg, #1a2a4e 0%, #2d3e6f 100%)'
      placeholder.style.position = 'absolute'
      placeholder.style.inset = '0'
      placeholder.style.zIndex = '-1'
      
      img.parentElement.style.position = 'relative'
      img.parentElement.insertBefore(placeholder, img)
      
      // Remove placeholder when loaded
      img.addEventListener('load', () => {
        img.classList.add('loaded')
        setTimeout(() => placeholder.remove(), 400)
      })
    }
  })
  
  // Intersection Observer for advanced lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('[data-lazy-src]')
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.lazySrc
          img.classList.add('lazy-loading')
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px'
    })
    
    lazyImages.forEach(img => imageObserver.observe(img))
  }
}

// ============================================
// QUICK WIN 3: Enhanced Hover Effects
// ============================================

function initEnhancedHoverEffects() {
  // Add enhanced hover class to product cards
  const productCards = document.querySelectorAll('.product-card, .card-interactive')
  productCards.forEach(card => {
    card.classList.add('hover-enhanced')
  })
  
  // Ripple effect on buttons
  const buttons = document.querySelectorAll('button, .btn, .button')
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span')
      ripple.className = 'ripple-effect'
      
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      
      this.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 600)
    })
  })
  
  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('[data-parallax]')
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
  
  // Icon bounce on hover
  const icons = document.querySelectorAll('.fa, .fas, .far, .fab')
  icons.forEach(icon => {
    if (!icon.closest('button')) {
      icon.classList.add('icon-hover-bounce')
    }
  })
}

// ============================================
// QUICK WIN 4: Mobile Navigation
// ============================================

function initMobileNavigation() {
  const header = document.querySelector('header')
  if (!header) return
  
  // Create mobile menu button if it doesn't exist
  let mobileMenuBtn = document.querySelector('.mobile-menu-toggle')
  if (!mobileMenuBtn) {
    mobileMenuBtn = document.createElement('button')
    mobileMenuBtn.className = 'mobile-menu-toggle'
    mobileMenuBtn.innerHTML = `
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu')
    
    const logo = header.querySelector('.logo, h1, .brand')
    if (logo) {
      logo.parentElement.insertBefore(mobileMenuBtn, logo.nextSibling)
    }
  }
  
  // Get or create mobile navigation
  const mainNav = document.querySelector('nav ul, .main-nav')
  if (!mainNav) return
  
  let mobileNav = document.querySelector('.mobile-navigation')
  if (!mobileNav) {
    mobileNav = document.createElement('div')
    mobileNav.className = 'mobile-navigation'
    mobileNav.innerHTML = `
      <div class="mobile-nav-overlay"></div>
      <div class="mobile-nav-content">
        <button class="mobile-nav-close" aria-label="Close menu">
          <i class="fas fa-times"></i>
        </button>
        ${mainNav.outerHTML}
      </div>
    `
    document.body.appendChild(mobileNav)
  }
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active')
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : ''
  })
  
  // Close mobile menu
  const closeBtn = mobileNav.querySelector('.mobile-nav-close')
  const overlay = mobileNav.querySelector('.mobile-nav-overlay')
  
  const closeMobileNav = () => {
    mobileNav.classList.remove('active')
    document.body.style.overflow = ''
  }
  
  closeBtn?.addEventListener('click', closeMobileNav)
  overlay?.addEventListener('click', closeMobileNav)
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav()
  })
  
  // Sticky header on scroll
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    
    if (currentScroll > 100) {
      header.classList.add('sticky')
      
      if (currentScroll > lastScroll) {
        header.classList.add('hide')
      } else {
        header.classList.remove('hide')
      }
    } else {
      header.classList.remove('sticky', 'hide')
    }
    
    lastScroll = currentScroll
  })
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Quick Wins Bundle - Initializing...')
  
  // Quick Win 1: Dynamic Slider
  const heroSection = document.querySelector('.gradient-hero, .hero-section, #hero-slider')
  if (heroSection && !document.getElementById('dynamic-slider-container')) {
    const sliderContainer = document.createElement('div')
    sliderContainer.id = 'dynamic-slider-container'
    sliderContainer.className = 'dynamic-slider-wrapper'
    heroSection.parentElement.insertBefore(sliderContainer, heroSection)
    
    new DynamicSlider('dynamic-slider-container', {
      autoPlay: true,
      interval: 5000,
      transitionDuration: 600
    })
  }
  
  // Quick Win 2: Lazy Loading
  initLazyLoading()
  
  // Quick Win 3: Enhanced Hover Effects
  initEnhancedHoverEffects()
  
  // Quick Win 4: Mobile Navigation
  initMobileNavigation()
  
  console.log('✅ Quick Wins Bundle - Ready!')
})

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DynamicSlider,
    initLazyLoading,
    initEnhancedHoverEffects,
    initMobileNavigation
  }
}
