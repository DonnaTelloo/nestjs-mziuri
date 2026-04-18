const BASE_URL = 'http://localhost:3000';

async function getUsers() {
    const res = await fetch(BASE_URL + '/users');
    const data = await res.json();

    const container = document.getElementById('users');
    container.innerHTML = '';

    data.forEach(user => {
        const div = document.createElement('div');
        div.innerHTML = `
            ${user.id} - ${user.name}
            <button onClick="deleteUser(${user.id})">Delete</button>
            <button onClick="updateUser(${user.id})">Update</button>
        `;
        container.appendChild(div);
    });
}

async function updateUser(id) {
    const newName = prompt('Enter new name');

    await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName
        })
    });

    getUsers();
}

async function deleteUser(id) {
    await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE'
    })

    getUsers();
}

getUsers()