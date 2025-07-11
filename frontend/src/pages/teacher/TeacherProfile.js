import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetail } from '../../redux/teacherRelated/teacherHandle';

function TeacherDetails({ teacherId }) {
  const dispatch = useDispatch();
  const teacher = useSelector(state => state.teacher.teacherDetail);

  useEffect(() => {
    dispatch(getTeacherDetail(teacherId));
  }, [dispatch, teacherId]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="teacher-details">
      <img src={`/${teacher.photo}`} alt="Teacher" style={{ width: 120, borderRadius: '50%' }} />
      <h2>{teacher.fullName}</h2>
      <p><b>Employee Code:</b> {teacher.employeeCode}</p>
      <p><b>Date of Birth:</b> {teacher.dob && new Date(teacher.dob).toLocaleDateString()}</p>
      <p><b>Gender:</b> {teacher.gender}</p>
      <p><b>Contact Number:</b> {teacher.contactNumber}</p>
      <p><b>Email:</b> {teacher.email}</p>
      <p><b>Address:</b> {teacher.address}</p>
      <p><b>Emergency Contact:</b> {teacher.emergencyContact && `${teacher.emergencyContact.name} (${teacher.emergencyContact.relation}) - ${teacher.emergencyContact.phone}`}</p>
      <p><b>Designation:</b> {teacher.designation}</p>
      <p><b>Department:</b> {teacher.department}</p>
      <p><b>Subjects:</b> {teacher.subjects && teacher.subjects.map(s => s.name).join(', ')}</p>
      <p><b>Classes Assigned:</b> {teacher.classesAssigned && teacher.classesAssigned.map(c => c.name).join(', ')}</p>
      <p><b>Date of Joining:</b> {teacher.dateOfJoining && new Date(teacher.dateOfJoining).toLocaleDateString()}</p>
      <p><b>Employment Type:</b> {teacher.employmentType}</p>
      <p><b>Reporting Authority:</b> {teacher.reportingAuthority}</p>
      <p><b>Qualification:</b> {teacher.qualification}</p>
      <p><b>Experience (years):</b> {teacher.experienceYears}</p>

      <h3>CTC & Payroll Details</h3>
      <p><b>Annual CTC:</b> ₹{teacher.annualCTC}</p>
      <p><b>Monthly Gross:</b> ₹{teacher.monthlyGross}</p>
      <h4>Salary Breakup</h4>
      <ul>
        <li>Basic: {teacher.salaryBreakup && teacher.salaryBreakup.basic}</li>
        <li>HRA: {teacher.salaryBreakup && teacher.salaryBreakup.hra}</li>
        <li>DA: {teacher.salaryBreakup && teacher.salaryBreakup.da}</li>
        <li>Special Allowance: {teacher.salaryBreakup && teacher.salaryBreakup.specialAllowance}</li>
        <li>Transport Allowance: {teacher.salaryBreakup && teacher.salaryBreakup.transportAllowance}</li>
        <li>Medical Allowance: {teacher.salaryBreakup && teacher.salaryBreakup.medicalAllowance}</li>
        <li>PF: {teacher.salaryBreakup && teacher.salaryBreakup.pf}</li>
        <li>PT: {teacher.salaryBreakup && teacher.salaryBreakup.pt}</li>
        <li>TDS: {teacher.salaryBreakup && teacher.salaryBreakup.tds}</li>
        <li>Other Deductions: {teacher.salaryBreakup && teacher.salaryBreakup.otherDeductions}</li>
        <li>Net Salary: {teacher.salaryBreakup && teacher.salaryBreakup.netSalary}</li>
      </ul>
      <p><b>Payment Cycle:</b> {teacher.paymentCycle}</p>
      <p><b>Payment Mode:</b> {teacher.paymentMode}</p>
      <p><b>Bank Account Number:</b> {teacher.bankAccountNumber}</p>
      <p><b>Bank Name:</b> {teacher.bankName}</p>
      <p><b>IFSC Code:</b> {teacher.ifscCode}</p>
      <p><b>PAN Number:</b> {teacher.panNumber}</p>
      <p><b>Aadhar Number:</b> {teacher.aadharNumber}</p>

      <h3>Attendance & Leave</h3>
      <p><b>Working Days/Month:</b> {teacher.workingDaysPerMonth}</p>
      <p><b>Leave Balance:</b> CL: {teacher.leaveBalance && teacher.leaveBalance.cl}, SL: {teacher.leaveBalance && teacher.leaveBalance.sl}, PL: {teacher.leaveBalance && teacher.leaveBalance.pl}</p>
      <h4>Attendance Record</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {teacher.attendanceRecord && teacher.attendanceRecord.map((att, idx) => (
            <tr key={idx}>
              <td>{att.date && new Date(att.date).toLocaleDateString()}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Performance & Appraisal</h3>
      <p><b>Performance Score:</b> {teacher.performanceScore}</p>
      <p><b>Last Increment Date:</b> {teacher.lastIncrementDate && new Date(teacher.lastIncrementDate).toLocaleDateString()}</p>
      <p><b>Last Increment Amount:</b> {teacher.lastIncrementAmount}</p>
      <h4>Appraisal History</h4>
      <ul>
        {teacher.appraisalHistory && teacher.appraisalHistory.map((app, idx) => (
          <li key={idx}>
            {app.date && new Date(app.date).toLocaleDateString()} - Score: {app.score}, Increment: {app.incrementAmount}, Remarks: {app.remarks}
          </li>
        ))}
      </ul>

      <h3>Documents</h3>
      <ul>
        <li>Resume: {teacher.documents.resume && <a href={`/${teacher.documents.resume}`} target="_blank" rel="noreferrer">View</a>}</li>
        <li>Qualification Certificates: {teacher.documents.qualificationCertificates && teacher.documents.qualificationCertificates.map((cert, idx) => (
          <span key={idx}><a href={`/${cert}`} target="_blank" rel="noreferrer">View</a>{idx < teacher.documents.qualificationCertificates.length - 1 ? ', ' : ''}</span>
        ))}</li>
        <li>ID Proof: {teacher.documents.idProof && <a href={`/${teacher.documents.idProof}`} target="_blank" rel="noreferrer">View</a>}</li>
        <li>Experience Letters: {teacher.documents.experienceLetters && teacher.documents.experienceLetters.map((exp, idx) => (
          <span key={idx}><a href={`/${exp}`} target="_blank" rel="noreferrer">View</a>{idx < teacher.documents.experienceLetters.length - 1 ? ', ' : ''}</span>
        ))}</li>
        <li>Joining Letter: {teacher.documents.joiningLetter && <a href={`/${teacher.documents.joiningLetter}`} target="_blank" rel="noreferrer">View</a>}</li>
      </ul>

      <h3>Timetable</h3>
      <ul>
        {teacher.timetable && teacher.timetable.map((tt, idx) => (
          <li key={idx}>{tt.day}: {tt.periods.join(', ')}</li>
        ))}
      </ul>

      <h3>Feedback</h3>
      <ul>
        {teacher.feedback && teacher.feedback.map((fb, idx) => (
          <li key={idx}>{fb.class}: {fb.rating} stars - {fb.remarks}</li>
        ))}
      </ul>

      <h3>Remarks on Students</h3>
      <ul>
        {teacher.remarksOnStudents && teacher.remarksOnStudents.map((rem, idx) => (
          <li key={idx}>{rem.student && rem.student.fullName}: {rem.remark}</li>
        ))}
      </ul>

      <h3>Login & Digital Signature</h3>
      <p><b>Username:</b> {teacher.username}</p>
      <p><b>Digital Signature:</b> {teacher.digitalSignature && <a href={`/${teacher.digitalSignature}`} target="_blank" rel="noreferrer">View</a>}</p>
    </div>
  );
}

export default TeacherDetails;
