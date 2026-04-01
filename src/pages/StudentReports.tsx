import { useMemo } from 'react';
import { useStudents } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  ShieldAlert,
  BarChart3,
} from 'lucide-react';

export function StudentReports() {
  const { data, isLoading } = useStudents({
    page: 1,
    limit: 200,
  });

  const students = data?.data ?? [];

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === 'active').length;
    const inactive = students.filter((s) => s.status === 'inactive').length;
    const graduated = students.filter((s) => s.status === 'graduated').length;
    const suspended = students.filter((s) => s.status === 'suspended').length;

    const grades = ['9', '10', '11', '12'].map((grade) => ({
      label: `${grade}° Grado`,
      total: students.filter((s) => String(s.grade) === grade).length,
    }));

    return { total, active, inactive, graduated, suspended, grades };
  }, [students]);

  const maxGrade = Math.max(...stats.grades.map((g) => g.total), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes de Estudiantes</h1>
        <p className="text-muted-foreground">
          Resumen estadístico del módulo de estudiantes
        </p>
      </div>

      {isLoading ? (
        <ReportSkeleton />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard title="Total" value={stats.total} icon={<Users className="h-5 w-5 text-blue-600" />} color="bg-blue-100" />
            <StatCard title="Activos" value={stats.active} icon={<UserCheck className="h-5 w-5 text-green-600" />} color="bg-green-100" />
            <StatCard title="Inactivos" value={stats.inactive} icon={<UserX className="h-5 w-5 text-slate-600" />} color="bg-slate-100" />
            <StatCard title="Graduados" value={stats.graduated} icon={<GraduationCap className="h-5 w-5 text-violet-600" />} color="bg-violet-100" />
            <StatCard title="Suspendidos" value={stats.suspended} icon={<ShieldAlert className="h-5 w-5 text-red-600" />} color="bg-red-100" />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Estudiantes por grado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.grades.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.total}</span>
                  </div>
                  <div className="bg-muted h-3 w-full rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${(item.total / maxGrade) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`rounded-full p-3 ${color}`}>{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}