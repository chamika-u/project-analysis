const API_URL = 'http://localhost:3000/api';

// Check if user is already logged in
if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'medical_officer') {
        window.location.href = 'officer.html';
    } else {
        window.location.href = 'student.html';
    }
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.style.display = 'block';
            return;
        }
        
        // Store token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'medical_officer') {
            window.location.href = 'officer.html';
        } else {
            window.location.href = 'student.html';
        }
        
    } catch (error) {
        errorDiv.textContent = 'Connection error. Please make sure the server is running.';
        errorDiv.style.display = 'block';
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
