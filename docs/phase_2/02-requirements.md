# Requirements Document

## Functional Requirements

### FR1: Student Management
- FR1.1: System shall allow adding new student details (name, contact, grade)
- FR1.2: System shall allow viewing list of all students
- FR1.3: System shall allow editing student information

### FR2: Attendance Management
- FR2.1: System shall allow marking attendance for a class session
- FR2.2: System shall display attendance history for each student

### FR3: Fee Management
- FR3.1: System shall record fee payments
- FR3.2: System shall show payment status (paid/pending)

### FR4: Reporting
- FR4.1: System shall generate monthly attendance report
- FR4.2: System shall generate fee collection summary

## Non-Functional Requirements

### NFR1: Performance
- System shall load pages within 3 seconds

### NFR2: Usability
- Interface shall be simple with minimal training required

### NFR3: Security
- System shall require login authentication
- Only authorized users can access the system

### NFR4: Reliability
- System shall be available during working hours (8 AM - 8 PM)

## Use Cases

### UC1: Register New Student
**Actor:** Administrator
**Precondition:** User is logged in
**Main Flow:**
1. User clicks "Add Student"
2. System displays registration form
3. User enters student details
4. User clicks "Save"
5. System validates and saves data
6. System displays success message

**Alternative Flow:**
- If validation fails, system shows error message

### UC2: Mark Attendance
**Actor:** Teacher
**Precondition:** User is logged in, students exist in system
**Main Flow:**
1. User selects class and date
2. System displays student list
3. User marks present/absent for each student
4. User clicks "Submit"
5. System saves attendance records

### UC3: Record Payment
**Actor:** Administrator
**Precondition:** Student exists in system
**Main Flow:**
1. User selects student
2. User enters payment amount and date
3. User clicks "Save Payment"
4. System records payment and updates status