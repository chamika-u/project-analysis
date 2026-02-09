# Design Documents
## Context Diagram
```
                     +---------------------------+
                     |                           |
    Students ------->|   Medical Submission      |-----> Submission Records
                     |   Management System       |
Medical Officer ---->|   (Sabaragamuwa Univ)    |-----> Statistics Reports
                     |                           |
                     +---------------------------+
```

## Level-0 Data Flow Diagram (DFD)
```
                 +---------------------+
                 |                     |
Student Login -->| 1.0                 |
                 | User Authentication |---> Auth Token
Officer Login -->|                     |
                 +---------------------+
                         |
                         v
                  [D1: Users]
                         |
                         v
                 +---------------------+
                 |                     |
Medical Info --->| 2.0                 |---> Submission Record
                 | Submit Medical      |
                 | Certificate         |
                 +---------------------+
                         |
                         v
                [D2: Medical_Submissions]
                         |
                         v
                 +---------------------+
                 |                     |
Review Request ->| 3.0                 |---> Updated Status
                 | Review Submission   |
                 | (Approve/Reject)    |
                 +---------------------+
                         |
                         v
                [D2: Medical_Submissions]
                         |
                         v
                 +---------------------+
                 |                     |
Stats Request -->| 4.0                 |---> Statistics Report
                 | Generate Statistics |
                 |                     |
                 +---------------------+
```

## Entity-Relationship Diagram (ERD)
```
+------------------+           +-------------------------+
|     USERS        |           |  MEDICAL_SUBMISSIONS   |
|------------------|           |-------------------------|
| id (PK)          |1-------N  | id (PK)                 |
| username         |           | user_id (FK)            |
| password         |           | submission_date         |
| full_name        |           | medical_date            |
| email            |           | reason                  |
| role             |           | medical_type            |
| student_id       |           | description             |
| created_at       |           | status                  |
+------------------+           | reviewed_by (FK)        |
       |                       | reviewed_at             |
       | 1                     | review_notes            |
       |                       +-------------------------+
       |                                |
       +--------------------------------+
         (reviewed_by references Users.id)
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK(role IN ('student', 'medical_officer')),
  student_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Medical_Submissions Table
```sql
CREATE TABLE medical_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  medical_date DATE NOT NULL,
  reason TEXT NOT NULL,
  medical_type TEXT NOT NULL CHECK(medical_type IN ('examination', 'assessment', 'other')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'hold')),
  reviewed_by INTEGER,
  reviewed_at DATETIME,
  review_notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
)
```

## System Architecture

### Technology Stack
- **Backend:** Node.js with Express.js framework
- **Database:** SQLite3 (lightweight, embedded database)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs for hashing
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** RESTful API architecture

### Application Layers
1. **Presentation Layer:** HTML pages with CSS styling and JavaScript
2. **API Layer:** Express.js routes and middleware
3. **Business Logic Layer:** Controllers and service functions
4. **Data Access Layer:** SQLite database queries
5. **Security Layer:** JWT authentication and bcrypt hashing

## API Endpoints Design

### Authentication
- `POST /api/login` - Authenticate user and return JWT token

### Medical Submissions
- `POST /api/submissions` - Create new submission (Student)
- `GET /api/submissions/my` - Get current user's submissions (Student)
- `GET /api/submissions` - Get all submissions with filters (Medical Officer)
- `GET /api/submissions/:id` - Get specific submission details
- `PUT /api/submissions/:id` - Update submission status (Medical Officer)

### Statistics
- `GET /api/stats` - Get submission statistics (Medical Officer)

## Security Design

### Authentication Flow
1. User submits credentials
2. System verifies against database
3. System generates JWT token (24-hour expiration)
4. Token included in subsequent requests
5. Middleware validates token before processing

### Authorization
- Role-based access control
- Students can only access their own submissions
- Medical officers can access all submissions
- Status updates restricted to medical officers

### Data Security
- All passwords hashed with bcrypt (10 salt rounds)
- SQL injection prevention through parameterized queries
- CORS enabled for cross-origin requests
- JWT secret key for token signing
