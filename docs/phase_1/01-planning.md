# Planning Document

## System Name
Medical Certificate Submission and Management System

## Problem Statement
Currently, students at Sabaragamuwa University of Sri Lanka submit medical certificates for examination or assessment absences through manual paper-based processes. This leads to delays in processing, difficulty in tracking submission status, lack of transparency in decision-making, and challenges in generating statistical reports for administrative purposes. There is a need for a digital system to streamline this process.

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
- Email/SMS notifications
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
- Development time: 4 weeks
- Team size: 3 members
- Technology: Web-based system using Node.js and SQLite
- Budget: No additional software licensing costs
- Infrastructure: Must run on standard web server

## Team Members
- Member 1 - Full-stack Developer
- Member 2 - Frontend Developer & UI/UX Designer
- Member 3 - Backend Developer & Database Administrator