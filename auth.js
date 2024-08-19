const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authDiv = document.getElementById('auth');
const appDiv = document.getElementById('app');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        authDiv.style.display = 'none';
        appDiv.style.display = 'block';
        fetchNotes();
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        authDiv.style.display = 'none';
        appDiv.style.display = 'block';
        fetchNotes();
    }
});

// Check if user is already logged in
if (localStorage.getItem('token')) {
    authDiv.style.display = 'none';
    appDiv.style.display = 'block';
    fetchNotes();
}
