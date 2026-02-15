import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  button_text: string
  button_link: string
  background_image: string
  background_color: string
  text_color: string
  is_active: number
  sort_order: number
}

export const AdminHomepageSlider = (slides: Slide[]) => {
  const slidesList = slides.map(slide => `
    <tr class="hover:bg-gray-50 transition-colors" data-slide-id="${slide.id}">
      <td class="px-6 py-4">
        <div class="flex items-center">
          <i class="fas fa-grip-vertical text-gray-400 cursor-move mr-3"></i>
          <span class="font-medium">${slide.sort_order}</span>
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-16 h-10 rounded overflow-hidden border-2 border-gray-200">
            ${slide.background_image 
              ? `<img src="${slide.background_image}" alt="" class="w-full h-full object-cover" />`
              : `<div class="w-full h-full" style="background: ${slide.background_color || '#1a2a4e'}"></div>`
            }
          </div>
          <div>
            <div class="font-semibold text-gray-900">${slide.title}</div>
            <div class="text-sm text-gray-500">${slide.subtitle}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">${slide.description}</td>
      <td class="px-6 py-4">
        <span class="px-3 py-1 rounded-full text-xs font-medium ${
          slide.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }">
          ${slide.is_active ? '✓ Aktiv' : '✗ Inaktiv'}
        </span>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-2">
          <button onclick="editSlide(${slide.id})" 
                  class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="toggleSlideStatus(${slide.id}, ${slide.is_active})" 
                  class="text-yellow-600 hover:text-yellow-800 p-2 hover:bg-yellow-50 rounded-lg transition-colors">
            <i class="fas fa-${slide.is_active ? 'eye-slash' : 'eye'}"></i>
          </button>
          <button onclick="deleteSlide(${slide.id})" 
                  class="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('')

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hero Slider verwalten - Admin - SOFTWAREKING24</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <style>
            :root {
                --navy-dark: #1a2a4e;
                --gold: #d4af37;
            }
            
            .admin-sidebar { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            
            .drag-over {
                background: #f3f4f6 !important;
                border: 2px dashed #d4af37;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        ${AdminSidebarAdvanced('/admin/homepage/slider')}
        
        <div class="ml-64 p-8">
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                                <i class="fas fa-images text-gold mr-3"></i>
                                Hero Slider verwalten
                            </h1>
                            <p class="text-gray-600">
                                Verwalten Sie die Hauptslider auf der Homepage
                            </p>
                        </div>
                        <button onclick="openAddSlideModal()" 
                                class="bg-gold hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                            <i class="fas fa-plus"></i>
                            Neue Folie hinzufügen
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Gesamt Folien</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${slides.length}</p>
                            </div>
                            <div class="bg-blue-100 p-4 rounded-lg">
                                <i class="fas fa-images text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Aktive Folien</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${slides.filter(s => s.is_active).length}</p>
                            </div>
                            <div class="bg-green-100 p-4 rounded-lg">
                                <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-gray-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Inaktive Folien</p>
                                <p class="text-3xl font-bold text-gray-900 mt-1">${slides.filter(s => !s.is_active).length}</p>
                            </div>
                            <div class="bg-gray-100 p-4 rounded-lg">
                                <i class="fas fa-eye-slash text-gray-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-gold">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-600 text-sm font-medium">Homepage Live</p>
                                <p class="text-lg font-bold text-gray-900 mt-1">✓ Online</p>
                            </div>
                            <div class="bg-yellow-100 p-4 rounded-lg">
                                <i class="fas fa-globe text-gold text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Slides Table -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <i class="fas fa-list text-gray-600"></i>
                            Alle Slider Folien
                        </h2>
                        <p class="text-sm text-gray-600 mt-1">
                            <i class="fas fa-info-circle mr-1"></i>
                            Ziehen Sie Folien, um die Reihenfolge zu ändern
                        </p>
                    </div>
                    
                    ${slides.length > 0 ? `
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reihenfolge</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Titel</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Beschreibung</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="slides-tbody" class="divide-y divide-gray-200">
                                ${slidesList}
                            </tbody>
                        </table>
                    </div>
                    ` : `
                    <div class="p-12 text-center">
                        <i class="fas fa-images text-gray-300 text-6xl mb-4"></i>
                        <p class="text-gray-500 text-lg">Keine Slider Folien vorhanden</p>
                        <button onclick="openAddSlideModal()" 
                                class="mt-4 bg-gold hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition-all">
                            Erste Folie erstellen
                        </button>
                    </div>
                    `}
                </div>

                <!-- Preview Button -->
                <div class="mt-6 flex justify-end">
                    <a href="/" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                        <i class="fas fa-external-link-alt"></i>
                        Homepage Vorschau
                    </a>
                </div>
            </div>
        </div>

        <!-- Edit/Add Slide Modal -->
        <div id="slideModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
                <div class="p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 class="text-2xl font-bold text-gray-900" id="modalTitle">Neue Folie hinzufügen</h2>
                </div>
                
                <form id="slideForm" class="p-6 space-y-6">
                    <input type="hidden" id="slideId" name="id" value="">
                    
                    <!-- Title -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Haupttitel *
                        </label>
                        <input type="text" id="slideTitle" name="title" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                               placeholder="z.B. Original Software Lizenzen">
                    </div>
                    
                    <!-- Subtitle -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Untertitel
                        </label>
                        <input type="text" id="slideSubtitle" name="subtitle"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                               placeholder="z.B. bis zu 70% günstiger">
                    </div>
                    
                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Beschreibung *
                        </label>
                        <textarea id="slideDescription" name="description" required rows="3"
                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                                  placeholder="Beschreibung der Folie..."></textarea>
                    </div>
                    
                    <!-- Button -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Button Text
                            </label>
                            <input type="text" id="slideButtonText" name="button_text"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                                   placeholder="z.B. Jetzt einkaufen">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Button Link
                            </label>
                            <input type="text" id="slideButtonLink" name="button_link"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                                   placeholder="/produkte">
                        </div>
                    </div>
                    
                    <!-- Background -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Hintergrund Bild URL
                            </label>
                            <input type="url" id="slideBackgroundImage" name="background_image"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                                   placeholder="https://...">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Hintergrund Farbe
                            </label>
                            <input type="color" id="slideBackgroundColor" name="background_color"
                                   value="#1a2a4e"
                                   class="w-full h-12 px-2 py-1 border border-gray-300 rounded-lg cursor-pointer">
                        </div>
                    </div>
                    
                    <!-- Text Color -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Text Farbe
                        </label>
                        <input type="color" id="slideTextColor" name="text_color"
                               value="#ffffff"
                               class="w-20 h-12 px-2 py-1 border border-gray-300 rounded-lg cursor-pointer">
                    </div>
                    
                    <!-- Status & Sort Order -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Status
                            </label>
                            <select id="slideIsActive" name="is_active"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                                <option value="1">Aktiv</option>
                                <option value="0">Inaktiv</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Reihenfolge
                            </label>
                            <input type="number" id="slideSortOrder" name="sort_order"
                                   value="${slides.length + 1}"
                                   min="1"
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                        </div>
                    </div>
                </form>
                
                <div class="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button onclick="closeSlideModal()" 
                            class="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Abbrechen
                    </button>
                    <button onclick="saveSlide()" 
                            class="px-6 py-3 bg-gold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all shadow-lg">
                        <i class="fas fa-save mr-2"></i>
                        Speichern
                    </button>
                </div>
            </div>
        </div>

        <script>
            // Modal Functions
            function openAddSlideModal() {
                document.getElementById('slideModal').classList.remove('hidden');
                document.getElementById('slideModal').classList.add('flex');
                document.getElementById('modalTitle').textContent = 'Neue Folie hinzufügen';
                document.getElementById('slideForm').reset();
                document.getElementById('slideId').value = '';
            }
            
            function closeSlideModal() {
                document.getElementById('slideModal').classList.add('hidden');
                document.getElementById('slideModal').classList.remove('flex');
            }
            
            async function editSlide(id) {
                try {
                    const response = await axios.get(\`/api/admin/homepage/slider/\${id}\`);
                    const slide = response.data;
                    
                    document.getElementById('modalTitle').textContent = 'Folie bearbeiten';
                    document.getElementById('slideId').value = slide.id;
                    document.getElementById('slideTitle').value = slide.title;
                    document.getElementById('slideSubtitle').value = slide.subtitle || '';
                    document.getElementById('slideDescription').value = slide.description;
                    document.getElementById('slideButtonText').value = slide.button_text || '';
                    document.getElementById('slideButtonLink').value = slide.button_link || '';
                    document.getElementById('slideBackgroundImage').value = slide.background_image || '';
                    document.getElementById('slideBackgroundColor').value = slide.background_color || '#1a2a4e';
                    document.getElementById('slideTextColor').value = slide.text_color || '#ffffff';
                    document.getElementById('slideIsActive').value = slide.is_active;
                    document.getElementById('slideSortOrder').value = slide.sort_order;
                    
                    openAddSlideModal();
                } catch (error) {
                    alert('Fehler beim Laden der Folie: ' + error.message);
                }
            }
            
            async function saveSlide() {
                const form = document.getElementById('slideForm');
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                const id = data.id;
                
                try {
                    if (id) {
                        await axios.put(\`/api/admin/homepage/slider/\${id}\`, data);
                    } else {
                        await axios.post('/api/admin/homepage/slider', data);
                    }
                    
                    alert('Folie erfolgreich gespeichert!');
                    location.reload();
                } catch (error) {
                    alert('Fehler beim Speichern: ' + error.message);
                }
            }
            
            async function toggleSlideStatus(id, currentStatus) {
                try {
                    await axios.patch(\`/api/admin/homepage/slider/\${id}/toggle\`, {
                        is_active: currentStatus ? 0 : 1
                    });
                    location.reload();
                } catch (error) {
                    alert('Fehler beim Ändern des Status: ' + error.message);
                }
            }
            
            async function deleteSlide(id) {
                if (!confirm('Möchten Sie diese Folie wirklich löschen?')) return;
                
                try {
                    await axios.delete(\`/api/admin/homepage/slider/\${id}\`);
                    alert('Folie gelöscht!');
                    location.reload();
                } catch (error) {
                    alert('Fehler beim Löschen: ' + error.message);
                }
            }
            
            // Close modal on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeSlideModal();
            });
            
            // Close modal on background click
            document.getElementById('slideModal').addEventListener('click', (e) => {
                if (e.target.id === 'slideModal') closeSlideModal();
            });
        </script>
    </body>
    </html>
  `
}