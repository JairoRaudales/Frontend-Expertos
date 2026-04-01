// Tipos para el Sistema Administrativo Escolar

// Usuario y Autenticación
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'staff';
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Estudiante
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  enrollmentDate: string;
  grade: string;
  section: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  avatar?: string;
  notes?: string;
}

// Profesor
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  hireDate: string;
  department: string;
  specialization?: string;
  address?: string;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  qualifications?: string[];
  subjects?: string[];
}

// Curso/Materia
export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  department: string;
  credits: number;
  hoursPerWeek: number;
  teacherId?: string;
  teacherName?: string;
  grade: string;
  section: string;
  schedule?: ScheduleItem[];
  status: 'active' | 'inactive';
  maxStudents: number;
  enrolledStudents?: number;
}

export interface ScheduleItem {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  startTime: string;
  endTime: string;
  classroom?: string;
}

// Clase (Grupo/Sección)
export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  classroom?: string;
  capacity: number;
  enrolledStudents: number;
  homeroomTeacherId?: string;
  homeroomTeacherName?: string;
  academicYear: string;
}

// Calificación
export interface Grade {
  id: string;
  studentId: string;
  studentName?: string;
  courseId: string;
  courseName?: string;
  teacherId?: string;
  evaluationType: 'exam' | 'quiz' | 'assignment' | 'project' | 'participation' | 'final';
  evaluationName: string;
  score: number;
  maxScore: number;
  percentage?: number;
  period: string;
  date: string;
  comments?: string;
}

// Asistencia
export interface Attendance {
  id: string;
  studentId: string;
  studentName?: string;
  courseId?: string;
  courseName?: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  recordedBy?: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
  percentage: number;
}

// Dashboard
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalClasses: number;
  attendanceRate: number;
  averageGrade: number;
  newEnrollments: number;
  pendingTasks: number;
}

export interface RecentActivity {
  id: string;
  type: 'enrollment' | 'grade' | 'attendance' | 'announcement' | 'task';
  description: string;
  user?: string;
  timestamp: string;
  icon?: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

// Paginación y Filtros
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  grade?: string;
  section?: string;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Notificación
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

// Configuración
export interface SchoolConfig {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  academicYear: string;
  gradingScale: GradingScale[];
  attendanceThreshold: number;
}

export interface GradingScale {
  min: number;
  max: number;
  grade: string;
  description: string;
}

// Formularios
export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  grade: string;
  section: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  notes?: string;
}

export interface TeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  department: string;
  specialization?: string;
  address?: string;
  qualifications?: string[];
}

export interface CourseFormData {
  name: string;
  code: string;
  description?: string;
  department: string;
  credits: number;
  hoursPerWeek: number;
  teacherId?: string;
  grade: string;
  section: string;
  maxStudents: number;
}
