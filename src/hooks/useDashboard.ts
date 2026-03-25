// Hook para manejar datos del dashboard con React Query
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';

const DASHBOARD_KEY = 'dashboard';

export function useDashboardStats() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'stats'],
    queryFn: () => dashboardService.getStats(),
  });
}

export function useRecentActivity(limit: number = 10) {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'activity', limit],
    queryFn: () => dashboardService.getRecentActivity(limit),
  });
}

export function useEnrollmentData() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'charts', 'enrollment'],
    queryFn: () => dashboardService.getEnrollmentData(),
  });
}

export function useGradeDistribution() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'charts', 'grades'],
    queryFn: () => dashboardService.getGradeDistribution(),
  });
}

export function useAttendanceByGrade() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'charts', 'attendance'],
    queryFn: () => dashboardService.getAttendanceByGrade(),
  });
}

export function useStudentsByGrade() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'charts', 'students'],
    queryFn: () => dashboardService.getStudentsByGrade(),
  });
}

export function useDashboardData() {
  return useQuery({
    queryKey: [DASHBOARD_KEY, 'all'],
    queryFn: () => dashboardService.getDashboardData(),
  });
}
