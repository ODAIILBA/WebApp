// Live Chat Widget - Frontend
(function() {
    let sessionId = localStorage.getItem('chat_session_id');
    let chatOpen = false;
    let messagePolling = null;

    // Create chat widget HTML
    function createChatWidget() {
        const widget = document.createElement('div');
        widget.innerHTML = `
            <div id="chat-widget" class="fixed bottom-4 right-4 z-50">
                <button id="chat-toggle" class="bg-gold hover:bg-gold-light text-navy-dark font-bold w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <i class="fas fa-comments text-2xl"></i>
                    <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">0</span>
                </button>
                
                <div id="chat-box" class="hidden absolute bottom-20 right-0 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border-2 border-gold">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-navy-dark to-navy-medium p-4 flex items-center justify-between text-white">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                                <i class="fas fa-headset text-navy-dark"></i>
                            </div>
                            <div>
                                <h3 class="font-bold">Live Support</h3>
                                <p class="text-xs text-gray-300">Online jetzt</p>
                            </div>
                        </div>
                        <button id="chat-close" class="hover:bg-white/20 p-2 rounded">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Messages -->
                    <div id="chat-messages" class="flex-1 overflow-y-auto p-4 bg-gray-50"></div>
                    
                    <!-- Input -->
                    <div class="p-4 bg-white border-t">
                        <div id="chat-form-name" class="mb-3">
                            <input type="text" id="chat-user-name" placeholder="Ihr Name" class="w-full px-3 py-2 border rounded-lg mb-2">
                            <input type="email" id="chat-user-email" placeholder="Ihre E-Mail" class="w-full px-3 py-2 border rounded-lg mb-2">
                            <button id="chat-start" class="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-2 rounded-lg">
                                Chat starten
                            </button>
                        </div>
                        <div id="chat-form-message" class="hidden flex gap-2">
                            <input type="text" id="chat-input" placeholder="Nachricht eingeben..." class="flex-1 px-3 py-2 border rounded-lg">
                            <button id="chat-send" class="bg-gold hover:bg-gold-light text-navy-dark font-bold px-4 rounded-lg">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    // Toggle chat
    function toggleChat() {
        chatOpen = !chatOpen;
        const box = document.getElementById('chat-box');
        if (chatOpen) {
            box.classList.remove('hidden');
            if (sessionId) {
                loadMessages();
                startPolling();
            }
        } else {
            box.classList.add('hidden');
            stopPolling();
        }
    }

    // Start chat session
    async function startChat() {
        const name = document.getElementById('chat-user-name').value;
        const email = document.getElementById('chat-user-email').value;
        
        if (!name || !email) {
            alert('Bitte Name und E-Mail eingeben');
            return;
        }

        try {
            const response = await fetch('/api/chat/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });
            
            const data = await response.json();
            if (data.success) {
                sessionId = data.session_id;
                localStorage.setItem('chat_session_id', sessionId);
                document.getElementById('chat-form-name').classList.add('hidden');
                document.getElementById('chat-form-message').classList.remove('hidden');
                addMessage('admin', 'Support', 'Hallo! Wie können wir Ihnen helfen?');
                startPolling();
            }
        } catch (error) {
            console.error('Chat start error:', error);
        }
    }

    // Send message
    async function sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || !sessionId) return;

        addMessage('user', 'Sie', message);
        input.value = '';

        try {
            await fetch('/api/chat/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, message })
            });
        } catch (error) {
            console.error('Send message error:', error);
        }
    }

    // Load messages
    async function loadMessages() {
        if (!sessionId) return;

        try {
            const response = await fetch(`/api/chat/messages?session_id=${sessionId}`);
            const data = await response.json();
            
            if (data.success) {
                const container = document.getElementById('chat-messages');
                container.innerHTML = '';
                data.messages.forEach(msg => {
                    addMessage(msg.sender_type, msg.sender_name, msg.message, false);
                });
                container.scrollTop = container.scrollHeight;
            }
        } catch (error) {
            console.error('Load messages error:', error);
        }
    }

    // Add message to UI
    function addMessage(type, name, message, scroll = true) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-3 animate-fadeIn`;
        div.innerHTML = `
            <div class="${type === 'user' ? 'bg-gold text-navy-dark' : 'bg-white border'} max-w-[80%] rounded-lg p-3 shadow">
                <p class="text-xs font-bold mb-1">${name}</p>
                <p class="text-sm">${message}</p>
            </div>
        `;
        container.appendChild(div);
        if (scroll) container.scrollTop = container.scrollHeight;
    }

    // Polling
    function startPolling() {
        stopPolling();
        messagePolling = setInterval(loadMessages, 3000);
    }

    function stopPolling() {
        if (messagePolling) {
            clearInterval(messagePolling);
            messagePolling = null;
        }
    }

    // Initialize
    window.addEventListener('DOMContentLoaded', () => {
        createChatWidget();

        document.getElementById('chat-toggle').addEventListener('click', toggleChat);
        document.getElementById('chat-close').addEventListener('click', toggleChat);
        document.getElementById('chat-start').addEventListener('click', startChat);
        document.getElementById('chat-send').addEventListener('click', sendMessage);
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        if (sessionId) {
            document.getElementById('chat-form-name').classList.add('hidden');
            document.getElementById('chat-form-message').classList.remove('hidden');
        }
    });
})();
