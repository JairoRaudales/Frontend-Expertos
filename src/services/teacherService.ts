// Servicio de Profesores
import type { 
  Teacher, 
  TeacherFormData, 
  PaginatedResponse, 
  PaginationParams, 
  FilterParams 
} from '@/types';

// Mock data para desarrollo
const mockTeachers: Teacher[] = [
  {
    id: '1',
    firstName: 'Roberto',
    lastName: 'Sánchez Vega',
    email: 'roberto.sanchez@escuela.com',
    phone: '555-1001',
    dateOfBirth: '1980-03-15',
    hireDate: '2018-08-01',
    department: 'Matemáticas',
    specialization: 'Álgebra y Cálculo',
    address: 'Calle Profesores 101',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=roberto',
    qualifications: ['Licenciatura en Matemáticas', 'Maestría en Educación'],
    subjects: ['Matemáticas I', 'Matemáticas II', 'Cálculo'],
  },
  {
    id: '2',
    firstName: 'Elena',
    lastName: 'Díaz Morales',
    email: 'elena.diaz@escuela.com',
    phone: '555-1002',
    dateOfBirth: '1985-07-22',
    hireDate: '2019-08-01',
    department: 'Ciencias',
    specialization: 'Biología y Química',
    address: 'Avenida Docentes 202',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    qualifications: ['Licenciatura en Biología', 'Doctorado en Ciencias'],
    subjects: ['Biología', 'Química', 'Ciencias Naturales'],
  },
  {
    id: '3',
    firstName: 'Miguel',
    lastName: 'Torres Ruiz',
    email: 'miguel.torres@escuela.com',
    phone: '555-1003',
    dateOfBirth: '1978-11-30',
    hireDate: '2015-08-01',
    department: 'Humanidades',
    specialization: 'Literatura y Lengua',
    address: 'Calle Maestros 303',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miguel',
    qualifications: ['Licenciatura en Letras', 'Maestría en Literatura'],
    subjects: ['Lengua y Literatura', 'Gramática', 'Redacción'],
  },
  {
    id: '4',
    firstName: 'Carmen',
    lastName: 'López García',
    email: 'carmen.lopez@escuela.com',
    phone: '555-1004',
    dateOfBirth: '1982-05-18',
    hireDate: '2020-08-01',
    department: 'Idiomas',
    specialization: 'Inglés como Segunda Lengua',
    address: 'Plaza Educación 404',
    status: 'on_leave',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carmen',
    qualifications: ['Licenciatura en Idiomas', 'Certificación TEFL'],
    subjects: ['Inglés I', 'Inglés II', 'Conversación'],
  },
  {
    id: '5',
    firstName: 'José',
    lastName: 'Martínez Hernández',
    email: 'jose.martinez@escuela.com',
    phone: '555-1005',
    dateOfBirth: '1975-09-08',
    hireDate: '2010-08-01',
    department: 'Historia',
    specialization: 'Historia Universal',
    address: 'Avenida Historia 505',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jose',
    qualifications: ['Licenciatura en Historia', 'Maestría en Historia Contemporánea'],
    subjects: ['Historia Universal', 'Historia del País', 'Geografía'],
  },
];

export const teacherService = {
  // Obtener todos los profesores con paginación y filtros
  getTeachers: async (
    params?: PaginationParams & FilterParams
  ): Promise<PaginatedResponse<Teacher>> => {
    // return apiRequest<PaginatedResponse<Teacher>>('get', '/teachers', null, { params });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockTeachers];
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(t => 
            t.firstName.toLowerCase().includes(search) ||
            t.lastName.toLowerCase().includes(search) ||
            t.email.toLowerCase().includes(search) ||
            t.department.toLowerCase().includes(search)
          );
        }
        
        if (params?.status) {
          filtered = filtered.filter(t => t.status === params.status);
        }
        
        if (params?.department) {
          filtered = filtered.filter(t => t.department === params.department);
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

  // Obtener un profesor por ID
  getTeacherById: async (id: string): Promise<Teacher> => {
    // return apiRequest<Teacher>('get', `/teachers/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const teacher = mockTeachers.find(t => t.id === id);
        if (teacher) {
          resolve(teacher);
        } else {
          reject(new Error('Profesor no encontrado'));
        }
      }, 300);
    });
  },

  // Crear profesor
  createTeacher: async (data: TeacherFormData): Promise<Teacher> => {
    // return apiRequest<Teacher>('post', '/teachers', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTeacher: Teacher = {
          id: String(Date.now()),
          ...data,
          hireDate: new Date().toISOString().split('T')[0],
          status: 'active',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          qualifications: [],
          subjects: [],
        };
        mockTeachers.push(newTeacher);
        resolve(newTeacher);
      }, 300);
    });
  },

  // Actualizar profesor
  updateTeacher: async (id: string, data: Partial<TeacherFormData>): Promise<Teacher> => {
    // return apiRequest<Teacher>('put', `/teachers/${id}`, data);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTeachers.findIndex(t => t.id === id);
        if (index !== -1) {
          mockTeachers[index] = { ...mockTeachers[index], ...data };
          resolve(mockTeachers[index]);
        } else {
          reject(new Error('Profesor no encontrado'));
        }
      }, 300);
    });
  },

  // Eliminar profesor
  deleteTeacher: async (id: string): Promise<void> => {
    // return apiRequest<void>('delete', `/teachers/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTeachers.findIndex(t => t.id === id);
        if (index !== -1) {
          mockTeachers.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Profesor no encontrado'));
        }
      }, 300);
    });
  },

  // Cambiar estado del profesor
  changeStatus: async (id: string, status: Teacher['status']): Promise<Teacher> => {
    // return apiRequest<Teacher>('patch', `/teachers/${id}/status`, { status });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTeachers.findIndex(t => t.id === id);
        if (index !== -1) {
          mockTeachers[index].status = status;
          resolve(mockTeachers[index]);
        } else {
          reject(new Error('Profesor no encontrado'));
        }
      }, 300);
    });
  },

  // Obtener todos los departamentos
  getDepartments: async (): Promise<string[]> => {
    // return apiRequest<string[]>('get', '/teachers/departments');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const departments = [...new Set(mockTeachers.map(t => t.department))];
        resolve(departments);
      }, 300);
    });
  },

  // Obtener estadísticas de profesores
  getTeacherStats: async (): Promise<{
    total: number;
    active: number;
    onLeave: number;
    byDepartment: Record<string, number>;
  }> => {
    // return apiRequest('get', '/teachers/stats');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const byDepartment: Record<string, number> = {};
        mockTeachers.forEach(t => {
          byDepartment[t.department] = (byDepartment[t.department] || 0) + 1;
        });
        
        resolve({
          total: mockTeachers.length,
          active: mockTeachers.filter(t => t.status === 'active').length,
          onLeave: mockTeachers.filter(t => t.status === 'on_leave').length,
          byDepartment,
        });
      }, 300);
    });
  },
};
