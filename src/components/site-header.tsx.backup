export const SiteHeader = () => (
  <>
    {/* Top Bar */}
    <div class="border-b border-gray-200 py-2 text-sm">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <span class="text-gray-600"><i class="fas fa-phone mr-2"></i>+49 123 456789</span>
          <span class="text-gray-600"><i class="fas fa-envelope mr-2"></i>[email protected]</span>
          <span class="text-green-600 font-semibold"><i class="fas fa-truck mr-2"></i>Kostenloser Sofort-Download</span>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/warenkorb" class="text-gray-600 hover:text-blue-600 transition">
            <i class="fas fa-shopping-cart mr-1"></i>Warenkorb 
            <span class="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs ml-1" data-cart-count>0</span>
          </a>
          <button class="text-gray-600 hover:text-blue-600">
            <i class="fas fa-globe mr-1"></i>DE / EN
          </button>
        </div>
      </div>
    </div>

    {/* Main Navigation */}
    <div class="flex items-center justify-between py-4">
      <a href="/" class="flex items-center space-x-3">
        <img src="/static/logo.png" alt="SoftwareKing24" class="h-16" />
      </a>

      {/* Search Bar */}
      <div class="flex-1 max-w-2xl mx-8">
        <div class="relative">
          <input 
            type="text" 
            id="global-search"
            placeholder="Suchen Sie nach Windows, Office, Server..." 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button onclick="performSearch()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
            <i class="fas fa-search text-lg"></i>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div class="flex items-center space-x-4">
        <a href="/warenkorb" class="px-4 py-2 text-gray-700 hover:text-blue-600 transition relative">
          <i class="fas fa-shopping-cart text-2xl"></i>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" data-cart-count>0</span>
        </a>
        <a href="/login" class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
          <i class="fas fa-user mr-2"></i>Anmelden
        </a>
      </div>
    </div>

    {/* Category Navigation */}
    <nav class="border-t border-gray-200 py-3">
      <ul class="flex space-x-8 text-sm font-medium">
        <li class="relative group">
          <a href="/produkte" class="text-gray-700 hover:text-blue-600 transition flex items-center">
            <i class="fas fa-th mr-2"></i>Alle Produkte
            <i class="fas fa-chevron-down ml-1 text-xs"></i>
          </a>
          {/* Mega Menu Dropdown */}
          <div class="absolute left-0 top-full mt-3 w-screen max-w-4xl bg-white shadow-xl rounded-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div class="grid grid-cols-4 gap-6">
              <div>
                <h3 class="font-bold text-gray-800 mb-3 flex items-center">
                  <i class="fab fa-windows text-blue-600 mr-2"></i>Windows
                </h3>
                <ul class="space-y-2">
                  <li><a href="/produkte?category=Microsoft%20Windows" class="text-gray-600 hover:text-blue-600 transition text-sm">Windows 11 Professional</a></li>
                  <li><a href="/produkte?category=Microsoft%20Windows" class="text-gray-600 hover:text-blue-600 transition text-sm">Windows 11 Home</a></li>
                  <li><a href="/produkte?category=Microsoft%20Windows" class="text-gray-600 hover:text-blue-600 transition text-sm">Windows 10 Professional</a></li>
                  <li><a href="/produkte?category=Microsoft%20Windows" class="text-red-600 hover:text-red-700 transition text-sm font-semibold">🔥 Alle Windows</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-3 flex items-center">
                  <i class="fas fa-file-word text-orange-600 mr-2"></i>Office
                </h3>
                <ul class="space-y-2">
                  <li><a href="/produkte?category=Microsoft%20Office%202024" class="text-gray-600 hover:text-blue-600 transition text-sm">Office 2024</a></li>
                  <li><a href="/produkte?category=Microsoft%20Office%202021" class="text-gray-600 hover:text-blue-600 transition text-sm">Office 2021</a></li>
                  <li><a href="/produkte?category=Microsoft%20Office%202019" class="text-gray-600 hover:text-blue-600 transition text-sm">Office 2019</a></li>
                  <li><a href="/produkte?category=Microsoft%20Office" class="text-red-600 hover:text-red-700 transition text-sm font-semibold">🔥 Alle Office</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-3 flex items-center">
                  <i class="fas fa-server text-green-600 mr-2"></i>Server & Business
                </h3>
                <ul class="space-y-2">
                  <li><a href="/produkte?category=Microsoft%20Server" class="text-gray-600 hover:text-blue-600 transition text-sm">Windows Server 2022</a></li>
                  <li><a href="/produkte?category=Microsoft%20Server" class="text-gray-600 hover:text-blue-600 transition text-sm">Windows Server 2019</a></li>
                  <li><a href="/produkte?category=Microsoft%20Project" class="text-gray-600 hover:text-blue-600 transition text-sm">Microsoft Project</a></li>
                  <li><a href="/produkte?category=Microsoft%20Visio" class="text-gray-600 hover:text-blue-600 transition text-sm">Microsoft Visio</a></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-gray-800 mb-3 flex items-center">
                  <i class="fab fa-apple text-gray-600 mr-2"></i>Mac Software
                </h3>
                <ul class="space-y-2">
                  <li><a href="/produkte?category=Microsoft%20Office%20Mac" class="text-gray-600 hover:text-blue-600 transition text-sm">Office 2024 Mac</a></li>
                  <li><a href="/produkte?category=Microsoft%20Office%20Mac" class="text-gray-600 hover:text-blue-600 transition text-sm">Office 2021 Mac</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li><a href="/produkte?category=Microsoft%20Windows" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fab fa-windows mr-2"></i>Windows</a></li>
        <li><a href="/produkte?category=Microsoft%20Office" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-file-alt mr-2"></i>Office</a></li>
        <li><a href="/produkte?category=Microsoft%20Server" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-server mr-2"></i>Server</a></li>
        <li><a href="#deals" class="text-red-600 hover:text-red-700 transition flex items-center badge-shimmer"><i class="fas fa-fire mr-2"></i>Top Angebote</a></li>
        <li><a href="#" class="text-gray-700 hover:text-blue-600 transition flex items-center"><i class="fas fa-question-circle mr-2"></i>Hilfe</a></li>
      </ul>
    </nav>
  </>
);

// Search function
export const SearchScript = () => `
  function performSearch() {
    const query = document.getElementById('global-search').value.trim();
    if (query) {
      window.location.href = '/produkte?search=' + encodeURIComponent(query);
    }
  }

  document.getElementById('global-search').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
`;
