// Hook para manejar asistencia con React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '@/services';
import type { Attendance, PaginationParams, FilterParams } from '@/types';

const ATTENDANCE_KEY = 'attendance';

export function useAttendance(params?: PaginationParams & FilterParams & { studentId?: string; courseId?: string; date?: string }) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, params],
    queryFn: () => attendanceService.getAttendance(params),
  });
}

export function useAttendanceRecord(id: string) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, id],
    queryFn: () => attendanceService.getAttendanceById(id),
    enabled: !!id,
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Attendance, 'id'>) => attendanceService.createAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
    },
  });
}

export function useCreateBulkAttendance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Attendance, 'id'>[]) => attendanceService.createBulkAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Attendance> }) =>
      attendanceService.updateAttendance(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY, variables.id] });
    },
  });
}

export function useDeleteAttendance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => attendanceService.deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
    },
  });
}

export function useAttendanceByStudent(studentId: string) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, 'student', studentId],
    queryFn: () => attendanceService.getAttendanceByStudent(studentId),
    enabled: !!studentId,
  });
}

export function useAttendanceByCourse(courseId: string, date?: string) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, 'course', courseId, date],
    queryFn: () => attendanceService.getAttendanceByCourse(courseId, date),
    enabled: !!courseId,
  });
}

export function useAttendanceStats(studentId?: string, courseId?: string, dateFrom?: string, dateTo?: string) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, 'stats', studentId, courseId, dateFrom, dateTo],
    queryFn: () => attendanceService.getAttendanceStats(studentId, courseId, dateFrom, dateTo),
    enabled: !!(studentId || courseId || (dateFrom && dateTo)),
  });
}

export function useDailySummary(date: string) {
  return useQuery({
    queryKey: [ATTENDANCE_KEY, 'summary', date],
    queryFn: () => attendanceService.getDailySummary(date),
    enabled: !!date,
  });
}
