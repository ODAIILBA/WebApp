import { html } from 'hono/html'

export function AdminLiveChat() {
  return html`<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Live Chat - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
        :root { --navy-dark: #1a2a4e; --gold: #d4af37; }
        .chat-msg { animation: slideIn 0.3s; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-80 bg-white border-r flex flex-col">
            <div class="p-4 bg-gradient-to-r from-navy-dark to-blue-900 text-white">
                <h1 class="text-xl font-bold"><i class="fas fa-comments mr-2"></i>Live Chat</h1>
                <p class="text-sm text-gray-300">Support Dashboard</p>
            </div>
            
            <div class="p-4">
                <div class="flex gap-2 mb-4">
                    <button onclick="filterSessions('all')" class="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm">Alle</button>
                    <button onclick="filterSessions('active')" class="flex-1 px-3 py-2 bg-green-500 text-white rounded text-sm">Aktiv</button>
                    <button onclick="filterSessions('waiting')" class="flex-1 px-3 py-2 bg-yellow-500 text-white rounded text-sm">Wartend</button>
                </div>
            </div>
            
            <div id="sessions-list" class="flex-1 overflow-y-auto p-4 space-y-2">
                <div class="text-center text-gray-500 py-8">
                    <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                    <p>Lade Chats...</p>
                </div>
            </div>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 flex flex-col">
            <div id="chat-header" class="hidden p-4 bg-white border-b flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div>
                        <h2 id="chat-user-name" class="font-bold text-lg"></h2>
                        <p id="chat-user-email" class="text-sm text-gray-500"></p>
                    </div>
                </div>
                <button onclick="closeChat()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <i class="fas fa-times mr-2"></i>Chat schließen
                </button>
            </div>
            
            <div id="chat-messages" class="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div class="flex items-center justify-center h-full text-gray-400">
                    <div class="text-center">
                        <i class="fas fa-comments text-5xl mb-4"></i>
                        <p class="text-lg">Wählen Sie einen Chat aus der Liste</p>
                    </div>
                </div>
            </div>
            
            <div id="chat-input-area" class="hidden p-4 bg-white border-t">
                <div class="flex gap-2">
                    <input type="text" id="admin-message-input" placeholder="Nachricht eingeben..." 
                           class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
                    <button onclick="sendAdminMessage()" class="px-6 py-2 bg-gold text-white font-bold rounded-lg hover:bg-yellow-600">
                        <i class="fas fa-paper-plane mr-2"></i>Senden
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentSessionId = null;
        let sessionsData = [];
        let currentFilter = 'all';
        let pollingInterval = null;

        // Load sessions
        async function loadSessions() {
            try {
                const response = await axios.get('/api/admin/chat/sessions');
                if (response.data.success) {
                    sessionsData = response.data.sessions;
                    renderSessions();
                }
            } catch (error) {
                console.error('Load sessions error:', error);
            }
        }

        // Render sessions
        function renderSessions() {
            const container = document.getElementById('sessions-list');
            const filtered = sessionsData.filter(s => 
                currentFilter === 'all' || s.status === currentFilter
            );

            if (filtered.length === 0) {
                container.innerHTML = '<div class="text-center text-gray-500 py-8"><p>Keine Chats</p></div>';
                return;
            }

            container.innerHTML = filtered.map(session => \`
                <div onclick="openChat('\${session.session_id}')" 
                     class="p-3 bg-white border rounded-lg cursor-pointer hover:bg-gray-50 \${currentSessionId === session.session_id ? 'ring-2 ring-gold' : ''}">
                    <div class="flex items-center justify-between mb-1">
                        <span class="font-bold text-sm">\${session.user_name || 'Unbekannt'}</span>
                        <span class="text-xs px-2 py-1 rounded \${
                            session.status === 'active' ? 'bg-green-100 text-green-700' :
                            session.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }">\${session.status}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">\${session.user_email || ''}</p>
                    \${session.last_message ? \`<p class="text-xs text-gray-600 mt-1 truncate">\${session.last_message}</p>\` : ''}
                    \${session.unread_count > 0 ? \`<span class="inline-block mt-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">\${session.unread_count} neu</span>\` : ''}
                </div>
            \`).join('');
        }

        // Open chat
        async function openChat(sessionId) {
            currentSessionId = sessionId;
            const session = sessionsData.find(s => s.session_id === sessionId);
            
            document.getElementById('chat-header').classList.remove('hidden');
            document.getElementById('chat-input-area').classList.remove('hidden');
            document.getElementById('chat-user-name').textContent = session.user_name || 'Unbekannt';
            document.getElementById('chat-user-email').textContent = session.user_email || '';
            
            await loadMessages();
            renderSessions();
            startPolling();
        }

        // Load messages
        async function loadMessages() {
            if (!currentSessionId) return;

            try {
                const response = await axios.get(\`/api/chat/messages?session_id=\${currentSessionId}\`);
                if (response.data.success) {
                    const container = document.getElementById('chat-messages');
                    container.innerHTML = response.data.messages.map(msg => \`
                        <div class="flex \${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'} mb-4 chat-msg">
                            <div class="\${msg.sender_type === 'admin' ? 'bg-gold text-white' : 'bg-white border'} max-w-[70%] rounded-lg p-4 shadow">
                                <p class="text-xs font-bold mb-1 \${msg.sender_type === 'admin' ? 'text-gray-100' : 'text-gray-600'}">\${msg.sender_name}</p>
                                <p class="text-sm">\${msg.message}</p>
                                <p class="text-xs mt-1 \${msg.sender_type === 'admin' ? 'text-gray-200' : 'text-gray-400'}">\${new Date(msg.created_at).toLocaleTimeString('de-DE')}</p>
                            </div>
                        </div>
                    \`).join('');
                    container.scrollTop = container.scrollHeight;
                }
            } catch (error) {
                console.error('Load messages error:', error);
            }
        }

        // Send admin message
        async function sendAdminMessage() {
            const input = document.getElementById('admin-message-input');
            const message = input.value.trim();
            
            if (!message || !currentSessionId) return;

            try {
                await axios.post('/api/admin/chat/send', {
                    session_id: currentSessionId,
                    message: message,
                    admin_name: 'Support'
                });
                
                input.value = '';
                await loadMessages();
            } catch (error) {
                console.error('Send message error:', error);
            }
        }

        // Close chat
        async function closeChat() {
            if (!confirm('Chat wirklich schließen?')) return;

            try {
                await axios.post('/api/admin/chat/close', { session_id: currentSessionId });
                currentSessionId = null;
                document.getElementById('chat-header').classList.add('hidden');
                document.getElementById('chat-input-area').classList.add('hidden');
                document.getElementById('chat-messages').innerHTML = \`
                    <div class="flex items-center justify-center h-full text-gray-400">
                        <div class="text-center">
                            <i class="fas fa-comments text-5xl mb-4"></i>
                            <p class="text-lg">Wählen Sie einen Chat aus der Liste</p>
                        </div>
                    </div>
                \`;
                await loadSessions();
                stopPolling();
            } catch (error) {
                console.error('Close chat error:', error);
            }
        }

        // Filter sessions
        function filterSessions(status) {
            currentFilter = status;
            renderSessions();
        }

        // Polling
        function startPolling() {
            stopPolling();
            pollingInterval = setInterval(() => {
                loadMessages();
                loadSessions();
            }, 3000);
        }

        function stopPolling() {
            if (pollingInterval) {
                clearInterval(pollingInterval);
                pollingInterval = null;
            }
        }

        // Enter key handler
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && document.activeElement.id === 'admin-message-input') {
                sendAdminMessage();
            }
        });

        // Initialize
        loadSessions();
        setInterval(loadSessions, 5000);
    </script>
</body>
</html>`
}
