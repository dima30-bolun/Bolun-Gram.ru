document.addEventListener('DOMContentLoaded', () => {
    loadUserChannels();
    
    // Обработка создания канала
    const createForm = document.getElementById('createChannelForm');
    if(createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('channelName').value.trim();
            const description = document.getElementById('channelDescription').value.trim();
            const isPrivate = document.getElementById('isPrivate').checked;
            const creator = localStorage.getItem('currentUser');
            
            if(name) {
                createChannel(name, description, isPrivate, creator);
                alert('Канал успешно создан!');
                window.location.href = '/Bolun-Gram.ru/channels.html';
            }
        });
    }
});

function loadUserChannels() {
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser) return;
    
    const channelsList = document.getElementById('channelsList');
    if(!channelsList) return;
    
    const channels = getChannelsForUser(currentUser);
    
    if(channels.length === 0) {
        channelsList.innerHTML = '<div class="no-channels">У вас пока нет каналов</div>';
        return;
    }
    
    channelsList.innerHTML = '';
    channels.forEach(channel => {
        const channelElement = document.createElement('div');
        channelElement.className = 'channel-item';
        channelElement.innerHTML = `
            <div class="channel-info">
                <h3>${channel.name}</h3>
                <p>${channel.description || 'Нет описания'}</p>
                <small>Участников: ${channel.members.length}</small>
            </div>
            <a href="/Bolun-Gram.ru/channel.html?id=${channel.id}" class="open-btn">Открыть</a>
        `;
        channelsList.appendChild(channelElement);
    });
}
