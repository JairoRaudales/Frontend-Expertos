import api from './api';
import type {
    ConfiguracionMatricula,
    ResumenSistema,
    MatriculaCompletaInput
} from '@/types/matricula';

interface EstadoConfiguracionResponse {
    configuracionActual: ConfiguracionMatricula;
    resumenSistema: ResumenSistema;
}

export const matriculaService = {
    // Configuración
    obtenerEstadoConfiguracion: async (): Promise<EstadoConfiguracionResponse> => {
        const { data } = await api.get('/matricula/configuracion/estado');
        return data;
    },

    activarPeriodo: async (config: {
        idAnioEscolar: string;
        fechaInicio: string;
        fechaFin: string;
        observaciones?: string;
    }): Promise<ConfiguracionMatricula> => {
        const { data } = await api.post('/matricula/configuracion/activar', config);
        return data;
    },

    // Jornadas, Grados, Secciones, Asignaturas (CRUD básico)
    obtenerJornadas: () => api.get('/jornadas'),
    crearJornada: (jornada: unknown) => api.post('/jornadas', jornada),

    // Matrícula de estudiantes
    crearEstudianteConFamilia: async (input: MatriculaCompletaInput) => {
        const { data } = await api.post('/matricula/estudiante-con-familia', input);
        return data;
    },


    // Para el formulario de asignación


    eliminarJornada: async (id: string) => {
        const { data } = await api.delete('/jornada/' + id);
        return data;
    },



    // Grados
    obtenerGrados: () => api.get('/grados'),
    crearGrado: (grado: unknown) => api.post('/grados', grado),
    actualizarGrado: (id: string, grado: unknown) => api.put(`/grados/${id}`, grado),
    eliminarGrado: (id: string) => api.delete(`/grados/${id}`),

    // Secciones
    obtenerSecciones: () => api.get('/secciones'),
    crearSeccion: (seccion: unknown) => api.post('/secciones', seccion),
    eliminarSeccion: (id: string) => api.delete(`/secciones/${id}`),
    obtenerSeccionesDisponibles: async (idGrado?: string, idJornada?: string) => {
        const { data } = await api.get('/secciones/disponibles', {
            params: { idGrado, idJornada }
        });
        return data;
    },

    // Asignaturas
    obtenerAsignaturas: () => api.get('/asignaturas'),
    crearAsignatura: (asignatura: unknown) => api.post('/asignaturas', asignatura),
    eliminarAsignatura: (id: string) => api.delete(`/asignaturas/${id}`),


    obtenerEstudiante: (id: string) => api.get(`/estudiantes/${id}`),

    asignarSeccion: async (asignacion: {
        idEstudiante: string;
        idSeccion: string;
        idConfiguracionMatricula: string;
    }) => {
        const { data } = await api.post('/matricula/asignar-seccion', asignacion);
        return data;
    },

};