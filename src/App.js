import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useParams } from "react-router-dom";
import DoctorLogin from "./pages/login/login";
import VerifyOtpPage from "./pages/verifyOtpScreen/verifyOtp";
import DashboardPage from "./pages/dashboard/dashboard";
import PatientsPage from "./pages/patients/patients";
import CreateAppointmentPage from "./pages/createAppointment/CreateAppointment";
import ReturningPatient from "./pages/returningPatient/ReturningPatient";
import PatientsProfilePage from "./pages/patients-Profile/Profile";
import TabsContentEducator from "./Components/tabsContentEducator/TabsContentEducator";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Cookies from "js-cookie";

const AppContainer = () => {
  const [token, setToken] = useState();
  const authToken = Cookies.get('Authorization');
  useEffect(() => {
    setToken(authToken);

    // Redirect to login if token is invalid or missing and not already on the login page
    if (!authToken && window.location.pathname !== "/login") {
      window.location.href = '/login'; // Redirect to login page
    }
  }, [token, window.location]);

  useEffect(() => {
    if (!authToken && window.location.pathname == "/") {
      window.location.href = '/login';
    }
    if (authToken && window.location.pathname == "/") {
      window.location.href = '/dashboard';
    }
  }, [token])


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<DoctorLogin />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patient/create-appointment" element={<CreateAppointmentPage />} />
        <Route path="/patient/returning-patient" element={<ReturningPatient />} />
        <Route path="/patient/patient-profile" element={<PatientsProfilePage />} />
        <Route path="/patient/diabetes-educator" element={<TabsContentEducator />} />

      </Routes>
    </Router>
  );
};

export default AppContainer;
