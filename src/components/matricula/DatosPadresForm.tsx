import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { PersonaInput } from '@/types/matricula';

interface DatosPadresFormProps {
  tutor: {
    id: string;
    tipoRelacion: 'padre' | 'madre' | 'apoderado' | 'tutor';
    esResponsablePrincipal: boolean;
    persona: PersonaInput;
  };
  index: number;
  //onChange: (id: string, campo: string, valor: any) => void;
  onChange: (
  id: string, 
  campo: keyof Omit<DatosPadresFormProps['tutor'], 'persona' | 'id'>, 
  valor: string | boolean 
) => void;
 // onPersonaChange: (id: string, campo: keyof PersonaInput, valor: any) => void;
 onPersonaChange: <K extends keyof PersonaInput>(
  id: string, 
  campo: K, 
  valor: PersonaInput[K] // El valor ahora "machea" con el campo (string, date, etc)
) => void;
  onRemove: (id: string) => void;
}

export function DatosPadresForm({ 
  tutor, 
  index, 
  onChange, 
  onPersonaChange, 
  onRemove 
}: DatosPadresFormProps) {
  const titulo = tutor.tipoRelacion === 'padre' ? 'Padre' : 
                 tutor.tipoRelacion === 'madre' ? 'Madre' : 
                 tutor.tipoRelacion === 'apoderado' ? 'Apoderado' : 'Tutor';

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {titulo} {index + 1}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(tutor.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Label>Tipo de Relación</Label>
            <select
              className="w-full p-2 border rounded"
              value={tutor.tipoRelacion}
              onChange={(e) => onChange(tutor.id, 'tipoRelacion', e.target.value)}
            >
              <option value="padre">Padre</option>
              <option value="madre">Madre</option>
              <option value="apoderado">Apoderado</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Checkbox
              id={`responsable-${tutor.id}`}
              checked={tutor.esResponsablePrincipal}
              onCheckedChange={(checked) => 
                onChange(tutor.id, 'esResponsablePrincipal', checked)
              }
            />
            <Label htmlFor={`responsable-${tutor.id}`} className="font-normal cursor-pointer text-sm">
              Responsable principal
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Primer Nombre *</Label>
            <Input
              value={tutor.persona.primerNombre}
              onChange={(e) => onPersonaChange(tutor.id, 'primerNombre', e.target.value)}
              placeholder="Ej: Carlos"
              required
            />
          </div>
          <div>
            <Label>Segundo Nombre</Label>
            <Input
              value={tutor.persona.segundoNombre || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'segundoNombre', e.target.value)}
              placeholder="Ej: Alberto"
            />
          </div>
          <div>
            <Label>Primer Apellido *</Label>
            <Input
              value={tutor.persona.primerApellido}
              onChange={(e) => onPersonaChange(tutor.id, 'primerApellido', e.target.value)}
              placeholder="Ej: Pérez"
              required
            />
          </div>
          <div>
            <Label>Segundo Apellido</Label>
            <Input
              value={tutor.persona.segundoApellido || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'segundoApellido', e.target.value)}
              placeholder="Ej: García"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>No. Identidad</Label>
            <Input
              value={tutor.persona.identidad || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'identidad', e.target.value)}
              placeholder="0801-XXXX-XXXXX"
            />
          </div>
          <div>
            <Label>Teléfono *</Label>
            <Input
              value={tutor.persona.telefono || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'telefono', e.target.value)}
              placeholder="9999-9999"
              required
            />
          </div>
        </div>

        <div>
          <Label>Correo Electrónico</Label>
          <Input
            type="email"
            value={tutor.persona.email || ''}
            onChange={(e) => onPersonaChange(tutor.id, 'email', e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Fecha Nacimiento</Label>
            <Input
              type="date"
              value={tutor.persona.fechaNacimiento || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'fechaNacimiento', e.target.value)}
            />
          </div>
          <div>
            <Label>Sexo</Label>
            <select
              className="w-full p-2 border rounded"
              value={tutor.persona.sexo || ''}
              onChange={(e) => onPersonaChange(tutor.id, 'sexo', e.target.value as "M" | "F")}
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
        </div>

        <div>
          <Label>Dirección</Label>
          <Input
            value={tutor.persona.direccion || ''}
            onChange={(e) => onPersonaChange(tutor.id, 'direccion', e.target.value)}
            placeholder="Colonia, calle, número de casa"
          />
        </div>
      </CardContent>
    </Card>
  );
}