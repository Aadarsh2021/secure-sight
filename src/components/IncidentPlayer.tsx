'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Incident } from '@prisma/client';
import { format } from 'date-fns';

interface IncidentPlayerProps {
  incident: Incident & {
    camera: Camera;
  };
  otherCameras: Camera[];
}

export default function IncidentPlayer({ incident, otherCameras }: IncidentPlayerProps) {
  const [selectedCamera, setSelectedCamera] = useState<Camera>(incident.camera);

  return (
    <div className="flex flex-col gap-4">
      {/* Main video/image frame */}
      <div className="relative aspect-video w-full bg-black rounded overflow-hidden">
        {/* Timestamp */}
        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1.5 rounded text-sm font-mono">
          {format(new Date(incident.tsStart), 'HH:mm:ss')} ({format(new Date(incident.tsStart), 'dd-MMM-yyyy')})
        </div>

        {/* Camera label */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm">Camera - {selectedCamera.id.toString().padStart(2, '0')}</span>
        </div>

        {/* Main image */}
        <Image
          src={incident.thumbnailUrl}
          alt={`Incident from ${selectedCamera.name}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Camera thumbnails */}
      <div className="flex gap-4 h-24">
        {otherCameras.map((camera) => (
          <button
            key={camera.id}
            onClick={() => setSelectedCamera(camera)}
            className={`relative flex-1 bg-black rounded overflow-hidden ${
              selectedCamera.id === camera.id ? 'ring-2 ring-yellow-500' : ''
            }`}
          >
            <Image
              src="/models/thumbnail1.jpg"
              alt={camera.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs">Camera - {camera.id.toString().padStart(2, '0')}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 