import React, { useEffect } from "react";
import LandingPage from "../src/Pages/LandingPage.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Admin/AdminDashboard.jsx";
import EventList from "./Components/Admin/EventList.jsx";
import CreateEventForm from "./Components/Admin/CreateEventForm.jsx";
import RoleSuggestionPanel from "./Components/Admin/RoleSuggestionPanel.jsx";
import VolunteerDashboard from "./Components/Volunteer/VolunteerDashboard.jsx";
import Profile from "./Components/Volunteer/Profile.jsx";
import Events from "./Components/Volunteer/Event.jsx";
import Skills from "./Components/Volunteer/Skills.jsx";
import Notifications from "./Components/Volunteer/Notifications.jsx";
import VolunteerDashboardWithRouter from "./Components/Volunteer/VolunteerDashboard.jsx";
import VolunteerImpact from "./Components/Volunteer/VolunteerImpact.jsx";
import Feedback from "./Components/Volunteer/Feedback.jsx";
import VolunteerLayout from "./Components/Volunteer/VolunteerLayout"; // Importing the layout component
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import Sidebar from "./Components/Admin/AdminSidebar.jsx";
import VolunteerStats from "./Components/Admin/VolunteerStats.jsx";
import AdminSidebar from "./Components/Admin/AdminSidebar.jsx";
import DashboardWithRouter from "./Components/Admin/AdminDashboard.jsx";
import Activationpage from "./Pages/Activationpage.jsx";
import CreateRoleForm from "./Components/Admin/CreateRoleForm.jsx";
// redux toolkit
import Store from "./redux/store";
import { getAllEvents } from "./redux/actions/events.js";
import { loaduser } from "./redux/actions/user.js";
const App = () => {
  useEffect(() => {
    Store.dispatch(getAllEvents());
    Store.dispatch(loaduser());
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/activation/:activation_token"
            element={<Activationpage />}
          />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardWithRouter />} />
            <Route path="create-event" element={<CreateEventForm />} />
            <Route path="create-role" element={<CreateRoleForm />} />

            <Route path="event-list" element={<EventList />} />
            <Route path="role-suggestion" element={<RoleSuggestionPanel />} />
            <Route path="sidebar" element={<AdminSidebar />} />
            <Route path="vol-stats" element={<VolunteerStats />} />
          </Route>

          {/* Volunteer Routes with Sidebar */}
          <Route path="/volunteer" element={<VolunteerLayout />}>
            <Route path="impact" element={<VolunteerImpact />} />
            <Route
              path="dashboard"
              element={<VolunteerDashboardWithRouter />}
            />
            <Route path="events" element={<Events />} />
            <Route path="profile" element={<Profile />} />
            <Route path="skills" element={<Skills />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="notification" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
