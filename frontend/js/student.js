const API_URL = 'http://localhost:3000/api';

// Helper function to get current token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Helper function to get current user from localStorage
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check authentication
const token = getToken();
const user = getUser();

if (!token || !user || user.role !== 'student') {
    window.location.href = 'index.html';
}

// Display user name
document.getElementById('userName').textContent = getUser().full_name;

// Load user's submissions
async function loadMySubmissions() {
    try {
        const response = await fetch(`${API_URL}/submissions/my`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        
        const submissions = await response.json();
        displaySubmissions(submissions);
    } catch (error) {
        console.error('Error loading submissions:', error);
    }
}

function displaySubmissions(submissions) {
    const container = document.getElementById('submissionsList');
    
    if (submissions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No submissions yet</h3>
                <p>Click "Submit Medical Certificate" to add your first submission.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = submissions.map(submission => `
        <div class="submission-card">
            <div class="submission-header">
                <div class="submission-info">
                    <h3>${formatMedicalType(submission.medical_type)}</h3>
                    <p>Submitted: ${formatDate(submission.submission_date)}</p>
                </div>
                <span class="status-badge status-${submission.status}">
                    ${submission.status.toUpperCase()}
                </span>
            </div>
            
            <div class="submission-details">
                <p><strong>Medical Date:</strong> ${formatDate(submission.medical_date)}</p>
                <p><strong>Reason:</strong> ${submission.reason}</p>
                ${submission.description ? `<p><strong>Details:</strong> ${submission.description}</p>` : ''}
                ${submission.reviewed_by ? `
                    <p><strong>Reviewed by:</strong> ${submission.reviewer_name}</p>
                    <p><strong>Reviewed at:</strong> ${formatDate(submission.reviewed_at)}</p>
                    ${submission.review_notes ? `<p><strong>Notes:</strong> ${submission.review_notes}</p>` : ''}
                ` : ''}
            </div>
        </div>
    `).join('');
}

function showSubmitForm() {
    document.getElementById('submitModal').style.display = 'flex';
    document.getElementById('submitForm').reset();
}

function closeSubmitForm() {
    document.getElementById('submitModal').style.display = 'none';
}

// Submit form handler
document.getElementById('submitForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        medical_date: document.getElementById('medical_date').value,
        reason: document.getElementById('reason').value,
        medical_type: document.getElementById('medical_type').value,
        description: document.getElementById('description').value
    };
    
    try {
        const response = await fetch(`${API_URL}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            closeSubmitForm();
            loadMySubmissions();
            alert('Medical certificate submitted successfully!');
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to submit medical certificate');
        }
    } catch (error) {
        alert('Connection error. Please try again.');
    }
});

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatMedicalType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Load submissions on page load
loadMySubmissions();
