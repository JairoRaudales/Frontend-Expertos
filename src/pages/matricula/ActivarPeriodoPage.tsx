import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ChevronLeft,
import { ChevronLeft, Calendar, PlayCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { matriculaService } from '@/services/matriculaService';

interface AnioEscolar {
  id: string;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
}

export function ActivarPeriodoPage() {
  const navigate = useNavigate();
  const [aniosEscolares, setAniosEscolares] = useState<AnioEscolar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    idAnioEscolar: '',
    fechaInicio: '',
    fechaFin: '',
    observaciones: '',
  });

  useEffect(() => {
    // Cargar años escolares disponibles
    cargarAniosEscolares();
  }, []);

  const cargarAniosEscolares = async () => {
    try {
      // Aquí llamarías a tu servicio de años escolares
      const mockAnios: AnioEscolar[] = [
        { id: '1', codigo: '2025-2026', fechaInicio: '2025-01-01', fechaFin: '2025-12-15' },
        { id: '2', codigo: '2024-2025', fechaInicio: '2024-01-01', fechaFin: '2024-12-15' },
      ];
      setAniosEscolares(mockAnios);
      if (mockAnios.length > 0) {
        setFormData(prev => ({ ...prev, idAnioEscolar: mockAnios[0].id }));
      }
    } catch (err) {
      console.error("Error al cargar años escolares:", err);
      setError('Error cargando años escolares');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones
      const inicio = new Date(formData.fechaInicio);
      const fin = new Date(formData.fechaFin);
      
      if (fin <= inicio) {
        throw new Error('La fecha de fin debe ser posterior a la de inicio');
      }

      await matriculaService.activarPeriodo({
        idAnioEscolar: formData.idAnioEscolar,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        observaciones: formData.observaciones,
      });

      navigate('/matricula/configuracion');
    } catch (err) {
      // Comprobamos si 'err' es una instancia de la clase Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error activando período');
      }
    } finally {
      setLoading(false);
    }
  };

  const anioSeleccionado = aniosEscolares.find(a => a.id === formData.idAnioEscolar);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/matricula/configuracion')}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h1 className="text-2xl font-bold">Activar Período de Matrícula</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          Al activar un período de matrícula, los usuarios con permisos podrán 
          comenzar a registrar estudiantes. Asegúrese de tener configuradas las 
          secciones y cupos antes de continuar.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Configuración del Período
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Año Escolar</label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={formData.idAnioEscolar}
                onChange={(e) => setFormData({ ...formData, idAnioEscolar: e.target.value })}
                required
              >
                {aniosEscolares.map(anio => (
                  <option key={anio.id} value={anio.id}>
                    {anio.codigo}
                  </option>
                ))}
              </select>
              {anioSeleccionado && (
                <p className="text-xs text-muted-foreground mt-1">
                  Período académico: {anioSeleccionado.fechaInicio} al {anioSeleccionado.fechaFin}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fecha Inicio Matrícula *</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Fecha Fin Matrícula *</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Observaciones</label>
              <textarea
                className="w-full p-2 border rounded mt-1"
                rows={3}
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                placeholder="Notas sobre este período de matrícula..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/matricula/configuracion')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {loading ? 'Activando...' : 'Activar Matrícula'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}