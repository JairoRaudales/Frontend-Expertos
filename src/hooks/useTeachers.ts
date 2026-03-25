// Hook para manejar profesores con React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherService } from '@/services';
import type { Teacher, TeacherFormData, PaginationParams, FilterParams } from '@/types';

const TEACHERS_KEY = 'teachers';

export function useTeachers(params?: PaginationParams & FilterParams) {
  return useQuery({
    queryKey: [TEACHERS_KEY, params],
    queryFn: () => teacherService.getTeachers(params),
  });
}

export function useTeacher(id: string) {
  return useQuery({
    queryKey: [TEACHERS_KEY, id],
    queryFn: () => teacherService.getTeacherById(id),
    enabled: !!id,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TeacherFormData) => teacherService.createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY] });
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeacherFormData> }) =>
      teacherService.updateTeacher(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY, variables.id] });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => teacherService.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY] });
    },
  });
}

export function useChangeTeacherStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Teacher['status'] }) =>
      teacherService.changeStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY] });
      queryClient.invalidateQueries({ queryKey: [TEACHERS_KEY, variables.id] });
    },
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: [TEACHERS_KEY, 'departments'],
    queryFn: () => teacherService.getDepartments(),
  });
}

export function useTeacherStats() {
  return useQuery({
    queryKey: [TEACHERS_KEY, 'stats'],
    queryFn: () => teacherService.getTeacherStats(),
  });
}
