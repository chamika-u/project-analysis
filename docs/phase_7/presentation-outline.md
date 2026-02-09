# Final Presentation Outline

## Slide 1: Title
- System Name
- Team Members
- Date

## Slide 2: Problem & Objectives
- Brief problem statement
- 3 main objectives

## Slide 3: Waterfall Phases Overview
- Show timeline: Planning → Requirements → Design → Implementation → Testing
- Mention strict phase sequencing

## Slide 4: Requirements Highlights
- Show 2-3 key functional requirements
- Mention tag: v1.0-requirements-approved

## Slide 5: Design Artifacts
- Show ERD or DFD
- Show one wireframe
- Mention tag: v2.0-design-approved

## Slide 6: Change Request Impact
- What was the change?
- Impact analysis summary
- Decision: Accept/Reject and why
- **KEY POINT:** Highlight difficulty of late changes in Waterfall

## Slide 7: Implementation Demo
- **LIVE DEMO** (2-3 minutes)
- Show 1-2 working features
- Mention tag: v3.0-implementation

## Slide 8: Testing Results
- Test summary stats
- Show 1-2 bugs found
- Lessons learned

## Slide 9: Reflection on Waterfall
### Strengths:
- Clear documentation
- Structured approach
- Well-defined phases

### Weaknesses:
- Inflexible to changes
- Late testing finds issues
- Client sees product very late

## Slide 10: Lessons Learned
- Importance of early requirements
- Value of documentation
- Impact of late changes
- Real-world applicability

## Slide 11: Thank You + Q&A

## Verification Document 

# 1.Verification Strategy:"Shift-Left" Testing

Since the time allotted is only 7 days, it will not be possible to wait until Day 6 to run tests. In order to achieve this, we will adopt a Shift, Left testing strategy where validation is done alongside the development of the Node. js routes and SQLite queries

# 2.Level 1: Unit Testing (Logic Verification)

# Responsible:

Member 1 (Full, stack) & Member 3 (Backend)

This makes sure that the tiniest units of the app can function perfectly by themselves.

# Authentication Logic:

Make sure bcrypt hashing is correctly used for comparing passwords during login.

# Data Validation:

Make sure the submission form doesnt accept empty "reason" fields or reject invalid dates (e. g. , dates in the future).

Database Queries:

Make sure the SQL queries are correctly figuring out the totals for the statistical reports (e. g. , COUNT of "Pending" vs "Approved").

# 3. Level 2: Integration Testing (Workflow Verification)

Responsibility: Members 1 & 2 (Frontend)

This test ensures that the Node. js backend and the EJS frontend can exchange data properly.

Role, Based Access Control (RBAC):Test Case: Login as a "Student" and try to manually access /admin/dashboard. Expected Result: The system should either redirect the user to the login page or display a 403 Forbidden error. Submission Flow:Test Case: A student submits a medical for an "Exam. "Expected Result: The record is instantly visible on the Medical Officers dashboard, and the status is "Pending. "

# 4. Level 3: User Acceptance Testing (Requirement Verification)

Responsible: All Members Since you are targeting Sabaragamuwa University, verification must match your Scope items exactly

# 5. Security & Constraint Verification

Considering the "Secure Authentication" constraint along with the "Standard Web Server" infrastructure, the following points need verification:

SQL Injection Protection: It should be confirmed that all SQLite queries are parameterized statements (e. g. , db. run("INSERT ... VALUES (? )", [data])) rather than string concatenation.

Session Persistence: It should be confirmed that a user is not logged out during navigation between the dashboard and report pages but is logged out after the browser is closed.

Data Integrity: It should be confirmed that a student is not able to change a medical certificate after submission (Read, only after submission).
