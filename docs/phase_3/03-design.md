# Design Document

## Context Diagram
```
                    +-----------------------+
                    |                       |
   Administrator -->|   Tuition Class       |--> Reports
                    |   Management System   |
      Teacher ----->|                       |--> Notifications
                    +-----------------------+
```

## Level-0 Data Flow Diagram (DFD)
```
                +------------------+
                |                  |
Student Info -->| 1.0              |--> Student Records
                | Manage Students  |
                |                  |
                +------------------+
                        |
                        v
                   [D1: Students]
                        |
                        v
                +------------------+
Class Details ->| 2.0              |--> Attendance Records
                | Mark Attendance  |
                |                  |
                +------------------+
                        |
                        v
                   [D2: Attendance]
                        |
                        v
                +------------------+
Payment Info -->| 3.0              |--> Payment Records
                | Record Payments  |
                |                  |
                +------------------+
                        |
                        v
                   [D3: Payments]
```

## Entity-Relationship Diagram (ERD)
```
+-------------+           +---------------+
|  STUDENT    |           |  ATTENDANCE   |
|-------------|           |---------------|
| student_id  |1-------N  | attendance_id |
| name        |           | student_id    |
| contact     |           | date          |
| grade       |           | status        |
+-------------+           +---------------+
      |
      | 1
      |
      | N
      |
+-------------+
|  PAYMENT    |
|-------------|
| payment_id  |
| student_id  |
| amount      |
| date        |
| status      |
+-------------+
```