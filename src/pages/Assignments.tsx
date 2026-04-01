import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  GraduationCap,
  UserCheck,
} from 'lucide-react';

type AssignmentStatus = 'active' | 'inactive';

type Assignment = {
  id: string;
  teacherName: string;
  teacherEmail: string;
  subject: string;
  course: string;
  section: string;
  academicPeriod: string;
  status: AssignmentStatus;
};

const mockAssignments: Assignment[] = [
  {
    id: '1',
    teacherName: 'Miguel Torres Ruiz',
    teacherEmail: 'miguel.torres@escuela.com',
    subject: 'Literatura y Lengua',
    course: '10',
    section: 'A',
    academicPeriod: '2026 - I Parcial',
    status: 'active',
  },
  {
    id: '2',
    teacherName: 'María López',
    teacherEmail: 'maria.lopez@escuela.com',
    subject: 'Matemáticas',
    course: '9',
    section: 'B',
    academicPeriod: '2026 - I Parcial',
    status: 'active',
  },
  {
    id: '3',
    teacherName: 'Carlos Hernández',
    teacherEmail: 'carlos.hernandez@escuela.com',
    subject: 'Ciencias Naturales',
    course: '11',
    section: 'A',
    academicPeriod: '2026 - I Parcial',
    status: 'inactive',
  },
];

export function Assignments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

  const filteredAssignments = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return mockAssignments;

    return mockAssignments.filter((assignment) =>
      [
        assignment.teacherName,
        assignment.teacherEmail,
        assignment.subject,
        assignment.course,
        assignment.section,
        assignment.academicPeriod,
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  const activeCount = filteredAssignments.filter(
    (assignment) => assignment.status === 'active'
  ).length;

  const getStatusBadge = (status: AssignmentStatus) => {
    return status === 'active' ? (
      <Badge variant="default">Activa</Badge>
    ) : (
      <Badge variant="secondary">Inactiva</Badge>
    );
  };

  const handleDelete = () => {
    setAssignmentToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asignaciones</h1>
          <p className="text-muted-foreground">
            Gestiona las asignaciones de profesores por curso y materia
          </p>
        </div>

        <Button onClick={() => navigate('/assignments/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Asignación
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{filteredAssignments.length}</p>
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
                <p className="text-sm text-muted-foreground">Activas</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-violet-100 p-3">
                <GraduationCap className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profesores</p>
                <p className="text-2xl font-bold">
                  {new Set(filteredAssignments.map((a) => a.teacherName)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              placeholder="Buscar por profesor, materia, curso o período..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Asignaciones</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profesor</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredAssignments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center">
                      No se encontraron asignaciones
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{assignment.teacherName}</p>
                          <p className="text-muted-foreground text-sm">
                            {assignment.teacherEmail}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>{assignment.subject}</TableCell>

                      <TableCell>
                        <Badge variant="outline">
                          {assignment.course}° - Sección {assignment.section}
                        </Badge>
                      </TableCell>

                      <TableCell>{assignment.academicPeriod}</TableCell>

                      <TableCell>{getStatusBadge(assignment.status)}</TableCell>

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
                              onClick={() => navigate(`/assignments/${assignment.id}`)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalle
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/assignments/${assignment.id}/edit`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setAssignmentToDelete(assignment)}
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
        </CardContent>
      </Card>

      <Dialog
        open={!!assignmentToDelete}
        onOpenChange={() => setAssignmentToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la asignación de{' '}
              <strong>{assignmentToDelete?.teacherName}</strong>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignmentToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}