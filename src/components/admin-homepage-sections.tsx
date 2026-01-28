// Admin Homepage Sections Management Component
import type { FC } from 'hono/jsx'

export const AdminHomepageSections: FC = () => {
  return (
    <div>
      {/* Header */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Homepage Sections</h2>
          <p class="text-gray-600">Manage product sections displayed on homepage</p>
        </div>
        <button onclick="showAddSectionModal()" class="btn-gold">
          <i class="fas fa-plus mr-2"></i> Add New Section
        </button>
      </div>

      {/* Sections List */}
      <div class="admin-card">
        <table class="table" id="sections-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Title</th>
              <th>Type</th>
              <th>Layout</th>
              <th>Limit</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="7" class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
                <p class="text-gray-500">Loading sections...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add/Edit Section Modal */}
      <div id="section-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800" id="modal-title">Add New Section</h3>
          </div>
          
          <form id="section-form" class="p-6 space-y-4">
            <input type="hidden" id="section-id" />
            
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Section Key *
                </label>
                <input 
                  type="text" 
                  id="section-key" 
                  class="form-control" 
                  placeholder="e.g., featured_products"
                  required 
                />
                <p class="text-xs text-gray-500 mt-1">Unique identifier (lowercase, underscores only)</p>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Title (German) *
                </label>
                <input 
                  type="text" 
                  id="title-de" 
                  class="form-control" 
                  placeholder="e.g., Beliebte Produkte"
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
                  placeholder="e.g., Unsere meistverkauften Software-Lizenzen" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Section Type *
                </label>
                <select id="section-type" class="form-control" required>
                  <option value="featured">Featured Products</option>
                  <option value="bestsellers">Bestsellers</option>
                  <option value="new">New Products</option>
                  <option value="categories">Categories</option>
                  <option value="brands">Brands</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Layout
                </label>
                <select id="layout" class="form-control">
                  <option value="grid">Grid</option>
                  <option value="slider">Slider</option>
                  <option value="list">List</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Items Limit
                </label>
                <input 
                  type="number" 
                  id="limit-items" 
                  class="form-control" 
                  value="8" 
                  min="1" 
                  max="50" 
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input 
                  type="number" 
                  id="display-order" 
                  class="form-control" 
                  value="0" 
                  min="0" 
                />
              </div>

              <div class="col-span-2 flex items-center">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="is-active" 
                    class="form-checkbox h-5 w-5 text-blue-600" 
                    checked 
                  />
                  <span class="ml-2 text-sm font-medium text-gray-700">Active on Homepage</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button type="button" onclick="closeSectionModal()" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                <i class="fas fa-save mr-2"></i> Save Section
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Product Picker Modal */}
      <div id="product-picker-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-xl font-bold text-gray-800">Manage Section Products</h3>
            <p class="text-sm text-gray-600 mt-1" id="picker-section-title"></p>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6">
            <input type="hidden" id="picker-section-id" />
            
            {/* Search */}
            <div class="mb-4">
              <input 
                type="search" 
                id="product-search" 
                class="form-control" 
                placeholder="Search products..."
                onkeyup="searchProducts()"
              />
            </div>

            {/* Selected Products */}
            <div class="mb-6">
              <h4 class="font-semibold text-gray-700 mb-3">Selected Products (<span id="selected-count">0</span>)</h4>
              <div id="selected-products" class="space-y-2 min-h-[100px] bg-gray-50 rounded-lg p-4">
                <p class="text-gray-400 text-center py-8" id="no-selected">No products selected yet</p>
              </div>
            </div>

            {/* Available Products */}
            <div>
              <h4 class="font-semibold text-gray-700 mb-3">Available Products</h4>
              <div id="available-products" class="space-y-2">
                <p class="text-gray-400 text-center py-8">Loading products...</p>
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onclick="closeProductPicker()" class="btn-secondary">
              Cancel
            </button>
            <button type="button" onclick="saveSelectedProducts()" class="btn-primary">
              <i class="fas fa-save mr-2"></i> Save Products
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let sections = [];

        async function loadSections() {
          try {
            const response = await fetch('/api/admin/homepage-sections');
            const data = await response.json();
            
            if (data.success && data.data) {
              sections = data.data;
              renderSections();
            }
          } catch (error) {
            console.error('Error loading sections:', error);
          }
        }

        function renderSections() {
          const tbody = document.querySelector('#sections-table tbody');
          
          if (sections.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">No sections found.</td></tr>';
            return;
          }

          tbody.innerHTML = sections.map(section => \`
            <tr>
              <td>
                <input 
                  type="number" 
                  value="\${section.display_order}" 
                  class="form-control w-20" 
                  onchange="updateSectionOrder(\${section.id}, this.value)"
                />
              </td>
              <td>
                <div class="font-medium">\${section.title}</div>
                <div class="text-sm text-gray-500">\${section.subtitle || ''}</div>
              </td>
              <td>
                <span class="badge badge-info">\${section.section_type}</span>
              </td>
              <td>
                <span class="text-sm text-gray-600">\${section.layout}</span>
              </td>
              <td>
                <span class="text-sm text-gray-600">\${section.limit_items} items</span>
              </td>
              <td>
                <button 
                  onclick="openProductPicker(\${section.id}, '\${section.title}')" 
                  class="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  title="Manage Products"
                >
                  <i class="fas fa-cube"></i>
                  <span class="badge badge-info">\${section.product_count || 0}</span>
                </button>
              </td>
              <td>
                <span class="badge \${section.is_active ? 'badge-success' : 'badge-danger'}">
                  \${section.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <div class="flex gap-2">
                  <button 
                    onclick="editSection(\${section.id})" 
                    class="text-blue-600 hover:text-blue-700"
                    title="Edit"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    onclick="deleteSection(\${section.id})" 
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

        function showAddSectionModal() {
          document.getElementById('modal-title').textContent = 'Add New Section';
          document.getElementById('section-form').reset();
          document.getElementById('section-id').value = '';
          document.getElementById('section-modal').classList.remove('hidden');
        }

        function closeSectionModal() {
          document.getElementById('section-modal').classList.add('hidden');
        }

        async function editSection(id) {
          const section = sections.find(s => s.id === id);
          if (!section) return;

          document.getElementById('modal-title').textContent = 'Edit Section';
          document.getElementById('section-id').value = section.id;
          document.getElementById('section-key').value = section.section_key;
          document.getElementById('title-de').value = section.title;
          document.getElementById('subtitle-de').value = section.subtitle || '';
          document.getElementById('section-type').value = section.section_type;
          document.getElementById('layout').value = section.layout;
          document.getElementById('limit-items').value = section.limit_items;
          document.getElementById('display-order').value = section.display_order;
          document.getElementById('is-active').checked = section.is_active;
          
          document.getElementById('section-modal').classList.remove('hidden');
        }

        async function deleteSection(id) {
          if (!confirm('Are you sure you want to delete this section?')) return;

          try {
            const response = await fetch(\`/api/admin/homepage-sections/\${id}\`, {
              method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
              alert('Section deleted successfully!');
              loadSections();
            } else {
              alert('Error deleting section: ' + (data.error || 'Unknown error'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error deleting section');
          }
        }

        async function updateSectionOrder(id, order) {
          try {
            await fetch(\`/api/admin/homepage-sections/\${id}\`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ display_order: parseInt(order) })
            });
            loadSections();
          } catch (error) {
            console.error('Error updating order:', error);
          }
        }

        document.getElementById('section-form').addEventListener('submit', async (e) => {
          e.preventDefault();

          const sectionId = document.getElementById('section-id').value;
          const sectionData = {
            section_key: document.getElementById('section-key').value,
            title: document.getElementById('title-de').value,
            subtitle: document.getElementById('subtitle-de').value,
            section_type: document.getElementById('section-type').value,
            layout: document.getElementById('layout').value,
            limit_items: parseInt(document.getElementById('limit-items').value),
            display_order: parseInt(document.getElementById('display-order').value),
            is_active: document.getElementById('is-active').checked ? 1 : 0
          };

          try {
            const url = sectionId ? \`/api/admin/homepage-sections/\${sectionId}\` : '/api/admin/homepage-sections';
            const method = sectionId ? 'PUT' : 'POST';

            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(sectionData)
            });

            const data = await response.json();
            if (data.success) {
              alert(sectionId ? 'Section updated successfully!' : 'Section created successfully!');
              closeSectionModal();
              loadSections();
            } else {
              alert('Error saving section: ' + (data.error || 'Unknown error'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error saving section');
          }
        });

        // Product Picker Functions
        let allProducts = [];
        let selectedProducts = [];
        let currentSectionId = null;

        async function openProductPicker(sectionId, sectionTitle) {
          currentSectionId = sectionId;
          document.getElementById('picker-section-id').value = sectionId;
          document.getElementById('picker-section-title').textContent = 'Section: ' + sectionTitle;
          
          // Load all products
          await loadAllProducts();
          
          // Load selected products for this section
          await loadSectionProducts(sectionId);
          
          document.getElementById('product-picker-modal').classList.remove('hidden');
        }

        function closeProductPicker() {
          document.getElementById('product-picker-modal').classList.add('hidden');
          selectedProducts = [];
          allProducts = [];
        }

        async function loadAllProducts() {
          try {
            const response = await fetch('/api/products?limit=100');
            const data = await response.json();
            
            if (data.success && data.data) {
              allProducts = data.data;
              renderAvailableProducts();
            }
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }

        async function loadSectionProducts(sectionId) {
          try {
            const response = await fetch(\`/api/admin/homepage-sections/\${sectionId}/products\`);
            const data = await response.json();
            
            if (data.success && data.data) {
              selectedProducts = data.data;
              renderSelectedProducts();
              renderAvailableProducts();
            }
          } catch (error) {
            console.error('Error loading section products:', error);
            selectedProducts = [];
            renderSelectedProducts();
          }
        }

        function renderSelectedProducts() {
          const container = document.getElementById('selected-products');
          const countEl = document.getElementById('selected-count');
          const noSelected = document.getElementById('no-selected');
          
          countEl.textContent = selectedProducts.length;
          
          if (selectedProducts.length === 0) {
            noSelected.classList.remove('hidden');
            return;
          }
          
          noSelected.classList.add('hidden');
          
          container.innerHTML = selectedProducts.map(product => \`
            <div class="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
              <div class="flex items-center gap-3 flex-1">
                <img src="\${product.image_url || 'https://via.placeholder.com/40'}" 
                     class="w-10 h-10 object-cover rounded" />
                <div class="flex-1">
                  <div class="font-medium text-sm">\${product.name}</div>
                  <div class="text-xs text-gray-500">€\${(product.discount_price || product.base_price).toFixed(2)}</div>
                </div>
                <input 
                  type="number" 
                  value="\${product.sort_order || 0}" 
                  class="form-control w-16 text-sm" 
                  onchange="updateProductOrder(\${product.id}, this.value)"
                  placeholder="Order"
                />
              </div>
              <button 
                onclick="removeProduct(\${product.id})" 
                class="text-red-600 hover:text-red-700 ml-2"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          \`).join('');
        }

        function renderAvailableProducts() {
          const container = document.getElementById('available-products');
          const searchTerm = document.getElementById('product-search').value.toLowerCase();
          
          const selectedIds = selectedProducts.map(p => p.id);
          const available = allProducts.filter(p => {
            const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm);
            const notSelected = !selectedIds.includes(p.id);
            return matchesSearch && notSelected;
          });
          
          if (available.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-center py-8">No products found</p>';
            return;
          }
          
          container.innerHTML = available.map(product => \`
            <div class="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100 transition">
              <div class="flex items-center gap-3 flex-1">
                <img src="\${product.image_url || 'https://via.placeholder.com/40'}" 
                     class="w-10 h-10 object-cover rounded" />
                <div class="flex-1">
                  <div class="font-medium text-sm">\${product.name}</div>
                  <div class="text-xs text-gray-500">SKU: \${product.sku} • €\${(product.discount_price || product.base_price).toFixed(2)}</div>
                </div>
              </div>
              <button 
                onclick="addProduct(\${product.id})" 
                class="btn-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                <i class="fas fa-plus mr-1"></i> Add
              </button>
            </div>
          \`).join('');
        }

        function searchProducts() {
          renderAvailableProducts();
        }

        function addProduct(productId) {
          const product = allProducts.find(p => p.id === productId);
          if (product) {
            selectedProducts.push({
              ...product,
              sort_order: selectedProducts.length
            });
            renderSelectedProducts();
            renderAvailableProducts();
          }
        }

        function removeProduct(productId) {
          selectedProducts = selectedProducts.filter(p => p.id !== productId);
          renderSelectedProducts();
          renderAvailableProducts();
        }

        function updateProductOrder(productId, order) {
          const product = selectedProducts.find(p => p.id === productId);
          if (product) {
            product.sort_order = parseInt(order);
          }
        }

        async function saveSelectedProducts() {
          const sectionId = currentSectionId;
          const productIds = selectedProducts.map(p => ({
            product_id: p.id,
            sort_order: p.sort_order || 0
          }));

          try {
            const response = await fetch(\`/api/admin/homepage-sections/\${sectionId}/products\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ products: productIds })
            });

            const data = await response.json();
            if (data.success) {
              alert('Products saved successfully!');
              closeProductPicker();
              loadSections();
            } else {
              alert('Error saving products: ' + (data.error || 'Unknown error'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error saving products');
          }
        }

        // Load sections on page load
        loadSections();
      `}}>
      </script>
    </div>
  )
}
