import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//ChevronLeft,
import { ChevronLeft, Plus, GraduationCap, Save, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
//import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { matriculaService } from '@/services/matriculaService';

interface Grado {
  idGrado: string;
  codigoGrado: string;
  nombreGrado: string;
  nivelEducativo: string;
  orden: number;
}

const NIVELES = ['Preescolar', 'Primaria', 'Secundaria', 'Media', 'Superior'];

export function GradosPage() {
  const navigate = useNavigate();
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [nuevoGrado, setNuevoGrado] = useState({
    codigoGrado: '',
    nombreGrado: '',
    nivelEducativo: 'Primaria',
    orden: 1,
  });

  useEffect(() => {
    cargarGrados();
  }, []);

  const cargarGrados = async () => {
    try {
      const response = await matriculaService.obtenerGrados();
      setGrados(response.data.sort((a: Grado, b: Grado) => a.orden - b.orden));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      else {
        setError('Error cargando grados');
      }

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await matriculaService.crearGrado(nuevoGrado);
      setNuevoGrado({
        codigoGrado: '',
        nombreGrado: '',
        nivelEducativo: 'Primaria',
        orden: grados.length + 1,
      });
      setModoEdicion(false);
      cargarGrados();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      else {
        setError('Error guardando grado');
      }

    }
  };

  const eliminarGrado = async (id: string) => {
    if (!confirm('¿Eliminar este grado?')) return;
    try {
      await matriculaService.eliminarGrado(id);
      cargarGrados();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      else {
        setError('Error eliminando grado');
      }

    }
  };

  const moverOrden = async (id: string, direccion: 'arriba' | 'abajo') => {
    // Implementar lógica de reordenamiento
    const grado = grados.find(g => g.idGrado === id);
    if (!grado) return;

    const nuevoOrden = direccion === 'arriba' ? grado.orden - 1 : grado.orden + 1;
    if (nuevoOrden < 1 || nuevoOrden > grados.length) return;

    try {
      await matriculaService.actualizarGrado(id, { ...grado, orden: nuevoOrden });
      cargarGrados();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      else {
        setError('Error actualizar grado');
      }
      //setError('Error reordenando');
    }
  };

  //if (loading) return <div>Cargando...</div>;

  const gradosPorNivel = NIVELES.map(nivel => ({
    nivel,
    grados: grados.filter(g => g.nivelEducativo === nivel)
  })).filter(g => g.grados.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/matricula/configuracion')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold">Gestión de Grados</h1>
        </div>
        <Button onClick={() => setModoEdicion(!modoEdicion)}>
          <Plus className="h-4 w-4 mr-2" />
          {modoEdicion ? 'Cancelar' : 'Nuevo Grado'}
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
              <GraduationCap className="h-5 w-5" />
              Nuevo Grado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 items-end">
              <div>
                <Label>Código</Label>
                <Input
                  value={nuevoGrado.codigoGrado}
                  onChange={(e) => setNuevoGrado({ ...nuevoGrado, codigoGrado: e.target.value })}
                  placeholder="1GRA"
                  required
                />
              </div>
              <div>
                <Label>Nombre</Label>
                <Input
                  value={nuevoGrado.nombreGrado}
                  onChange={(e) => setNuevoGrado({ ...nuevoGrado, nombreGrado: e.target.value })}
                  placeholder="Primer Grado"
                  required
                />
              </div>
              <div>
                <Label>Nivel Educativo</Label>
                <Select
                  value={nuevoGrado.nivelEducativo}
                  onValueChange={(v) => setNuevoGrado({ ...nuevoGrado, nivelEducativo: v })}
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
                <Label>Orden</Label>
                <Input
                  type="number"
                  value={nuevoGrado.orden}
                  onChange={(e) => setNuevoGrado({ ...nuevoGrado, orden: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="col-span-4 flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Grado
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {gradosPorNivel.map(({ nivel, grados: gradosNivel }) => (
        <Card key={nivel}>
          <CardHeader>
            <CardTitle className="text-lg">{nivel}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Orden</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
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
                  {gradosNivel.map((grado) => (
                    <TableRow key={grado.idGrado}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{grado.orden}</span>
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => moverOrden(grado.idGrado, 'arriba')}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0"
                              onClick={() => moverOrden(grado.idGrado, 'abajo')}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{grado.codigoGrado}</TableCell>
                      <TableCell>{grado.nombreGrado}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarGrado(grado.idGrado)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}