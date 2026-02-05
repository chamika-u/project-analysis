const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'medical-submission-secret-key-2026';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
initDatabase();

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

// Check if user is medical officer
function isMedicalOfficer(req, res, next) {
  if (req.user.role !== 'medical_officer') {
    return res.status(403).json({ error: 'Access denied. Medical officer only.' });
  }
  next();
}

// ==================== AUTH ROUTES ====================

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          student_id: user.student_id
        }
      });
    });
  });
});

// ==================== STUDENT ROUTES ====================

// Submit medical certificate
app.post('/api/submissions', authenticateToken, (req, res) => {
  const { medical_date, reason, medical_type, description } = req.body;
  const user_id = req.user.id;

  if (!medical_date || !reason || !medical_type) {
    return res.status(400).json({ error: 'Medical date, reason, and type are required' });
  }

  db.run(
    `INSERT INTO medical_submissions (user_id, medical_date, reason, medical_type, description)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, medical_date, reason, medical_type, description],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to submit medical certificate' });
      }

      res.json({
        message: 'Medical certificate submitted successfully',
        submission_id: this.lastID
      });
    }
  );
});

// Get user's own submissions
app.get('/api/submissions/my', authenticateToken, (req, res) => {
  const user_id = req.user.id;

  db.all(
    `SELECT s.*, u.full_name as student_name, r.full_name as reviewer_name
     FROM medical_submissions s
     LEFT JOIN users u ON s.user_id = u.id
     LEFT JOIN users r ON s.reviewed_by = r.id
     WHERE s.user_id = ?
     ORDER BY s.submission_date DESC`,
    [user_id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch submissions' });
      }
      res.json(rows);
    }
  );
});

// ==================== MEDICAL OFFICER ROUTES ====================

// Get all submissions (medical officer only)
app.get('/api/submissions', authenticateToken, isMedicalOfficer, (req, res) => {
  const { status, medical_type } = req.query;
  
  let query = `
    SELECT s.*, u.full_name as student_name, u.student_id, u.email,
           r.full_name as reviewer_name
    FROM medical_submissions s
    LEFT JOIN users u ON s.user_id = u.id
    LEFT JOIN users r ON s.reviewed_by = r.id
    WHERE 1=1
  `;
  
  const params = [];
  
  if (status) {
    query += ' AND s.status = ?';
    params.push(status);
  }
  
  if (medical_type) {
    query += ' AND s.medical_type = ?';
    params.push(medical_type);
  }
  
  query += ' ORDER BY s.submission_date DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
    res.json(rows);
  });
});

// Get submission statistics
app.get('/api/stats', authenticateToken, isMedicalOfficer, (req, res) => {
  db.get(
    `SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
      SUM(CASE WHEN status = 'hold' THEN 1 ELSE 0 END) as hold
     FROM medical_submissions`,
    (err, stats) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch statistics' });
      }
      
      db.all(
        `SELECT medical_type, COUNT(*) as count
         FROM medical_submissions
         GROUP BY medical_type`,
        (err, typeStats) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch type statistics' });
          }
          
          res.json({
            overall: stats,
            by_type: typeStats
          });
        }
      );
    }
  );
});

// Update submission status (medical officer only)
app.put('/api/submissions/:id', authenticateToken, isMedicalOfficer, (req, res) => {
  const { id } = req.params;
  const { status, review_notes } = req.body;
  const reviewer_id = req.user.id;

  if (!status || !['approved', 'rejected', 'hold'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.run(
    `UPDATE medical_submissions 
     SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, review_notes = ?
     WHERE id = ?`,
    [status, reviewer_id, review_notes, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update submission' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      res.json({ message: 'Submission updated successfully' });
    }
  );
});

// Get a single submission
app.get('/api/submissions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  db.get(
    `SELECT s.*, u.full_name as student_name, u.student_id, u.email,
            r.full_name as reviewer_name
     FROM medical_submissions s
     LEFT JOIN users u ON s.user_id = u.id
     LEFT JOIN users r ON s.reviewed_by = r.id
     WHERE s.id = ?`,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch submission' });
      }
      
      if (!row) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      
      // Check authorization
      if (req.user.role !== 'medical_officer' && row.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      res.json(row);
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Medical Submission System is running' });
});

// Serve static files from frontend
app.use(express.static('../frontend'));

// Start server
app.listen(PORT, () => {
  console.log(`Medical Submission System Backend running on port ${PORT}`);
  console.log(`Default credentials:`);
  console.log(`Medical Officer - Username: medical_officer, Password: medical123`);
  console.log(`Student - Username: student1, Password: student123`);
});
