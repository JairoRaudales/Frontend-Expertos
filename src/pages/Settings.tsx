import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, School, Bell, Shield, UserCog } from 'lucide-react';

export function Settings() {
  const [schoolName, setSchoolName] = useState('Escuela Juan Ramón Molina');
  const [schoolEmail, setSchoolEmail] = useState('info@escuela.edu');
  const [schoolPhone, setSchoolPhone] = useState('9999-9999');
  const [principalName, setPrincipalName] = useState('Director General');

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [allowTeacherEdits, setAllowTeacherEdits] = useState(true);

  const handleSave = () => {
    console.log('Configuración guardada', {
      schoolName,
      schoolEmail,
      schoolPhone,
      principalName,
      emailNotifications,
      attendanceAlerts,
      gradeAlerts,
      twoFactorAuth,
      allowTeacherEdits,
    });

    alert('Configuración guardada correctamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">
            Administra las opciones generales del sistema escolar
          </p>
        </div>

        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <School className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Información de la Institución</CardTitle>
                <CardDescription>
                  Actualiza los datos generales del centro educativo
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Nombre de la institución</Label>
                  <Input
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Nombre de la escuela"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="principalName">Director o responsable</Label>
                  <Input
                    id="principalName"
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    placeholder="Nombre del director"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">Correo institucional</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    placeholder="correo@institucion.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolPhone">Teléfono</Label>
                  <Input
                    id="schoolPhone"
                    value={schoolPhone}
                    onChange={(e) => setSchoolPhone(e.target.value)}
                    placeholder="0000-0000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura las alertas del sistema
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Notificaciones por correo</p>
                  <p className="text-sm text-muted-foreground">
                    Envía avisos generales al correo institucional
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Alertas de asistencia</p>
                  <p className="text-sm text-muted-foreground">
                    Notifica incidencias importantes relacionadas con asistencia
                  </p>
                </div>
                <Switch
                  checked={attendanceAlerts}
                  onCheckedChange={setAttendanceAlerts}
                />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Alertas de calificaciones</p>
                  <p className="text-sm text-muted-foreground">
                    Muestra avisos cuando existan cambios o registros nuevos
                  </p>
                </div>
                <Switch checked={gradeAlerts} onCheckedChange={setGradeAlerts} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Seguridad y permisos</CardTitle>
                <CardDescription>
                  Ajusta el acceso y la seguridad del sistema
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Autenticación en dos pasos</p>
                  <p className="text-sm text-muted-foreground">
                    Agrega una capa extra de seguridad al iniciar sesión
                  </p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">Permitir edición a docentes</p>
                  <p className="text-sm text-muted-foreground">
                    Autoriza a docentes a modificar ciertos registros académicos
                  </p>
                </div>
                <Switch
                  checked={allowTeacherEdits}
                  onCheckedChange={setAllowTeacherEdits}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <UserCog className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>
                  Vista rápida de la configuración actual
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Institución</p>
                <p className="font-medium">{schoolName}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Director</p>
                <p className="font-medium">{principalName}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Correo</p>
                <p className="font-medium break-all">{schoolEmail}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{schoolPhone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del sistema</CardTitle>
              <CardDescription>
                Indicadores de configuración activa
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">Correos activos</span>
                <span className="font-medium">
                  {emailNotifications ? 'Sí' : 'No'}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">Alertas de asistencia</span>
                <span className="font-medium">
                  {attendanceAlerts ? 'Sí' : 'No'}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">Autenticación 2 pasos</span>
                <span className="font-medium">
                  {twoFactorAuth ? 'Activa' : 'Inactiva'}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">Edición para docentes</span>
                <span className="font-medium">
                  {allowTeacherEdits ? 'Permitida' : 'Restringida'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}