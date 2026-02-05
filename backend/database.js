const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/medical.db');
const db = new sqlite3.Database(dbPath);

// Initialize database schema
function initDatabase() {
  db.serialize(() => {
    // Users table (both students and medical officers)
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL CHECK(role IN ('student', 'medical_officer')),
        student_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Medical submissions table
    db.run(`
      CREATE TABLE IF NOT EXISTS medical_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        medical_date DATE NOT NULL,
        reason TEXT NOT NULL,
        medical_type TEXT NOT NULL CHECK(medical_type IN ('examination', 'assessment', 'other')),
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'hold')),
        reviewed_by INTEGER,
        reviewed_at DATETIME,
        review_notes TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (reviewed_by) REFERENCES users(id)
      )
    `);

    // Create default medical officer account if not exists
    const defaultPassword = bcrypt.hashSync('medical123', 10);
    db.run(`
      INSERT OR IGNORE INTO users (username, password, full_name, email, role)
      VALUES ('medical_officer', ?, 'Dr. Medical Officer', 'medical@susl.ac.lk', 'medical_officer')
    `, [defaultPassword]);

    // Create some default student accounts for testing
    const studentPassword = bcrypt.hashSync('student123', 10);
    db.run(`
      INSERT OR IGNORE INTO users (username, password, full_name, email, role, student_id)
      VALUES ('student1', ?, 'Chamika Udayakumara', 'student1@susl.ac.lk', 'student', 'S2021001')
    `, [studentPassword]);

    db.run(`
      INSERT OR IGNORE INTO users (username, password, full_name, email, role, student_id)
      VALUES ('student2', ?, 'Nimal Perera', 'student2@susl.ac.lk', 'student', 'S2021002')
    `, [studentPassword]);

    console.log('Database initialized successfully');
  });
}

module.exports = { db, initDatabase };
