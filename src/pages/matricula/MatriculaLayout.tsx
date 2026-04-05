//import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import { 
//   Settings, 
//   GraduationCap, 
//   PlusCircle, 
//   ChevronRight,
//   Home
// } from 'lucide-react';


//import { cn } from '@/lib/utils';

// const menuItems = [
//   {
//     path: '/matricula/configuracion',
//     label: 'Configuración',
//     icon: Settings,
//     description: 'Jornadas, grados, secciones',
//   },
//   {
//     path: '/matricula/nueva',
//     label: 'Nueva Matrícula',
//     icon: PlusCircle,
//     description: 'Registrar estudiante',
//   },
//   {
//     path: '/matricula/estudiantes',
//     label: 'Estudiantes Matriculados',
//     icon: GraduationCap,
//     description: 'Ver y gestionar',
//   },
// ];

export function MatriculaLayout() {
//   const location = useLocation();
  
  // Determinar subtítulo según ruta
//   const getSubtitulo = () => {
//     if (location.pathname.includes('configuracion')) return 'Configuración del Sistema';
//     if (location.pathname.includes('nueva')) return 'Registro de Nuevo Estudiante';
//     if (location.pathname.includes('asignar-seccion')) return 'Asignación de Grado y Sección';
//     return '';
//   };

  return (
    <div className="min-h-screen bg-background">
      {/* Header de Matrícula */}
      {/* <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Matrícula</span>
            {getSubtitulo() && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{getSubtitulo()}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold">Módulo de Matrícula</h1>
          <p className="text-muted-foreground">Gestión de ingreso de estudiantes</p>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de Matrícula */}
          {/* <aside className="lg:w-64 shrink-0">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-lg transition-colors',
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted text-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className={cn(
                        'text-xs',
                        isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                );
              })}
            </nav> */}

            {/* Info de ayuda */}
            {/* <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">¿Necesita ayuda?</h4>
              <p className="text-xs text-muted-foreground">
                Configure primero las jornadas, grados y secciones antes de 
                activar el período de matrícula.
              </p>
            </div>
          </aside> */}

          {/* Contenido principal */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}