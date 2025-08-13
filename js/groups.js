document.addEventListener('DOMContentLoaded', () => {
    loadUserGroups();
    
    // Обработка создания группы
    const createForm = document.getElementById('createGroupForm');
    if(createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('groupName').value.trim();
            const description = document.getElementById('groupDescription').value.trim();
            const isPrivate = document.getElementById('isPrivate').checked;
            const creator = localStorage.getItem('currentUser');
            
            // Здесь должна быть логика выбора участников
            const members = []; 
            
            if(name) {
                createGroup(name, description, isPrivate, creator, members);
                alert('Группа успешно создана!');
                window.location.href = '/Bolun-Gram.ru/groups.html';
            }
        });
    }
});

function loadUserGroups() {
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser) return;
    
    const groupsList = document.getElementById('groupsList');
    if(!groupsList) return;
    
    const groups = getGroupsForUser(currentUser);
    
    if(groups.length === 0) {
        groupsList.innerHTML = '<div class="no-groups">У вас пока нет групп</div>';
        return;
    }
    
    groupsList.innerHTML = '';
    groups.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.className = 'group-item';
        groupElement.innerHTML = `
            <div class="group-info">
                <h3>${group.name}</h3>
                <p>${group.description || 'Нет описания'}</p>
                <small>Участников: ${group.members.length}</small>
            </div>
            <a href="/Bolun-Gram.ru/group.html?id=${group.id}" class="open-btn">Открыть</a>
        `;
        groupsList.appendChild(groupElement);
    });
}
