// Error Pages: 404 and 500
import type { FC } from 'hono/jsx'

export const NotFoundPage: FC<{ lang?: 'de' | 'en' }> = ({ lang = 'de' }) => {
  const texts = {
    de: {
      title: 'Seite nicht gefunden',
      subtitle: 'Die angeforderte Seite existiert nicht',
      message: 'Die Seite, die Sie suchen, wurde möglicherweise entfernt, umbenannt oder ist vorübergehend nicht verfügbar.',
      homeBtn: 'Zur Startseite',
      productsBtn: 'Produkte durchstöbern',
      contactBtn: 'Kontakt aufnehmen',
    },
    en: {
      title: 'Page Not Found',
      subtitle: 'The requested page does not exist',
      message: 'The page you are looking for might have been removed, renamed, or is temporarily unavailable.',
      homeBtn: 'Go to Homepage',
      productsBtn: 'Browse Products',
      contactBtn: 'Contact Us',
    },
  }

  const t = texts[lang]

  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div class="max-w-2xl w-full text-center">
        <div class="mb-8">
          <h1 class="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p class="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <p class="text-gray-500">{t.message}</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href={lang === 'de' ? '/' : '/en'} class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <i class="fas fa-home mr-2"></i>
            {t.homeBtn}
          </a>
          <a href={lang === 'de' ? '/produkte' : '/en/products'} class="bg-white text-gray-700 px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold">
            <i class="fas fa-box mr-2"></i>
            {t.productsBtn}
          </a>
          <a href={lang === 'de' ? '/kontakt' : '/en/contact'} class="text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            <i class="fas fa-envelope mr-2"></i>
            {t.contactBtn}
          </a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="font-semibold text-gray-900 mb-4">
            {lang === 'de' ? 'Beliebte Seiten:' : 'Popular Pages:'}
          </h3>
          <div class="grid md:grid-cols-2 gap-4 text-left">
            <a href={lang === 'de' ? '/angebote' : '/en/deals'} class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-tag text-red-500 mr-3"></i>
              {lang === 'de' ? 'Sonderangebote' : 'Special Offers'}
            </a>
            <a href={lang === 'de' ? '/neuheiten' : '/en/new'} class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-sparkles text-yellow-500 mr-3"></i>
              {lang === 'de' ? 'Neuheiten' : 'New Arrivals'}
            </a>
            <a href={lang === 'de' ? '/marken' : '/en/brands'} class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-star text-blue-500 mr-3"></i>
              {lang === 'de' ? 'Top Marken' : 'Top Brands'}
            </a>
            <a href={lang === 'de' ? '/faq' : '/en/faq'} class="p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <i class="fas fa-question-circle text-green-500 mr-3"></i>
              FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ServerErrorPage: FC<{ lang?: 'de' | 'en' }> = ({ lang = 'de' }) => {
  const texts = {
    de: {
      title: 'Serverfehler',
      subtitle: 'Etwas ist schief gelaufen',
      message: 'Wir arbeiten bereits an einer Lösung. Bitte versuchen Sie es in wenigen Minuten erneut.',
      homeBtn: 'Zur Startseite',
      refreshBtn: 'Seite aktualisieren',
      contactBtn: 'Support kontaktieren',
    },
    en: {
      title: 'Server Error',
      subtitle: 'Something went wrong',
      message: 'We are already working on a solution. Please try again in a few minutes.',
      homeBtn: 'Go to Homepage',
      refreshBtn: 'Refresh Page',
      contactBtn: 'Contact Support',
    },
  }

  const t = texts[lang]

  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div class="max-w-2xl w-full text-center">
        <div class="mb-8">
          <h1 class="text-9xl font-bold text-red-600 mb-4">500</h1>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p class="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <p class="text-gray-500">{t.message}</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <button onclick="location.reload()" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <i class="fas fa-sync-alt mr-2"></i>
            {t.refreshBtn}
          </button>
          <a href={lang === 'de' ? '/' : '/en'} class="bg-white text-gray-700 px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold">
            <i class="fas fa-home mr-2"></i>
            {t.homeBtn}
          </a>
          <a href={lang === 'de' ? '/kontakt' : '/en/contact'} class="text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            <i class="fas fa-life-ring mr-2"></i>
            {t.contactBtn}
          </a>
        </div>
      </div>
    </div>
  )
}
