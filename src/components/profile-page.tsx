import type { FC } from 'hono/jsx'

export const ProfilePage: FC = () => {
  return (
    <div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-primary mb-6">
          <i class="fas fa-user-edit mr-2 text-gold"></i>
          Profile Settings
        </h2>

        <form id="profile-form" class="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 class="text-lg font-bold text-primary mb-4">Personal Information</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  required 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Company</label>
                <input 
                  type="text" 
                  name="company" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div class="border-t pt-6">
            <h3 class="text-lg font-bold text-primary mb-4">Billing Address</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold mb-2">Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">City</label>
                <input 
                  type="text" 
                  name="city" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Postal Code</label>
                <input 
                  type="text" 
                  name="postalCode" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">Country</label>
                <select 
                  name="country" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                >
                  <option value="">Select Country</option>
                  <option value="DE">Germany</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-2">VAT Number</label>
                <input 
                  type="text" 
                  name="vatNumber" 
                  placeholder="DE123456789"
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div class="border-t pt-6">
            <h3 class="text-lg font-bold text-primary mb-4">Preferences</h3>
            <div class="space-y-3">
              <label class="flex items-center">
                <input type="checkbox" name="emailNotifications" class="mr-3" checked />
                <span>Receive email notifications about orders and updates</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" name="newsletter" class="mr-3" />
                <span>Subscribe to newsletter for special offers</span>
              </label>
              <div>
                <label class="block text-sm font-semibold mb-2">Language Preference</label>
                <select 
                  name="language" 
                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold max-w-xs"
                >
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div class="flex gap-4">
            <button 
              type="submit" 
              class="btn-gold px-8 py-3 rounded-lg"
            >
              <i class="fas fa-save mr-2"></i>Save Changes
            </button>
            <button 
              type="button" 
              onclick="history.back()"
              class="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 class="text-2xl font-bold text-primary mb-6">
          <i class="fas fa-lock mr-2 text-gold"></i>
          Change Password
        </h2>

        <form id="password-form" class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-semibold mb-2">Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              required 
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              required 
              minlength="8"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              minlength="8"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold"
            />
          </div>
          <button 
            type="submit" 
            class="btn-gold px-8 py-3 rounded-lg"
          >
            <i class="fas fa-key mr-2"></i>Update Password
          </button>
        </form>
      </div>

      <script>{`
        // Load user profile data
        async function loadProfile() {
          const token = localStorage.getItem('auth_token');
          if (!token) {
            window.location.href = '/login?redirect=/account/profile';
            return;
          }

          try {
            const response = await fetch('/api/account/profile', {
              headers: { 'Authorization': 'Bearer ' + token }
            });

            if (response.ok) {
              const result = await response.json();
              if (result.success) {
                populateForm(result.data);
              }
            }
          } catch (error) {
            console.error('Error loading profile:', error);
          }
        }

        function populateForm(data) {
          const form = document.getElementById('profile-form');
          form.firstName.value = data.first_name || '';
          form.lastName.value = data.last_name || '';
          form.email.value = data.email || '';
          form.phone.value = data.phone || '';
          form.company.value = data.company || '';
          form.address.value = data.address || '';
          form.city.value = data.city || '';
          form.postalCode.value = data.postal_code || '';
          form.country.value = data.country || '';
          form.vatNumber.value = data.vat_number || '';
          form.emailNotifications.checked = data.email_notifications !== false;
          form.newsletter.checked = data.newsletter || false;
          form.language.value = data.language_preference || 'en';
        }

        // Handle profile form submission
        document.getElementById('profile-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const token = localStorage.getItem('auth_token');
          const formData = new FormData(e.target);
          
          const data = {
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            address: formData.get('address'),
            city: formData.get('city'),
            postal_code: formData.get('postalCode'),
            country: formData.get('country'),
            vat_number: formData.get('vatNumber'),
            email_notifications: formData.get('emailNotifications') === 'on',
            newsletter: formData.get('newsletter') === 'on',
            language_preference: formData.get('language')
          };

          try {
            const response = await fetch('/api/account/profile', {
              method: 'PUT',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
              alert('Profile updated successfully!');
            } else {
              alert('Failed to update profile: ' + result.error);
            }
          } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again.');
          }
        });

        // Handle password form submission
        document.getElementById('password-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          
          if (formData.get('newPassword') !== formData.get('confirmPassword')) {
            alert('New passwords do not match!');
            return;
          }

          const token = localStorage.getItem('auth_token');
          
          try {
            const response = await fetch('/api/account/password', {
              method: 'PUT',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                current_password: formData.get('currentPassword'),
                new_password: formData.get('newPassword')
              })
            });

            const result = await response.json();
            
            if (result.success) {
              alert('Password updated successfully!');
              e.target.reset();
            } else {
              alert('Failed to update password: ' + result.error);
            }
          } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred. Please try again.');
          }
        });

        // Initialize
        loadProfile();
      `}</script>
    </div>
  )
}
