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
