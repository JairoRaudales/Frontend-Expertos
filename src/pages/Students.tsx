// Página de Estudiantes
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents, useDeleteStudent, useChangeStudentStatus } from '@/hooks';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  GraduationCap,
  Filter,
} from 'lucide-react';
import type { Student } from '@/types';

export function Students() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const { data, isLoading, refetch } = useStudents({
    page,
    limit: 10,
    search: search || undefined,
    status: statusFilter || undefined,
    grade: gradeFilter || undefined,
  });

  const deleteMutation = useDeleteStudent();
  const statusMutation = useChangeStudentStatus();

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, gradeFilter]);

  const handleDelete = async () => {
    if (studentToDelete) {
      await deleteMutation.mutateAsync(studentToDelete.id);
      setStudentToDelete(null);
      refetch();
    }
  };

  const handleStatusChange = async (id: string, status: Student['status']) => {
    await statusMutation.mutateAsync({ id, status });
    refetch();
  };

  const getStatusBadge = (status: Student['status']) => {
    const variants: Record<
      string,
      {
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
        label: string;
      }
    > = {
      active: { variant: 'default', label: 'Activo' },
      inactive: { variant: 'secondary', label: 'Inactivo' },
      graduated: { variant: 'outline', label: 'Graduado' },
      suspended: { variant: 'destructive', label: 'Suspendido' },
    };

    const config = variants[status] || variants.inactive;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estudiantes</h1>
          <p className="text-muted-foreground">
            Gestiona los estudiantes de la institución
          </p>
        </div>

        <Button onClick={() => navigate('/students/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Estudiante
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{data?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold">
                  {data?.data?.filter((s) => s.status === 'active').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                placeholder="Buscar estudiantes..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={statusFilter || 'all'}
                onValueChange={(value) =>
                  setStatusFilter(value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="graduated">Graduado</SelectItem>
                  <SelectItem value="suspended">Suspendido</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={gradeFilter || 'all'}
                onValueChange={(value) =>
                  setGradeFilter(value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="9">9° Grado</SelectItem>
                  <SelectItem value="10">10° Grado</SelectItem>
                  <SelectItem value="11">11° Grado</SelectItem>
                  <SelectItem value="12">12° Grado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <StudentsTableSkeleton />
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Grado/Sección</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {!data?.data || data.data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-center">
                          No se encontraron estudiantes
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.data.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                  {student.firstName?.[0] ?? ''}
                                  {student.lastName?.[0] ?? ''}
                                </AvatarFallback>
                              </Avatar>

                              <div>
                                <p className="font-medium">
                                  {student.firstName} {student.lastName}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge variant="outline">
                              {student.grade}° - Sección {student.section}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <div className="text-sm">
                              <p>{student.phone || 'N/A'}</p>
                              <p className="text-muted-foreground">
                                Tutor: {student.guardianName || 'N/A'}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>{getStatusBadge(student.status)}</TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => navigate(`/students/${student.id}`)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalles
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    navigate(`/students/${student.id}/edit`)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {student.status === 'active' ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(student.id, 'inactive')
                                    }
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Desactivar
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(student.id, 'active')
                                    }
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activar
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setStudentToDelete(student)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {data && data.totalPages > 1 && (
                <div className="mt-4 flex justify-center">
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
                      onClick={() =>
                        setPage((p) => Math.min(data.totalPages, p + 1))
                      }
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

      <Dialog
        open={!!studentToDelete}
        onOpenChange={() => setStudentToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a{' '}
              <strong>
                {studentToDelete?.firstName} {studentToDelete?.lastName}
              </strong>
              ? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setStudentToDelete(null)}>
              Cancelar
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StudentsTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}