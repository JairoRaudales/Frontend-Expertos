import { useEffect, useState } from 'react';
 import { useNavigate } from 'react-router-dom';
//ChevronLeft,
import {  ChevronLeft, Plus, Clock, Sun, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { matriculaService } from '@/services/matriculaService';

interface Jornada {
    idJornada: string;
    codigo: string;
    nombre: string;
    horaInicio: string;
    horaFin: string;
    activa: boolean;
    orden: number;
}

export function JornadasPage() {
    const navigate = useNavigate();
    const [jornadas, setJornadas] = useState<Jornada[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [nuevaJornada, setNuevaJornada] = useState({
        codigo: '',
        nombre: '',
        horaInicio: '07:00',
        horaFin: '12:00',
        orden: 1,
    });

    useEffect(() => {
        cargarJornadas();
    }, []);

    const cargarJornadas = async () => {
        try {
            const response = await matriculaService.obtenerJornadas();
            setJornadas(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Error cargando jornadas');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await matriculaService.crearJornada(nuevaJornada);
            setNuevaJornada({
                codigo: '',
                nombre: '',
                horaInicio: '07:00',
                horaFin: '12:00',
                orden: jornadas.length + 1,
            });
            setModoEdicion(false);
            cargarJornadas();
        } catch (err) {
            if(err instanceof Error){
            setError(err.message);
            } else {
                setError('Error guardando jornada');
            }
        }
    };

    const eliminarJornada = async (id: string) => {
        if (!confirm('¿Eliminar esta jornada?')) return;
        try {
            await matriculaService.eliminarJornada(id);
            cargarJornadas();
        } catch (err) {
            if(err instanceof Error){
            setError(err.message);
            }else {
            setError('Error eliminando jornada');  
            }
        }
    };

    //if (loading) return <div>Cargando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/matricula/configuracion')}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                   <h1 className="text-2xl font-bold">Gestión de Jornadas</h1>
                </div>
                <Button onClick={() => setModoEdicion(!modoEdicion)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {modoEdicion ? 'Cancelar' : 'Nueva Jornada'}
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {modoEdicion && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sun className="h-5 w-5" />
                            Nueva Jornada
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4 items-end">
                            <div>
                                <Label>Código</Label>
                                <Input
                                    value={nuevaJornada.codigo}
                                    onChange={(e) => setNuevaJornada({ ...nuevaJornada, codigo: e.target.value })}
                                    placeholder="MAT"
                                    required
                                />
                            </div>
                            <div>
                                <Label>Nombre</Label>
                                <Input
                                    value={nuevaJornada.nombre}
                                    onChange={(e) => setNuevaJornada({ ...nuevaJornada, nombre: e.target.value })}
                                    placeholder="Matutina"
                                    required
                                />
                            </div>
                            <div>
                                <Label>Hora Inicio</Label>
                                <Input
                                    type="time"
                                    value={nuevaJornada.horaInicio}
                                    onChange={(e) => setNuevaJornada({ ...nuevaJornada, horaInicio: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Hora Fin</Label>
                                <Input
                                    type="time"
                                    value={nuevaJornada.horaFin}
                                    onChange={(e) => setNuevaJornada({ ...nuevaJornada, horaFin: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Orden</Label>
                                <Input
                                    type="number"
                                    value={nuevaJornada.orden}
                                    onChange={(e) => setNuevaJornada({ ...nuevaJornada, orden: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="col-span-5 flex justify-end">
                                <Button type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Jornada
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
                                <TableHead>Orden</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Horario</TableHead>
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
                            {jornadas.map((jornada) => (
                                <TableRow key={jornada.idJornada}>
                                    <TableCell>{jornada.orden}</TableCell>
                                    <TableCell className="font-medium">{jornada.codigo}</TableCell>
                                    <TableCell>{jornada.nombre}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            {jornada.horaInicio} - {jornada.horaFin}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={jornada.activa ? 'default' : 'secondary'}>
                                            {jornada.activa ? 'Activa' : 'Inactiva'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => eliminarJornada(jornada.idJornada)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {jornadas.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                        No hay jornadas configuradas
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