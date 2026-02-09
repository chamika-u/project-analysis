# Project Structure

```
project/
├── docs/
│   ├── phase1/
│   ├── phase2/
│   ├── phase3/
│   └── phase4/
│   └── phase5/
│   └── phase6/
│   
├── app/
│   ├──  src
│   │    ├── index.html       (Login page)
│   │    ├── dashboard.html   (Main dashboard)
│   │    ├── students.html    (Student management)
│   │    ├── attendance.html  (Attendance marking)
│   │    ├── payments.html    (Payment recording)
│   │    ├── css/
│   │    │   └── style.css
│   │    └── js/
│   │        ├── app.js       (Main logic)
│   │        └── storage.js   (LocalStorage handler)
│   ├──  UI
│
└── README.md
```

## Implementation Document

# 1.Implementation Methodology:Rapid Prototyping

With only 1 week, the team will skip complex microservices and go for a Monolithic MVC (Model, View, Controller) architecture.

It helps with fast deployment on a regular web server and makes the SQLite integration easier

# 2.Technical Stack & Environment

Backend: Node.js with Express.js (fast routing).

Database: SQLite3 (zero-configuration, stored as a local file medical_system.db).

Frontend: EJS (Embedded JavaScript templates) for server-side rendering, styled with Bootstrap 5 to avoid writing custom CSS.

Auth: passport-js or simple express-session with bcrypt for password hashing.

# 3.Data Implementation

Member 3 will implement a relational structure. To maintain speed, we use a single database file with two primary tables.

Users Table: id, student_id (unique), password, role (student/officer), full_name

Submissions Table: id, user_id (FK), date_of_absence, type (Exam/Assignment), reason, status (Pending, Approved, Rejected, Hold), timestamp.

# 4.Key Features of Implementation Details

A. Submission Logic (Member 1 & 2) When a student fills in and submits a form, the backend will validate the inputs (e. g. , checking that the "reason" is not empty) before saving the record with a status of Pending by default.

B. Officer Review Dashboard (Member 1 & 3) The dashboard makes use of SQL GROUP BY and COUNT queries to generate the statistics in real, time for the purpose of "Statistical Reporting.

" Query Example: SELECT status, COUNT(*) FROM Submissions GROUP BY status;

 C. Security & Role, Based Access In order to guarantee "Secure authentication, " Member 1 will introduce a middleware for checking: Security Note: It is a must that every "Officer" route checks whether req. session. role === 'medical_officer' or not in order to disallow students from reaching the approval panel.

 # 5. Implementation Constraints Handling.

 Time: If we want to meet the 4, week (originally mentioned) or 1, week (in constraints) deadline, we will resort to CDN, hosted Bootstrap for the UI to save time on asset management.

Infrastructure: Because the system should work on a "Standard Web Server, " we will place the whole project in one directory only, with the SQLite database file included.