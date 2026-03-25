// Formulario de Curso
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CourseFormData } from '@/types';

const courseSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  code: z.string().min(3, 'El código debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  department: z.string().min(1, 'El departamento es requerido'),
  credits: z.number().min(1, 'Los créditos deben ser al menos 1'),
  hoursPerWeek: z.number().min(1, 'Las horas por semana deben ser al menos 1'),
  teacherId: z.string().optional(),
  grade: z.string().min(1, 'El grado es requerido'),
  section: z.string().min(1, 'La sección es requerida'),
  maxStudents: z.number().min(1, 'El máximo de estudiantes debe ser al menos 1'),
});

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => void;
  isLoading?: boolean;
  teachers?: Array<{ id: string; name: string }>;
}

const departments = [
  'Matemáticas',
  'Ciencias',
  'Humanidades',
  'Idiomas',
  'Historia',
  'Arte',
  'Educación Física',
  'Tecnología',
];

const grades = ['9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D'];

export function CourseForm({ initialData, onSubmit, isLoading, teachers = [] }: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      department: '',
      credits: 3,
      hoursPerWeek: 4,
      teacherId: '',
      grade: '',
      section: '',
      maxStudents: 30,
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información Básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Curso *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Ej: Matemáticas I"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Código *</Label>
              <Input
                id="code"
                {...register('code')}
                placeholder="Ej: MAT101"
              />
              {errors.code && (
                <p className="text-sm text-destructive">{errors.code.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Descripción del curso..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Académica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Académica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento *</Label>
              <Select
                value={watch('department')}
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Créditos *</Label>
              <Input
                id="credits"
                type="number"
                {...register('credits', { valueAsNumber: true })}
                placeholder="3"
              />
              {errors.credits && (
                <p className="text-sm text-destructive">{errors.credits.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Horas por Semana *</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                {...register('hoursPerWeek', { valueAsNumber: true })}
                placeholder="4"
              />
              {errors.hoursPerWeek && (
                <p className="text-sm text-destructive">{errors.hoursPerWeek.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asignación */}
      <Card>
        <CardHeader>
          <CardTitle>Asignación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherId">Profesor Asignado</Label>
              <Select
                value={watch('teacherId')}
                onValueChange={(value) => setValue('teacherId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el profesor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin asignar</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grado *</Label>
              <Select
                value={watch('grade')}
                onValueChange={(value) => setValue('grade', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el grado" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}° Grado
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.grade && (
                <p className="text-sm text-destructive">{errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Sección *</Label>
              <Select
                value={watch('section')}
                onValueChange={(value) => setValue('section', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la sección" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      Sección {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.section && (
                <p className="text-sm text-destructive">{errors.section.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents">Máximo de Estudiantes *</Label>
              <Input
                id="maxStudents"
                type="number"
                {...register('maxStudents', { valueAsNumber: true })}
                placeholder="30"
              />
              {errors.maxStudents && (
                <p className="text-sm text-destructive">{errors.maxStudents.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Curso'}
        </Button>
      </div>
    </form>
  );
}
