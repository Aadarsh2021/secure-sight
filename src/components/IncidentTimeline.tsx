'use client';

import { useState } from 'react';
import { Camera, Incident } from '@prisma/client';
import { format, addHours, startOfDay } from 'date-fns';

interface IncidentTimelineProps {
  incidents: (Incident & {
    camera: Camera;
  })[];
  onTimeSelect: (time: Date) => void;
}

export default function IncidentTimeline({ incidents, onTimeSelect }: IncidentTimelineProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date('2025-11-07T03:12:37'));
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1x');

  // Get unique cameras
  const cameras = [
    { id: 1, name: 'Camera - 01' },
    { id: 2, name: 'Camera - 02' },
    { id: 3, name: 'Camera - 03' },
  ];

  // Get start of day for reference (June 15, 2025 as shown in timeline)
  const dayStart = startOfDay(new Date('2025-06-15'));

  // Generate hour markers
  const hours = Array.from({ length: 25 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Get incident type color
  const getIncidentColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'gun threat':
        return 'bg-red-500 border-red-500';
      case 'unauthorised access':
        return 'bg-orange-500/20 border-orange-500';
      case 'face recognised':
        return 'bg-blue-500/20 border-blue-500';
      case 'traffic congestion':
        return 'bg-teal-500/20 border-teal-500';
      case 'multiple events':
        return 'bg-purple-500/20 border-purple-500';
      default:
        return 'bg-gray-500/20 border-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Playback controls */}
      <div className="flex items-center mb-4">
        <h3 className="text-sm font-medium">Camera List</h3>
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">⏮</button>
          <button className="text-gray-400 hover:text-white">⏪</button>
          <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">▶</button>
          <button className="text-gray-400 hover:text-white">⏩</button>
          <button className="text-gray-400 hover:text-white">⏭</button>
          <span className="text-sm">{playbackSpeed}</span>
          <span className="text-sm font-mono">
            {format(currentTime, 'HH:mm:ss')} ({format(currentTime, 'dd-MMM-yyyy')})
          </span>
        </div>
      </div>

      <div className="relative flex-1">
        {/* Timeline ruler */}
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          {hours.map((hour) => (
            <div key={hour} className="flex-1 text-center">{hour}</div>
          ))}
        </div>

        {/* Camera rows */}
        <div className="space-y-2">
          {cameras.map((camera) => (
            <div key={camera.id} className="flex items-center h-8">
              <span className="text-xs text-gray-400 w-24">
                {camera.name}
              </span>
              <div className="flex-1 h-full bg-[#222] rounded relative">
                {/* Incidents for this camera */}
                {incidents
                  .filter(inc => inc.camera.id === camera.id)
                  .map(incident => {
                    const startHour = new Date(incident.tsStart).getHours();
                    const endHour = new Date(incident.tsEnd).getHours();
                    const startPercent = (startHour / 24) * 100;
                    const width = ((endHour - startHour) / 24) * 100;

                    return (
                      <div
                        key={incident.id}
                        className={`absolute top-1/2 -translate-y-1/2 h-6 border ${getIncidentColor(incident.type)} 
                          text-xs px-2 rounded flex items-center cursor-pointer transition-opacity hover:opacity-100`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${width}%`,
                          minWidth: '100px',
                        }}
                        onClick={() => onTimeSelect(new Date(incident.tsStart))}
                      >
                        {incident.type}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Current time indicator */}
        <div 
          className="absolute top-0 h-full w-[2px] bg-yellow-500 cursor-grab active:cursor-grabbing"
          style={{
            left: `${(currentTime.getHours() + currentTime.getMinutes() / 60) / 24 * 100}%`,
          }}
          onPointerDown={(e) => {
            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
            if (rect) {
              const handleMove = (moveEvent: PointerEvent) => {
                const x = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
                const hours = (x / rect.width) * 24;
                const newTime = addHours(dayStart, hours);
                setCurrentTime(newTime);
                onTimeSelect(newTime);
              };

              const handleUp = () => {
                window.removeEventListener('pointermove', handleMove);
                window.removeEventListener('pointerup', handleUp);
              };

              window.addEventListener('pointermove', handleMove);
              window.addEventListener('pointerup', handleUp);
            }
          }}
        >
          <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="absolute -bottom-6 -translate-x-1/2 text-xs font-mono">
            {format(currentTime, 'HH:mm:ss')}s
          </div>
        </div>
      </div>
    </div>
  );
} 