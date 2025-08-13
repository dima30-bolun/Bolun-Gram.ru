// Добавляем в хедер ссылки на группы и каналы
document.addEventListener('DOMContentLoaded', () => {
    // ... существующий код ...
    
    // Обновляем навигацию
    const nav = document.querySelector('nav');
    if(nav) {
        nav.innerHTML = `
            <a href="/Bolun-Gram.ru/index.html" class="${isActive('index.html')}">Лента</a>
            <a href="/Bolun-Gram.ru/messages.html" class="${isActive('messages.html')}">Сообщения</a>
            <a href="/Bolun-Gram.ru/groups.html" class="${isActive('groups.html')}">Группы</a>
            <a href="/Bolun-Gram.ru/channels.html" class="${isActive('channels.html')}">Каналы</a>
            <a href="/Bolun-Gram.ru/profile.html" class="${isActive('profile.html')}">Профиль</a>
        `;
    }
});

function isActive(page) {
    return window.location.pathname.endsWith(page) ? 'active' : '';
}
