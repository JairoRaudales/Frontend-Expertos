import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Users, ChevronLeft,
import { ChevronLeft, CheckCircle, UserCheck, GraduationCap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { matriculaService } from '@/services/matriculaService';
import type { ConfiguracionMatricula } from '@/types/matricula';

interface EstudianteInfo {
    idEstudiante: string;
    codigoEstudiante: string;
    nombreCompleto: string;
    edad: number;
}

interface SeccionDisponible {
    idSeccion: string;
    codigoSeccion: string;
    grado: { idGrado: string; nombreGrado: string };
    jornada: { idJornada: string; nombre: string };
    cupoDisponible: number;
    cupoMaximo: number;
    aulaFisica?: string;
}

export function AsignarGradoSeccionPage() {
    const navigate = useNavigate();
    const { idEstudiante } = useParams<{ idEstudiante: string }>();

    const [estudiante, setEstudiante] = useState<EstudianteInfo | null>(null);
    const [secciones, setSecciones] = useState<SeccionDisponible[]>([]);
    const [configuracion, setConfiguracion] = useState<ConfiguracionMatricula>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guardando, setGuardando] = useState(false);

    const [seleccion, setSeleccion] = useState<{
        idSeccion: string;
    }>({
        idSeccion: '',
    });

    //   useEffect(() => {
    //     cargarDatos();

    //   }, [idEstudiante]);

    const cargarDatos = useCallback(async () => {
        try {
            // Obtener info del estudiante recién creado
            const estRes = await matriculaService.obtenerEstudiante(idEstudiante!);
            setEstudiante(estRes.data);

            // Obtener configuración activa
            const configRes = await matriculaService.obtenerEstadoConfiguracion();
            //setConfiguracion(configRes.data.configuracionActual);
            setConfiguracion(configRes.configuracionActual);

            // Obtener secciones con cupo
            const seccRes = await matriculaService.obtenerSeccionesDisponibles();
            setSecciones(seccRes.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Error cargando datos para asignacion');
            }

        } finally {
            setLoading(false);
        }
    }, [idEstudiante]);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]); // Ahora incluimos la función memorizada

    const handleAsignar = async () => {
        if (!seleccion.idSeccion || !configuracion) {
            setError('Seleccione una sección');
            return;
        }

        setGuardando(true);
        setError(null);

        try {
            await matriculaService.asignarSeccion({
                idEstudiante: idEstudiante!,
                idSeccion: seleccion.idSeccion,
                idConfiguracionMatricula: configuracion.id,
            });

            // Éxito - redirigir a confirmación o listado
            navigate('/matricula/estudiantes', {
                state: { mensaje: 'Matrícula completada exitosamente' }
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Error asignando sección');
            }
            // setError(err.response?.data?.error || 'Error asignando sección');
        } finally {
            setGuardando(false);
        }
    };

    const seccionSeleccionada = secciones.find(s => s.idSeccion === seleccion.idSeccion);

    //if (loading) return <div>Cargando...</div>;

    if (!configuracion?.matriculaActiva) {
        return (
            <div className="max-w-2xl mx-auto mt-8">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <AlertDescription>
                        No hay un período de matrícula activo. Active el período en configuración.
                    </AlertDescription>
                </Alert>
                <Button className="mt-4" onClick={() => navigate('/matricula/configuracion')}>
                    Ir a Configuración
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/matricula/nueva')}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold">Asignar Grado y Sección</h1>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Info del estudiante */}
            <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Estudiante registrado</p>
                            <h3 className="font-bold text-lg">{estudiante?.nombreCompleto}</h3>
                            <p className="text-sm">Código: {estudiante?.codigoEstudiante} | Edad: {estudiante?.edad} años</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selección de sección */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Seleccionar Sección
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Sección disponible *</label>
                            <Select
                                value={seleccion.idSeccion}
                                onValueChange={(v) => setSeleccion({ idSeccion: v })}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Seleccione sección con cupo disponible" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loading ? (
                                        <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">
                                            Consultando disponibilidad...
                                        </div>
                                    ) : (
                                        <>
                                            {secciones.length === 0 && (
                                                <SelectItem value="" disabled>
                                                    No hay secciones con cupo disponible
                                                </SelectItem>
                                            )}
                                            {secciones.map((seccion) => (
                                                <SelectItem
                                                    key={seccion.idSeccion}
                                                    value={seccion.idSeccion}
                                                    disabled={seccion.cupoDisponible === 0}
                                                >
                                                    <div className="flex items-center justify-between w-full gap-4">
                                                        <span>
                                                            {seccion.grado.nombreGrado} - {seccion.codigoSeccion} ({seccion.jornada.nombre})
                                                        </span>
                                                        <Badge variant={seccion.cupoDisponible > 5 ? 'default' : 'destructive'}>
                                                            {seccion.cupoDisponible} cupos
                                                        </Badge>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {seccionSeleccionada && (
                            <div className="p-4 bg-muted rounded-lg space-y-2">
                                <h4 className="font-medium">Detalle de la sección</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Grado:</span>
                                        <p className="font-medium">{seccionSeleccionada.grado.nombreGrado}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Jornada:</span>
                                        <p className="font-medium">{seccionSeleccionada.jornada.nombre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Aula:</span>
                                        <p className="font-medium">{seccionSeleccionada.aulaFisica || 'Por asignar'}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Cupos:</span>
                                        <p className={`font-medium ${seccionSeleccionada.cupoDisponible < 5 ? 'text-orange-600' : 'text-green-600'}`}>
                                            {seccionSeleccionada.cupoDisponible} disponibles de {seccionSeleccionada.cupoMaximo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Resumen y confirmación */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Resumen de Matrícula
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Año escolar</span>
                                <span className="font-medium">{configuracion?.anioEscolar?.codigo}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Estudiante</span>
                                <span className="font-medium">{estudiante?.nombreCompleto}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Grado</span>
                                <span className="font-medium">
                                    {seccionSeleccionada?.grado.nombreGrado || 'Por seleccionar'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Sección</span>
                                <span className="font-medium">
                                    {seccionSeleccionada?.codigoSeccion || 'Por seleccionar'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">Jornada</span>
                                <span className="font-medium">
                                    {seccionSeleccionada?.jornada.nombre || 'Por seleccionar'}
                                </span>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            disabled={!seleccion.idSeccion || guardando}
                            onClick={handleAsignar}
                        >
                            {guardando ? (
                                'Guardando matrícula...'
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirmar Matrícula
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            Al confirmar, el estudiante quedará en estado de "prematrícula"
                            hasta que se complete la documentación.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}