import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout';
import { useAuthStore } from '@/store';
import {
  Dashboard,
  Login,
  Students,
  StudentFormPage,
  Teachers,
  TeacherFormPage,
  Courses,
  CourseFormPage,
  Grades,
  Attendance,
} from '@/pages';

import { Assignments } from '@/pages/Assignments';
import { AssignmentFormPage } from '@/pages/AssignmentFormPage';

import { StudentReports } from '@/pages/StudentReports';
import { GradeReports } from '@/pages/GradeReports';
import { AttendanceReports } from '@/pages/AttendanceReports';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="students" element={<Students />} />
            <Route path="students/new" element={<StudentFormPage />} />
            <Route path="students/:id" element={<StudentFormPage />} />
            <Route path="students/:id/edit" element={<StudentFormPage />} />
            <Route path="students/reports" element={<StudentReports />} />

            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/new" element={<TeacherFormPage />} />
            <Route path="teachers/:id" element={<TeacherFormPage />} />
            <Route path="teachers/:id/edit" element={<TeacherFormPage />} />

            <Route path="assignments" element={<Assignments />} />
            <Route path="assignments/new" element={<AssignmentFormPage />} />
            <Route path="assignments/:id" element={<AssignmentFormPage />} />
            <Route path="assignments/:id/edit" element={<AssignmentFormPage />} />

            <Route path="courses" element={<Courses />} />
            <Route path="courses/new" element={<CourseFormPage />} />
            <Route path="courses/:id" element={<CourseFormPage />} />
            <Route path="courses/:id/edit" element={<CourseFormPage />} />

            <Route path="grades" element={<Grades />} />
            <Route path="grades/new" element={<Grades />} />
            <Route path="grades/reports" element={<GradeReports />} />

            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/take" element={<Attendance />} />
            <Route path="attendance/reports" element={<AttendanceReports />} />

            <Route path="settings" element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;