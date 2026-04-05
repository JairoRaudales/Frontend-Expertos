import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ConfigCardProps {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  cantidad?: number;
  estado: 'configurado' | 'pendiente' | 'bloqueado';
  onClick: () => void;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: 'hover:border-blue-400 hover:bg-blue-50/50',
  green: 'hover:border-green-400 hover:bg-green-50/50',
  purple: 'hover:border-purple-400 hover:bg-purple-50/50',
  orange: 'hover:border-orange-400 hover:bg-orange-50/50',
  red: 'hover:border-red-400 hover:bg-red-50/50',
};

const estadoClasses = {
  configurado: 'bg-green-100 text-green-800 border-green-200',
  pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  bloqueado: 'bg-gray-100 text-gray-600 border-gray-200',
};

export function ConfigCard({
  titulo,
  descripcion,
  icono,
  cantidad,
  estado,
  onClick,
  color,
}: ConfigCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 border-2',
        colorClasses[color],
        estado === 'bloqueado' && 'opacity-60 cursor-not-allowed'
      )}
      onClick={estado !== 'bloqueado' ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={cn('p-2 rounded-lg', `bg-${color}-100 text-${color}-600`)}>
            {icono}
          </div>
          <Badge variant="outline" className={estadoClasses[estado]}>
            {estado === 'configurado' ? 'Listo' : estado === 'pendiente' ? 'Pendiente' : 'Bloqueado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-1">{titulo}</h3>
        <p className="text-sm text-muted-foreground mb-2">{descripcion}</p>
        {cantidad !== undefined && (
          <p className="text-2xl font-bold text-foreground">{cantidad}</p>
        )}
      </CardContent>
    </Card>
  );
}