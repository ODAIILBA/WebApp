import type { FC } from 'hono/jsx'

export const AdminFAQ: FC = () => {
  return (
    <div class="admin-faq">
      <div class="admin-header">
        <h2><i class="fas fa-question-circle"></i> FAQ Management</h2>
        <button class="btn-primary" onclick="openAddModal()">
          <i class="fas fa-plus"></i> Neue FAQ
        </button>
      </div>

      {/* Categories Filter */}
      <div class="admin-card">
        <select id="category-filter" class="form-control" style="width: 300px;" onchange="loadFAQs()">
          <option value="">Alle Kategorien</option>
        </select>
      </div>

      {/* FAQ List */}
      <div id="faq-list" class="faq-list">
        <div style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i> Lade FAQs...</div>
      </div>

      {/* Add/Edit Modal */}
      <div id="faq-modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-plus"></i> <span id="modal-title">Neue FAQ</span></h3>
            <button class="modal-close" onclick="closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <form id="faq-form">
              <input type="hidden" id="faq-id" />
              <div class="form-group">
                <label>Kategorie *</label>
                <select id="faq-category" class="form-control" required></select>
              </div>
              <div class="form-group">
                <label>Frage *</label>
                <input type="text" id="faq-question" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Antwort *</label>
                <textarea id="faq-answer" class="form-control" rows="6" required></textarea>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" id="faq-published" checked />
                  Veröffentlicht
                </label>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn-secondary" onclick="closeModal()">Abbrechen</button>
                <button type="submit" class="btn-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .admin-faq { padding: 20px; }
        .faq-list { display: flex; flex-direction: column; gap: 15px; }
        .faq-item { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .faq-header { padding: 20px; display: flex; justify-content: space-between; align-items: start; border-bottom: 1px solid #f3f4f6; }
        .faq-question { font-size: 18px; font-weight: 600; color: #1a2a4e; flex: 1; }
        .faq-category { display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #4338ca; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 10px; }
        .faq-answer { padding: 20px; color: #666; line-height: 1.6; }
        .faq-stats { display: flex; gap: 20px; margin-top: 10px; font-size: 14px; color: #999; }
        .faq-actions { display: flex; gap: 10px; }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let faqsData = [];
        let categoriesData = [];

        async function loadCategories() {
          try {
            const response = await fetch('/api/faq/categories');
            const data = await response.json();
            if (data.success) {
              categoriesData = data.categories;
              const filterSelect = document.getElementById('category-filter');
              const formSelect = document.getElementById('faq-category');
              
              categoriesData.forEach(c => {
                filterSelect.innerHTML += \`<option value="\${c.id}">\${c.name}</option>\`;
                formSelect.innerHTML += \`<option value="\${c.id}">\${c.name}</option>\`;
              });
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        async function loadFAQs() {
          try {
            const categoryId = document.getElementById('category-filter').value;
            const url = categoryId ? \`/api/faq/items?category_id=\${categoryId}\` : '/api/faq/items';
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
              faqsData = data.items;
              renderFAQs();
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        function renderFAQs() {
          const list = document.getElementById('faq-list');
          if (faqsData.length === 0) {
            list.innerHTML = '<div style="text-align: center; padding: 40px;">Keine FAQs vorhanden</div>';
            return;
          }
          
          list.innerHTML = faqsData.map(faq => \`
            <div class="faq-item">
              <div class="faq-header">
                <div style="flex: 1;">
                  <div class="faq-category">\${faq.category_name}</div>
                  <div class="faq-question">\${faq.question}</div>
                  <div class="faq-stats">
                    <span><i class="fas fa-eye"></i> \${faq.views} Aufrufe</span>
                    <span><i class="fas fa-thumbs-up"></i> \${faq.helpful_yes}</span>
                    <span><i class="fas fa-thumbs-down"></i> \${faq.helpful_no}</span>
                  </div>
                </div>
                <div class="faq-actions">
                  <button class="action-btn btn-edit" onclick="editFAQ(\${faq.id})" title="Bearbeiten">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn btn-delete" onclick="deleteFAQ(\${faq.id})" title="Löschen">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="faq-answer">\${faq.answer}</div>
            </div>
          \`).join('');
        }

        function openAddModal() {
          document.getElementById('modal-title').textContent = 'Neue FAQ';
          document.getElementById('faq-form').reset();
          document.getElementById('faq-id').value = '';
          document.getElementById('faq-modal').style.display = 'block';
        }

        function closeModal() {
          document.getElementById('faq-modal').style.display = 'none';
        }

        function editFAQ(id) {
          const faq = faqsData.find(f => f.id === id);
          if (!faq) return;
          
          document.getElementById('modal-title').textContent = 'FAQ bearbeiten';
          document.getElementById('faq-id').value = faq.id;
          document.getElementById('faq-category').value = faq.category_id;
          document.getElementById('faq-question').value = faq.question;
          document.getElementById('faq-answer').value = faq.answer;
          document.getElementById('faq-published').checked = faq.is_published === 1;
          document.getElementById('faq-modal').style.display = 'block';
        }

        document.getElementById('faq-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const id = document.getElementById('faq-id').value;
          const data = {
            category_id: parseInt(document.getElementById('faq-category').value),
            question: document.getElementById('faq-question').value,
            answer: document.getElementById('faq-answer').value,
            is_published: document.getElementById('faq-published').checked,
            sort_order: 0
          };
          
          try {
            const url = id ? \`/api/faq/items/\${id}\` : '/api/faq/items';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
              alert(id ? 'FAQ aktualisiert' : 'FAQ erstellt');
              closeModal();
              loadFAQs();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Speichern');
          }
        });

        async function deleteFAQ(id) {
          if (!confirm('FAQ wirklich löschen?')) return;
          
          try {
            const response = await fetch(\`/api/faq/items/\${id}\`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
              alert('FAQ gelöscht');
              loadFAQs();
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Fehler beim Löschen');
          }
        }

        loadCategories().then(() => loadFAQs());
      ` }} ></script>
    </div>
  )
}
