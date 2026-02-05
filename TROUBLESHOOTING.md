# Troubleshooting Guide

## Issue: "Invalid Credentials" Error

### Solution
The default credentials **ARE CORRECT** and have been verified to work. Follow these steps:

### Step 1: Ensure Server is Running
```bash
# Check if server is running
curl http://localhost:3000/api/health

# If it fails, start the server:
chmod +x start.sh
./start.sh
```

### Step 2: Use Correct Credentials
The system has these default accounts:

**Medical Officer:**
- Username: `medical_officer`
- Password: `medical123`

**Students:**
- Username: `student1`
- Password: `student123`
- Username: `student2`
- Password: `student123`

⚠️ **Important:** These are case-sensitive!

### Step 3: Clear Browser Cache
If you're still having issues:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Clear all items for `localhost:3000`
4. Refresh the page and try again

### Step 4: Verify Database
```bash
# Check if database exists
ls -la database/medical.db

# If missing, remove and recreate:
rm -f database/medical.db
./start.sh
```

### Step 5: Test API Directly
```bash
# Test medical officer login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"medical_officer","password":"medical123"}'

# Expected: JSON with token
```

## Common Issues

### Database Not Initialized
**Symptom:** Server starts but login fails  
**Solution:** 
```bash
rm -f database/medical.db
./start.sh
```

### Port 3000 Already in Use
**Symptom:** `EADDRINUSE` error  
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill it (replace PID with actual process ID)
kill <PID>

# Then restart
./start.sh
```

### Dependencies Not Installed
**Symptom:** `Cannot find module` errors  
**Solution:**
```bash
cd backend
npm install
cd ..
./start.sh
```

### Browser Shows Connection Refused
**Symptom:** Can't reach `localhost:3000`  
**Solution:**
1. Check server is running: `ps aux | grep "node server"`
2. If not, start it: `./start.sh`
3. Wait 5 seconds for server to fully start
4. Try accessing `http://localhost:3000/index.html` again

## Still Not Working?

### Enable Debug Mode
```bash
cd backend
DEBUG=* node server.js
```

This will show detailed logs to help identify the issue.

### Verify Installation
```bash
# Check Node.js version
node --version  # Should be v14+

# Check npm
npm --version

# Check if all files exist
ls -la backend/server.js
ls -la backend/database.js
ls -la frontend/index.html
```

## Success Indicators

When everything works correctly, you should see:
1. Server log: "Database initialized successfully"
2. Server log: "Medical Submission System Backend running on port 3000"
3. Login page loads at `http://localhost:3000/index.html`
4. Credentials from login page work
5. After login, you're redirected to the appropriate dashboard

## Test Checklist

- [ ] Server starts without errors
- [ ] Port 3000 is accessible
- [ ] Database file exists in `database/medical.db`
- [ ] Login page loads
- [ ] Medical officer login works
- [ ] Student login works
- [ ] Dashboards display correctly

All items should be checked ✅ for the system to work properly.
