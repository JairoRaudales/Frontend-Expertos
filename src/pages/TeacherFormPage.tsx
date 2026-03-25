// Página de Formulario de Profesor (Crear/Editar)
import { useNavigate, useParams } from 'react-router-dom';
import { useTeacher, useCreateTeacher, useUpdateTeacher } from '@/hooks';
import { TeacherForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { TeacherFormData } from '@/types';

export function TeacherFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { data: teacher, isLoading } = useTeacher(id || '');
  const createMutation = useCreateTeacher();
  const updateMutation = useUpdateTeacher();

  const handleSubmit = async (data: TeacherFormData) => {
    if (isEditing && id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    navigate('/teachers');
  };

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/teachers')}>
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

  const initialData = teacher
    ? {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        dateOfBirth: teacher.dateOfBirth,
        department: teacher.department,
        specialization: teacher.specialization,
        address: teacher.address,
        qualifications: teacher.qualifications,
      }
    : undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/teachers')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Profesor' : 'Nuevo Profesor'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? 'Modifique la información del profesor'
              : 'Complete el formulario para registrar un nuevo profesor'}
          </p>
        </div>
      </div>

      {/* Form */}
      <TeacherForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
