import type { ModoTrabajo } from '@/store/modoStore';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  Settings,
  School,
  FileText,
  BarChart3,
  UserCheck,
//   PlusCircle,
//   Cog,
//   List,
} from 'lucide-react';

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

export const menusPorModo: Record<ModoTrabajo, MenuItem[]> = {
  admin: [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      title: 'Estudiantes',
      href: '/students',
      icon: Users,
      children: [
        { title: 'Lista de Estudiantes', href: '/students' },
        { title: 'Nuevo Estudiante', href: '/students/new' },
        { title: 'Reportes', href: '/students/reports' },
      ],
    },
    {
      title: 'Profesores',
      href: '/teachers',
      icon: GraduationCap,
      children: [
        { title: 'Lista de Profesores', href: '/teachers' },
        { title: 'Nuevo Profesor', href: '/teachers/new' },
        { title: 'Asignaciones', href: '/assignments' },
      ],
    },
    {
      title: 'Cursos',
      href: '/courses',
      icon: BookOpen,
      children: [
        { title: 'Lista de Cursos', href: '/courses' },
        { title: 'Nuevo Curso', href: '/courses/new' },
        { title: 'Horarios', href: '/schedules' },
      ],
    },
    {
      title: 'Calificaciones',
      href: '/grades',
      icon: ClipboardList,
      children: [
        { title: 'Registrar Calificación', href: '/grades/new' },
        { title: 'Reportes', href: '/grades/reports' },
      ],
    },
    {
      title: 'Asistencia',
      href: '/attendance',
      icon: CalendarCheck,
      children: [
        { title: 'Tomar Asistencia', href: '/attendance/take' },
        { title: 'Reportes', href: '/attendance/reports' },
      ],
    },
    { title: 'Configuración', href: '/settings', icon: Settings },
  ],
  
  direccion: [
    { title: 'Dashboard', href: '/direccion/dashboard', icon: LayoutDashboard },
    {
      title: 'Matrícula',
      href: '/direccion/matricula/configuracion',
      icon: School,
      children: [
        { title: 'Configuración', href: '/direccion/matricula/configuracion' },
        { title: 'Nueva Matrícula', href: '/direccion/matricula/nueva' },
        { title: 'Estudiantes Matriculados', href: '/direccion/matricula/estudiantes' },
      ],
    },
    { title: 'Reportes', href: '/direccion/reportes', icon: BarChart3 },
    { title: 'Profesores', href: '/direccion/profesores', icon: UserCheck },
    { title: 'Documentos', href: '/direccion/documentos', icon: FileText },
  ],
  
  docente: [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Mis Asignaturas', href: '/courses', icon: BookOpen },
    { title: 'Calificaciones', href: '/grades', icon: ClipboardList },
    { title: 'Asistencia', href: '/attendance', icon: CalendarCheck },
    { title: 'Estudiantes', href: '/students', icon: Users },
  ],
};