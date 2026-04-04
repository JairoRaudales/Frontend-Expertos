// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type ModoTrabajo = 'admin' | 'direccion' | 'docente';

// interface ModoState {
//   modoActual: ModoTrabajo;
//   setModo: (modo: ModoTrabajo) => void;
//   getModosDisponibles: (roles: string[]) => ModoTrabajo[];
// }

// const modoLabels: Record<ModoTrabajo, { label: string; icon: string }> = {
//   admin: { label: 'Administración', icon: '🏗️' },
//   direccion: { label: 'Dirección', icon: '👔' },
//   docente: { label: 'Docente', icon: '📚' },
// };

// export const useModoStore = create<ModoState>()(
//   persist(
//     (set, get) => ({
//       modoActual: 'admin', // Por defecto
      
//       setModo: (modo) => set({ modoActual: modo }),
      
//       getModosDisponibles: (roles) => {
//         const modos: ModoTrabajo[] = [];
//         if (roles.includes('Administrador')) modos.push('admin');
//         if (roles.includes('Director')) modos.push('direccion');
//         if (roles.includes('Docente')) modos.push('docente');
//         return modos.length > 0 ? modos : ['admin']; // Fallback
//       },
//     }),
//     {
//       name: 'modo-trabajo-storage',
//     }
//   )
// );

// export { modoLabels };

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ModoTrabajo = 'admin' | 'direccion' | 'docente';

interface ModoState {
  modoActual: ModoTrabajo;
  setModo: (modo: ModoTrabajo) => void;
  getModosDisponibles: (roles: string[]) => ModoTrabajo[];
}

export const modoLabels: Record<ModoTrabajo, { label: string; icon: string; color: string }> = {
  admin: { label: 'Administración', icon: '🏗️', color: 'blue' },
  direccion: { label: 'Dirección', icon: '👔', color: 'purple' },
  docente: { label: 'Docente', icon: '📚', color: 'green' },
};

// Rutas de inicio por modo
export const homePorModo: Record<ModoTrabajo, string> = {
  admin: '/dashboard',
  direccion: '/direccion',
  docente: '/grades', // Temporal, hasta tener dashboard docente
};

export const useModoStore = create<ModoState>()(
  persist(
    (set, get) => ({
      modoActual: 'admin',

      // Acción que itera sobre los modos para encontrar el de mayor jerarquía
      autoSeleccionarMejorModo: (roles: string[]) => {
        const disponibles = get().getModosDisponibles(roles);
        const jerarquia: ModoTrabajo[] = ['admin', 'direccion', 'docente'];

        // Iteramos sobre la jerarquía para encontrar el primer modo que el usuario tenga permitido
        const mejorModo = jerarquia.find(modo => disponibles.includes(modo));

        if (mejorModo && mejorModo !== get().modoActual) {
          set({ modoActual: mejorModo });
        }
      },
      
      setModo: (modo) => set({ modoActual: modo }),
      
      getModosDisponibles: (roles) => {
        const modos: ModoTrabajo[] = [];
        // TODO: Ajustar según tus roles reales
        if (roles.includes('Administrador') || roles.includes('Admin')) modos.push('admin');
        if (roles.includes('Director') || roles.includes('Directora')) modos.push('direccion');
        if (roles.includes('Docente') || roles.includes('Profesor')) modos.push('docente');
        
        // Si no tiene roles específicos, default a admin
        return modos.length > 0 ? modos : ['admin'];
      },
    }),
    {
      name: 'modo-trabajo-storage',
    }
  )
);