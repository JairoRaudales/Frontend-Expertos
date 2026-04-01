import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileBarChart, Award, ClipboardCheck } from 'lucide-react';

export function GradeReports() {
  const summary = [
    { label: 'Promedio General', value: '88%' },
    { label: 'Asignaturas Evaluadas', value: '12' },
    { label: 'Estudiantes Aprobados', value: '85%' },
    { label: 'Estudiantes Reprobados', value: '15%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes de Calificaciones</h1>
        <p className="text-muted-foreground">
          Vista general del rendimiento académico
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>Estado Académico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Excelente</span>
              <Badge>32%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Bueno</span>
              <Badge variant="secondary">41%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Regular</span>
              <Badge variant="outline">17%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Deficiente</span>
              <Badge variant="destructive">10%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>La mayoría de estudiantes mantiene un rendimiento estable.</p>
            <p>Se recomienda reforzar las asignaturas con menor promedio.</p>
            <p>El porcentaje de aprobación general es aceptable.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <FileBarChart className="h-5 w-5 text-primary" />
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mejor rendimiento</span>
              <span className="font-medium">11° Grado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Menor rendimiento</span>
              <span className="font-medium">9° Grado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promedio institucional</span>
              <span className="font-medium">88%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}