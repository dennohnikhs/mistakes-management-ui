import "./assets/styles/global.scss";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home";
import Login from "./pages/login";
import AdminHome from "./pages/admin-home";
import TeacherHome from "./pages/teacher-home";
import AdminDashBoard from "./pages/admin";
import OffenseDashBoard from "./pages/offense";
import SessionDashBoard from "./pages/session";
import StudentsDashBoard from "./pages/student";
import OffenseTypesDashBoard from "./pages/offense-types";
import TeachersDashboard from "./pages/teacher";
import AdminList from "./components/lists/AdminLists";
import TeacherList from "./components/lists/TeacherLists";
import StudentsList from "./components/lists/StudentsList";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/teacher-home" element={<TeacherHome />} />
          <Route path="/admins" element={<AdminDashBoard />} />
          <Route path="/offense" element={<OffenseDashBoard />} />
          <Route path="/sessions" element={<SessionDashBoard />} />
          <Route path="/students" element={<StudentsDashBoard />} />
          <Route path="/offense-types" element={<OffenseTypesDashBoard />} />
          <Route path="/admin-list" element={<AdminList />} />
          <Route path="/teacher-list" element={<TeacherList />} />
          <Route path="/students-list" element={<StudentsList />} />
          <Route
            path="/teacher-main-dashboard"
            element={<TeachersDashboard />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
