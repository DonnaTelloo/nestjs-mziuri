const BASE_URL = 'http://localhost:3000';

// ===== USERS FUNCTIONS =====
async function getUsers() {
    const res = await fetch(BASE_URL + '/users');
    const data = await res.json();

    const container = document.getElementById('users');
    container.innerHTML = '';

    data.forEach(user => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <strong>${user.id} - ${user.name}</strong><br>
            Email: ${user.email}<br>
            <button onClick="deleteUser(${user.id})">Delete</button>
            <button onClick="updateUser(${user.id})">Update</button>
        `;
        container.appendChild(div);
    });
}

async function updateUser(id) {
    const newName = prompt('Enter new name');
    if (!newName) return;

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
    if (!confirm('Are you sure you want to delete this user?')) return;

    await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE'
    })

    getUsers();
}

// ===== PRODUCTS FUNCTIONS =====
async function getProducts() {
    const res = await fetch(BASE_URL + '/products');
    const data = await res.json();

    const container = document.getElementById('products');
    container.innerHTML = '';

    data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <strong>${product.id} - ${product.name}</strong><br>
            Description: ${product.description}<br>
            Price: $${product.price} | Stock: ${product.stock} | Category: ${product.category}<br>
            <button onClick="deleteProduct(${product.id})">Delete</button>
            <button onClick="updateProduct(${product.id})">Update</button>
        `;
        container.appendChild(div);
    });
}

async function addProduct() {
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const category = document.getElementById('productCategory').value;

    if (!name || !description || !price || !stock) {
        alert('Please fill in all required fields');
        return;
    }

    await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            price,
            stock,
            category
        })
    });

    // Clear form
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productCategory').value = '';

    getProducts();
}

async function updateProduct(id) {
    const newPrice = prompt('Enter new price');
    if (!newPrice) return;

    await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price: parseFloat(newPrice)
        })
    });

    getProducts();
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE'
    })

    getProducts();
}

// ===== ORDERS FUNCTIONS =====
async function getOrders() {
    const res = await fetch(BASE_URL + '/orders');
    const data = await res.json();

    const container = document.getElementById('orders');
    container.innerHTML = '';

    data.forEach(order => {
        const div = document.createElement('div');
        div.className = 'item';
        const itemsText = order.items.map(item => `Product ${item.productId} (qty: ${item.quantity})`).join(', ');
        div.innerHTML = `
            <strong>Order ${order.id}</strong><br>
            User ID: ${order.userId} | Status: ${order.status}<br>
            Items: ${itemsText}<br>
            Total: $${order.totalAmount} | Created: ${new Date(order.createdAt).toLocaleDateString()}<br>
            <button onClick="deleteOrder(${order.id})">Delete</button>
            <button onClick="updateOrderStatus(${order.id})">Update Status</button>
        `;
        container.appendChild(div);
    });
}

async function addOrder() {
    const userId = parseInt(document.getElementById('orderUserId').value);
    const itemsInput = document.getElementById('orderItems').value;

    if (!userId || !itemsInput) {
        alert('Please fill in all fields');
        return;
    }

    // Parse items format: "1:2,3:1" -> [{productId: 1, quantity: 2}, {productId: 3, quantity: 1}]
    const items = itemsInput.split(',').map(item => {
        const [productId, quantity] = item.split(':');
        return {
            productId: parseInt(productId),
            quantity: parseInt(quantity)
        };
    });

    await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            items
        })
    });

    // Clear form
    document.getElementById('orderUserId').value = '';
    document.getElementById('orderItems').value = '';

    getOrders();
}

async function updateOrderStatus(id) {
    const newStatus = prompt('Enter new status (pending, processing, shipped, delivered, cancelled)');
    if (!newStatus) return;

    await fetch(`${BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: newStatus
        })
    });

    getOrders();
}

async function deleteOrder(id) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    await fetch(`${BASE_URL}/orders/${id}`, {
        method: 'DELETE'
    })

    getOrders();
}

// Initialize all data
getUsers();
getProducts();
getOrders();
