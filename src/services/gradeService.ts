// Servicio de Calificaciones
import type { 
  Grade, 
  PaginatedResponse, 
  PaginationParams, 
  FilterParams 
} from '@/types';

// Mock data para desarrollo
const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Juan Pérez García',
    courseId: '1',
    courseName: 'Matemáticas I',
    teacherId: '1',
    evaluationType: 'exam',
    evaluationName: 'Primer Parcial',
    score: 85,
    maxScore: 100,
    percentage: 85,
    period: '2024-1',
    date: '2024-03-15',
    comments: 'Buen desempeño general',
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Juan Pérez García',
    courseId: '1',
    courseName: 'Matemáticas I',
    teacherId: '1',
    evaluationType: 'quiz',
    evaluationName: 'Quiz 1',
    score: 90,
    maxScore: 100,
    percentage: 90,
    period: '2024-1',
    date: '2024-02-20',
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Ana Martínez López',
    courseId: '2',
    courseName: 'Biología General',
    teacherId: '2',
    evaluationType: 'exam',
    evaluationName: 'Primer Parcial',
    score: 92,
    maxScore: 100,
    percentage: 92,
    period: '2024-1',
    date: '2024-03-16',
    comments: 'Excelente trabajo',
  },
  {
    id: '4',
    studentId: '3',
    studentName: 'Luis Hernández Ruiz',
    courseId: '3',
    courseName: 'Lengua y Literatura',
    teacherId: '3',
    evaluationType: 'project',
    evaluationName: 'Ensayo Literario',
    score: 78,
    maxScore: 100,
    percentage: 78,
    period: '2024-1',
    date: '2024-03-10',
    comments: 'Necesita mejorar la estructura',
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Carlos Rodríguez Torres',
    courseId: '5',
    courseName: 'Historia Universal',
    teacherId: '5',
    evaluationType: 'final',
    evaluationName: 'Examen Final',
    score: 88,
    maxScore: 100,
    percentage: 88,
    period: '2023-2',
    date: '2023-11-20',
  },
];

export const gradeService = {
  // Obtener todas las calificaciones con paginación y filtros
  getGrades: async (
    params?: PaginationParams & FilterParams & { studentId?: string; courseId?: string }
  ): Promise<PaginatedResponse<Grade>> => {
    // return apiRequest<PaginatedResponse<Grade>>('get', '/grades', null, { params });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockGrades];
        
        if (params?.studentId) {
          filtered = filtered.filter(g => g.studentId === params.studentId);
        }
        
        if (params?.courseId) {
          filtered = filtered.filter(g => g.courseId === params.courseId);
        }
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(g => 
            g.studentName?.toLowerCase().includes(search) ||
            g.courseName?.toLowerCase().includes(search) ||
            g.evaluationName.toLowerCase().includes(search)
          );
        }
        
        if (params?.dateFrom) {
          filtered = filtered.filter(g => g.date >= params.dateFrom!);
        }
        
        if (params?.dateTo) {
          filtered = filtered.filter(g => g.date <= params.dateTo!);
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

  // Obtener una calificación por ID
  getGradeById: async (id: string): Promise<Grade> => {
    // return apiRequest<Grade>('get', `/grades/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const grade = mockGrades.find(g => g.id === id);
        if (grade) {
          resolve(grade);
        } else {
          reject(new Error('Calificación no encontrada'));
        }
      }, 300);
    });
  },

  // Crear calificación
  createGrade: async (data: Omit<Grade, 'id' | 'percentage'>): Promise<Grade> => {
    // return apiRequest<Grade>('post', '/grades', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const percentage = (data.score / data.maxScore) * 100;
        const newGrade: Grade = {
          id: String(Date.now()),
          ...data,
          percentage: Math.round(percentage * 100) / 100,
        };
        mockGrades.push(newGrade);
        resolve(newGrade);
      }, 300);
    });
  },

  // Actualizar calificación
  updateGrade: async (id: string, data: Partial<Grade>): Promise<Grade> => {
    // return apiRequest<Grade>('put', `/grades/${id}`, data);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockGrades.findIndex(g => g.id === id);
        if (index !== -1) {
          mockGrades[index] = { ...mockGrades[index], ...data };
          if (data.score && data.maxScore) {
            mockGrades[index].percentage = Math.round((data.score / data.maxScore) * 100 * 100) / 100;
          }
          resolve(mockGrades[index]);
        } else {
          reject(new Error('Calificación no encontrada'));
        }
      }, 300);
    });
  },

  // Eliminar calificación
  deleteGrade: async (id: string): Promise<void> => {
    // return apiRequest<void>('delete', `/grades/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockGrades.findIndex(g => g.id === id);
        if (index !== -1) {
          mockGrades.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Calificación no encontrada'));
        }
      }, 300);
    });
  },

  // Obtener calificaciones por estudiante
  getGradesByStudent: async (studentId: string): Promise<Grade[]> => {
    // return apiRequest<Grade[]>('get', `/students/${studentId}/grades`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const grades = mockGrades.filter(g => g.studentId === studentId);
        resolve(grades);
      }, 300);
    });
  },

  // Obtener calificaciones por curso
  getGradesByCourse: async (courseId: string): Promise<Grade[]> => {
    // return apiRequest<Grade[]>('get', `/courses/${courseId}/grades`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const grades = mockGrades.filter(g => g.courseId === courseId);
        resolve(grades);
      }, 300);
    });
  },

  // Obtener promedio de calificaciones
  getAverageGrade: async (
    studentId?: string, 
    courseId?: string, 
    period?: string
  ): Promise<{ average: number; total: number }> => {
    // return apiRequest('get', '/grades/average', null, { params: { studentId, courseId, period } });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockGrades];
        
        if (studentId) {
          filtered = filtered.filter(g => g.studentId === studentId);
        }
        
        if (courseId) {
          filtered = filtered.filter(g => g.courseId === courseId);
        }
        
        if (period) {
          filtered = filtered.filter(g => g.period === period);
        }
        
        const total = filtered.length;
        const average = total > 0 
          ? filtered.reduce((sum, g) => sum + (g.percentage || 0), 0) / total 
          : 0;
        
        resolve({
          average: Math.round(average * 100) / 100,
          total,
        });
      }, 300);
    });
  },

  // Obtener estadísticas de calificaciones
  getGradeStats: async (): Promise<{
    total: number;
    average: number;
    byEvaluationType: Record<string, { count: number; average: number }>;
  }> => {
    // return apiRequest('get', '/grades/stats');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const byEvaluationType: Record<string, { count: number; average: number; sum: number }> = {};
        
        mockGrades.forEach(g => {
          if (!byEvaluationType[g.evaluationType]) {
            byEvaluationType[g.evaluationType] = { count: 0, average: 0, sum: 0 };
          }
          byEvaluationType[g.evaluationType].count++;
          byEvaluationType[g.evaluationType].sum += g.percentage || 0;
        });
        
        // Calcular promedios
        Object.keys(byEvaluationType).forEach(key => {
          const item = byEvaluationType[key];
          item.average = Math.round((item.sum / item.count) * 100) / 100;
        });
        
        const totalAverage = mockGrades.length > 0
          ? mockGrades.reduce((sum, g) => sum + (g.percentage || 0), 0) / mockGrades.length
          : 0;
        
        resolve({
          total: mockGrades.length,
          average: Math.round(totalAverage * 100) / 100,
          byEvaluationType: Object.fromEntries(
            Object.entries(byEvaluationType).map(([k, v]) => [k, { count: v.count, average: v.average }])
          ),
        });
      }, 300);
    });
  },
};
