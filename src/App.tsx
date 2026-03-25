// App.tsx - Configuración de rutas de la aplicación
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

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Componente de ruta protegida
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Componente de ruta pública (solo para no autenticados)
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
          {/* Ruta pública - Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Estudiantes */}
            <Route path="students" element={<Students />} />
            <Route path="students/new" element={<StudentFormPage />} />
            <Route path="students/:id" element={<StudentFormPage />} />
            <Route path="students/:id/edit" element={<StudentFormPage />} />

            {/* Profesores */}
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/new" element={<TeacherFormPage />} />
            <Route path="teachers/:id" element={<TeacherFormPage />} />
            <Route path="teachers/:id/edit" element={<TeacherFormPage />} />

            {/* Cursos */}
            <Route path="courses" element={<Courses />} />
            <Route path="courses/new" element={<CourseFormPage />} />
            <Route path="courses/:id" element={<CourseFormPage />} />
            <Route path="courses/:id/edit" element={<CourseFormPage />} />

            {/* Calificaciones */}
            <Route path="grades" element={<Grades />} />
            <Route path="grades/new" element={<Grades />} />

            {/* Asistencia */}
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/take" element={<Attendance />} />

            {/* Configuración */}
            <Route path="settings" element={<Dashboard />} />

            {/* Perfil */}
            <Route path="profile" element={<Dashboard />} />
          </Route>

          {/* Ruta por defecto - Redirigir a login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      
      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
      
      {/* React Query Devtools (solo en desarrollo) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
