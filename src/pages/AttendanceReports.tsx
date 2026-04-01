import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, CalendarX2, Clock3 } from 'lucide-react';

export function AttendanceReports() {
  const summary = [
    { label: 'Asistencia General', value: '92%' },
    { label: 'Inasistencias', value: '8%' },
    { label: 'Tardanzas', value: '5%' },
    { label: 'Sección con mejor asistencia', value: '10-A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes de Asistencia</h1>
        <p className="text-muted-foreground">
          Estadísticas generales de asistencia escolar
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
            <CalendarCheck className="h-5 w-5 text-primary" />
            <CardTitle>Asistencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Presentes</span>
              <Badge>92%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Ausentes</span>
              <Badge variant="destructive">8%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Clock3 className="h-5 w-5 text-primary" />
            <CardTitle>Tardanzas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promedio semanal</span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mayor incidencia</span>
              <span className="font-medium">9-B</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CalendarX2 className="h-5 w-5 text-primary" />
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>La asistencia general es alta durante el período actual.</p>
            <p>Las faltas se concentran en unas pocas secciones.</p>
            <p>Se recomienda seguimiento en grupos con más tardanzas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}