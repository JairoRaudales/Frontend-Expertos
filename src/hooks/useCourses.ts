// Hook para manejar cursos con React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService } from '@/services';
import type { Course, CourseFormData, PaginationParams, FilterParams } from '@/types';

const COURSES_KEY = 'courses';

export function useCourses(params?: PaginationParams & FilterParams) {
  return useQuery({
    queryKey: [COURSES_KEY, params],
    queryFn: () => courseService.getCourses(params),
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: [COURSES_KEY, id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CourseFormData) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CourseFormData> }) =>
      courseService.updateCourse(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, variables.id] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
    },
  });
}

export function useChangeCourseStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Course['status'] }) =>
      courseService.changeStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, variables.id] });
    },
  });
}

export function useAssignTeacher() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, teacherId, teacherName }: { courseId: string; teacherId: string; teacherName: string }) =>
      courseService.assignTeacher(courseId, teacherId, teacherName),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, variables.courseId] });
    },
  });
}

export function useCoursesByTeacher(teacherId: string) {
  return useQuery({
    queryKey: [COURSES_KEY, 'teacher', teacherId],
    queryFn: () => courseService.getCoursesByTeacher(teacherId),
    enabled: !!teacherId,
  });
}

export function useCoursesByGrade(grade: string, section?: string) {
  return useQuery({
    queryKey: [COURSES_KEY, 'grade', grade, section],
    queryFn: () => courseService.getCoursesByGrade(grade, section),
    enabled: !!grade,
  });
}

export function useCourseStats() {
  return useQuery({
    queryKey: [COURSES_KEY, 'stats'],
    queryFn: () => courseService.getCourseStats(),
  });
}
