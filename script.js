document.addEventListener('DOMContentLoaded', () => {
  const chatOutput = document.getElementById('chat-output');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  const appendMessage = (message, isSent) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = ` ${message}`;
    messageElement.classList.add(isSent ? 'sent' : 'received');
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  };

  // Listen for changes in localStorage
  window.addEventListener('storage', (event) => {
    if (event.key === 'tabToTabChatMessage') {
      const { message, isSent } = JSON.parse(event.newValue);
      if (message) {
        appendMessage(message, !isSent); // Corrected
      }
    } else if (event.key === 'tabToTabReload') {
      // Reload the page if reload flag is detected
      location.reload();
    }
  });

  // Send message to other tabs
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      const isSent = true;
      const messageObj = { message, isSent };
      localStorage.setItem('tabToTabChatMessage', JSON.stringify(messageObj));
      appendMessage(message, isSent);
      messageInput.value = '';
    }
  });
});

// Set reload flag in localStorage when the page is about to be reloaded
window.addEventListener('beforeunload', () => {
  localStorage.setItem('tabToTabReload', 'true');
});
