'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Incident } from '@prisma/client';
import { format } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface IncidentListProps {
  incidents: (Incident & {
    camera: Camera;
  })[];
  onIncidentSelect: (incident: Incident & { camera: Camera }) => void;
  onIncidentResolve: (incidentId: number) => void;
}

export default function IncidentList({
  incidents,
  onIncidentSelect,
  onIncidentResolve,
}: IncidentListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Get threat type icon and color
  const getThreatInfo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'gun threat':
        return { icon: '🔫', color: 'text-red-500' };
      case 'unauthorised access':
        return { icon: '🚫', color: 'text-orange-500' };
      case 'face recognised':
        return { icon: '👤', color: 'text-blue-500' };
      case 'suspicious activity':
        return { icon: '⚠️', color: 'text-yellow-500' };
      case 'perimeter breach':
        return { icon: '🔒', color: 'text-purple-500' };
      default:
        return { icon: '⚠️', color: 'text-gray-500' };
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {incidents.map((incident) => {
        const { icon, color } = getThreatInfo(incident.type);
        return (
          <div
            key={incident.id}
            className={`group border-b border-[#333] hover:bg-[#222] cursor-pointer transition-colors
              ${selectedId === incident.id ? 'bg-[#222]' : ''}`}
            onClick={() => {
              setSelectedId(incident.id);
              onIncidentSelect(incident);
            }}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="relative w-24 aspect-video bg-black rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={incident.thumbnailUrl}
                    alt={`Incident at ${incident.camera.name}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{icon}</span>
                    <span className={`font-medium ${color}`}>
                      {incident.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                    <span>📍</span>
                    <span>{incident.camera.location}</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    {format(new Date(incident.tsStart), 'HH:mm')} - {format(new Date(incident.tsEnd), 'HH:mm')}
                  </div>
                </div>

                {/* Resolve button */}
                {!incident.resolved && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncidentResolve(incident.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-3 py-1 
                      bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium rounded"
                  >
                    <span>Resolve</span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 