import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//ChevronLeft,
import {  ChevronLeft, Plus, BookOpen, Save, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { matriculaService } from '@/services/matriculaService';

interface Asignatura {
  idAsignatura: string;
  codigoAsignatura: string;
  nombreAsignatura: string;
  areaDisciplina?: string;
  nivelEducativo?: string;
  esObligatoria: boolean;
  horasSemanales: number;
}

const NIVELES = ['Preescolar', 'Primaria', 'Secundaria', 'Media', 'Superior'];
const AREAS = ['Lenguaje', 'Matemáticas', 'Ciencias', 'Sociales', 'Artes', 'Educación Física', 'Tecnología', 'Idiomas'];

export function AsignaturasPage() {
  const navigate = useNavigate();
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [nuevaAsignatura, setNuevaAsignatura] = useState({
    codigoAsignatura: '',
    nombreAsignatura: '',
    areaDisciplina: '',
    nivelEducativo: 'Primaria',
    esObligatoria: true,
    horasSemanales: 5,
  });

  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const cargarAsignaturas = async () => {
    try {
      const response = await matriculaService.obtenerAsignaturas();
      setAsignaturas(response.data);
    } catch (err) {
         if(err instanceof Error){
            setError(err.message);
        }
        else {
           setError('Error cargando asignaturas');
        }
      
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await matriculaService.crearAsignatura(nuevaAsignatura);
      setNuevaAsignatura({
        codigoAsignatura: '',
        nombreAsignatura: '',
        areaDisciplina: '',
        nivelEducativo: 'Primaria',
        esObligatoria: true,
        horasSemanales: 5,
      });
      setModoEdicion(false);
      cargarAsignaturas();
    } catch (err) {
         if(err instanceof Error){
            setError(err.message);
        }
        else {
           setError('Error guardando asignatura');
        }
      
    }
  };

  const eliminarAsignatura = async (id: string) => {
    if (!confirm('¿Eliminar esta asignatura?')) return;
    try {
      await matriculaService.eliminarAsignatura(id);
      cargarAsignaturas();
    } catch (err) {
         if(err instanceof Error){
            setError(err.message);
        }
        else {
           setError('Error eliminando asignatura');
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
          <h1 className="text-2xl font-bold">Gestión de Asignaturas</h1>
        </div>
        <Button onClick={() => setModoEdicion(!modoEdicion)}>
          <Plus className="h-4 w-4 mr-2" />
          {modoEdicion ? 'Cancelar' : 'Nueva Asignatura'}
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
              <BookOpen className="h-5 w-5" />
              Nueva Asignatura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 items-end">
              <div>
                <Label>Código</Label>
                <Input
                  value={nuevaAsignatura.codigoAsignatura}
                  onChange={(e) => setNuevaAsignatura({...nuevaAsignatura, codigoAsignatura: e.target.value})}
                  placeholder="MAT-101"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label>Nombre</Label>
                <Input
                  value={nuevaAsignatura.nombreAsignatura}
                  onChange={(e) => setNuevaAsignatura({...nuevaAsignatura, nombreAsignatura: e.target.value})}
                  placeholder="Matemáticas Básicas"
                  required
                />
              </div>
              <div>
                <Label>Área</Label>
                <Select
                  value={nuevaAsignatura.areaDisciplina}
                  onValueChange={(v) => setNuevaAsignatura({...nuevaAsignatura, areaDisciplina: v})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione área" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREAS.map(a => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Nivel</Label>
                <Select
                  value={nuevaAsignatura.nivelEducativo}
                  onValueChange={(v) => setNuevaAsignatura({...nuevaAsignatura, nivelEducativo: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NIVELES.map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Horas/Semana</Label>
                <Input
                  type="number"
                  value={nuevaAsignatura.horasSemanales}
                  onChange={(e) => setNuevaAsignatura({...nuevaAsignatura, horasSemanales: parseInt(e.target.value)})}
                  min={1}
                  max={20}
                  required
                />
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Checkbox
                  id="obligatoria"
                  checked={nuevaAsignatura.esObligatoria}
                  onCheckedChange={(checked) => 
                    setNuevaAsignatura({...nuevaAsignatura, esObligatoria: checked as boolean})
                  }
                />
                <Label htmlFor="obligatoria" className="font-normal cursor-pointer">
                  Obligatoria
                </Label>
              </div>
              <div className="col-span-6 flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Asignatura
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
                <TableHead>Nombre</TableHead>
                <TableHead>Área/Nivel</TableHead>
                <TableHead>Horas</TableHead>
                <TableHead>Tipo</TableHead>
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
              {asignaturas.map((asignatura) => (
                <TableRow key={asignatura.idAsignatura}>
                  <TableCell className="font-medium">{asignatura.codigoAsignatura}</TableCell>
                  <TableCell>{asignatura.nombreAsignatura}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{asignatura.areaDisciplina}</span>
                      <span className="text-xs text-muted-foreground">{asignatura.nivelEducativo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {asignatura.horasSemanales}h
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={asignatura.esObligatoria ? 'default' : 'secondary'}>
                      {asignatura.esObligatoria ? 'Obligatoria' : 'Electiva'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarAsignatura(asignatura.idAsignatura)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {asignaturas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No hay asignaturas configuradas
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