// Public Blog Listing Page
import { LanguageSwitcher } from './language-switcher'

export function PublicBlog(posts: any[], categories: any[], currentCategory?: string, basePath: string = '/blog') {
  const categoryName = categories.find(c => c.slug === currentCategory)?.name || 'Alle Beiträge';
  
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>News & Blog - SOFTWAREKING24</title>
        <meta name="description" content="Aktuelle Software-News, Tipps und Anleitungen von SOFTWAREKING24. Bleiben Sie auf dem Laufenden über die neuesten Entwicklungen.">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            :root {
                --navy-dark: #132C46;
                --gold: #D9A50B;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #f8fafc;
            }
            .blog-card {
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.07);
                transition: all 0.3s;
            }
            .blog-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 24px rgba(0,0,0,0.12);
            }
            .blog-header {
                background: linear-gradient(135deg, var(--navy-dark), #1a3a5e);
                color: white;
                padding: 4rem 0;
            }
            .category-pill {
                display: inline-block;
                padding: 0.5rem 1rem;
                background: var(--gold);
                color: white;
                border-radius: 20px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-right: 0.5rem;
                text-decoration: none;
                transition: all 0.2s;
            }
            .category-pill:hover {
                background: #c09508;
            }
            .category-pill.active {
                background: var(--navy-dark);
            }
            .featured-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                background: linear-gradient(135deg, #e0e7ff, #f0f9ff);
            }
            .badge-ai {
                background: #dbeafe;
                color: #1e40af;
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <!-- Header -->
        <div class="blog-header">
            <div class="max-w-6xl mx-auto px-6">
                <div class="mb-4">
                    <a href="/" class="text-white hover:text-gray-200 text-sm">
                        <i class="fas fa-home mr-2"></i>Startseite
                    </a>
                    <span class="text-white mx-2">/</span>
                    <span class="text-gray-300 text-sm">News & Blog</span>
                </div>
                <h1 class="text-4xl font-bold mb-4">
                    <i class="fas fa-newspaper mr-3"></i>News & Blog
                </h1>
                <p class="text-xl text-gray-200">
                    Aktuelle Software-News, Tipps und Anleitungen
                </p>
            </div>
        </div>

        <!-- Categories -->
        <div class="bg-white border-b">
            <div class="max-w-6xl mx-auto px-6 py-4">
                <div class="flex flex-wrap gap-2">
                    <a href="${basePath}" class="category-pill ${!currentCategory ? 'active' : ''}">>
                        <i class="fas fa-th mr-1"></i>Alle Beiträge
                    </a>
                    ${categories.map(cat => `
                        <a href="${basePath}/category/${cat.slug}" class="category-pill ${currentCategory === cat.slug ? 'active' : ''}">>
                            ${cat.name}
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Blog Posts Grid -->
        <div class="max-w-6xl mx-auto px-6 py-12">
            ${posts.length === 0 ? `
                <div class="text-center py-16">
                    <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-xl text-gray-600">Noch keine Beiträge in dieser Kategorie</p>
                </div>
            ` : `
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${posts.map(post => `
                        <article class="blog-card">
                            <a href="${basePath}/${post.slug}">>
                                ${post.featured_image ? `
                                    <img src="${post.featured_image}" alt="${post.title}" class="featured-image">
                                ` : `
                                    <div class="featured-image flex items-center justify-center">
                                        <i class="fas fa-newspaper text-6xl text-gray-400"></i>
                                    </div>
                                `}
                            </a>
                            <div class="p-6">
                                <div class="flex items-center gap-2 mb-3">
                                    ${post.category_name ? `
                                        <span class="text-xs font-semibold px-2 py-1 rounded" style="background: var(--gold); color: white;">
                                            ${post.category_name}
                                        </span>
                                    ` : ''}
                                    ${post.is_ai_generated ? '<span class="badge-ai"><i class="fas fa-robot mr-1"></i>AI</span>' : ''}
                                </div>
                                <a href="${basePath}/${post.slug}">>
                                    <h2 class="text-xl font-bold mb-3 hover:text-blue-600 transition" style="color: var(--navy-dark);">
                                        ${post.title}
                                    </h2>
                                </a>
                                <p class="text-gray-600 mb-4 line-clamp-3">
                                    ${post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                                </p>
                                <div class="flex justify-between items-center text-sm text-gray-500">
                                    <span>
                                        <i class="fas fa-calendar mr-1"></i>
                                        ${new Date(post.published_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                    <span>
                                        <i class="fas fa-eye mr-1"></i>
                                        ${post.view_count || 0} Aufrufe
                                    </span>
                                </div>
                                <a href="${basePath}/${post.slug}"> class="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700">
                                    Weiterlesen <i class="fas fa-arrow-right ml-1"></i>
                                </a>
                            </div>
                        </article>
                    `).join('')}
                </div>
            `}
        </div>

        <!-- Footer -->
        <footer class="bg-white border-t mt-16 py-8">
            <div class="max-w-6xl mx-auto px-6 text-center text-gray-600">
                <p>&copy; 2026 SOFTWAREKING24. Alle Rechte vorbehalten.</p>
                <div class="mt-4">
                    <a href="/" class="text-blue-600 hover:underline">Startseite</a>
                    <span class="mx-2">•</span>
                    <a href="/products" class="text-blue-600 hover:underline">Produkte</a>
                    <span class="mx-2">•</span>
                    <a href="${basePath}" class="text-blue-600 hover:underline">Blog</a>
                </div>
            </div>
        </footer>

        ${LanguageSwitcher('de')}
    </body>
    </html>
  `.trim();
}
