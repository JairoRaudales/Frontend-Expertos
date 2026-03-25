// Página de Formulario de Curso (Crear/Editar)
import { useNavigate, useParams } from 'react-router-dom';
import { useCourse, useCreateCourse, useUpdateCourse, useTeachers } from '@/hooks';
import { CourseForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { CourseFormData } from '@/types';

export function CourseFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { data: course, isLoading } = useCourse(id || '');
  const { data: teachers } = useTeachers({ page: 1, limit: 100 });
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();

  const handleSubmit = async (data: CourseFormData) => {
    if (isEditing && id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    navigate('/courses');
  };

  const teachersList = teachers?.data.map((t) => ({
    id: t.id,
    name: `${t.firstName} ${t.lastName}`,
  })) || [];

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/courses')}>
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

  const initialData = course
    ? {
        name: course.name,
        code: course.code,
        description: course.description,
        department: course.department,
        credits: course.credits,
        hoursPerWeek: course.hoursPerWeek,
        teacherId: course.teacherId,
        grade: course.grade,
        section: course.section,
        maxStudents: course.maxStudents,
      }
    : undefined;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Curso' : 'Nuevo Curso'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? 'Modifique la información del curso'
              : 'Complete el formulario para crear un nuevo curso'}
          </p>
        </div>
      </div>

      {/* Form */}
      <CourseForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        teachers={teachersList}
      />
    </div>
  );
}
