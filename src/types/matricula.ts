export interface ConfiguracionMatricula {
  id: string;
  matriculaActiva: boolean;
  fechaInicio?: string;
  fechaFin?: string;
  anioEscolar: {
    id: string;
    codigo: string;
  };
}

export interface ResumenSistema {
  totalJornadas: number;
  totalGrados: number;
  totalSecciones: number;
  totalAsignaturas: number;
  cuposDisponibles: number;
  estudiantesMatriculados: number;
}

export interface ConfigCardProps {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  cantidad?: number;
  estado?: 'configurado' | 'pendiente' | 'bloqueado';
  onClick: () => void;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface PersonaInput {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  identidad?: string;
  fechaNacimiento?: string;
  sexo?: 'M' | 'F';
  direccion?: string;
  telefono?: string;
  email?: string;
  nacionalidad: string;
}

export interface TutorInput {
  tipoRelacion: 'padre' | 'madre' | 'apoderado' | 'tutor';
  esResponsablePrincipal: boolean;
  persona: PersonaInput;
}

export interface EstudianteInput {
  persona: PersonaInput;
  necesidadesEducativasEspeciales: boolean;
  detalleNecesidades?: string;
  codigoEstudiante : string;
}

export interface FamiliaInput {
  nombreFamilia?: string;
  direccionFamiliar?: string;
  telefonoFamiliar?: string;
  emailFamiliar?: string;
}

export interface MatriculaCompletaInput {
  nuevaFamilia: boolean;
  familia?: FamiliaInput;
  estudiante: EstudianteInput;
  tutores: TutorInput[];
}

 