# Planning document

## System Name
Medical Certificate Submission and Management System

## Problem Statement
The current medical certificate submission and management process at Sabaragamuwa University is manual and paper-based, leading to delays, increased workload, and errors in record-keeping. Students face difficulties in submitting certificates, while staff struggle with verification, tracking, and storage. The lack of a centralized, digital system also raises concerns about data security, accessibility, and transparency. There is a need for an online medical certificate management system to streamline submission, ensure secure storage, and improve efficiency for both students and administrators.

## Objectives
1. Automate the medical certificate submission process for students
2. Provide medical officers with a centralized platform to review and manage submissions
3. Enable real-time tracking of submission status and decisions
4. Generate statistical reports on medical submissions

## Scope
### In Scope:
- Student login and authentication
- Medical certificate submission with date, type, and reason
- Medical officer login and dashboard
- Review and approval/rejection/hold functionality
- Statistical reporting (total, pending, approved, rejected, on-hold)
- Filter submissions by status and type
- Secure authentication and role-based access control

### Out of Scope:
- File upload for scanned medical certificates
- Email notifications
- Mobile application
- Integration with university's main student information system
- Payment processing
- Multi-language support

## Assumptions
- Users (students and medical officers) have basic computer literacy
- Internet connectivity is available at university premises
- Medical officers have authority to make decisions on submissions
- Students have valid student IDs and university email addresses
- Single university deployment (Sabaragamuwa University)


## Constraints
- Development time: 1 weeks
- Team size: 3 members
- Technology: Web-based system using Node.js 
- Budget: No additional software licensing costs
- Infrastructure: Must run on standard web server

## Team Members
- Chamika - Leading backend development and database design
- Lasindu - Frontend development and documentation
- Sakun - Testing, deployment, and documentation
