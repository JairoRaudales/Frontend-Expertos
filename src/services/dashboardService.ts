// Servicio de Dashboard
import type { DashboardStats, RecentActivity, ChartData } from '@/types';

// Mock data para desarrollo
const mockStats: DashboardStats = {
  totalStudents: 1250,
  totalTeachers: 45,
  totalCourses: 78,
  totalClasses: 32,
  attendanceRate: 94.5,
  averageGrade: 82.3,
  newEnrollments: 45,
  pendingTasks: 12,
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'enrollment',
    description: 'Nuevo estudiante inscrito: Pedro Gómez',
    user: 'Administrador',
    timestamp: '2024-03-18T10:30:00Z',
  },
  {
    id: '2',
    type: 'grade',
    description: 'Calificaciones subidas: Matemáticas I',
    user: 'Roberto Sánchez',
    timestamp: '2024-03-18T09:15:00Z',
  },
  {
    id: '3',
    type: 'attendance',
    description: 'Asistencia registrada: 10° Grado A',
    user: 'Elena Díaz',
    timestamp: '2024-03-18T08:45:00Z',
  },
  {
    id: '4',
    type: 'announcement',
    description: 'Nuevo anuncio: Reunión de padres',
    user: 'Director',
    timestamp: '2024-03-17T16:00:00Z',
  },
  {
    id: '5',
    type: 'task',
    description: 'Tarea pendiente: Reporte mensual',
    user: 'Sistema',
    timestamp: '2024-03-17T12:00:00Z',
  },
];

const mockEnrollmentData: ChartData[] = [
  { name: 'Ene', value: 12, lastYear: 8 },
  { name: 'Feb', value: 15, lastYear: 10 },
  { name: 'Mar', value: 18, lastYear: 14 },
  { name: 'Abr', value: 22, lastYear: 18 },
  { name: 'May', value: 25, lastYear: 20 },
  { name: 'Jun', value: 30, lastYear: 25 },
];

const mockGradeDistribution: ChartData[] = [
  { name: '90-100', value: 245, label: 'Excelente' },
  { name: '80-89', value: 380, label: 'Muy Bueno' },
  { name: '70-79', value: 320, label: 'Bueno' },
  { name: '60-69', value: 185, label: 'Regular' },
  { name: '0-59', value: 120, label: 'Necesita Mejorar' },
];

const mockAttendanceByGrade: ChartData[] = [
  { name: '9°', value: 96.2 },
  { name: '10°', value: 94.8 },
  { name: '11°', value: 93.5 },
  { name: '12°', value: 95.1 },
];

const mockStudentsByGrade: ChartData[] = [
  { name: '9°', value: 320, male: 160, female: 160 },
  { name: '10°', value: 310, male: 155, female: 155 },
  { name: '11°', value: 315, male: 158, female: 157 },
  { name: '12°', value: 305, male: 152, female: 153 },
];

export const dashboardService = {
  // Obtener estadísticas del dashboard
  getStats: async (): Promise<DashboardStats> => {
    // return apiRequest<DashboardStats>('get', '/dashboard/stats');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStats);
      }, 300);
    });
  },

  // Obtener actividad reciente
  getRecentActivity: async (limit: number = 10): Promise<RecentActivity[]> => {
    // return apiRequest<RecentActivity[]>('get', '/dashboard/activity', null, { params: { limit } });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRecentActivity.slice(0, limit));
      }, 300);
    });
  },

  // Obtener datos de inscripciones para gráfico
  getEnrollmentData: async (): Promise<ChartData[]> => {
    // return apiRequest<ChartData[]>('get', '/dashboard/charts/enrollment', null, { params: { period } });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEnrollmentData);
      }, 300);
    });
  },

  // Obtener distribución de calificaciones
  getGradeDistribution: async (): Promise<ChartData[]> => {
    // return apiRequest<ChartData[]>('get', '/dashboard/charts/grades');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGradeDistribution);
      }, 300);
    });
  },

  // Obtener asistencia por grado
  getAttendanceByGrade: async (): Promise<ChartData[]> => {
    // return apiRequest<ChartData[]>('get', '/dashboard/charts/attendance');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAttendanceByGrade);
      }, 300);
    });
  },

  // Obtener estudiantes por grado
  getStudentsByGrade: async (): Promise<ChartData[]> => {
    // return apiRequest<ChartData[]>('get', '/dashboard/charts/students');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStudentsByGrade);
      }, 300);
    });
  },

  // Obtener todos los datos del dashboard
  getDashboardData: async (): Promise<{
    stats: DashboardStats;
    recentActivity: RecentActivity[];
    charts: {
      enrollment: ChartData[];
      gradeDistribution: ChartData[];
      attendanceByGrade: ChartData[];
      studentsByGrade: ChartData[];
    };
  }> => {
    // const [stats, recentActivity, charts] = await Promise.all([
    //   dashboardService.getStats(),
    //   dashboardService.getRecentActivity(),
    //   Promise.all([
    //     dashboardService.getEnrollmentData(),
    //     dashboardService.getGradeDistribution(),
    //     dashboardService.getAttendanceByGrade(),
    //     dashboardService.getStudentsByGrade(),
    //   ]),
    // ]);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: mockStats,
          recentActivity: mockRecentActivity,
          charts: {
            enrollment: mockEnrollmentData,
            gradeDistribution: mockGradeDistribution,
            attendanceByGrade: mockAttendanceByGrade,
            studentsByGrade: mockStudentsByGrade,
          },
        });
      }, 500);
    });
  },
};
