# Testing Document

## Test Cases

### TC-001: Student Login
- **Precondition:** System is running, student account exists
- **Steps:**
  1. Navigate to login page
  2. Enter username: "student1"
  3. Enter password: "student123"
  4. Click "Login"
- **Expected Result:** Redirect to student dashboard with user name displayed
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-002: Medical Officer Login
- **Precondition:** System is running
- **Steps:**
  1. Navigate to login page
  2. Enter username: "medical_officer"
  3. Enter password: "medical123"
  4. Click "Login"
- **Expected Result:** Redirect to medical officer dashboard with statistics
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-003: Invalid Login
- **Precondition:** System is running
- **Steps:**
  1. Navigate to login page
  2. Enter invalid credentials
  3. Click "Login"
- **Expected Result:** Error message "Invalid credentials"
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-004: Submit Medical Certificate
- **Precondition:** Student is logged in
- **Steps:**
  1. Click "Submit Medical Certificate"
  2. Select medical date
  3. Select type: "Examination"
  4. Enter reason: "Fever and headache"
  5. Enter description
  6. Click "Submit"
- **Expected Result:** Success message, submission appears in list with "pending" status
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-005: Submit with Missing Required Fields
- **Precondition:** Student is logged in
- **Steps:**
  1. Click "Submit Medical Certificate"
  2. Leave required fields empty
  3. Click "Submit"
- **Expected Result:** Form validation error
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-006: View Student Submissions
- **Precondition:** Student is logged in, has submissions
- **Steps:**
  1. Access student dashboard
- **Expected Result:** List of student's own submissions displayed
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-007: Approve Medical Submission
- **Precondition:** Medical officer logged in, pending submissions exist
- **Steps:**
  1. Click "Review" on a pending submission
  2. Select "Approve" from decision dropdown
  3. Add review notes
  4. Click "Submit Review"
- **Expected Result:** Submission status changes to "approved", statistics update
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-008: Reject Medical Submission
- **Precondition:** Medical officer logged in, pending submissions exist
- **Steps:**
  1. Click "Review" on a pending submission
  2. Select "Reject" from decision dropdown
  3. Add review notes
  4. Click "Submit Review"
- **Expected Result:** Submission status changes to "rejected", statistics update
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-009: View Statistics
- **Precondition:** Medical officer logged in
- **Steps:**
  1. Access medical officer dashboard
- **Expected Result:** Dashboard displays total, pending, approved, rejected, hold counts
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-010: Filter Submissions by Status
- **Precondition:** Medical officer logged in, multiple submissions exist
- **Steps:**
  1. Select "Pending" from status filter
- **Expected Result:** Only pending submissions displayed
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-011: Filter Submissions by Type
- **Precondition:** Medical officer logged in, multiple types exist
- **Steps:**
  1. Select "Examination" from type filter
- **Expected Result:** Only examination-type submissions displayed
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-012: Student Cannot Access Officer Dashboard
- **Precondition:** Student is logged in
- **Steps:**
  1. Try to navigate to officer.html directly
- **Expected Result:** Redirect to login or access denied
- **Actual Result:** ✅ Pass (Frontend redirects based on role)
- **Status:** Pass

### TC-013: Role-Based API Access
- **Precondition:** Student token obtained
- **Steps:**
  1. Try to access /api/stats endpoint with student token
- **Expected Result:** 403 Forbidden error
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-014: JWT Token Validation
- **Precondition:** System running
- **Steps:**
  1. Make API request without token
- **Expected Result:** 401 Unauthorized error
- **Actual Result:** ✅ Pass
- **Status:** Pass

### TC-015: Password Security
- **Precondition:** Database accessible
- **Steps:**
  1. Check users table
  2. Verify passwords are hashed
- **Expected Result:** Passwords stored as bcrypt hashes, not plain text
- **Actual Result:** ✅ Pass
- **Status:** Pass

## Test Summary
- **Total Tests:** 15
- **Passed:** 15
- **Failed:** 0
- **Pass Rate:** 100%

## Bug List

No critical bugs found during testing. All features work as expected.

## Performance Testing
- Login response time: < 500ms
- Submission creation: < 300ms
- Statistics retrieval: < 200ms
- Page load times: < 2 seconds

## Security Testing
- ✅ Password hashing verified (bcrypt)
- ✅ JWT authentication working
- ✅ Role-based access control enforced
- ✅ SQL injection protection (parameterized queries)
- ✅ CORS properly configured

## Browser Compatibility
Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Conclusion
All test cases passed successfully. The Medical Submission System is ready for deployment.


## Software Testing Report

# 1.Project Overview

The Medical Submission System is a web, based platform initiated to digitize the workflow between students and medical officers. It facilitates the submission of medical certificates, administrative review, and secure role, based access.

# 2.Test Strategy & Scope

Test Levels:

Unit Testing, Integration Testing, System Testing, and User Acceptance Testing (UAT). Testing Types:

* Functional: Login, submission, review workflow, and filtering. Security:

JWT authentication, bcrypt password hashing, and Role, Based Access Control (RBAC). Performance

Testing was done on the entire workflow for two main user roles: Students and Medical Officers. The approach involved:

Black Box Testing: Checking the UI changes and form input validation. Role, Based Access Control (RBAC) Testing: Making sure that data privacy is maintained between the roles. Security Auditing: Confirming that security measures like encryption and token, based authentication are in place.

# 3. Comprehensive Test Case Execution

Below is the summarized execution matrix based on the 15 test cases performed.

TC-01..03   Auth       Multi-role Login & Error Handling     ✅ Pass  
TC-04..05   Student    Medical Submission & Validation       ✅ Pass
TC-06       Student    Dashboard Visibility                  ✅ Pass
TC-07..08   Officer    Approval/Rejection Workflow           ✅ Pass
TC-09..11   Officer    Analytics & Data Filtering            ✅ Pass
TC-12..14   Security   RBAC, JWT, & API Authorization        ✅ Pass
TC-15       Database   Data Encryption (Bcrypt)              ✅ Pass

# 4. Non-Functional Requirements (NFR)

To make sure that the system can handle growth and still be safe under pressure, the following metrics were verified:

# Performance Metrics

Responsiveness: The response time for all API endpoints is < 500ms.
Load Time: The loading time for frontend assets and dashboards is under 2 seconds.

# Security Verification

Encryption: User passwords are hashed using bcrypt. Auth: Stateless JWT tokens are used to prevent unauthorized session hijacking. 

Integrity: The use of parameterized queries helps to eliminate the risks of SQL Injection.


# 5.Compatibility Matrix

The system was verified to render and function consistently across modern browsing environments:

Chromium-based: Google Chrome, Microsoft Edge.

Webkit/Gecko: Apple Safari, Mozilla Firefox.

# 6.Final Conclusion & Sign off

Status: RELEASE READY

The system has met all defined acceptance criteria. No "Critical" or "Major" bugs remain open. The integration between the frontend and the secure backend API is stable.
