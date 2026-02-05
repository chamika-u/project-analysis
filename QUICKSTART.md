# Quick Start Guide - Medical Submission System

## Getting Started in 3 Minutes

### Step 1: Install Dependencies (1 minute)
```bash
cd backend
npm install
```

### Step 2: Start the Server (30 seconds)
```bash
npm start
```

You should see:
```
Database initialized successfully
Medical Submission System Backend running on port 3000
Default credentials:
Medical Officer - Username: medical_officer, Password: medical123
Student - Username: student1, Password: student123
```

### Step 3: Access the Application (30 seconds)
Open your browser and go to:
```
http://localhost:3000/index.html
```

### Step 4: Test the System (1 minute)

#### As a Student:
1. Login with: `student1` / `student123`
2. Click "Submit Medical Certificate"
3. Fill in:
   - Medical Date: Select a date
   - Type: Choose "Examination", "Assessment", or "Other"
   - Reason: e.g., "Fever and headache"
   - Description: Optional additional details
4. Click "Submit"
5. View your submission in the list below

#### As a Medical Officer:
1. Logout (if logged in as student)
2. Login with: `medical_officer` / `medical123`
3. View the statistics dashboard showing all submissions
4. Click "Review" on any pending submission
5. Select decision: Approve, Reject, or Hold
6. Add review notes
7. Click "Submit Review"
8. Watch statistics update in real-time

## What You'll See

### Student Dashboard Features:
- Your submission history
- Status badges (Pending/Approved/Rejected/Hold)
- Review decisions and notes from medical officer
- Timestamps for all actions

### Medical Officer Dashboard Features:
- Statistics cards showing totals by status
- Filter submissions by status and type
- Complete student information
- Review interface with notes

## API Endpoints (For Testing)

### Authentication
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student1","password":"student123"}'
```

### Submit Medical (requires token)
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "medical_date": "2026-02-10",
    "reason": "Fever",
    "medical_type": "examination",
    "description": "High fever, unable to attend"
  }'
```

### Get Statistics (medical officer only)
```bash
curl http://localhost:3000/api/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database Location

The SQLite database is automatically created at:
```
database/medical.db
```

## Default Accounts

### Medical Officer
- **Username:** medical_officer
- **Password:** medical123
- **Name:** Dr. Medical Officer
- **Email:** medical@susl.ac.lk

### Students
- **Username:** student1
- **Password:** student123
- **Name:** Chamika Udayakumara
- **ID:** S2021001

- **Username:** student2
- **Password:** student123
- **Name:** Nimal Perera
- **ID:** S2021002

## Troubleshooting

### Server won't start?
- Make sure Node.js is installed: `node --version`
- Install dependencies: `cd backend && npm install`
- Check if port 3000 is available

### Can't login?
- Check browser console for errors (F12)
- Verify server is running
- Clear browser localStorage and try again

### API errors?
- Make sure server is running on port 3000
- Check that you're using the correct credentials
- Verify token is included in Authorization header

## Support

For issues or questions, refer to:
- Main README.md for detailed documentation
- docs/ folder for design and requirements
- Database schema in backend/database.js
- API documentation in backend/server.js

## System Requirements

- **Node.js:** v14 or higher
- **npm:** Comes with Node.js
- **Browser:** Chrome, Firefox, Safari, or Edge (latest versions)
- **Operating System:** Windows, macOS, or Linux

## Next Steps

1. Explore the student interface
2. Test the medical officer review workflow
3. Try filtering submissions by status and type
4. Review the statistics dashboard
5. Check the database to see stored data
6. Read the full documentation in docs/

---

**Enjoy using the Medical Submission System!** 🏥
