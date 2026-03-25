// Página de Calificaciones
import { useState } from 'react';
import { useGrades, useCreateGrade, useStudents, useCourses } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus,
  Search,
  Award,
  TrendingUp,
  FileDown,
} from 'lucide-react';
import type { Grade } from '@/types';

const evaluationTypes = [
  { value: 'exam', label: 'Examen' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'assignment', label: 'Tarea' },
  { value: 'project', label: 'Proyecto' },
  { value: 'participation', label: 'Participación' },
  { value: 'final', label: 'Examen Final' },
];

export function Grades() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useGrades({
    page,
    limit: 10,
    search: search || undefined,
  });

  const { data: students } = useStudents({ page: 1, limit: 100 });
  const { data: courses } = useCourses({ page: 1, limit: 100 });
  const createMutation = useCreateGrade();

  const handleAddGrade = async (formData: FormData) => {
    const data = {
      studentId: formData.get('studentId') as string,
      courseId: formData.get('courseId') as string,
      evaluationType: formData.get('evaluationType') as Grade['evaluationType'],
      evaluationName: formData.get('evaluationName') as string,
      score: Number(formData.get('score')),
      maxScore: Number(formData.get('maxScore')),
      period: formData.get('period') as string,
      date: new Date().toISOString().split('T')[0],
      comments: formData.get('comments') as string,
    };

    await createMutation.mutateAsync(data);
    setIsAddDialogOpen(false);
    refetch();
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calificaciones</h1>
          <p className="text-muted-foreground">
            Gestiona las calificaciones de los estudiantes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Calificación
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Registros</p>
                <p className="text-2xl font-bold">{data?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Promedio General</p>
                <p className="text-2xl font-bold">
                  {data && data.data.length > 0
                    ? (data.data.reduce((acc, g) => acc + (g.percentage || 0), 0) / data.data.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar calificaciones..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Calificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <GradesTableSkeleton />
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Evaluación</TableHead>
                      <TableHead>Calificación</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No se encontraron calificaciones
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.data.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>
                            <p className="font-medium">{grade.studentName}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{grade.courseName}</p>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{grade.evaluationName}</p>
                              <p className="text-xs text-muted-foreground">
                                {evaluationTypes.find((t) => t.value === grade.evaluationType)?.label}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={getGradeColor(grade.percentage || 0)}
                              >
                                {grade.score}/{grade.maxScore}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                ({grade.percentage}%)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground">
                              {new Date(grade.date).toLocaleDateString()}
                            </p>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Anterior
                    </Button>
                    <span className="flex items-center px-4 text-sm">
                      Página {page} de {data.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                      disabled={page === data.totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Grade Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Registrar Nueva Calificación</DialogTitle>
            <DialogDescription>
              Ingrese los datos de la calificación
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddGrade(new FormData(e.currentTarget));
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Estudiante *</Label>
                  <Select name="studentId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-60">
                        {students?.data.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.firstName} {student.lastName}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseId">Curso *</Label>
                  <Select name="courseId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses?.data.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evaluationType">Tipo de Evaluación *</Label>
                  <Select name="evaluationType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evaluationName">Nombre de Evaluación *</Label>
                  <Input
                    id="evaluationName"
                    name="evaluationName"
                    placeholder="Ej: Primer Parcial"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="score">Puntuación *</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    min="0"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxScore">Máximo *</Label>
                  <Input
                    id="maxScore"
                    name="maxScore"
                    type="number"
                    min="1"
                    defaultValue="100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Período *</Label>
                  <Input
                    id="period"
                    name="period"
                    placeholder="2024-1"
                    defaultValue="2024-1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios</Label>
                <Input
                  id="comments"
                  name="comments"
                  placeholder="Comentarios opcionales..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Guardando...' : 'Guardar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GradesTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
