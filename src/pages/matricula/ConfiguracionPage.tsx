import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, GraduationCap, Users, BookOpen, Calendar, PlayCircle } from 'lucide-react';
import { ConfigCard } from '@/components/matricula/ConfigCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { matriculaService } from '@/services/matriculaService';
import type { ConfiguracionMatricula, ResumenSistema } from '@/types/matricula';

export function ConfiguracionPage() {
    const navigate = useNavigate();
    const [config, setConfig] = useState<ConfiguracionMatricula | null>(null);
    const [resumen, setResumen] = useState<ResumenSistema | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEstado();
    }, []);

    const cargarEstado = async () => {
        try {
            const data = await matriculaService.obtenerEstadoConfiguracion();
            setConfig(data.configuracionActual);
            setResumen(data.resumenSistema);
        } catch (error) {
            console.error('Error cargando configuración:', error);
        } finally {
            setLoading(false);
        }
    };

    const activarMatricula = async () => {
        // Abrir modal o navegar a formulario de activación
        navigate('periodo');
    };

    const tarjetasConfig = [
        {
            titulo: 'Jornadas',
            descripcion: 'Matutina, vespertina, nocturna',
            icono: <Sun className="h-6 w-6" />,
            cantidad: resumen?.totalJornadas,
            estado: (resumen?.totalJornadas || 0) > 0 ? 'configurado' : 'pendiente',
            color: 'orange' as const,
            path: 'jornadas',
        },
        {
            titulo: 'Grados',
            descripcion: 'Niveles educativos del sistema',
            icono: <GraduationCap className="h-6 w-6" />,
            cantidad: resumen?.totalGrados,
            estado: (resumen?.totalGrados || 0) > 0 ? 'configurado' : 'pendiente',
            color: 'blue' as const,
            path: 'grados',
        },
        {
            titulo: 'Secciones',
            descripcion: 'Grupos por grado y jornada',
            icono: <Users className="h-6 w-6" />,
            cantidad: resumen?.totalSecciones,
            estado: (resumen?.totalSecciones || 0) > 0 ? 'configurado' : 'pendiente',
            color: 'purple' as const,
            //path: '/matricula/configuracion/secciones',
            path: 'secciones',
        },
        {
            titulo: 'Asignaturas',
            descripcion: 'Materias y áreas de estudio',
            icono: <BookOpen className="h-6 w-6" />,
            cantidad: resumen?.totalAsignaturas,
            estado: (resumen?.totalAsignaturas || 0) > 0 ? 'configurado' : 'pendiente',
            color: 'green' as const,
            path: 'asignaturas',
        },
        {
            titulo: 'Período de Matrícula',
            descripcion: config?.matriculaActiva
                ? `Activo hasta ${config.fechaFin}`
                : 'No hay período activo',
            icono: <Calendar className="h-6 w-6" />,
            estado: config?.matriculaActiva ? 'configurado' : 'pendiente',
            color: 'red' as const,
            path: 'periodo',
            accion: config?.matriculaActiva ? undefined : activarMatricula,
        },
    ];

    //if (loading) return <div>Cargando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Configuración de Matrícula</h1>
                    <p className="text-muted-foreground">
                        Año Escolar: {config?.anioEscolar.codigo || 'No configurado'}
                    </p>
                </div>
                {config?.matriculaActiva && (
                    <Button onClick={() => navigate('/matricula/nueva')}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Ir a Matricular
                    </Button>
                )}
            </div>

            {!config?.matriculaActiva && (
                <Alert>
                    <AlertDescription>
                        El período de matrícula no está activo. Configure el período para comenzar.
                    </AlertDescription>
                </Alert>
            )}

            {loading ? (
                // ESTO SE MUESTRA MIENTRAS CARGAN LOS DATOS

                <div className="flex flex-col items-center justify-center h-screen w-full gap-2 text-muted-foreground">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="animate-pulse font-medium">Cargando opciones de configuración...</p>
                </div>

            ) : (<>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {tarjetasConfig.map((tarjeta) => (
                        <ConfigCard
                            key={tarjeta.titulo}
                            titulo={tarjeta.titulo}
                            descripcion={tarjeta.descripcion}
                            icono={tarjeta.icono}
                            cantidad={tarjeta.cantidad}
                            //estado ={tarjeta.estado}
                            estado={tarjeta.estado as "configurado" | "pendiente" | "bloqueado"}
                            color={tarjeta.color}
                            onClick={tarjeta.accion || (() => navigate(tarjeta.path))}
                        />
                    ))}

                </div>
            </>
            )}

            {resumen && (
                <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Resumen del Sistema</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Cupos Disponibles</p>
                            <p className="text-2xl font-bold">{resumen.cuposDisponibles}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Matriculados</p>
                            <p className="text-2xl font-bold">{resumen.estudiantesMatriculados}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}