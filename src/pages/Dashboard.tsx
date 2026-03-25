// Página Dashboard
import { useDashboardData } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  ClipboardList,
  CheckCircle,
  Bell,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Dashboard() {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const stats = data?.stats;
  const recentActivity = data?.recentActivity || [];
  const charts = data?.charts;

  const statCards = [
    {
      title: 'Total Estudiantes',
      value: stats?.totalStudents || 0,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Profesores',
      value: stats?.totalTeachers || 0,
      icon: GraduationCap,
      trend: '+3%',
      trendUp: true,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Cursos',
      value: stats?.totalCourses || 0,
      icon: BookOpen,
      trend: '+5%',
      trendUp: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Tasa de Asistencia',
      value: `${stats?.attendanceRate || 0}%`,
      icon: CalendarCheck,
      trend: '-2%',
      trendUp: false,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case 'grade':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'attendance':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case 'announcement':
        return <Bell className="h-4 w-4 text-amber-500" />;
      case 'task':
        return <ClipboardList className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al Sistema Administrativo Escolar
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp
                      className={`h-3 w-3 ${
                        stat.trendUp ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <span
                      className={
                        stat.trendUp ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      {stat.trend}
                    </span>
                    <span className="text-muted-foreground">vs mes anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Enrollment Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Inscripciones Mensuales</CardTitle>
            <CardDescription>Nuevas inscripciones por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={charts?.enrollment || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" name="Este Año" />
                <Bar dataKey="lastYear" fill="#94a3b8" name="Año Pasado" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
            <CardDescription>Distribución por rango de calificación</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={charts?.gradeDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {(charts?.gradeDistribution || []).map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 & Activity */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Attendance by Grade */}
        <Card>
          <CardHeader>
            <CardTitle>Asistencia por Grado</CardTitle>
            <CardDescription>Porcentaje de asistencia</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={charts?.attendanceByGrade || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Students by Grade */}
        <Card>
          <CardHeader>
            <CardTitle>Estudiantes por Grado</CardTitle>
            <CardDescription>Distribución de estudiantes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={charts?.studentsByGrade || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="male" stackId="a" fill="#3b82f6" name="Masculino" />
                <Bar dataKey="female" stackId="a" fill="#ec4899" name="Femenino" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas comunes del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <QuickActionCard
              title="Nuevo Estudiante"
              description="Registrar un nuevo estudiante"
              icon={UserPlus}
              href="/students/new"
              color="bg-blue-500"
            />
            <QuickActionCard
              title="Registrar Calificación"
              description="Agregar calificaciones"
              icon={TrendingUp}
              href="/grades/new"
              color="bg-green-500"
            />
            <QuickActionCard
              title="Tomar Asistencia"
              description="Registrar asistencia de hoy"
              icon={CheckCircle}
              href="/attendance/take"
              color="bg-purple-500"
            />
            <QuickActionCard
              title="Nuevo Curso"
              description="Crear un nuevo curso"
              icon={BookOpen}
              href="/courses/new"
              color="bg-amber-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
    >
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
