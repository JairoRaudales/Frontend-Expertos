// Hook para manejar estudiantes con React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService } from '@/services';
import type { Student, StudentFormData, PaginationParams, FilterParams } from '@/types';

const STUDENTS_KEY = 'students';

export function useStudents(params?: PaginationParams & FilterParams) {
  return useQuery({
    queryKey: [STUDENTS_KEY, params],
    queryFn: () => studentService.getStudents(params),
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: [STUDENTS_KEY, id],
    queryFn: () => studentService.getStudentById(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: StudentFormData) => studentService.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudentFormData> }) =>
      studentService.updateStudent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY, variables.id] });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => studentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] });
    },
  });
}

export function useChangeStudentStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Student['status'] }) =>
      studentService.changeStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY, variables.id] });
    },
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: [STUDENTS_KEY, 'stats'],
    queryFn: () => studentService.getStudentStats(),
  });
}
