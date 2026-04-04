import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ChevronLeft,
import { ChevronLeft, Plus, Users, Save, Trash2, DoorOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { matriculaService } from '@/services/matriculaService';

interface Seccion {
    idSeccion: string;
    codigoSeccion: string;
    idGrado: string;
    idJornada: string;
    cupoMaximo: number;
    cupoDisponible: number;
    aulaFisica?: string;
    estado: string;
    grado?: { nombreGrado: string };
    jornada?: { nombre: string };
}

interface Grado {
    idGrado: string;
    nombreGrado: string;
}

interface Jornada {
    idJornada: string;
    nombre: string;
}

export function SeccionesPage() {
    const navigate = useNavigate();
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [grados, setGrados] = useState<Grado[]>([]);
    const [jornadas, setJornadas] = useState<Jornada[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [nuevaSeccion, setNuevaSeccion] = useState({
        codigoSeccion: '',
        idGrado: '',
        idJornada: '',
        cupoMaximo: 25,
        aulaFisica: '',
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [seccRes, gradRes, jorRes] = await Promise.all([
                matriculaService.obtenerSecciones(),
                matriculaService.obtenerGrados(),
                matriculaService.obtenerJornadas(),
            ]);
            setSecciones(seccRes.data);
            setGrados(gradRes.data);
            setJornadas(jorRes.data);

            if (gradRes.data.length > 0 && jorRes.data.length > 0) {
                setNuevaSeccion(prev => ({
                    ...prev,
                    idGrado: gradRes.data[0].idGrado,
                    idJornada: jorRes.data[0].idJornada,
                }));
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Error cargando datos');
            }

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await matriculaService.crearSeccion(nuevaSeccion);
            setNuevaSeccion({
                codigoSeccion: '',
                idGrado: grados[0]?.idGrado || '',
                idJornada: jornadas[0]?.idJornada || '',
                cupoMaximo: 25,
                aulaFisica: '',
            });
            setModoEdicion(false);
            cargarDatos();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Error guardando sección');
            }

        }
    };

    const eliminarSeccion = async (id: string) => {
        if (!confirm('¿Eliminar esta sección?')) return;
        try {
            await matriculaService.eliminarSeccion(id);
            cargarDatos();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('Error eliminando sección');
            }

        }
    };

    // if (loading) return <div>Cargando...</div>;



    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/matricula/configuracion')}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                    <h1 className="text-2xl font-bold">Gestión de Secciones</h1>
                </div>
                <Button onClick={() => setModoEdicion(!modoEdicion)} disabled={grados.length === 0 || jornadas.length === 0}>
                    <Plus className="h-4 w-4 mr-2" />
                    {modoEdicion ? 'Cancelar' : 'Nueva Sección'}
                </Button>
            </div>

            {(grados.length === 0 || jornadas.length === 0) && (
                <Alert>
                    <AlertDescription>
                        Debe configurar {grados.length === 0 && 'grados'}{grados.length === 0 && jornadas.length === 0 && ' y '}{jornadas.length === 0 && 'jornadas'} antes de crear secciones.
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {modoEdicion && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DoorOpen className="h-5 w-5" />
                            Nueva Sección
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 items-end">
                            <div>
                                <Label>Código</Label>
                                <Input
                                    value={nuevaSeccion.codigoSeccion}
                                    onChange={(e) => setNuevaSeccion({ ...nuevaSeccion, codigoSeccion: e.target.value })}
                                    placeholder="1A-MAT"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Grado</Label>
                                <Select
                                    value={nuevaSeccion.idGrado}
                                    onValueChange={(v) => setNuevaSeccion({ ...nuevaSeccion, idGrado: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione grado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {grados.map(g => (
                                            <SelectItem key={g.idGrado} value={g.idGrado}>{g.nombreGrado}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Jornada</Label>
                                <Select
                                    value={nuevaSeccion.idJornada}
                                    onValueChange={(v) => setNuevaSeccion({ ...nuevaSeccion, idJornada: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione jornada" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jornadas.map(j => (
                                            <SelectItem key={j.idJornada} value={j.idJornada}>{j.nombre}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Cupo Máximo</Label>
                                <Input
                                    type="number"
                                    value={nuevaSeccion.cupoMaximo}
                                    onChange={(e) => setNuevaSeccion({ ...nuevaSeccion, cupoMaximo: parseInt(e.target.value) })}
                                    min={1}
                                    max={50}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Aula</Label>
                                <Input
                                    value={nuevaSeccion.aulaFisica}
                                    onChange={(e) => setNuevaSeccion({ ...nuevaSeccion, aulaFisica: e.target.value })}
                                    placeholder="A-101"
                                />
                            </div>
                            <div className="col-span-6 flex justify-end">
                                <Button type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Sección
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Grado</TableHead>
                                <TableHead>Jornada</TableHead>
                                <TableHead>Aula</TableHead>
                                <TableHead>Cupos</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                // ESTO SE MUESTRA MIENTRAS CARGAN LOS DATOS
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10">
                                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                            <p className="animate-pulse font-medium">Cargando secciones...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (<>
                                {secciones.map((seccion) => (
                                    <TableRow key={seccion.idSeccion}>
                                        <TableCell className="font-medium">{seccion.codigoSeccion}</TableCell>
                                        <TableCell>{seccion.grado?.nombreGrado}</TableCell>
                                        <TableCell>{seccion.jornada?.nombre}</TableCell>
                                        <TableCell>{seccion.aulaFisica || '-'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className={seccion.cupoDisponible === 0 ? 'text-red-500 font-medium' : ''}>
                                                    {seccion.cupoDisponible} / {seccion.cupoMaximo}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={seccion.estado === 'activo' ? 'default' : 'secondary'}>
                                                {seccion.estado}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => eliminarSeccion(seccion.idSeccion)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {secciones.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                            No hay secciones configuradas
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}