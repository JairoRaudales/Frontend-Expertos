// // Componente Sidebar de Navegación
// import { NavLink, useLocation } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { useUIStore } from '@/store';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '@/components/ui/collapsible';
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   BookOpen,
//   ClipboardList,
//   CalendarCheck,
//   Settings,
//   ChevronDown,
//   ChevronRight,
//   School,
//   Menu,
//   X,
// } from 'lucide-react';
// import { useState } from 'react';

// interface NavItem {
//   title: string;
//   href: string;
//   icon: React.ElementType;
//   children?: { title: string; href: string }[];
// }

// const navItems: NavItem[] = [
//   {
//     title: 'Dashboard',
//     href: '/',
//     icon: LayoutDashboard,
//   },
//   {
//     title: 'Estudiantes',
//     href: '/students',
//     icon: Users,
//     children: [
//       { title: 'Lista de Estudiantes', href: '/students' },
//       { title: 'Nuevo Estudiante', href: '/students/new' },
//       { title: 'Reportes', href: '/students/reports' },
//     ],
//   },
//   {
//     title: 'Profesores',
//     href: '/teachers',
//     icon: GraduationCap,
//     children: [
//       { title: 'Lista de Profesores', href: '/teachers' },
//       { title: 'Nuevo Profesor', href: '/teachers/new' },
//       { title: 'Asignaciones', href: '/assignments' },
//     ],
//   },
//   {
//     title: 'Cursos',
//     href: '/courses',
//     icon: BookOpen,
//     children: [
//       { title: 'Lista de Cursos', href: '/courses' },
//       { title: 'Nuevo Curso', href: '/CourseFormPage' },
//       { title: 'Horarios', href: '/courses/schedules' },
//     ],
//   },
//   {
//     title: 'Calificaciones',
//     href: '/grades',
//     icon: ClipboardList,
//     children: [
//       { title: 'Registrar Calificación', href: '/grades/new' },
//       { title: 'Ver Calificaciones', href: '/grades' },
//       { title: 'Reportes', href: '/grades/reports' },
//     ],
//   },
//   {
//     title: 'Asistencia',
//     href: '/attendance',
//     icon: CalendarCheck,
//     children: [
//       { title: 'Tomar Asistencia', href: '/attendance/take' },
//       { title: 'Ver Asistencia', href: '/attendance' },
//       { title: 'Reportes', href: '/attendance/reports' },
//     ],
//   },
//   {
//     title: 'Configuración',
//     href: '/settings',
//     icon: Settings,
//   },
// ];

// export function Sidebar() {
//   const { sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapse } = useUIStore();
//   const location = useLocation();
//   const [openItems, setOpenItems] = useState<string[]>([]);

//   const toggleItem = (title: string) => {
//     setOpenItems((prev) =>
//       prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
//     );
//   };

//   const isItemActive = (item: NavItem) => {
//     if (item.href === location.pathname) return true;
//     if (item.children?.some((child) => child.href === location.pathname)) return true;
//     return false;
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           'fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
//           sidebarCollapsed ? 'w-16' : 'w-64',
//           !sidebarOpen && '-translate-x-full lg:translate-x-0'
//         )}
//       >
//         {/* Header */}
//         <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
//           {!sidebarCollapsed && (
//             <div className="flex items-center gap-2">
//               <School className="h-6 w-6 text-sidebar-primary" />
//               <span className="font-bold text-sidebar-foreground text-lg">EduAdmin</span>
//             </div>
//           )}
//           {sidebarCollapsed && <School className="h-6 w-6 text-sidebar-primary mx-auto" />}

//           <div className="flex items-center gap-1">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
//               onClick={toggleSidebar}
//             >
//               <X className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
//               onClick={toggleSidebarCollapse}
//             >
//               <Menu className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <ScrollArea className="h-[calc(100vh-4rem)]">
//           <nav className="p-2 space-y-1">
//             {navItems.map((item) => {
//               const isActive = isItemActive(item);
//               const isOpen = openItems.includes(item.title);

//               if (item.children && !sidebarCollapsed) {
//                 return (
//                   <Collapsible
//                     key={item.title}
//                     open={isOpen}
//                     onOpenChange={() => toggleItem(item.title)}
//                   >
//                     <CollapsibleTrigger asChild>
//                       <Button
//                         variant={isActive ? 'secondary' : 'ghost'}
//                         className={cn(
//                           'w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent',
//                           isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
//                         )}
//                       >
//                         <div className="flex items-center gap-3">
//                           <item.icon className="h-5 w-5" />
//                           <span>{item.title}</span>
//                         </div>
//                         {isOpen ? (
//                           <ChevronDown className="h-4 w-4" />
//                         ) : (
//                           <ChevronRight className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className="pl-4 space-y-1">
//                       {item.children.map((child) => (
//                         <NavLink
//                           key={child.href}
//                           to={child.href}
//                           className={({ isActive }) =>
//                             cn(
//                               'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
//                               'text-sidebar-foreground hover:bg-sidebar-accent',
//                               isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
//                             )
//                           }
//                         >
//                           {child.title}
//                         </NavLink>
//                       ))}
//                     </CollapsibleContent>
//                   </Collapsible>
//                 );
//               }

//               return (
//                 <NavLink
//                   key={item.href}
//                   to={item.href}
//                   className={({ isActive }) =>
//                     cn(
//                       'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
//                       'text-sidebar-foreground hover:bg-sidebar-accent',
//                       isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
//                       sidebarCollapsed && 'justify-center'
//                     )
//                   }
//                   title={sidebarCollapsed ? item.title : undefined}
//                 >
//                   <item.icon className="h-5 w-5 flex-shrink-0" />
//                   {!sidebarCollapsed && <span>{item.title}</span>}
//                 </NavLink>
//               );
//             })}
//           </nav>
//         </ScrollArea>
//       </aside>
//     </>
//   );
// }

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store';
import { useModoStore, modoLabels, type ModoTrabajo } from '@/store/modoStore';
import { menusPorModo } from '@/config/modosMenu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  School,
  Menu,
  X,
  //  SwitchHorizontal,
  ArrowLeftRight, // CAMBIO: Usar este en lugar de SwitchHorizontal
} from 'lucide-react';
import { useState, useEffect } from 'react';

// TODO: Conectar con tu authStore real
const useRoles = () => {
  // Temporalmente devuelve todos los roles para pruebas
  // En producción, obtener del token o authStore
  return ['Administrador', 'Director', 'Docente'];
};

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapse } = useUIStore();
  const { modoActual, setModo, getModosDisponibles } = useModoStore();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const roles = useRoles();
  const modosDisponibles = getModosDisponibles(roles);
  const menuActual = menusPorModo[modoActual];
  const otrosModos = modosDisponibles.filter(m => m !== modoActual);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const cambiarModo = (nuevoModo: ModoTrabajo) => {
    setModo(nuevoModo);
    // Redirigir al home del nuevo modo
    const homeRoutes: Record<ModoTrabajo, string> = {
      admin: '/dashboard',
      direccion: '/direccion',
      docente: '/dashboard',
    };
    navigate(homeRoutes[nuevoModo]);
  };

  // const isItemActive = (item:  any) => {
  //   if (location.pathname === item.href) return true;
  //   if (item.children?.some((child: any) => location.pathname === child.href)) return true;
  //   return false;
  // };
  // Opción B: Definiendo el tipo en la misma línea si no tienes la interfaz a mano
  const isItemActive = (item: { href: string; children?: { href: string }[] }) => {
    if (location.pathname === item.href) return true;
    if (item.children?.some((child) => location.pathname === child.href)) return true;
    return false;
  };

  // Auto-expandir ítem activo al cambiar ruta
  useEffect(() => {
    menuActual.forEach(item => {
      if (isItemActive(item) && !openItems.includes(item.title)) {
        setOpenItems(prev => [...prev, item.title]);
      }
    });
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
          sidebarCollapsed ? 'w-16' : 'w-64',
          !sidebarOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border shrink-0">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <School className="h-6 w-6 text-sidebar-primary" />
              <span className="font-bold text-sidebar-foreground text-lg">EduAdmin</span>
            </div>
          )}
          {sidebarCollapsed && <School className="h-6 w-6 text-sidebar-primary mx-auto" />}

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={toggleSidebarCollapse}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modo actual indicator */}
        {!sidebarCollapsed && (
          <div className="px-4 py-2 bg-sidebar-accent/50 border-b border-sidebar-border shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-sidebar-foreground/70 uppercase tracking-wider">
                Modo Actual
              </span>
              <span className="text-xs font-medium" style={{ color: `var(--${modoLabels[modoActual].color}-500)` }}>
                {modoLabels[modoActual].icon} {modoLabels[modoActual].label}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            {menuActual.map((item) => {
              const isActive = isItemActive(item);
              const isOpen = openItems.includes(item.title);

              if (item.children && !sidebarCollapsed) {
                return (
                  <Collapsible
                    key={item.title}
                    open={isOpen}
                    onOpenChange={() => toggleItem(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        className={cn(
                          'w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent',
                          isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                              'text-sidebar-foreground hover:bg-sidebar-accent',
                              isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            )
                          }
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                      'text-sidebar-foreground hover:bg-sidebar-accent',
                      isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
                      sidebarCollapsed && 'justify-center'
                    )
                  }
                  title={sidebarCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.title}</span>}
                </NavLink>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Switch de Modos */}
        {!sidebarCollapsed && otrosModos.length > 0 && (
          <div className="border-t border-sidebar-border p-4 shrink-0">
            <p className="text-xs text-sidebar-foreground/70 uppercase tracking-wider mb-2">
              Cambiar a:
            </p>
            <div className="space-y-1">
              {otrosModos.map((modo) => (
                <Button
                  key={modo}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  onClick={() => cambiarModo(modo)}
                >
                  {/* <SwitchHorizontal className="h-4 w-4 mr-2" />*/}
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  <span>{modoLabels[modo].icon}</span>
                  <span className="ml-2">{modoLabels[modo].label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Versión colapsada */}
        {sidebarCollapsed && otrosModos.length > 0 && (
          <div className="border-t border-sidebar-border p-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
              title="Cambiar modo - expande para ver opciones"
              onClick={toggleSidebarCollapse}
            >
              {/* <SwitchHorizontal className="h-5 w-5" /> */}
              <ArrowLeftRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}