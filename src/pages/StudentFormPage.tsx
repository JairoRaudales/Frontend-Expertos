// Página de Formulario de Estudiante (Crear/Editar)
import { useNavigate, useParams } from 'react-router-dom';
import { useStudent, useCreateStudent, useUpdateStudent } from '@/hooks';
import { StudentForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { StudentFormData } from '@/types';

export function StudentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { data: student, isLoading } = useStudent(id || '');
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();

  const handleSubmit = async (data: StudentFormData) => {
    if (isEditing && id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    navigate('/students');
  };

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/students')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initialData = student
    ? {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.dateOfBirth,
        grade: student.grade,
        section: student.section,
        address: student.address,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,
        guardianEmail: student.guardianEmail,
        notes: student.notes,
      }
    : undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/students')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Estudiante' : 'Nuevo Estudiante'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? 'Modifique la información del estudiante'
              : 'Complete el formulario para registrar un nuevo estudiante'}
          </p>
        </div>
      </div>

      {/* Form */}
      <StudentForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
