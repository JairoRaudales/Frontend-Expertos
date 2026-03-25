// Página de Asistencia
import { useState } from 'react';
import { useAttendance, useCreateBulkAttendance, useCourses, useAttendanceStats } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  CalendarCheck,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Save,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Attendance } from '@/types';

const attendanceStatuses = [
  { value: 'present', label: 'Presente', color: 'bg-green-500', icon: CheckCircle },
  { value: 'absent', label: 'Ausente', color: 'bg-red-500', icon: XCircle },
  { value: 'late', label: 'Tardanza', color: 'bg-yellow-500', icon: Clock },
  { value: 'excused', label: 'Justificado', color: 'bg-blue-500', icon: AlertCircle },
];

export function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isTakeAttendanceOpen, setIsTakeAttendanceOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, Attendance['status']>>({});

  const dateString = format(selectedDate, 'yyyy-MM-dd');

  const { data, isLoading, refetch } = useAttendance({
    page: 1,
    limit: 100,
    date: dateString,
    courseId: selectedCourse || undefined,
  });

  const { data: courses } = useCourses({ page: 1, limit: 100 });
  const { data: stats } = useAttendanceStats(undefined, selectedCourse || undefined, dateString, dateString);
  const createMutation = useCreateBulkAttendance();

  const handleStatusChange = (studentId: string, status: Attendance['status']) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = async () => {
    const records = Object.entries(attendanceRecords).map(([studentId, status]) => ({
      studentId,
      courseId: selectedCourse,
      date: dateString,
      status,
      recordedBy: '1', // Current user ID
    }));

    await createMutation.mutateAsync(records);
    setIsTakeAttendanceOpen(false);
    setAttendanceRecords({});
    refetch();
  };

  const getStatusBadge = (status: Attendance['status']) => {
    const config = attendanceStatuses.find((s) => s.value === status);
    if (!config) return null;
    return (
      <Badge className={`${config.color} text-white`}>
        <config.icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asistencia</h1>
          <p className="text-muted-foreground">
            Gestiona la asistencia de los estudiantes
          </p>
        </div>
        <Button onClick={() => setIsTakeAttendanceOpen(true)}>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Tomar Asistencia
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presentes</p>
                <p className="text-2xl font-bold">{stats?.present || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ausentes</p>
                <p className="text-2xl font-bold">{stats?.absent || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tardanzas</p>
                <p className="text-2xl font-bold">{stats?.late || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Rate */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tasa de Asistencia</span>
            <span className="text-sm font-bold">{stats?.percentage || 0}%</span>
          </div>
          <Progress value={stats?.percentage || 0} className="h-2" />
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Seleccionar Fecha</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              locale={es}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Filtrar por Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los cursos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los cursos</SelectItem>
                {courses?.data.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name} - {course.grade}° {course.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Registro de Asistencia - {format(selectedDate, 'dd/MM/yyyy', { locale: es })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AttendanceTableSkeleton />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No hay registros de asistencia para esta fecha
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.data.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <p className="font-medium">{record.studentName}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{record.courseName}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground">
                            {record.notes || '-'}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Take Attendance Dialog */}
      <Dialog open={isTakeAttendanceOpen} onOpenChange={setIsTakeAttendanceOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Tomar Asistencia</DialogTitle>
            <DialogDescription>
              Seleccione el curso y registre la asistencia de los estudiantes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Curso *</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.data.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} - {course.grade}° {course.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourse && (
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {/* Mock students for the selected course */}
                  {[
                    { id: '1', name: 'Juan Pérez García' },
                    { id: '2', name: 'Ana Martínez López' },
                    { id: '3', name: 'Luis Hernández Ruiz' },
                    { id: '4', name: 'María González Silva' },
                    { id: '5', name: 'Carlos Rodríguez Torres' },
                  ].map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{student.name}</span>
                      <div className="flex gap-1">
                        {attendanceStatuses.map((status) => (
                          <Button
                            key={status.value}
                            type="button"
                            variant={
                              attendanceRecords[student.id] === status.value
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            className={`${
                              attendanceRecords[student.id] === status.value
                                ? status.color
                                : ''
                            }`}
                            onClick={() =>
                              handleStatusChange(student.id, status.value as Attendance['status'])
                            }
                          >
                            <status.icon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTakeAttendanceOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveAttendance}
              disabled={createMutation.isPending || Object.keys(attendanceRecords).length === 0}
            >
              <Save className="mr-2 h-4 w-4" />
              {createMutation.isPending ? 'Guardando...' : 'Guardar Asistencia'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AttendanceTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}
