# Requirements Document

## Functional Requirements

### FR1: User Authentication
- FR1.1: System shall allow students to login with username and password
- FR1.2: System shall allow medical officers to login with username and password
- FR1.3: System shall use JWT tokens for session management
- FR1.4: System shall provide role-based access control

### FR2: Medical Certificate Submission (Student)
- FR2.1: Students shall be able to submit medical certificates with date, type, and reason
- FR2.2: System shall support three types: Examination, Assessment, and Other
- FR2.3: Students shall be able to add additional description to submissions
- FR2.4: System shall record submission date and time automatically
- FR2.5: Students shall be able to view their submission history

### FR3: Submission Management (Medical Officer)
- FR3.1: Medical officers shall view all medical submissions
- FR3.2: System shall allow filtering by status (pending, approved, rejected, hold)
- FR3.3: System shall allow filtering by medical type
- FR3.4: Medical officers shall be able to approve submissions
- FR3.5: Medical officers shall be able to reject submissions
- FR3.6: Medical officers shall be able to put submissions on hold
- FR3.7: Medical officers shall be able to add review notes to decisions

### FR4: Statistics and Reporting
- FR4.1: System shall display total number of submissions
- FR4.2: System shall show count by status (pending, approved, rejected, hold)
- FR4.3: System shall show breakdown by medical type
- FR4.4: Statistics shall update in real-time

### FR5: Data Management
- FR5.1: System shall store user information (students and medical officers)
- FR5.2: System shall maintain complete submission history
- FR5.3: System shall record reviewer information and review timestamp
- FR5.4: System shall preserve all review notes

## Non-Functional Requirements

- System shall load pages within 2 seconds on standard internet connection
- API responses shall complete within 1 second
- System shall support at least 50 concurrent users
- Interface shall be intuitive requiring minimal training
- System shall provide clear error messages


## Use Cases

### UC1: Student Login
**Actor:** Student
**Precondition:** Student has valid credentials
**Main Flow:**
1. Student navigates to login page
2. System displays login form
3. Student enters username and password
4. Student clicks "Login"
5. System validates credentials
6. System generates JWT token
7. System redirects to student dashboard


**Alternative Flow:**
- If credentials invalid, system shows error message

### UC2: Submit Medical Certificate
**Actor:** Student
**Precondition:** Student is logged in
**Main Flow:**
1. Student clicks "Submit Medical Certificate"
2. System displays submission form
3. Student selects medical date
4. Student selects medical type (Examination/Assessment/Other)
5. Student enters reason
6. Student optionally adds description
7. Student clicks "Submit"
8. System validates form data
9. System saves submission with status "pending"
10. System displays success message
11. System refreshes submission list

**Alternative Flow:**
- If validation fails, system shows error message

### UC3: Review Medical Submission
**Actor:** Medical Officer
**Precondition:** Medical officer is logged in, submissions exist
**Main Flow:**
1. Medical officer views submissions list
2. Medical officer clicks "Review" on a pending submission
3. System displays submission details in modal
4. Medical officer reviews medical information
5. Medical officer selects decision (Approve/Reject/Hold)
6. Medical officer optionally adds review notes
7. Medical officer clicks "Submit Review"
8. System updates submission status
9. System records reviewer ID and timestamp
10. System displays success message
11. System refreshes submissions list and statistics

**Alternative Flow:**
- Medical officer can cancel review without making changes

### UC4: View Statistics
**Actor:** Medical Officer
**Precondition:** Medical officer is logged in
**Main Flow:**
1. Medical officer accesses dashboard
2. System retrieves submission statistics
3. System displays total submissions
4. System displays count by status
5. System displays count by type
6. Statistics update when submissions are reviewed

### UC5: Filter Submissions
**Actor:** Medical Officer
**Precondition:** Medical officer is logged in
**Main Flow:**
1. Medical officer selects status filter
2. Medical officer optionally selects type filter
3. System retrieves filtered submissions
4. System displays filtered results
5. Medical officer can clear filters to view all



