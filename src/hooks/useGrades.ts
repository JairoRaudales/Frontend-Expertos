// Hook para manejar calificaciones con React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gradeService } from '@/services';
import type { Grade, PaginationParams, FilterParams } from '@/types';

const GRADES_KEY = 'grades';

export function useGrades(params?: PaginationParams & FilterParams & { studentId?: string; courseId?: string }) {
  return useQuery({
    queryKey: [GRADES_KEY, params],
    queryFn: () => gradeService.getGrades(params),
  });
}

export function useGrade(id: string) {
  return useQuery({
    queryKey: [GRADES_KEY, id],
    queryFn: () => gradeService.getGradeById(id),
    enabled: !!id,
  });
}

export function useCreateGrade() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Grade, 'id' | 'percentage'>) => gradeService.createGrade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADES_KEY] });
    },
  });
}

export function useUpdateGrade() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Grade> }) =>
      gradeService.updateGrade(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [GRADES_KEY] });
      queryClient.invalidateQueries({ queryKey: [GRADES_KEY, variables.id] });
    },
  });
}

export function useDeleteGrade() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => gradeService.deleteGrade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRADES_KEY] });
    },
  });
}

export function useGradesByStudent(studentId: string) {
  return useQuery({
    queryKey: [GRADES_KEY, 'student', studentId],
    queryFn: () => gradeService.getGradesByStudent(studentId),
    enabled: !!studentId,
  });
}

export function useGradesByCourse(courseId: string) {
  return useQuery({
    queryKey: [GRADES_KEY, 'course', courseId],
    queryFn: () => gradeService.getGradesByCourse(courseId),
    enabled: !!courseId,
  });
}

export function useAverageGrade(studentId?: string, courseId?: string, period?: string) {
  return useQuery({
    queryKey: [GRADES_KEY, 'average', studentId, courseId, period],
    queryFn: () => gradeService.getAverageGrade(studentId, courseId, period),
    enabled: !!(studentId || courseId),
  });
}

export function useGradeStats() {
  return useQuery({
    queryKey: [GRADES_KEY, 'stats'],
    queryFn: () => gradeService.getGradeStats(),
  });
}
