// Admin Slider Management Component
import type { FC } from 'hono/jsx'

export const AdminSliders: FC = () => {
  return (
    <div>
      {/* Header */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Hero Sliders</h2>
          <p class="text-gray-600">Manage homepage hero banners and sliders</p>
        </div>
        <button onclick="showAddSliderModal()" class="btn-gold">
          <i class="fas fa-plus mr-2"></i> Add New Slider
        </button>
      </div>

      {/* Sliders List */}
      <div class="admin-card">
        <table class="table" id="sliders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Preview</th>
              <th>Title</th>
              <th>Button</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
                <p class="text-gray-500">Loading sliders...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add/Edit Slider Modal */}
      <div id="slider-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800" id="modal-title">Add New Slider</h3>
          </div>
          
          <form id="slider-form" class="p-6 space-y-4">
            <input type="hidden" id="slider-id" />
            
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Title (German) *
                </label>
                <input 
                  type="text" 
                  id="title-de" 
                  class="form-control" 
                  placeholder="e.g., Original Software Lizenzen"
                  required 
                />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle (German)
                </label>
                <input 
                  type="text" 
                  id="subtitle-de" 
                  class="form-control" 
                  placeholder="e.g., Günstig, Legal & Sofort verfügbar" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Button Text (German)
                </label>
                <input 
                  type="text" 
                  id="button-text-de" 
                  class="form-control" 
                  placeholder="e.g., Jetzt entdecken" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input 
                  type="text" 
                  id="button-link" 
                  class="form-control" 
                  placeholder="e.g., /produkte" 
                />
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input 
                  type="url" 
                  id="image-url" 
                  class="form-control" 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input 
                  type="color" 
                  id="background-color" 
                  class="form-control h-12" 
                  value="#1a2a4e" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <input 
                  type="color" 
                  id="text-color" 
                  class="form-control h-12" 
                  value="#ffffff" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order
                </label>
                <input 
                  type="number" 
                  id="sort-order" 
                  class="form-control" 
                  value="0" 
                  min="0" 
                />
              </div>

              <div class="flex items-center">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="is-active" 
                    class="form-checkbox h-5 w-5 text-blue-600" 
                    checked 
                  />
                  <span class="ml-2 text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button type="button" onclick="closeSliderModal()" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                <i class="fas fa-save mr-2"></i> Save Slider
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let sliders = [];

        async function loadSliders() {
          try {
            const response = await fetch('/api/admin/sliders');
            const data = await response.json();
            
            if (data.success && data.data) {
              sliders = data.data;
              renderSliders();
            }
          } catch (error) {
            console.error('Error loading sliders:', error);
          }
        }

        function renderSliders() {
          const tbody = document.querySelector('#sliders-table tbody');
          
          if (sliders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No sliders found. Click "Add New Slider" to create one.</td></tr>';
            return;
          }

          tbody.innerHTML = sliders.map(slider => \`
            <tr>
              <td>
                <input 
                  type="number" 
                  value="\${slider.sort_order}" 
                  class="form-control w-20" 
                  onchange="updateSliderOrder(\${slider.id}, this.value)"
                />
              </td>
              <td>
                <div class="w-24 h-16 rounded overflow-hidden" style="background-color: \${slider.background_color}">
                  \${slider.image_url ? \`<img src="\${slider.image_url}" alt="\${slider.title || 'Slider image'}" class="w-full h-full object-cover" />\` : ''}
                </div>
              </td>
              <td>
                <div class="font-medium">\${slider.title}</div>
                <div class="text-sm text-gray-500">\${slider.subtitle || ''}</div>
              </td>
              <td>
                \${slider.button_text ? \`
                  <span class="badge badge-info">\${slider.button_text}</span>
                  <div class="text-xs text-gray-500">\${slider.button_link || ''}</div>
                \` : '-'}
              </td>
              <td>
                <span class="badge \${slider.is_active ? 'badge-success' : 'badge-danger'}">
                  \${slider.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <div class="flex gap-2">
                  <button 
                    onclick="editSlider(\${slider.id})" 
                    class="text-blue-600 hover:text-blue-700"
                    title="Edit"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    onclick="deleteSlider(\${slider.id})" 
                    class="text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`).join('');
        }

        function showAddSliderModal() {
          document.getElementById('modal-title').textContent = 'Add New Slider';
          document.getElementById('slider-form').reset();
          document.getElementById('slider-id').value = '';
          document.getElementById('slider-modal').classList.remove('hidden');
        }

        function closeSliderModal() {
          document.getElementById('slider-modal').classList.add('hidden');
        }

        async function editSlider(id) {
          const slider = sliders.find(s => s.id === id);
          if (!slider) return;

          document.getElementById('modal-title').textContent = 'Edit Slider';
          document.getElementById('slider-id').value = slider.id;
          document.getElementById('title-de').value = slider.title;
          document.getElementById('subtitle-de').value = slider.subtitle || '';
          document.getElementById('button-text-de').value = slider.button_text || '';
          document.getElementById('button-link').value = slider.button_link || '';
          document.getElementById('image-url').value = slider.image_url || '';
          document.getElementById('background-color').value = slider.background_color || '#1a2a4e';
          document.getElementById('text-color').value = slider.text_color || '#ffffff';
          document.getElementById('sort-order').value = slider.sort_order || 0;
          document.getElementById('is-active').checked = slider.is_active;
          
          document.getElementById('slider-modal').classList.remove('hidden');
        }

        async function deleteSlider(id) {
          if (!confirm('Are you sure you want to delete this slider?')) return;

          try {
            const response = await fetch(\`/api/admin/sliders/\${id}\`, {
              method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
              alert('Slider deleted successfully!');
              loadSliders();
            } else {
              alert('Error deleting slider: ' + (data.error || 'Unknown error'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error deleting slider');
          }
        }

        async function updateSliderOrder(id, order) {
          try {
            await fetch(\`/api/admin/sliders/\${id}\`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sort_order: parseInt(order) })
            });
            loadSliders();
          } catch (error) {
            console.error('Error updating order:', error);
          }
        }

        document.getElementById('slider-form').addEventListener('submit', async (e) => {
          e.preventDefault();

          const sliderId = document.getElementById('slider-id').value;
          const sliderData = {
            title: document.getElementById('title-de').value,
            subtitle: document.getElementById('subtitle-de').value,
            button_text: document.getElementById('button-text-de').value,
            button_link: document.getElementById('button-link').value,
            image_url: document.getElementById('image-url').value,
            background_color: document.getElementById('background-color').value,
            text_color: document.getElementById('text-color').value,
            sort_order: parseInt(document.getElementById('sort-order').value),
            is_active: document.getElementById('is-active').checked ? 1 : 0
          };

          try {
            const url = sliderId ? \`/api/admin/sliders/\${sliderId}\` : '/api/admin/sliders';
            const method = sliderId ? 'PUT' : 'POST';

            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sliderData)
            });

            const data = await response.json();
            if (data.success) {
              alert(sliderId ? 'Slider updated successfully!' : 'Slider created successfully!');
              closeSliderModal();
              loadSliders();
            } else {
              alert('Error saving slider: ' + (data.error || 'Unknown error'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error saving slider');
          }
        });

        // Load sliders on page load
        loadSliders();
      `}}>
      </script>
    </div>
  )
}
