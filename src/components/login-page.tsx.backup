export const LoginPage = () => {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anmelden - SoftwareKing24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/cart-manager-enhanced.js"></script>
        <style>
            :root {
                --navy-dark: #1a2a4e;
                --navy-medium: #2d3e6f;
                --gold: #d4af37;
                --gold-light: #e8c966;
            }
            .bg-navy-dark { background-color: var(--navy-dark); }
            .bg-navy-medium { background-color: var(--navy-medium); }
            .text-navy-dark { color: var(--navy-dark); }
            .text-gold { color: var(--gold); }
            .bg-gold { background-color: var(--gold); }
            .border-gold { border-color: var(--gold); }
            .hover\:bg-gold:hover { background-color: var(--gold); }
            .hover\:bg-navy-medium:hover { background-color: var(--navy-medium); }
            .gradient-navy-gold {
                background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy-medium) 100%);
            }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        
        <!-- Header -->
        <header class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between py-3">
                    <a href="/" class="flex items-center">
                        <img src="/static/logo.png" alt="SoftwareKing24" class="h-16" />
                    </a>
                    <nav class="flex items-center space-x-6">
                        <a href="/" class="text-navy-dark hover:text-gold transition-colors font-semibold">
                            <i class="fas fa-home mr-2"></i>Startseite
                        </a>
                        <a href="/produkte" class="text-navy-dark hover:text-gold transition-colors font-semibold">
                            <i class="fas fa-shopping-bag mr-2"></i>Produkte
                        </a>
                        <a href="/warenkorb" class="bg-navy-dark hover:bg-navy-medium text-white px-4 py-2 rounded-lg transition-all flex items-center relative">
                            <i class="fas fa-shopping-cart mr-2"></i>Warenkorb
                            <span class="absolute -top-2 -right-2 bg-gold text-navy-dark w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" data-cart-count>0</span>
                        </a>
                        <a href="/registrieren" class="bg-gold hover:bg-gold-light text-navy-dark px-6 py-2 rounded-lg font-bold transition-all">
                            <i class="fas fa-user-plus mr-2"></i>Registrieren
                        </a>
                    </nav>
                </div>
            </div>
        </header>
        
        <!-- Login Form -->
        <div class="max-w-md mx-auto px-4 py-12">
            <!-- Registration Success Message -->
            <div id="registeredMessage" class="hidden bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <i class="fas fa-check-circle mr-2"></i>
                Registrierung erfolgreich! Bitte melden Sie sich an.
            </div>

            <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 gradient-navy-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <i class="fas fa-sign-in-alt text-gold text-3xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-navy-dark">Willkommen zurück</h1>
                    <p class="text-gray-600 mt-2">Melden Sie sich bei Ihrem Konto an</p>
                </div>

                <form id="loginForm" class="space-y-6">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-envelope mr-2"></i>E-Mail-Adresse
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            autofocus
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition"
                            placeholder="ihre@email.de"
                        />
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-lock mr-2"></i>Passwort
                        </label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition pr-12"
                                placeholder="Ihr Passwort"
                            />
                            <button 
                                type="button" 
                                onclick="togglePassword()"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <i id="password-icon" class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Remember & Forgot -->
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                name="remember" 
                                class="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                            />
                            <span class="ml-2 text-sm text-gray-600">Angemeldet bleiben</span>
                        </label>
                        <a href="/passwort-vergessen" class="text-sm text-gold hover:underline font-semibold">
                            Passwort vergessen?
                        </a>
                    </div>

                    <!-- Error Message -->
                    <div id="errorMessage" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        <span id="errorText"></span>
                    </div>

                    <!-- Submit Button -->
                    <button 
                        type="submit"
                        id="submitBtn"
                        class="w-full gradient-navy-gold text-white py-3 rounded-lg font-bold hover:opacity-90 transition transform hover:scale-105 shadow-lg"
                    >
                        <i class="fas fa-sign-in-alt mr-2"></i>Anmelden
                    </button>
                </form>

                <!-- Register Link -->
                <div class="mt-6 text-center">
                    <p class="text-gray-600">
                        Noch kein Konto? 
                        <a href="/registrieren" class="text-gold hover:underline font-bold">Jetzt registrieren</a>
                    </p>
                </div>

                <!-- Social Login (Future) -->
                <div class="mt-8">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">Oder anmelden mit</span>
                        </div>
                    </div>
                    <div class="mt-4 grid grid-cols-2 gap-3">
                        <button class="border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition opacity-50 cursor-not-allowed" disabled>
                            <i class="fab fa-google mr-2"></i>Google
                        </button>
                        <button class="border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition opacity-50 cursor-not-allowed" disabled>
                            <i class="fab fa-facebook mr-2"></i>Facebook
                        </button>
                    </div>
                    <p class="text-xs text-center text-gray-500 mt-2">Social Login kommt bald</p>
                </div>
            </div>

            <!-- Security Info -->
            <div class="mt-8 bg-navy-dark bg-opacity-5 border-2 border-gold rounded-lg p-4">
                <div class="flex items-start">
                    <i class="fas fa-shield-check text-gold text-xl mt-1 mr-3"></i>
                    <div class="text-sm text-navy-dark">
                        <strong>Ihre Sicherheit ist uns wichtig:</strong>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li>SSL-verschlüsselte Verbindung</li>
                            <li>Passwörter werden verschlüsselt gespeichert</li>
                            <li>2-Faktor-Authentifizierung (kommt bald)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-navy-dark text-white py-8 mt-12">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <p class="text-gray-300">&copy; 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
                <div class="mt-4 flex items-center justify-center space-x-6 text-sm">
                    <a href="/agb" class="text-gray-400 hover:text-gold transition-colors">AGB</a>
                    <a href="/datenschutz" class="text-gray-400 hover:text-gold transition-colors">Datenschutz</a>
                    <a href="/impressum" class="text-gray-400 hover:text-gold transition-colors">Impressum</a>
                </div>
            </div>
        </footer>

        <script>
            // Check for registration success
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('registered') === 'true') {
                document.getElementById('registeredMessage').classList.remove('hidden');
            }

            // Toggle password visibility
            function togglePassword() {
                const field = document.getElementById('password');
                const icon = document.getElementById('password-icon');
                
                if (field.type === 'password') {
                    field.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    field.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }

            // Form submission
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = document.getElementById('submitBtn');
                const errorMessage = document.getElementById('errorMessage');
                const errorText = document.getElementById('errorText');
                
                // Hide error message
                errorMessage.classList.add('hidden');
                
                // Get form data
                const formData = new FormData(e.target);
                const data = {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    remember: formData.get('remember') === 'on'
                };
                
                // Disable button
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Anmelden...';
                
                try {
                    const response = await axios.post('/api/auth/login', data);
                    
                    if (response.data.success) {
                        // Store token
                        localStorage.setItem('authToken', response.data.token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        
                        // Redirect to dashboard or previous page
                        const redirectTo = urlParams.get('redirect') || '/konto';
                        window.location.href = redirectTo;
                    } else {
                        throw new Error(response.data.error || 'Login fehlgeschlagen');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    errorText.textContent = error.response?.data?.error || error.message || 'E-Mail oder Passwort falsch';
                    errorMessage.classList.remove('hidden');
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Anmelden';
                }
            });
        </script>
    </body>
    </html>
  `;
};
