import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Auth/Login';
import AdminDashboard from './views/Dashboard/AdminDashboard';
import DoctorDashboard from './views/Dashboard/DoctorDashboard';
import ReceptionDashboard from './views/Dashboard/ReceptionDashboard';
import PatientDashboard from './views/Dashboard/PatientDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ManageUsers from './views/admin/ManageUsers';
import Subscriptions from './views/admin/Subscriptions';
import SystemMonitor from './views/admin/SystemMonitor';
import DoctorAppointments from './views/Dashboard/DoctorDashboard';
import PatientHistory from './views/doctor/PatientHistory';
import DoctorAnalytics from './views/doctor/DoctorAnalytics';
import AIDiagnosis from './views/doctor/AIDiagnosis';
import RegisterPatient from './views/Dashboard/ReceptionDashboard';
import BookAppointment from './views/Receptionist/BookAppointment';
import DailySchedule from './views/Receptionist/DailySchedule';
import AppointmentHistory from './views/Patient/appointmentHistory';
import BookAppointmentPatient from './views/Patient/bookAppointmentpatient';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<div>Signup Page</div>} />

        {/* Protected Routes - Role Based */}
        
        {/* Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/subscription" element={<Subscriptions />} />
          <Route path="/system-monitor" element={<SystemMonitor />} />
        </Route>

        {/* Doctor Only */}
        <Route element={<ProtectedRoute allowedRoles={['Doctor']} />}>
          <Route path="/doctor-dashboard" element={<DoctorAppointments />} />
          <Route path="/patient-records" element={<PatientHistory />} />
          <Route path="/doctor-analytics" element={<DoctorAnalytics />} />
          <Route path="/ai-tool" element={<AIDiagnosis />} />
        </Route>

        {/* Receptionist Only */}
        <Route element={<ProtectedRoute allowedRoles={['Receptionist']} />}>
          <Route path="/receptionist-dashboard" element={<RegisterPatient />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/daily-schedule" element={<DailySchedule />} />
        </Route>

        {/* Patient Only */}
        <Route element={<ProtectedRoute allowedRoles={['Patient']} />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/my-reports" element={<AppointmentHistory />} />
          <Route path="/book-new" element={<BookAppointmentPatient />} />
        </Route>

        {/* Global Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;