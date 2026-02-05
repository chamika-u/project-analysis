# Medical Submission System - Sabaragamuwa University of Sri Lanka

A comprehensive Medical Certificate Submission and Management System for Sabaragamuwa University of Sri Lanka, built following the Waterfall Software Development Life Cycle (SDLC).

## 📋 Overview

This system enables students to submit medical certificates for absences (examinations, assessments, or other activities) and allows medical officers to review, approve, reject, or hold these submissions with detailed tracking and statistics.

## ✨ Features

### For Students
- Secure login authentication
- Submit medical certificates with date, type, reason, and details
- View submission history and status
- Track review decisions and notes

### For Medical Officers
- Secure admin authentication
- View all medical submissions with filters
- Comprehensive statistics dashboard
- Review submissions (Approve/Reject/Hold)
- Add review notes for each decision

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js, SQLite3, JWT, bcryptjs
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)

### Steps
1. Clone the repository
2. Install dependencies: `cd backend && npm install`
3. Start server: `npm start`
4. Open browser: `http://localhost:3000/index.html`

## 👤 Default Credentials

**Medical Officer:** `medical_officer` / `medical123`  
**Student:** `student1` / `student123`

## 📁 Project Structure

```
project-analysis/
├── docs/           # SDLC documentation
├── backend/        # Node.js server
├── frontend/       # HTML/CSS/JS files
└── database/       # SQLite database (auto-created)
```

## 🔧 API Endpoints

- `POST /api/login` - User login
- `POST /api/submissions` - Submit medical (Student)
- `GET /api/submissions/my` - Get user submissions (Student)
- `GET /api/submissions` - Get all submissions (Medical Officer)
- `PUT /api/submissions/:id` - Update status (Medical Officer)
- `GET /api/stats` - Get statistics (Medical Officer)

## �� Academic Context

Developed as part of Waterfall SDLC assignment for Sabaragamuwa University of Sri Lanka.
