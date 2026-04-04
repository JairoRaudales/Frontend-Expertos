import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, UserPlus, Users } from 'lucide-react';
//import {  Save, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DatosPadresForm } from '@/components/matricula/DatosPadresForm';
import { DatosEstudianteForm } from '@/components/matricula/DatosEstudianteForm';
import { matriculaService } from '@/services/matriculaService';
import type { MatriculaCompletaInput, PersonaInput, EstudianteInput } from '@/types/matricula';

import { useEffect } from 'react'; // Añadir useEffect
import type { ConfiguracionMatricula } from '@/types/matricula';

export function NuevaMatriculaPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('estudiante');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [config, setConfig] = useState<ConfiguracionMatricula | null>(null);

    // Estado del formulario
    const [estudiante, setEstudiante] = useState<

        EstudianteInput
    >({
        persona: {
            primerNombre: '',
            primerApellido: '',
            nacionalidad: 'Honduras',
            sexo: undefined,
        },
        necesidadesEducativasEspeciales: false,
        detalleNecesidades: '',
        codigoEstudiante: '',
    });

    // Cargar configuración al montar el componente
    useEffect(() => {
        const cargarConfig = async () => {
            try {
                const res = await matriculaService.obtenerEstadoConfiguracion();
                setConfig(res.configuracionActual);
            } catch (err) {
                console.error("Error cargando config", err);
            }
        };
        cargarConfig();
    }, []);

    const esInactivo = config && !config.matriculaActiva;
const esInactivo2 = true;
    const [familia, setFamilia] = useState({
        esNueva: true,
        nombreFamilia: '',
        direccionFamiliar: '',
        telefonoFamiliar: '',
        emailFamiliar: '',
    });

    const [tutores, setTutores] = useState<Array<{
        id: string;
        tipoRelacion: 'padre' | 'madre' | 'apoderado' | 'tutor';
        esResponsablePrincipal: boolean;
        persona: PersonaInput;
    }>>([]);

    const agregarTutor = () => {
        const nuevoTutor = {
            id: crypto.randomUUID(),
            tipoRelacion: 'padre' as const,
            esResponsablePrincipal: tutores.length === 0,
            persona: {
                primerNombre: '',
                primerApellido: '',
                nacionalidad: 'Honduras',
                sexo: 'M' as const,
            },
        };
        setTutores([...tutores, nuevoTutor]);
    };

    const actualizarTutor = (id: string, campo: string, valor: unknown) => {
        setTutores(tutores.map(t =>
            t.id === id ? { ...t, [campo]: valor } : t
        ));
    };

    const actualizarPersonaTutor = (id: string, campo: keyof PersonaInput, valor: unknown) => {
        setTutores(tutores.map(t =>
            t.id === id ? { ...t, persona: { ...t.persona, [campo]: valor } } : t
        ));
    };

    const eliminarTutor = (id: string) => {
        setTutores(tutores.filter(t => t.id !== id));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            // Validaciones básicas
            if (!estudiante.persona.primerNombre || !estudiante.persona.primerApellido) {
                throw new Error('Datos del estudiante incompletos');
            }
            if (tutores.length === 0) {
                throw new Error('Debe registrar al menos un tutor');
            }
            if (!tutores.some(t => t.esResponsablePrincipal)) {
                throw new Error('Debe designar un tutor como responsable principal');
            }

            const payload: MatriculaCompletaInput = {
                nuevaFamilia: familia.esNueva,
                familia: familia.esNueva ? {
                    nombreFamilia: familia.nombreFamilia || `${tutores[0].persona.primerApellido} Family`,
                    direccionFamiliar: familia.direccionFamiliar,
                    telefonoFamiliar: familia.telefonoFamiliar,
                    emailFamiliar: familia.emailFamiliar,
                } : undefined,
                estudiante: {
                    persona: estudiante.persona,
                    codigoEstudiante: estudiante.codigoEstudiante,
                    necesidadesEducativasEspeciales: estudiante.necesidadesEducativasEspeciales,
                    detalleNecesidades: estudiante.necesidadesEducativasEspeciales ? estudiante.detalleNecesidades : undefined,
                },
                tutores: tutores.map(t => ({
                    tipoRelacion: t.tipoRelacion,
                    esResponsablePrincipal: t.esResponsablePrincipal,
                    persona: t.persona,
                })),
            };

            const resultado = await matriculaService.crearEstudianteConFamilia(payload);

            // Navegar a asignación de sección
            navigate(`/matricula/asignar-seccion/${resultado.idEstudiante}`);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error al guardar la matrícula');
            }
            // setError(err.message || 'Error al guardar la matrícula');
        } finally {
            setLoading(false);
        }


    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/matricula/configuracion')}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold">Nueva Matrícula</h1>
            </div>

            {/* Alerta de bloqueo */}
            {esInactivo2 && (
                <Alert variant="destructive" className="bg-destructive/10">
                    <AlertDescription className="font-bold">
                        El período de matrícula no está activo. Los formularios están en modo de solo lectura. {esInactivo}
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* El atributo 'disabled' en el fieldset bloquea TODOS los inputs internos */}
            <fieldset disabled={esInactivo2 || loading} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="estudiante">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Datos del Estudiante
                        </TabsTrigger>
                        <TabsTrigger value="familia">
                            <Users className="h-4 w-4 mr-2" />
                            Familia y Tutores
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="estudiante" className="space-y-4">
                        <DatosEstudianteForm
                            estudiante={estudiante}
                            onChange={setEstudiante}
                        />
                        <div className="flex justify-end">
                            <Button onClick={() => setActiveTab('familia')}>
                                Continuar a Familia
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="familia" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información de Familia</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={familia.esNueva}
                                            onChange={() => setFamilia({ ...familia, esNueva: true })}
                                        />
                                        Nueva familia
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={!familia.esNueva}
                                            onChange={() => setFamilia({ ...familia, esNueva: false })}
                                        />
                                        Familia existente
                                    </label>
                                </div>

                                {familia.esNueva && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Nombre Familia</label>
                                            <input
                                                className="w-full p-2 border rounded"
                                                value={familia.nombreFamilia}
                                                onChange={(e) => setFamilia({ ...familia, nombreFamilia: e.target.value })}
                                                placeholder="Ej: Familia Pérez"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Teléfono Familiar</label>
                                            <input
                                                className="w-full p-2 border rounded"
                                                value={familia.telefonoFamiliar}
                                                onChange={(e) => setFamilia({ ...familia, telefonoFamiliar: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-sm font-medium">Dirección</label>
                                            <input
                                                className="w-full p-2 border rounded"
                                                value={familia.direccionFamiliar}
                                                onChange={(e) => setFamilia({ ...familia, direccionFamiliar: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold">Tutores/Responsables</h3>
                                <Button variant="outline" onClick={agregarTutor}>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Agregar Tutor
                                </Button>
                            </div>

                            {tutores.map((tutor, index) => (
                                <DatosPadresForm
                                    key={tutor.id}
                                    tutor={tutor}
                                    index={index}
                                    onChange={actualizarTutor}
                                    onPersonaChange={actualizarPersonaTutor}
                                    onRemove={eliminarTutor}
                                />
                            ))}

                            {tutores.length === 0 && (
                                <p className="text-muted-foreground text-center py-8">
                                    Agregue al menos un tutor responsable del estudiante
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab('estudiante')}>
                                Anterior
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading || tutores.length === 0}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Guardando...' : 'Guardar y Asignar Sección'}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </fieldset>
        </div>
    );
}