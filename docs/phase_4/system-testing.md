# Change Request Document

## CR-001: [Change Title]

### Description
[What is the new requirement?]
Example: "Add SMS notification feature when student is marked absent"

### Impact Analysis

#### Requirements Impact:
- New FR: System shall send SMS when student marked absent
- Update NFR: Need SMS gateway integration

#### Design Impact:
- New entity: Notifications table needed
- New process: 2.1 Send Notification in DFD
- UI change: Add phone number field to student form

#### Implementation Impact:
- Estimated effort: 2 additional weeks
- New technology: SMS API integration needed
- Additional cost: SMS gateway subscription

#### Testing Impact:
- New test cases: 5 additional tests
- Integration testing with SMS service required

### Risk Analysis
- **High Risk:** SMS API costs may exceed budget
- **Medium Risk:** Delay in delivery timeline
- **Low Risk:** Learning curve for SMS integration

### Decision: [ACCEPT / REJECT]

**Justification:**
[Why accepting or rejecting]
Example: "REJECT - Feature requires additional budget and time beyond project constraints. Can be added in Phase 2 post-launch."

### Mitigation (if accepted):
- [How to minimize impact]