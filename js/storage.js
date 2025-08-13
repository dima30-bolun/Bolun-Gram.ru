// Добавляем новые типы данных
function initStorage() {
    if(!localStorage.getItem('channels')) {
        localStorage.setItem('channels', JSON.stringify([]));
    }
    if(!localStorage.getItem('groups')) {
        localStorage.setItem('groups', JSON.stringify([]));
    }
    // Остальная инициализация...
}

// Функции для работы с каналами
function createChannel(name, description, isPrivate, creator) {
    const channels = JSON.parse(localStorage.getItem('channels'));
    const newChannel = {
        id: Date.now().toString(),
        name,
        description,
        isPrivate,
        creator,
        members: [creator],
        posts: [],
        createdAt: new Date().toISOString()
    };
    channels.push(newChannel);
    localStorage.setItem('channels', JSON.stringify(channels));
    return newChannel;
}

function getChannelsForUser(username) {
    const channels = JSON.parse(localStorage.getItem('channels'));
    return channels.filter(channel => 
        channel.members.includes(username)
    );
}

// Функции для работы с группами
function createGroup(name, description, isPrivate, creator, members) {
    const groups = JSON.parse(localStorage.getItem('groups'));
    const newGroup = {
        id: Date.now().toString(),
        name,
        description,
        isPrivate,
        creator,
        members: [creator, ...members],
        posts: [],
        createdAt: new Date().toISOString()
    };
    groups.push(newGroup);
    localStorage.setItem('groups', JSON.stringify(groups));
    return newGroup;
}

function getGroupsForUser(username) {
    const groups = JSON.parse(localStorage.getItem('groups'));
    return groups.filter(group => 
        group.members.includes(username)
    );
}

