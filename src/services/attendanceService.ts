// Servicio de Asistencia
import type { 
  Attendance, 
  AttendanceStats, 
  PaginatedResponse, 
  PaginationParams, 
  FilterParams 
} from '@/types';

// Mock data para desarrollo
const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Juan Pérez García',
    courseId: '1',
    courseName: 'Matemáticas I',
    date: '2024-03-18',
    status: 'present',
    recordedBy: '1',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Ana Martínez López',
    courseId: '2',
    courseName: 'Biología General',
    date: '2024-03-18',
    status: 'present',
    recordedBy: '2',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Luis Hernández Ruiz',
    courseId: '3',
    courseName: 'Lengua y Literatura',
    date: '2024-03-18',
    status: 'late',
    notes: 'Llegó 15 minutos tarde',
    recordedBy: '3',
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'María González Silva',
    courseId: '1',
    courseName: 'Matemáticas I',
    date: '2024-03-18',
    status: 'absent',
    recordedBy: '1',
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Carlos Rodríguez Torres',
    courseId: '5',
    courseName: 'Historia Universal',
    date: '2024-03-18',
    status: 'excused',
    notes: 'Cita médica',
    recordedBy: '5',
  },
];

export const attendanceService = {
  // Obtener todas las asistencias con paginación y filtros
  getAttendance: async (
    params?: PaginationParams & FilterParams & { studentId?: string; courseId?: string; date?: string }
  ): Promise<PaginatedResponse<Attendance>> => {
    // return apiRequest<PaginatedResponse<Attendance>>('get', '/attendance', null, { params });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockAttendance];
        
        if (params?.studentId) {
          filtered = filtered.filter(a => a.studentId === params.studentId);
        }
        
        if (params?.courseId) {
          filtered = filtered.filter(a => a.courseId === params.courseId);
        }
        
        if (params?.date) {
          filtered = filtered.filter(a => a.date === params.date);
        }
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(a => 
            a.studentName?.toLowerCase().includes(search) ||
            a.courseName?.toLowerCase().includes(search)
          );
        }
        
        if (params?.status) {
          filtered = filtered.filter(a => a.status === params.status);
        }
        
        if (params?.dateFrom) {
          filtered = filtered.filter(a => a.date >= params.dateFrom!);
        }
        
        if (params?.dateTo) {
          filtered = filtered.filter(a => a.date <= params.dateTo!);
        }
        
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        
        resolve({
          data: filtered.slice(start, end),
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit),
        });
      }, 300);
    });
  },

  // Obtener una asistencia por ID
  getAttendanceById: async (id: string): Promise<Attendance> => {
    // return apiRequest<Attendance>('get', `/attendance/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const attendance = mockAttendance.find(a => a.id === id);
        if (attendance) {
          resolve(attendance);
        } else {
          reject(new Error('Registro de asistencia no encontrado'));
        }
      }, 300);
    });
  },

  // Crear registro de asistencia
  createAttendance: async (data: Omit<Attendance, 'id'>): Promise<Attendance> => {
    // return apiRequest<Attendance>('post', '/attendance', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAttendance: Attendance = {
          id: String(Date.now()),
          ...data,
        };
        mockAttendance.push(newAttendance);
        resolve(newAttendance);
      }, 300);
    });
  },

  // Crear múltiples registros de asistencia (para lista)
  createBulkAttendance: async (data: Omit<Attendance, 'id'>[]): Promise<Attendance[]> => {
    // return apiRequest<Attendance[]>('post', '/attendance/bulk', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecords: Attendance[] = data.map(item => ({
          id: String(Date.now() + Math.random()),
          ...item,
        }));
        mockAttendance.push(...newRecords);
        resolve(newRecords);
      }, 300);
    });
  },

  // Actualizar asistencia
  updateAttendance: async (id: string, data: Partial<Attendance>): Promise<Attendance> => {
    // return apiRequest<Attendance>('put', `/attendance/${id}`, data);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAttendance.findIndex(a => a.id === id);
        if (index !== -1) {
          mockAttendance[index] = { ...mockAttendance[index], ...data };
          resolve(mockAttendance[index]);
        } else {
          reject(new Error('Registro de asistencia no encontrado'));
        }
      }, 300);
    });
  },

  // Eliminar asistencia
  deleteAttendance: async (id: string): Promise<void> => {
    // return apiRequest<void>('delete', `/attendance/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAttendance.findIndex(a => a.id === id);
        if (index !== -1) {
          mockAttendance.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Registro de asistencia no encontrado'));
        }
      }, 300);
    });
  },

  // Obtener asistencia por estudiante
  getAttendanceByStudent: async (studentId: string): Promise<Attendance[]> => {
    // return apiRequest<Attendance[]>('get', `/students/${studentId}/attendance`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const attendance = mockAttendance.filter(a => a.studentId === studentId);
        resolve(attendance);
      }, 300);
    });
  },

  // Obtener asistencia por curso
  getAttendanceByCourse: async (courseId: string, date?: string): Promise<Attendance[]> => {
    // return apiRequest<Attendance[]>('get', `/courses/${courseId}/attendance`, null, { params: { date } });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let attendance = mockAttendance.filter(a => a.courseId === courseId);
        if (date) {
          attendance = attendance.filter(a => a.date === date);
        }
        resolve(attendance);
      }, 300);
    });
  },

  // Obtener estadísticas de asistencia
  getAttendanceStats: async (
    studentId?: string, 
    courseId?: string, 
    dateFrom?: string, 
    dateTo?: string
  ): Promise<AttendanceStats> => {
    // return apiRequest<AttendanceStats>('get', '/attendance/stats', null, { 
    //   params: { studentId, courseId, dateFrom, dateTo } 
    // });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockAttendance];
        
        if (studentId) {
          filtered = filtered.filter(a => a.studentId === studentId);
        }
        
        if (courseId) {
          filtered = filtered.filter(a => a.courseId === courseId);
        }
        
        if (dateFrom) {
          filtered = filtered.filter(a => a.date >= dateFrom);
        }
        
        if (dateTo) {
          filtered = filtered.filter(a => a.date <= dateTo);
        }
        
        const present = filtered.filter(a => a.status === 'present').length;
        const absent = filtered.filter(a => a.status === 'absent').length;
        const late = filtered.filter(a => a.status === 'late').length;
        const excused = filtered.filter(a => a.status === 'excused').length;
        const total = filtered.length;
        
        // Calcular porcentaje de asistencia (presente + justificado / total)
        const percentage = total > 0 
          ? ((present + excused) / total) * 100 
          : 0;
        
        resolve({
          present,
          absent,
          late,
          excused,
          total,
          percentage: Math.round(percentage * 100) / 100,
        });
      }, 300);
    });
  },

  // Obtener resumen de asistencia por fecha
  getDailySummary: async (date: string): Promise<{
    date: string;
    totalRecords: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    percentage: number;
  }> => {
    // return apiRequest('get', `/attendance/summary/${date}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const dayAttendance = mockAttendance.filter(a => a.date === date);
        const present = dayAttendance.filter(a => a.status === 'present').length;
        const absent = dayAttendance.filter(a => a.status === 'absent').length;
        const late = dayAttendance.filter(a => a.status === 'late').length;
        const excused = dayAttendance.filter(a => a.status === 'excused').length;
        const totalRecords = dayAttendance.length;
        
        const percentage = totalRecords > 0 
          ? ((present + excused) / totalRecords) * 100 
          : 0;
        
        resolve({
          date,
          totalRecords,
          present,
          absent,
          late,
          excused,
          percentage: Math.round(percentage * 100) / 100,
        });
      }, 300);
    });
  },
};
