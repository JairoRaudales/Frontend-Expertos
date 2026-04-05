import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CalendarDays, Clock3, Plus, Search } from 'lucide-react';

type ScheduleItem = {
  id: string;
  course: string;
  teacher: string;
  grade: string;
  section: string;
  day: string;
  startTime: string;
  endTime: string;
  classroom: string;
  status: 'active' | 'inactive';
};

const initialSchedules: ScheduleItem[] = [
  {
    id: '1',
    course: 'Matemáticas I',
    teacher: 'Carlos Gómez',
    grade: '10',
    section: 'A',
    day: 'Lunes',
    startTime: '07:00 AM',
    endTime: '08:00 AM',
    classroom: 'Aula 1',
    status: 'active',
  },
  {
    id: '2',
    course: 'Español',
    teacher: 'María López',
    grade: '10',
    section: 'A',
    day: 'Martes',
    startTime: '08:00 AM',
    endTime: '09:00 AM',
    classroom: 'Aula 2',
    status: 'active',
  },
  {
    id: '3',
    course: 'Ciencias Naturales',
    teacher: 'José Martínez',
    grade: '11',
    section: 'B',
    day: 'Miércoles',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    classroom: 'Laboratorio',
    status: 'active',
  },
  {
    id: '4',
    course: 'Historia',
    teacher: 'Ana Rivera',
    grade: '9',
    section: 'C',
    day: 'Jueves',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    classroom: 'Aula 4',
    status: 'inactive',
  },
];

export function Schedules() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredSchedules = initialSchedules.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.course.toLowerCase().includes(term) ||
      item.teacher.toLowerCase().includes(term) ||
      item.day.toLowerCase().includes(term) ||
      item.classroom.toLowerCase().includes(term) ||
      item.grade.toLowerCase().includes(term) ||
      item.section.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Horarios</h1>
          <p className="text-muted-foreground">
            Gestiona los horarios de clases de la institución
          </p>
        </div>

        <Button onClick={() => navigate('/schedules/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Horario
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <CalendarDays className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Horarios</p>
                <p className="text-2xl font-bold">{initialSchedules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Clock3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold">
                  {initialSchedules.filter((item) => item.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-100 p-3">
                <Clock3 className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inactivos</p>
                <p className="text-2xl font-bold">
                  {initialSchedules.filter((item) => item.status === 'inactive').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Horarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Buscar por curso, profesor, día o aula..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Horarios</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSchedules.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No se encontraron horarios.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSchedules.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border p-4 transition hover:bg-muted/40"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.course}</h3>
                        <Badge
                          variant={item.status === 'active' ? 'default' : 'secondary'}
                        >
                          {item.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Profesor: {item.teacher}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Grado/Sección: {item.grade} - {item.section}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Aula: {item.classroom}
                      </p>
                    </div>

                    <div className="grid gap-2 text-sm lg:text-right">
                      <p>
                        <span className="font-medium">Día:</span> {item.day}
                      </p>
                      <p>
                        <span className="font-medium">Hora:</span> {item.startTime} - {item.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}