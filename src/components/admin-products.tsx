// Admin Products Management Component
import type { FC } from 'hono/jsx'

export const AdminProducts: FC = () => {
  return (
    <div>
      {/* Header Actions */}
      <div class="flex items-center justify-between mb-6">
        <div>
          <input 
            type="search" 
            placeholder="Search products..." 
            class="form-control w-80"
            id="search-products"
          />
        </div>
        <div class="flex gap-3">
          <button class="btn-primary">
            <i class="fas fa-filter mr-2"></i> Filter
          </button>
          <a href="/admin/products/add" class="btn-gold">
            <i class="fas fa-plus mr-2"></i> Add New Product
          </a>
        </div>
      </div>
      
      {/* Products Table */}
      <div class="admin-card">
        <table class="table" id="products-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="8" class="text-center py-8">
                <i class="fas fa-spinner fa-spin text-3xl text-gray-400 mb-3"></i>
                <p class="text-gray-500">Loading products...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        async function loadProducts() {
          try {
            const response = await fetch('/api/products/featured?limit=100');
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
              const tbody = document.querySelector('#products-table tbody');
              tbody.innerHTML = data.data.map(product => \`
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="\${product.image_url || 'https://via.placeholder.com/50'}" 
                           alt="\${product.name}" 
                           class="w-12 h-12 object-cover rounded" />
                      <div>
                        <div class="font-medium">\${product.name}</div>
                        <div class="text-sm text-gray-500">\${product.short_description || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td>\${product.sku}</td>
                  <td>
                    <span class="badge badge-info">\${product.category_name || 'Uncategorized'}</span>
                  </td>
                  <td>
                    <div class="font-medium">€\${(product.discount_price || product.base_price).toFixed(2)}</div>
                    \${product.discount_price ? \`<div class="text-sm text-gray-400 line-through">€\${product.base_price.toFixed(2)}</div>\` : ''}
                  </td>
                  <td>
                    <span class="badge badge-success">
                      \${product.stock_type === 'unlimited' ? 'Unlimited' : product.available_licenses + ' keys'}
                    </span>
                  </td>
                  <td>
                    <span class="badge \${product.is_active ? 'badge-success' : 'badge-danger'}">
                      \${product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <a href="/admin/products/edit/\${product.id}" 
                         class="text-blue-600 hover:text-blue-700">
                        <i class="fas fa-edit"></i>
                      </a>
                      <button onclick="deleteProduct(\${product.id})" 
                              class="text-red-600 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              \`).join('');
            } else {
              document.querySelector('#products-table tbody').innerHTML = \`
                <tr>
                  <td colspan="8" class="text-center py-8">
                    <p class="text-gray-500">No products found</p>
                    <a href="/admin/products/add" class="btn-gold mt-4 inline-block">
                      <i class="fas fa-plus mr-2"></i> Add Your First Product
                    </a>
                  </td>
                </tr>
              \`;
            }
          } catch (error) {
            console.error('Error loading products:', error);
          }
        }
        
        function deleteProduct(id) {
          if (confirm('Are you sure you want to delete this product?')) {
            // Delete logic here
            console.log('Delete product:', id);
          }
        }
        
        document.addEventListener('DOMContentLoaded', loadProducts);
      `}} />
    </div>
  )
}

// Add/Edit Product Form Component
export const AdminProductForm: FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  return (
    <form id="product-form">
      <div class="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div class="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Basic Information</h3>
            
            <div class="form-group">
              <label class="form-label">Product Name (English)*</label>
              <input type="text" class="form-control" name="name_en" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">Product Name (German)*</label>
              <input type="text" class="form-control" name="name_de" required />
            </div>
            
            <div class="form-group">
              <label class="form-label">SKU*</label>
              <input type="text" class="form-control" name="sku" required />
              <small class="text-gray-500">Unique product identifier</small>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Base Price (€)*</label>
                <input type="number" class="form-control" name="base_price" step="0.01" required />
              </div>
              
              <div class="form-group">
                <label class="form-label">Discount Price (€)</label>
                <input type="number" class="form-control" name="discount_price" step="0.01" />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Product Description</h3>
            
            <div class="form-group">
              <label class="form-label">Short Description (English)*</label>
              <textarea class="form-control" name="short_description_en" rows={3} required></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Short Description (German)*</label>
              <textarea class="form-control" name="short_description_de" rows={3} required></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Long Description (English)</label>
              <textarea class="form-control" name="long_description_en" rows={8}></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Long Description (German)</label>
              <textarea class="form-control" name="long_description_de" rows={8}></textarea>
            </div>
          </div>
          
          {/* Features */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Product Features</h3>
            
            <div class="form-group">
              <label class="form-label">Features (English) - One per line</label>
              <textarea class="form-control" name="features_en" rows={6} placeholder="Enhanced Security&#10;Remote Desktop&#10;Lifetime License"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Features (German) - One per line</label>
              <textarea class="form-control" name="features_de" rows={6}></textarea>
            </div>
          </div>
          
          {/* SEO */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">SEO Settings</h3>
            
            <div class="form-group">
              <label class="form-label">URL Slug*</label>
              <input type="text" class="form-control" name="slug" required />
              <small class="text-gray-500">URL-friendly version of the name</small>
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Title (English)</label>
              <input type="text" class="form-control" name="meta_title_en" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Meta Description (English)</label>
              <textarea class="form-control" name="meta_description_en" rows={3}></textarea>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div class="space-y-6">
          {/* Publish */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Publish</h3>
            
            <div class="form-group">
              <label class="form-label">Status</label>
              <select class="form-control" name="is_active">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            
            <div class="flex gap-2">
              <button type="submit" class="btn-gold flex-1">
                <i class="fas fa-save mr-2"></i>
                {isEdit ? 'Update' : 'Publish'}
              </button>
              <button type="button" class="btn-primary">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          
          {/* Category */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Category & Brand</h3>
            
            <div class="form-group">
              <label class="form-label">Category*</label>
              <select class="form-control" name="category_id" required>
                <option value="">Select Category</option>
                <option value="1">Windows</option>
                <option value="2">Office</option>
                <option value="3">Server</option>
                <option value="4">Antivirus</option>
                <option value="5">Games</option>
                <option value="6">Design</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Brand</label>
              <select class="form-control" name="brand_id">
                <option value="">Select Brand</option>
                <option value="1">Microsoft</option>
                <option value="2">Adobe</option>
                <option value="3">Kaspersky</option>
                <option value="4">Norton</option>
                <option value="5">Autodesk</option>
              </select>
            </div>
          </div>
          
          {/* License Settings */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">License Settings</h3>
            
            <div class="form-group">
              <label class="form-label">License Type*</label>
              <select class="form-control" name="license_type" required>
                <option value="perpetual">Perpetual</option>
                <option value="subscription">Subscription</option>
                <option value="trial">Trial</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">License Duration</label>
              <input type="text" class="form-control" name="license_duration" placeholder="lifetime, 1-year, etc." />
            </div>
            
            <div class="form-group">
              <label class="form-label">Activation Limit</label>
              <input type="number" class="form-control" name="activation_limit" value="1" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Stock Type*</label>
              <select class="form-control" name="stock_type" required>
                <option value="unlimited">Unlimited</option>
                <option value="limited">Limited</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
          
          {/* Product Image */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Product Image</h3>
            
            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="url" class="form-control" name="image_url" placeholder="https://..." />
            </div>
            
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
              <p class="text-sm text-gray-500">Click to upload or drag image here</p>
            </div>
          </div>
          
          {/* Featured Settings */}
          <div class="admin-card">
            <h3 class="text-lg font-bold mb-4">Display Settings</h3>
            
            <div class="flex items-center gap-2 mb-3">
              <input type="checkbox" name="is_featured" value="1" id="is_featured" />
              <label for="is_featured" class="font-medium">Featured Product</label>
            </div>
            
            <div class="flex items-center gap-2 mb-3">
              <input type="checkbox" name="is_bestseller" value="1" id="is_bestseller" />
              <label for="is_bestseller" class="font-medium">Bestseller</label>
            </div>
            
            <div class="flex items-center gap-2">
              <input type="checkbox" name="is_new" value="1" id="is_new" />
              <label for="is_new" class="font-medium">New Arrival</label>
            </div>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('product-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          
          // Convert features to JSON array
          if (data.features_en) {
            data.features_en = JSON.stringify(data.features_en.split('\\n').filter(f => f.trim()));
          }
          if (data.features_de) {
            data.features_de = JSON.stringify(data.features_de.split('\\n').filter(f => f.trim()));
          }
          
          try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert('Product saved successfully!');
              window.location.href = '/admin/products';
            } else {
              alert('Error: ' + result.error);
            }
          } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
          }
        });
        
        // Auto-generate slug from name
        document.querySelector('[name="name_en"]').addEventListener('input', function(e) {
          const slug = e.target.value
            .toLowerCase()
            .replace(/[^\\w\\s-]/g, '')
            .replace(/[\\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          document.querySelector('[name="slug"]').value = slug;
        });
      `}} />
    </form>
  )
}
