import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";

import { useBackendMutation } from "main/utils/useBackend";
import HomePage from "main/pages/HomePage";

import LoadingPage from "main/pages/LoadingPage";
import LoginPage from "main/pages/LoginPage";
import ProfilePage from "main/pages/ProfilePage";
import CoursesEditPage from "main/pages/CoursesEditPage";

import AdminUsersPage from "main/pages/AdminUsersPage";
import AdminJobsPage from "main/pages/AdminJobsPage";
import SchoolIndexPage from "main/pages/SchoolIndexPage";
import SchoolEditPage from "main/pages/SchoolEditPage";
import SchoolCreatePage from "main/pages/SchoolCreatePage";

import CoursesCreatePage from "main/pages/CoursesCreatePage";
import CourseIndexPage from "main/pages/CourseIndexPage";

import CoursesShowPage from "main/pages/CoursesShowPage";
import CoursesStaffPage from "main/pages/CoursesStaffPage";
import CoursesAddStaffPage from "main/pages/CoursesAddStaffPage";

import { hasRole, useCurrentUser } from "main/utils/currentUser";
import NotFoundPage from "main/pages/NotFoundPage";

function App() {
  const { data: currentUser } = useCurrentUser();

  const adminRoutes = hasRole(currentUser, "ROLE_ADMIN") ? (
    <>
      <Route path="/admin/schools" element={<SchoolIndexPage />} />
      <Route path="/admin/schools/edit/:abbrev" element={<SchoolEditPage />} />
      <Route path="/admin/schools/create" element={<SchoolCreatePage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/jobs" element={<AdminJobsPage />} />
    </>
  ) : null;

  const userRoutes = hasRole(currentUser, "ROLE_USER") ? (
    <>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/courses" element={<CourseIndexPage />} />
    </>
  ) : null;

  const courseRoutes = (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_INSTRUCTOR")) ? (
    <>
      <Route path="/courses/create" element={<CoursesCreatePage />} />
      <Route path="/courses" element={<CourseIndexPage />} />
      <Route path="/courses/edit/:id" element={<CoursesEditPage />} />
      <Route path = "/courses/:courseId/staff/addStaff" element={<CoursesAddStaffPage />}/>
      <Route path="/courses/:id" element={<CoursesShowPage />} />
    </>
  ) : null;

  const staffRoutes = (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_INSTRUCTOR") || hasRole(currentUser, "Role_USER")) ? (
    <>
      <Route path="/courses/:courseId/staff" element={<CoursesStaffPage />} />
    </>
  ) : null;

  const homeRoute = (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_USER")) 
    ? <Route path="/" element={<HomePage />} /> 
    : <Route path="/" element={<LoginPage />} />;

  /*  Display the LoadingPage while awaiting currentUser 
      response to prevent the NotFoundPage from displaying */

  const updateLastOnlineMutation = useBackendMutation(
    () => ({ method: "POST", url: "/api/currentUser/last-online" }),
    {}
  );

  const updatedOnlineOnMount = useRef(false);

  useEffect(() => {
    if (currentUser && currentUser.loggedIn) {
      if (!updatedOnlineOnMount.current) {
        updatedOnlineOnMount.current = true;
        updateLastOnlineMutation.mutate();
      }

      const interval = setInterval(() => {
        updateLastOnlineMutation.mutate();
      }, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentUser, updateLastOnlineMutation]);

  return (
    <BrowserRouter>
      {currentUser?.initialData ? (
        <LoadingPage />
      ) : (
        <Routes>
          {homeRoute}
          {adminRoutes}
          {userRoutes}
          {courseRoutes}
          {staffRoutes}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
