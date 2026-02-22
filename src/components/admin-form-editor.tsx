// Admin Form Editor Module - Visual form builder for custom forms
import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminFormEditor() {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Form Editor - Admin</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .admin-content { margin-left: 280px; min-height: 100vh; padding: 2rem; background: #f5f7fa; }
        body.sidebar-collapsed .admin-content { margin-left: 60px; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .form-canvas { min-height: 400px; border: 2px dashed #d1d5db; border-radius: 8px; padding: 2rem; background: white; }
        .form-element { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; cursor: move; }
        .form-element:hover { border-color: #1a2a4e; }
        .toolbox { background: white; border-radius: 12px; padding: 1rem; }
        .tool-item { padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer; text-align: center; }
        .tool-item:hover { background: #f3f4f6; border-color: #1a2a4e; }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced('/admin/form-editor')}
      
      <div class="admin-content">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-edit mr-3 text-purple-600"></i>
            Form Builder
          </h1>
          <p class="text-gray-600">Create custom forms with drag-and-drop visual editor</p>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <!-- Toolbox -->
          <div class="col-span-1">
            <div class="toolbox sticky top-4">
              <h3 class="font-bold text-gray-800 mb-3">Form Elements</h3>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-font text-blue-600"></i>
                <div class="text-sm font-semibold mt-1">Text Input</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-envelope text-green-600"></i>
                <div class="text-sm font-semibold mt-1">Email</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-list text-yellow-600"></i>
                <div class="text-sm font-semibold mt-1">Dropdown</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-check-square text-indigo-600"></i>
                <div class="text-sm font-semibold mt-1">Checkbox</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-circle text-pink-600"></i>
                <div class="text-sm font-semibold mt-1">Radio</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-align-left text-gray-600"></i>
                <div class="text-sm font-semibold mt-1">Textarea</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-calendar text-red-600"></i>
                <div class="text-sm font-semibold mt-1">Date Picker</div>
              </div>
              
              <div class="tool-item" draggable="true">
                <i class="fas fa-upload text-purple-600"></i>
                <div class="text-sm font-semibold mt-1">File Upload</div>
              </div>
            </div>
          </div>

          <!-- Form Canvas -->
          <div class="col-span-3">
            <div class="card">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Form Canvas</h2>
                <div class="flex gap-2">
                  <button class="px-4 py-2 bg-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-300">
                    <i class="fas fa-eye mr-1"></i> Preview
                  </button>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                    <i class="fas fa-save mr-1"></i> Save Form
                  </button>
                </div>
              </div>

              <div class="form-canvas" id="form-canvas">
                <div class="text-center text-gray-400 py-12">
                  <i class="fas fa-mouse-pointer text-5xl mb-4"></i>
                  <p class="text-lg">Drag form elements here to build your custom form</p>
                </div>
              </div>
            </div>

            <!-- Form Settings -->
            <div class="card">
              <h3 class="font-bold text-gray-800 mb-4">
                <i class="fas fa-cog mr-2"></i>
                Form Settings
              </h3>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Form Name</label>
                  <input type="text" placeholder="Contact Form" class="w-full px-4 py-2 border rounded-lg">
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Submit Button Text</label>
                  <input type="text" placeholder="Submit" class="w-full px-4 py-2 border rounded-lg">
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Success Message</label>
                  <textarea placeholder="Thank you for your submission!" class="w-full px-4 py-2 border rounded-lg" rows="2"></textarea>
                </div>
                
                <div>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2">
                    <span class="text-sm font-semibold text-gray-700">Email notifications</span>
                  </label>
                </div>
                
                <div>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2">
                    <span class="text-sm font-semibold text-gray-700">Save to database</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Add drag and drop functionality placeholder
        console.log('Form Editor: Drag & drop functionality would be implemented here');
      </script>
    </body>
    </html>
  `
}
