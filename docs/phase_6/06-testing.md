# Testing Document

## Test Cases

### TC-001: Add New Student
- **Precondition:** System is running, user on student page
- **Steps:**
  1. Enter name: "John Doe"
  2. Enter contact: "0771234567"
  3. Enter grade: "10"
  4. Click "Add Student"
- **Expected Result:** Student appears in list below
- **Actual Result:** ✅ Pass / ❌ Fail
- **Status:** Pass

### TC-002: Add Student with Empty Fields
- **Precondition:** System is running
- **Steps:**
  1. Leave all fields empty
  2. Click "Add Student"
- **Expected Result:** Error message shown
- **Actual Result:** Student added with empty values ❌
- **Status:** Fail - Bug found

### TC-003: Mark Attendance Present
- **Precondition:** Students exist in system
- **Steps:**
  1. Go to attendance page
  2. Select date
  3. Mark student as present
  4. Click submit
- **Expected Result:** Attendance saved
- **Actual Result:** ✅ Pass
- **Status:** Pass

## Test Summary
- **Total Tests:** 10
- **Passed:** 8
- **Failed:** 2

## Bug List

### BUG-001: No validation on student form
- **Severity:** Medium
- **Description:** System accepts empty student details
- **Steps to Reproduce:** Leave form blank and click Add
- **Expected:** Show error
- **Actual:** Adds empty record
- **Fix:** Add validation in addStudent() function

### BUG-002: Duplicate attendance for same date
- **Severity:** Low
- **Description:** Can mark attendance multiple times for same date
- **Fix:** Check if attendance already exists before saving