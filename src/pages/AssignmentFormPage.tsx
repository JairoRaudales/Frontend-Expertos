import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
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

type AssignmentItem = {
  id: string;
  subject: string;
  course: string;
  section: string;
  academicPeriod: string;
  status: 'active' | 'inactive';
};

const mockTeachers = [
  { id: '1', name: 'Miguel Torres Ruiz' },
  { id: '2', name: 'María López' },
  { id: '3', name: 'Carlos Hernández' },
];

const mockEditData = {
  teacherId: '1',
  items: [
    {
      id: '1',
      subject: 'Literatura y Lengua',
      course: '10',
      section: 'A',
      academicPeriod: '2026 - I Parcial',
      status: 'active' as const,
    },
  ],
};

export function AssignmentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const initialItems = useMemo<AssignmentItem[]>(
    () =>
      isEdit
        ? mockEditData.items
        : [
            {
              id: crypto.randomUUID(),
              subject: '',
              course: '',
              section: '',
              academicPeriod: '',
              status: 'active',
            },
          ],
    [isEdit]
  );

  const [teacherId, setTeacherId] = useState(isEdit ? mockEditData.teacherId : '');
  const [items, setItems] = useState<AssignmentItem[]>(initialItems);

  const addAssignmentRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        subject: '',
        course: '',
        section: '',
        academicPeriod: '',
        status: 'active',
      },
    ]);
  };

  const removeAssignmentRow = (rowId: string) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== rowId));
  };

  const updateItem = (
    rowId: string,
    field: keyof AssignmentItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    navigate('/assignments');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/assignments')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Editar Asignación' : 'Nueva Asignación'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? 'Modifica las asignaciones del profesor'
              : 'Asigna uno o varios cursos y materias a un profesor'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profesor</CardTitle>
        </CardHeader>
        <CardContent className="max-w-md space-y-2">
          <Label>Selecciona el profesor</Label>
          <Select value={teacherId || 'none'} onValueChange={(value) => setTeacherId(value === 'none' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar profesor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Seleccionar</SelectItem>
              {mockTeachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Detalle de Asignaciones</CardTitle>
          <Button type="button" variant="outline" onClick={addAssignmentRow}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar otra
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Asignación {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAssignmentRow(item.id)}
                  disabled={items.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="space-y-2">
                  <Label>Materia</Label>
                  <Input
                    placeholder="Ej. Matemáticas"
                    value={item.subject}
                    onChange={(e) =>
                      updateItem(item.id, 'subject', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Curso</Label>
                  <Select
                    value={item.course || 'none'}
                    onValueChange={(value) =>
                      updateItem(item.id, 'course', value === 'none' ? '' : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Seleccionar</SelectItem>
                      <SelectItem value="7">7°</SelectItem>
                      <SelectItem value="8">8°</SelectItem>
                      <SelectItem value="9">9°</SelectItem>
                      <SelectItem value="10">10°</SelectItem>
                      <SelectItem value="11">11°</SelectItem>
                      <SelectItem value="12">12°</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sección</Label>
                  <Input
                    placeholder="Ej. A"
                    value={item.section}
                    onChange={(e) =>
                      updateItem(item.id, 'section', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Período académico</Label>
                  <Input
                    placeholder="Ej. 2026 - I Parcial"
                    value={item.academicPeriod}
                    onChange={(e) =>
                      updateItem(item.id, 'academicPeriod', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={item.status}
                    onValueChange={(value) =>
                      updateItem(item.id, 'status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activa</SelectItem>
                      <SelectItem value="inactive">Inactiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave}>
              {isEdit ? 'Guardar Cambios' : 'Crear Asignación'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/assignments')}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}