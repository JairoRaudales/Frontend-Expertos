// Servicio de Cursos
import type { 
  Course, 
  CourseFormData, 
  PaginatedResponse, 
  PaginationParams, 
  FilterParams 
} from '@/types';

// Mock data para desarrollo
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Matemáticas I',
    code: 'MAT101',
    description: 'Introducción al álgebra y funciones',
    department: 'Matemáticas',
    credits: 4,
    hoursPerWeek: 5,
    teacherId: '1',
    teacherName: 'Roberto Sánchez Vega',
    grade: '9',
    section: 'A',
    schedule: [
      { day: 'monday', startTime: '08:00', endTime: '09:30', classroom: 'A-101' },
      { day: 'wednesday', startTime: '08:00', endTime: '09:30', classroom: 'A-101' },
    ],
    status: 'active',
    maxStudents: 30,
    enrolledStudents: 28,
  },
  {
    id: '2',
    name: 'Biología General',
    code: 'BIO101',
    description: 'Estudio de los seres vivos y sus procesos',
    department: 'Ciencias',
    credits: 3,
    hoursPerWeek: 4,
    teacherId: '2',
    teacherName: 'Elena Díaz Morales',
    grade: '9',
    section: 'B',
    schedule: [
      { day: 'tuesday', startTime: '10:00', endTime: '11:30', classroom: 'L-201' },
      { day: 'thursday', startTime: '10:00', endTime: '11:30', classroom: 'L-201' },
    ],
    status: 'active',
    maxStudents: 25,
    enrolledStudents: 24,
  },
  {
    id: '3',
    name: 'Lengua y Literatura',
    code: 'LEN101',
    description: 'Análisis literario y comprensión lectora',
    department: 'Humanidades',
    credits: 4,
    hoursPerWeek: 5,
    teacherId: '3',
    teacherName: 'Miguel Torres Ruiz',
    grade: '10',
    section: 'A',
    schedule: [
      { day: 'monday', startTime: '10:00', endTime: '11:30', classroom: 'A-102' },
      { day: 'friday', startTime: '10:00', endTime: '11:30', classroom: 'A-102' },
    ],
    status: 'active',
    maxStudents: 35,
    enrolledStudents: 32,
  },
  {
    id: '4',
    name: 'Inglés I',
    code: 'ING101',
    description: 'Inglés básico para principiantes',
    department: 'Idiomas',
    credits: 3,
    hoursPerWeek: 4,
    teacherId: '4',
    teacherName: 'Carmen López García',
    grade: '9',
    section: 'A',
    schedule: [
      { day: 'wednesday', startTime: '14:00', endTime: '15:30', classroom: 'A-103' },
      { day: 'friday', startTime: '14:00', endTime: '15:30', classroom: 'A-103' },
    ],
    status: 'active',
    maxStudents: 20,
    enrolledStudents: 18,
  },
  {
    id: '5',
    name: 'Historia Universal',
    code: 'HIS101',
    description: 'Historia mundial desde la antigüedad',
    department: 'Historia',
    credits: 3,
    hoursPerWeek: 4,
    teacherId: '5',
    teacherName: 'José Martínez Hernández',
    grade: '10',
    section: 'B',
    schedule: [
      { day: 'tuesday', startTime: '08:00', endTime: '09:30', classroom: 'A-104' },
      { day: 'thursday', startTime: '08:00', endTime: '09:30', classroom: 'A-104' },
    ],
    status: 'active',
    maxStudents: 30,
    enrolledStudents: 29,
  },
];

export const courseService = {
  // Obtener todos los cursos con paginación y filtros
  getCourses: async (
    params?: PaginationParams & FilterParams
  ): Promise<PaginatedResponse<Course>> => {
    // return apiRequest<PaginatedResponse<Course>>('get', '/courses', null, { params });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockCourses];
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(search) ||
            c.code.toLowerCase().includes(search) ||
            c.teacherName?.toLowerCase().includes(search)
          );
        }
        
        if (params?.status) {
          filtered = filtered.filter(c => c.status === params.status);
        }
        
        if (params?.department) {
          filtered = filtered.filter(c => c.department === params.department);
        }
        
        if (params?.grade) {
          filtered = filtered.filter(c => c.grade === params.grade);
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

  // Obtener un curso por ID
  getCourseById: async (id: string): Promise<Course> => {
    // return apiRequest<Course>('get', `/courses/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const course = mockCourses.find(c => c.id === id);
        if (course) {
          resolve(course);
        } else {
          reject(new Error('Curso no encontrado'));
        }
      }, 300);
    });
  },

  // Crear curso
  createCourse: async (data: CourseFormData): Promise<Course> => {
    // return apiRequest<Course>('post', '/courses', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCourse: Course = {
          id: String(Date.now()),
          ...data,
          enrolledStudents: 0,
          status: 'active',
        };
        mockCourses.push(newCourse);
        resolve(newCourse);
      }, 300);
    });
  },

  // Actualizar curso
  updateCourse: async (id: string, data: Partial<CourseFormData>): Promise<Course> => {
    // return apiRequest<Course>('put', `/courses/${id}`, data);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCourses.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCourses[index] = { ...mockCourses[index], ...data };
          resolve(mockCourses[index]);
        } else {
          reject(new Error('Curso no encontrado'));
        }
      }, 300);
    });
  },

  // Eliminar curso
  deleteCourse: async (id: string): Promise<void> => {
    // return apiRequest<void>('delete', `/courses/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCourses.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCourses.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Curso no encontrado'));
        }
      }, 300);
    });
  },

  // Cambiar estado del curso
  changeStatus: async (id: string, status: Course['status']): Promise<Course> => {
    // return apiRequest<Course>('patch', `/courses/${id}/status`, { status });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCourses.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCourses[index].status = status;
          resolve(mockCourses[index]);
        } else {
          reject(new Error('Curso no encontrado'));
        }
      }, 300);
    });
  },

  // Asignar profesor a curso
  assignTeacher: async (courseId: string, teacherId: string, teacherName: string): Promise<Course> => {
    // return apiRequest<Course>('patch', `/courses/${courseId}/teacher`, { teacherId, teacherName });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCourses.findIndex(c => c.id === courseId);
        if (index !== -1) {
          mockCourses[index].teacherId = teacherId;
          mockCourses[index].teacherName = teacherName;
          resolve(mockCourses[index]);
        } else {
          reject(new Error('Curso no encontrado'));
        }
      }, 300);
    });
  },

  // Obtener cursos por profesor
  getCoursesByTeacher: async (teacherId: string): Promise<Course[]> => {
    // return apiRequest<Course[]>('get', `/teachers/${teacherId}/courses`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const courses = mockCourses.filter(c => c.teacherId === teacherId);
        resolve(courses);
      }, 300);
    });
  },

  // Obtener cursos por grado y sección
  getCoursesByGrade: async (grade: string, section?: string): Promise<Course[]> => {
    // return apiRequest<Course[]>('get', `/courses/grade/${grade}`, null, { params: { section } });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let courses = mockCourses.filter(c => c.grade === grade);
        if (section) {
          courses = courses.filter(c => c.section === section);
        }
        resolve(courses);
      }, 300);
    });
  },

  // Obtener estadísticas de cursos
  getCourseStats: async (): Promise<{
    total: number;
    active: number;
    byDepartment: Record<string, number>;
    totalEnrolled: number;
  }> => {
    // return apiRequest('get', '/courses/stats');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const byDepartment: Record<string, number> = {};
        let totalEnrolled = 0;
        
        mockCourses.forEach(c => {
          byDepartment[c.department] = (byDepartment[c.department] || 0) + 1;
          totalEnrolled += c.enrolledStudents || 0;
        });
        
        resolve({
          total: mockCourses.length,
          active: mockCourses.filter(c => c.status === 'active').length,
          byDepartment,
          totalEnrolled,
        });
      }, 300);
    });
  },
};
