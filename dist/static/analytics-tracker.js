/**
 * SOFTWAREKING24 Analytics Tracker
 * Real-time tracking for page views, events, conversions
 */

(function() {
  'use strict';

  // Configuration
  const TRACKING_ENDPOINT = '/api/analytics/track';
  const PING_INTERVAL = 30000; // 30 seconds
  
  // Utility functions
  function generateId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => 
      ((Math.random() * 16) | 0).toString(16)
    );
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  function getOrCreateVisitorId() {
    let visitorId = getCookie('sk24_visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + generateId();
      setCookie('sk24_visitor_id', visitorId, 365);
    }
    return visitorId;
  }

  function getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('sk24_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + generateId();
      sessionStorage.setItem('sk24_session_id', sessionId);
    }
    return sessionId;
  }

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) return 'IE';
    return 'Unknown';
  }

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Win') > -1) return 'Windows';
    if (ua.indexOf('Mac') > -1) return 'macOS';
    if (ua.indexOf('Linux') > -1) return 'Linux';
    if (ua.indexOf('Android') > -1) return 'Android';
    if (ua.indexOf('iOS') > -1) return 'iOS';
    return 'Unknown';
  }

  function getURLParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function sendBeacon(data) {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify(data));
    } else {
      // Fallback for browsers without sendBeacon
      fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(() => {});
    }
  }

  // Main tracker object
  const tracker = {
    visitorId: getOrCreateVisitorId(),
    sessionId: getOrCreateSessionId(),
    startTime: Date.now(),
    pingInterval: null,

    // Track page view
    trackPageView: function() {
      const data = {
        type: 'pageview',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_url: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || null,
        utm_source: getURLParam('utm_source'),
        utm_medium: getURLParam('utm_medium'),
        utm_campaign: getURLParam('utm_campaign'),
        utm_term: getURLParam('utm_term'),
        utm_content: getURLParam('utm_content'),
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        screen_width: screen.width,
        screen_height: screen.height,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        user_agent: navigator.userAgent
      };

      sendBeacon(data);
      console.log('[Analytics] Page view tracked:', data.page_url);
    },

    // Track event
    trackEvent: function(category, action, label, value) {
      const data = {
        type: 'event',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        event_category: category,
        event_action: action,
        event_label: label || null,
        event_value: value || null,
        page_url: window.location.pathname
      };

      sendBeacon(data);
      console.log('[Analytics] Event tracked:', category, action, label);
    },

    // Track conversion
    trackConversion: function(type, orderId, productName, revenue) {
      const data = {
        type: 'conversion',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        conversion_type: type,
        order_id: orderId || null,
        product_name: productName || null,
        revenue: revenue || 0
      };

      sendBeacon(data);
      console.log('[Analytics] Conversion tracked:', type, revenue);
    },

    // Track page duration
    trackDuration: function() {
      const duration = Math.floor((Date.now() - this.startTime) / 1000);
      
      const data = {
        type: 'duration',
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_url: window.location.pathname,
        duration_seconds: duration
      };

      sendBeacon(data);
      console.log('[Analytics] Duration tracked:', duration, 'seconds');
    },

    // Start real-time ping
    startPing: function() {
      this.pingInterval = setInterval(() => {
        sendBeacon({
          type: 'pageview',
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_url: window.location.pathname,
          page_title: document.title
        });
      }, PING_INTERVAL);
    },

    // Stop ping
    stopPing: function() {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }
    }
  };

  // Auto-track page view on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      tracker.trackPageView();
      tracker.startPing();
    });
  } else {
    tracker.trackPageView();
    tracker.startPing();
  }

  // Track duration on page unload
  window.addEventListener('beforeunload', () => {
    tracker.trackDuration();
    tracker.stopPing();
  });

  // Track duration on visibility change (tab switch)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      tracker.trackDuration();
      tracker.stopPing();
    } else {
      tracker.startTime = Date.now();
      tracker.startPing();
    }
  });

  // Auto-track common events
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    // Track button clicks
    if (target.tagName === 'BUTTON') {
      const buttonText = target.textContent.trim();
      tracker.trackEvent('engagement', 'button_click', buttonText);
    }

    // Track outbound links
    if (target.tagName === 'A' && target.hostname !== window.location.hostname) {
      tracker.trackEvent('navigation', 'outbound_click', target.href);
    }

    // Track product links
    if (target.href && target.href.includes('/products/')) {
      const productName = target.textContent.trim();
      tracker.trackEvent('product', 'click', productName);
    }
  });

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target;
    const formName = form.name || form.id || 'unnamed_form';
    tracker.trackEvent('engagement', 'form_submit', formName);
  });

  // Expose tracker globally
  window.SK24Analytics = tracker;

  console.log('[Analytics] Tracker initialized');
  console.log('[Analytics] Visitor ID:', tracker.visitorId);
  console.log('[Analytics] Session ID:', tracker.sessionId);

})();
