import React, { useMemo } from 'react';
import { Bike } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Mail, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface MaintenanceStatsProps {
  bikes: Bike[];
}

const COLORS = {
  available: '#22c55e',
  maintenance: '#ef4444'
};

export const MaintenanceStats: React.FC<MaintenanceStatsProps> = ({ bikes }) => {
  const stats = useMemo(() => {
    const statusCount = {
      available: bikes.filter(b => b.status === 'available').length,
      maintenance: bikes.filter(b => b.status === 'maintenance').length
    };

    const typeStats = [
      { name: 'Électrique', count: bikes.filter(b => b.type === 'electric').length },
      { name: 'Mécanique', count: bikes.filter(b => b.type === 'mechanical').length }
    ];

    const maintenanceNeeded = bikes
      .filter(b => b.status === 'maintenance')
      .map(b => ({
        id: b.id,
        type: b.type,
        kmSinceMaintenance: Math.round(b.kilometersSinceLastMaintenance)
      }));

    return { statusCount, typeStats, maintenanceNeeded };
  }, [bikes]);

  const pieData = useMemo(() => [
    { name: 'Disponible', value: stats.statusCount.available },
    { name: 'En maintenance', value: stats.statusCount.maintenance }
  ], [stats]);

  const sendMaintenanceAlert = () => {
    const message = `
      🔧 Vélos en maintenance (${stats.maintenanceNeeded.length}):
      ${stats.maintenanceNeeded.map(b => 
        `- Vélib #${b.id} (${b.type === 'electric' ? 'Électrique' : 'Mécanique'}) - ${b.kmSinceMaintenance}km depuis dernière maintenance`
      ).join('\n')}
    `;

    console.log('Sending maintenance alert:', message);
    toast.success('Alerte de maintenance envoyée à l\'équipe !', {
      description: `${stats.maintenanceNeeded.length} vélos en maintenance`
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Tableau de Bord Maintenance</h2>
        <button
          onClick={sendMaintenanceAlert}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Mail size={18} />
          <span>Envoyer Alerte</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">État de la Flotte</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[stats.statusCount]}>
                <XAxis />
                <YAxis />
                <Tooltip />
                <Bar dataKey="available" fill={COLORS.available} name="Disponible" />
                <Bar dataKey="maintenance" fill={COLORS.maintenance} name="En maintenance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Répartition</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Object.values(COLORS)[index]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Vélos en Maintenance</h3>
        <div className="space-y-4">
          {stats.maintenanceNeeded.map(bike => (
            <div 
              key={bike.id}
              className="flex items-center justify-between p-3 rounded-lg bg-red-50"
            >
              <div className="flex items-center gap-3">
                <Wrench className="text-red-500" />
                <div>
                  <p className="font-medium">Vélib #{bike.id}</p>
                  <p className="text-sm text-gray-600">
                    {bike.type === 'electric' ? 'Électrique' : 'Mécanique'} - 
                    {bike.kmSinceMaintenance}km depuis maintenance
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                En maintenance
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};