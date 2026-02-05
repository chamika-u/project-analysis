const API_URL = 'http://localhost:3000/api';

// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || !user || user.role !== 'medical_officer') {
    window.location.href = 'index.html';
}

// Display user name
document.getElementById('userName').textContent = user.full_name;

// Load statistics
async function loadStatistics() {
    try {
        const response = await fetch(`${API_URL}/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const stats = await response.json();
        
        document.getElementById('totalSubmissions').textContent = stats.overall.total || 0;
        document.getElementById('pendingSubmissions').textContent = stats.overall.pending || 0;
        document.getElementById('approvedSubmissions').textContent = stats.overall.approved || 0;
        document.getElementById('rejectedSubmissions').textContent = stats.overall.rejected || 0;
        document.getElementById('holdSubmissions').textContent = stats.overall.hold || 0;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Load all submissions
async function loadSubmissions() {
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;
    
    let url = `${API_URL}/submissions?`;
    if (status) url += `status=${status}&`;
    if (type) url += `medical_type=${type}&`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
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
                <h3>No submissions found</h3>
                <p>No medical submissions match the selected filters.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = submissions.map(submission => `
        <div class="submission-card">
            <div class="submission-header">
                <div class="submission-info">
                    <h3>${submission.student_name} (${submission.student_id})</h3>
                    <p>${formatMedicalType(submission.medical_type)} - ${formatDate(submission.submission_date)}</p>
                </div>
                <span class="status-badge status-${submission.status}">
                    ${submission.status.toUpperCase()}
                </span>
            </div>
            
            <div class="submission-details">
                <p><strong>Medical Date:</strong> ${formatDate(submission.medical_date)}</p>
                <p><strong>Reason:</strong> ${submission.reason}</p>
                ${submission.description ? `<p><strong>Details:</strong> ${submission.description}</p>` : ''}
                <p><strong>Student Email:</strong> ${submission.email}</p>
                ${submission.reviewed_by ? `
                    <p><strong>Reviewed by:</strong> ${submission.reviewer_name}</p>
                    <p><strong>Reviewed at:</strong> ${formatDate(submission.reviewed_at)}</p>
                    ${submission.review_notes ? `<p><strong>Review Notes:</strong> ${submission.review_notes}</p>` : ''}
                ` : ''}
            </div>
            
            ${submission.status === 'pending' ? `
                <div class="submission-actions">
                    <button onclick="reviewSubmission(${submission.id})" class="btn btn-primary">Review</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function reviewSubmission(submissionId) {
    // Load submission details
    fetch(`${API_URL}/submissions/${submissionId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(submission => {
        document.getElementById('submissionId').value = submission.id;
        
        document.getElementById('submissionDetails').innerHTML = `
            <div class="submission-details">
                <h3>${submission.student_name} (${submission.student_id})</h3>
                <p><strong>Medical Date:</strong> ${formatDate(submission.medical_date)}</p>
                <p><strong>Type:</strong> ${formatMedicalType(submission.medical_type)}</p>
                <p><strong>Reason:</strong> ${submission.reason}</p>
                ${submission.description ? `<p><strong>Details:</strong> ${submission.description}</p>` : ''}
                <p><strong>Submitted:</strong> ${formatDate(submission.submission_date)}</p>
            </div>
        `;
        
        document.getElementById('reviewModal').style.display = 'flex';
    })
    .catch(error => {
        alert('Error loading submission details');
    });
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewForm').reset();
}

// Review form handler
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submissionId = document.getElementById('submissionId').value;
    const status = document.getElementById('review_status').value;
    const review_notes = document.getElementById('review_notes').value;
    
    try {
        const response = await fetch(`${API_URL}/submissions/${submissionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status, review_notes })
        });
        
        if (response.ok) {
            closeReviewModal();
            loadSubmissions();
            loadStatistics();
            alert('Review submitted successfully!');
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to submit review');
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

// Load data on page load
loadStatistics();
loadSubmissions();
