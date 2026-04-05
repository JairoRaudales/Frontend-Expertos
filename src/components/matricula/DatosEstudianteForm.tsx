import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { PersonaInput, EstudianteInput } from '@/types/matricula';

// interface DatosEstudianteFormProps {
//     estudiante: {
//         persona: PersonaInput;
//         necesidadesEspeciales: boolean;
//         detalleNecesidades: string;
//     };
//     //onChange: (data: any) => void;
//     onChange: (data: PersonaInput) => void;
// }

interface DatosEstudianteFormProps {
   estudiante: EstudianteInput; // Cambiamos esto
   onChange: (data: EstudianteInput) => void; // Y esto
}

export function DatosEstudianteForm({ estudiante, onChange }: DatosEstudianteFormProps) {
    //   const updatePersona = (campo: keyof PersonaInput, valor : any ) => {
    //     onChange({
    //       ...estudiante,
    //       persona: { ...estudiante.persona, [campo]: valor }
    //     });
    //   };
   const updatePersona = <K extends keyof PersonaInput>(campo: K, valor: PersonaInput[K]) => {
    onChange({
      ...estudiante,
      persona: {
        ...estudiante.persona,
        [campo]: valor
      }
    });
  };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información del Estudiante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="primerNombre">Primer Nombre *</Label>
                        <Input
                            id="primerNombre"
                            value={estudiante.persona.primerNombre}
                            onChange={(e) => updatePersona('primerNombre', e.target.value)}
                            placeholder="Ej: Juan"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                        <Input
                            id="segundoNombre"
                            value={estudiante.persona.segundoNombre || ''}
                            onChange={(e) => updatePersona('segundoNombre', e.target.value)}
                            placeholder="Ej: Carlos"
                        />
                    </div>
                    <div>
                        <Label htmlFor="primerApellido">Primer Apellido *</Label>
                        <Input
                            id="primerApellido"
                            value={estudiante.persona.primerApellido}
                            onChange={(e) => updatePersona('primerApellido', e.target.value)}
                            placeholder="Ej: Pérez"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                        <Input
                            id="segundoApellido"
                            value={estudiante.persona.segundoApellido || ''}
                            onChange={(e) => updatePersona('segundoApellido', e.target.value)}
                            placeholder="Ej: García"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="fechaNacimiento">Fecha Nacimiento *</Label>
                        <Input
                            id="fechaNacimiento"
                            type="date"
                            value={estudiante.persona.fechaNacimiento || ''}
                            onChange={(e) => updatePersona('fechaNacimiento', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="sexo">Sexo *</Label>
                        <select
                            id="sexo"
                            className="w-full p-2 border rounded"
                            value={estudiante.persona.sexo || ''}
                            onChange={(e) => updatePersona('sexo', e.target.value as "M" | "F")}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="nacionalidad">Nacionalidad *</Label>
                        <Input
                            id="nacionalidad"
                            value={estudiante.persona.nacionalidad}
                            onChange={(e) => updatePersona('nacionalidad', e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                        id="direccion"
                        value={estudiante.persona.direccion || ''}
                        onChange={(e) => updatePersona('direccion', e.target.value)}
                        placeholder="Colonia, calle, número"
                    />
                </div>

                <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Checkbox
                            id="necesidadesEspeciales"
                            checked={estudiante.necesidadesEducativasEspeciales}
                            onCheckedChange={(checked) =>
                                onChange({ ...estudiante, necesidadesEducativasEspeciales: checked === true })
                            }
                        />
                        <Label htmlFor="necesidadesEspeciales" className="font-normal cursor-pointer">
                            ¿El estudiante tiene necesidades educativas especiales?
                        </Label>
                    </div>

                    {estudiante.necesidadesEducativasEspeciales && (
                        <div className="mt-2">
                            <Label htmlFor="detalleNecesidades">Detalle de necesidades</Label>
                            <Textarea
                                id="detalleNecesidades"
                                value={estudiante.detalleNecesidades}
                                onChange={(e) => onChange({ ...estudiante, detalleNecesidades: e.target.value })}
                                placeholder="Describa las necesidades especiales del estudiante..."
                                rows={3}
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}