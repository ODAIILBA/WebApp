export const CMSPage = ({ slug }: { slug: string }) => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
      <link href="/static/search-autocomplete.css" rel="stylesheet">
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        .cms-content h1 { font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: var(--navy-dark); }
        .cms-content h2 { font-size: 2rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; color: var(--navy-dark); }
        .cms-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .cms-content p { margin-bottom: 1rem; line-height: 1.75; }
        .cms-content ul, .cms-content ol { margin: 1rem 0; padding-left: 2rem; }
        .cms-content li { margin-bottom: 0.5rem; }
        .cms-content a { color: var(--gold); text-decoration: underline; }
        .cms-content a:hover { color: var(--navy-dark); }
      </style>
    </head>
    <body class="bg-gray-50">
      ${Header()}
      
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div id="cms-content" class="cms-content">
            <div class="text-center py-12">
              <i class="fas fa-spinner fa-spin text-4xl" style="color: var(--gold)"></i>
              <p class="mt-4 text-gray-600">Seite wird geladen...</p>
            </div>
          </div>
        </div>
      </div>
      
      ${Footer()}
      
      <script>
        async function loadPage() {
          try {
            const response = await axios.get('/api/pages/${slug}');
            if (response.data.success && response.data.data) {
              const page = response.data.data;
              document.title = page.title + ' - SOFTWAREKING24';
              document.getElementById('cms-content').innerHTML = page.content;
            } else {
              document.getElementById('cms-content').innerHTML = 
                '<div class="text-center py-12"><h1 class="text-3xl font-bold text-gray-800 mb-4">Seite nicht gefunden</h1><p class="text-gray-600">Die angeforderte Seite existiert nicht.</p></div>';
            }
          } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('cms-content').innerHTML = 
              '<div class="text-center py-12"><h1 class="text-3xl font-bold text-red-600 mb-4">Fehler</h1><p class="text-gray-600">Seite konnte nicht geladen werden.</p></div>';
          }
        }
        
        loadPage();
      </script>
    </body>
    </html>
  `;
};

function Header() {
  return `
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-3">
            <img src="/static/logo.png" alt="SOFTWAREKING24" class="h-16" />
          </a>
          
          <nav class="hidden md:flex items-center gap-6">
            <a href="/" class="text-gray-700 hover:text-gold-500 font-medium">Home</a>
            <a href="/produkte" class="text-gray-700 hover:text-gold-500 font-medium">Produkte</a>
            <a href="/kontakt" class="text-gray-700 hover:text-gold-500 font-medium">Kontakt</a>
          </nav>
          
          <div class="flex items-center gap-4">
            <a href="/warenkorb" class="relative">
              <i class="fas fa-shopping-cart text-xl" style="color: var(--navy-dark)"></i>
              <span class="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cart-count">0</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function Footer() {
  return `
    <footer class="mt-16" style="background: var(--navy-dark); color: white;">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/static/logo-footer.png" alt="SOFTWAREKING24" class="h-12 mb-4" />
            <p class="text-sm text-gray-300">Original Software-Lizenzen</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Schnellzugriff</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/" class="hover:text-gold-400">Startseite</a></li>
              <li><a href="/produkte" class="hover:text-gold-400">Produkte</a></li>
              <li><a href="/kontakt" class="hover:text-gold-400">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Rechtliches</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/agb" class="hover:text-gold-400">AGB</a></li>
              <li><a href="/datenschutz" class="hover:text-gold-400">Datenschutz</a></li>
              <li><a href="/impressum" class="hover:text-gold-400">Impressum</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Kontakt</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><i class="fas fa-envelope mr-2"></i>info@softwareking24.de</li>
              <li><i class="fas fa-phone mr-2"></i>+49 (0) 123 456789</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2026 SOFTWAREKING24.de - Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  `;
}
