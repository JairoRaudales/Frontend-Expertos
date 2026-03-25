// Servicio de Estudiantes
import type { 
  Student, 
  StudentFormData, 
  PaginatedResponse, 
  PaginationParams, 
  FilterParams 
} from '@/types';

// Mock data para desarrollo
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez García',
    email: 'juan.perez@estudiante.com',
    phone: '555-0101',
    dateOfBirth: '2008-05-15',
    enrollmentDate: '2023-08-01',
    grade: '10',
    section: 'A',
    address: 'Calle Principal 123',
    guardianName: 'María García',
    guardianPhone: '555-0201',
    guardianEmail: 'maria.garcia@email.com',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
  },
  {
    id: '2',
    firstName: 'Ana',
    lastName: 'Martínez López',
    email: 'ana.martinez@estudiante.com',
    phone: '555-0102',
    dateOfBirth: '2009-03-22',
    enrollmentDate: '2023-08-01',
    grade: '9',
    section: 'B',
    address: 'Avenida Central 456',
    guardianName: 'Carlos Martínez',
    guardianPhone: '555-0202',
    guardianEmail: 'carlos.martinez@email.com',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
  },
  {
    id: '3',
    firstName: 'Luis',
    lastName: 'Hernández Ruiz',
    email: 'luis.hernandez@estudiante.com',
    phone: '555-0103',
    dateOfBirth: '2007-11-08',
    enrollmentDate: '2022-08-01',
    grade: '11',
    section: 'A',
    address: 'Plaza Mayor 789',
    guardianName: 'Laura Ruiz',
    guardianPhone: '555-0203',
    guardianEmail: 'laura.ruiz@email.com',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luis',
  },
  {
    id: '4',
    firstName: 'María',
    lastName: 'González Silva',
    email: 'maria.gonzalez@estudiante.com',
    phone: '555-0104',
    dateOfBirth: '2008-07-30',
    enrollmentDate: '2023-08-01',
    grade: '10',
    section: 'C',
    address: 'Calle Secundaria 321',
    guardianName: 'Pedro González',
    guardianPhone: '555-0204',
    guardianEmail: 'pedro.gonzalez@email.com',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
  },
  {
    id: '5',
    firstName: 'Carlos',
    lastName: 'Rodríguez Torres',
    email: 'carlos.rodriguez@estudiante.com',
    phone: '555-0105',
    dateOfBirth: '2006-09-12',
    enrollmentDate: '2021-08-01',
    grade: '12',
    section: 'A',
    address: 'Avenida Norte 654',
    guardianName: 'Sofía Torres',
    guardianPhone: '555-0205',
    guardianEmail: 'sofia.torres@email.com',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
  },
];

export const studentService = {
  // Obtener todos los estudiantes con paginación y filtros
  getStudents: async (
    params?: PaginationParams & FilterParams
  ): Promise<PaginatedResponse<Student>> => {
    // return apiRequest<PaginatedResponse<Student>>('get', '/students', null, { params });
    
    // Mock para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockStudents];
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(s => 
            s.firstName.toLowerCase().includes(search) ||
            s.lastName.toLowerCase().includes(search) ||
            s.email.toLowerCase().includes(search)
          );
        }
        
        if (params?.status) {
          filtered = filtered.filter(s => s.status === params.status);
        }
        
        if (params?.grade) {
          filtered = filtered.filter(s => s.grade === params.grade);
        }
        
        if (params?.section) {
          filtered = filtered.filter(s => s.section === params.section);
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

  // Obtener un estudiante por ID
  getStudentById: async (id: string): Promise<Student> => {
    // return apiRequest<Student>('get', `/students/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const student = mockStudents.find(s => s.id === id);
        if (student) {
          resolve(student);
        } else {
          reject(new Error('Estudiante no encontrado'));
        }
      }, 300);
    });
  },

  // Crear estudiante
  createStudent: async (data: StudentFormData): Promise<Student> => {
    // return apiRequest<Student>('post', '/students', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent: Student = {
          id: String(Date.now()),
          ...data,
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        };
        mockStudents.push(newStudent);
        resolve(newStudent);
      }, 300);
    });
  },

  // Actualizar estudiante
  updateStudent: async (id: string, data: Partial<StudentFormData>): Promise<Student> => {
    // return apiRequest<Student>('put', `/students/${id}`, data);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockStudents.findIndex(s => s.id === id);
        if (index !== -1) {
          mockStudents[index] = { ...mockStudents[index], ...data };
          resolve(mockStudents[index]);
        } else {
          reject(new Error('Estudiante no encontrado'));
        }
      }, 300);
    });
  },

  // Eliminar estudiante
  deleteStudent: async (id: string): Promise<void> => {
    // return apiRequest<void>('delete', `/students/${id}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockStudents.findIndex(s => s.id === id);
        if (index !== -1) {
          mockStudents.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Estudiante no encontrado'));
        }
      }, 300);
    });
  },

  // Cambiar estado del estudiante
  changeStatus: async (id: string, status: Student['status']): Promise<Student> => {
    // return apiRequest<Student>('patch', `/students/${id}/status`, { status });
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockStudents.findIndex(s => s.id === id);
        if (index !== -1) {
          mockStudents[index].status = status;
          resolve(mockStudents[index]);
        } else {
          reject(new Error('Estudiante no encontrado'));
        }
      }, 300);
    });
  },

  // Obtener estadísticas de estudiantes
  getStudentStats: async (): Promise<{
    total: number;
    active: number;
    inactive: number;
    byGrade: Record<string, number>;
  }> => {
    // return apiRequest('get', '/students/stats');
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const byGrade: Record<string, number> = {};
        mockStudents.forEach(s => {
          byGrade[s.grade] = (byGrade[s.grade] || 0) + 1;
        });
        
        resolve({
          total: mockStudents.length,
          active: mockStudents.filter(s => s.status === 'active').length,
          inactive: mockStudents.filter(s => s.status === 'inactive').length,
          byGrade,
        });
      }, 300);
    });
  },
};
