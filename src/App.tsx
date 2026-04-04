// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Toaster } from '@/components/ui/sonner';
// import { MainLayout } from '@/components/layout';
// import { useAuthStore } from '@/store';
// import {
//   Dashboard,
//   Login,
//   Students,
//   StudentFormPage,
//   Teachers,
//   TeacherFormPage,
//   Courses,
//   CourseFormPage,
//   Grades,
//   Attendance,
  
// } from '@/pages';

// import{
//   MatriculaLayout,
//   ConfiguracionPage,
//   AsignaturasPage,
//    SeccionesPage,
//    GradosPage,
//   JornadasPage,
//  // AsignarSeccionPage,
//   NuevaMatriculaPage,
//   ActivarPeriodoPage

// } from '@/pages/matricula'

// import { Assignments } from '@/pages/Assignments';
// import { AssignmentFormPage } from '@/pages/AssignmentFormPage';

// import { StudentReports } from '@/pages/StudentReports';
// import { GradeReports } from '@/pages/GradeReports';
// import { AttendanceReports } from '@/pages/AttendanceReports';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }

// function PublicRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuthStore();

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// }

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <MainLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Dashboard />} />

//             <Route path="students" element={<Students />} />
//             <Route path="students/new" element={<StudentFormPage />} />
//             <Route path="students/:id" element={<StudentFormPage />} />
//             <Route path="students/:id/edit" element={<StudentFormPage />} />
//             <Route path="students/reports" element={<StudentReports />} />

//             <Route path="teachers" element={<Teachers />} />
//             <Route path="teachers/new" element={<TeacherFormPage />} />
//             <Route path="teachers/:id" element={<TeacherFormPage />} />
//             <Route path="teachers/:id/edit" element={<TeacherFormPage />} />

//             <Route path="assignments" element={<Assignments />} />
//             <Route path="assignments/new" element={<AssignmentFormPage />} />
//             <Route path="assignments/:id" element={<AssignmentFormPage />} />
//             <Route path="assignments/:id/edit" element={<AssignmentFormPage />} />

//             <Route path="courses" element={<Courses />} />
//             <Route path="courses/new" element={<CourseFormPage />} />
//             <Route path="courses/:id" element={<CourseFormPage />} />
//             <Route path="courses/:id/edit" element={<CourseFormPage />} />

//             <Route path="grades" element={<Grades />} />
//             <Route path="grades/new" element={<Grades />} />
//             <Route path="grades/reports" element={<GradeReports />} />

//             <Route path="attendance" element={<Attendance />} />
//             <Route path="attendance/take" element={<Attendance />} />
//             <Route path="attendance/reports" element={<AttendanceReports />} />

//             <Route path="settings" element={<Dashboard />} />
//             <Route path="profile" element={<Dashboard />} />

//             // Dentro de tus rutas protegidas:
//               <Route path="/matricula" element={<MatriculaLayout />}>
//               <Route index element={<Navigate to="configuracion" replace />} />
//               <Route path="configuracion" element={<ConfiguracionPage />} />
//               <Route path="configuracion/jornadas" element={<JornadasPage />} />
//               <Route path="configuracion/grados" element={<GradosPage />} />
//               <Route path="configuracion/secciones" element={<SeccionesPage />} />
//               <Route path="configuracion/asignaturas" element={<AsignaturasPage />} />
//               <Route path="configuracion/periodo" element={<ActivarPeriodoPage />} />
//               <Route path="nueva" element={<NuevaMatriculaPage />} />
//               {/* <Route path="asignar-seccion/:idEstudiante" element={<AsignarSeccionPage />} />  */}
//              </Route> 
//           </Route>

//           <Route path="*" element={<Navigate to="/login" replace />} />

//         </Routes>
//       </BrowserRouter>

//       <Toaster position="top-right" richColors />
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout';
import { useAuthStore } from '@/store';
import { useModoStore, homePorModo } from '@/store/modoStore';

// Páginas existentes del sistema
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

// Páginas de Matrícula (modo Dirección)
import {
  MatriculaLayout,
  ConfiguracionPage,
  AsignaturasPage,
  SeccionesPage,
  GradosPage,
  JornadasPage,
  NuevaMatriculaPage,
  ActivarPeriodoPage,
 // AsignarGradoSeccionPage,
} from '@/pages/matricula';

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

// Componente que redirige al home del modo actual
function ModoRedirect() {
  const { modoActual } = useModoStore();
  return <Navigate to={homePorModo[modoActual]} replace />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Rutas protegidas con MainLayout (Sidebar dinámico) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirección raíz al modo actual */}
            <Route index element={<ModoRedirect />} />

            {/* ============================================ */}
            /* RUTAS MODO ADMIN (Estructura actual)         */
            {/* ============================================ */}
            <Route path="admin" element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard - accesible en ambos modos */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Estudiantes */}
            <Route path="students" element={<Students />} />
            <Route path="students/new" element={<StudentFormPage />} />
            <Route path="students/:id" element={<StudentFormPage />} />
            <Route path="students/:id/edit" element={<StudentFormPage />} />
            <Route path="students/reports" element={<StudentReports />} />

            {/* Profesores */}
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/new" element={<TeacherFormPage />} />
            <Route path="teachers/:id" element={<TeacherFormPage />} />
            <Route path="teachers/:id/edit" element={<TeacherFormPage />} />

            {/* Asignaciones */}
            <Route path="assignments" element={<Assignments />} />
            <Route path="assignments/new" element={<AssignmentFormPage />} />
            <Route path="assignments/:id" element={<AssignmentFormPage />} />
            <Route path="assignments/:id/edit" element={<AssignmentFormPage />} />

            {/* Cursos */}
            <Route path="courses" element={<Courses />} />
            <Route path="courses/new" element={<CourseFormPage />} />
            <Route path="courses/:id" element={<CourseFormPage />} />
            <Route path="courses/:id/edit" element={<CourseFormPage />} />

            {/* Calificaciones */}
            <Route path="grades" element={<Grades />} />
            <Route path="grades/new" element={<Grades />} />
            <Route path="grades/reports" element={<GradeReports />} />

            {/* Asistencia */}
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/take" element={<Attendance />} />
            <Route path="attendance/reports" element={<AttendanceReports />} />

            {/* Configuración general */}
            <Route path="settings" element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />

            {/* ============================================ */}
            /* RUTAS MODO DIRECCIÓN (Matrícula)             */
            {/* ============================================ */}
            <Route path="direccion" element={<MatriculaLayout />}>
              <Route index element={<Navigate to="matricula/configuracion" replace />} />
              
              <Route path="dashboard" element={<Navigate to="matricula/configuracion" replace />} />
              
              <Route path="matricula" element={<Navigate to="configuracion" replace />} />
              <Route path="matricula/configuracion" element={<ConfiguracionPage />} />
              <Route path="matricula/configuracion/jornadas" element={<JornadasPage />} />
              <Route path="matricula/configuracion/grados" element={<GradosPage />} />
              <Route path="matricula/configuracion/secciones" element={<SeccionesPage />} />
              <Route path="matricula/configuracion/asignaturas" element={<AsignaturasPage />} />
              <Route path="matricula/configuracion/periodo" element={<ActivarPeriodoPage />} />
              <Route path="matricula/nueva" element={<NuevaMatriculaPage />} />
              {/* <Route path="matricula/asignar-seccion/:idEstudiante" element={<AsignarGradoSeccionPage />} /> */}
              <Route path="matricula/estudiantes" element={<Students />} /> {/* Reutilizar o crear específica */}
              
              {/* Reportes de dirección */}
              <Route path="reportes" element={<StudentReports />} />
              <Route path="profesores" element={<Teachers />} />
              <Route path="documentos" element={<Dashboard />} />
            </Route>

            {/* ============================================ */}
            /* RUTAS MODO DOCENTE (Por implementar)         */
            {/* ============================================ */}
            <Route path="docente" element={<Navigate to="/grades" replace />} />
            {/* Aquí agregarás las rutas específicas de docente */}

          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;