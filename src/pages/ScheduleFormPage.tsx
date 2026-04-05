import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ScheduleFormData = {
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

const courses = [
  'Matemáticas I',
  'Español',
  'Ciencias Naturales',
  'Historia',
  'Inglés',
  'Computación',
];

const teachers = [
  'Carlos Gómez',
  'María López',
  'José Martínez',
  'Ana Rivera',
  'Luis Hernández',
];

const grades = ['7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D'];
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export function ScheduleFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ScheduleFormData>({
    course: '',
    teacher: '',
    grade: '',
    section: '',
    day: '',
    startTime: '',
    endTime: '',
    classroom: '',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Nuevo horario:', formData);

    navigate('/schedules');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/schedules')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Horario</h1>
          <p className="text-muted-foreground">
            Complete el formulario para registrar un horario
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Horario</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Curso</Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, course: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Profesor</Label>
                <Select
                  value={formData.teacher}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, teacher: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un profesor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Grado</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, grade: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un grado" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sección</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, section: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una sección" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Día</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, day: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un día" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aula</Label>
                <Input
                  value={formData.classroom}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, classroom: e.target.value }))
                  }
                  placeholder="Ej: Aula 3"
                />
              </div>

              <div className="space-y-2">
                <Label>Hora de inicio</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, startTime: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Hora de finalización</Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, endTime: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'active' | 'inactive') =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/schedules')}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Horario</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}