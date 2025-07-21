'use client';

import { useState, useEffect } from 'react';
import { Camera, Incident } from '@prisma/client';
import IncidentPlayer from '@/components/IncidentPlayer';
import IncidentList from '@/components/IncidentList';
import IncidentTimeline from '@/components/IncidentTimeline';

// Default thumbnails for different incident types
const defaultThumbnails = {
  'Unauthorised Access': '/incidents/unauthorised.jpg',
  'Gun Threat': '/incidents/gun-threat.jpg',
  'Face Recognised': '/incidents/face.jpg',
  'Traffic congestion': '/incidents/traffic.jpg',
  'Multiple Events': '/incidents/multiple.jpg',
  'default': '/incidents/default.jpg'
};

type IncidentWithCamera = Incident & {
  camera: Camera;
};

export default function Home() {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | null>(null);
  const [otherCameras, setOtherCameras] = useState<Camera[]>([]);

  // Fetch incidents
  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents?resolved=false');
      const data = await response.json();
      
      // Add default thumbnails if missing
      const processedData = data.map((incident: IncidentWithCamera) => ({
        ...incident,
        thumbnailUrl: incident.thumbnailUrl || defaultThumbnails[incident.type as keyof typeof defaultThumbnails] || defaultThumbnails.default
      }));
      
      setIncidents(processedData);
      
      if (processedData.length > 0 && !selectedIncident) {
        setSelectedIncident(processedData[0]);
        
        // Get other cameras excluding the selected one
        const otherCams = processedData
          .map((incident: IncidentWithCamera) => incident.camera)
          .filter((camera: Camera, index: number, self: Camera[]) => 
            index === self.findIndex((c: Camera) => c.id === camera.id) && 
            camera.id !== processedData[0].camera.id
          )
          .slice(0, 2);
        setOtherCameras(otherCams);
      }
    } catch (error) {
      console.error('Failed to fetch incidents:', error);
    }
  };

  const handleIncidentSelect = (incident: IncidentWithCamera) => {
    setSelectedIncident(incident);
    
    // Update other cameras
    const otherCams = incidents
      .map(inc => inc.camera)
      .filter((camera: Camera, index: number, self: Camera[]) => 
        index === self.findIndex((c: Camera) => c.id === camera.id) && 
        camera.id !== incident.camera.id
      )
      .slice(0, 2);
    setOtherCameras(otherCams);
  };

  const handleIncidentResolve = async (incidentId: number) => {
    try {
      // Optimistic update
      setIncidents(prev => prev.filter(inc => inc.id !== incidentId));
      
      if (selectedIncident?.id === incidentId) {
        const nextIncident = incidents.find(inc => inc.id !== incidentId);
        setSelectedIncident(nextIncident || null);
        
        if (nextIncident) {
          const otherCams = incidents
            .map(inc => inc.camera)
            .filter((camera: Camera, index: number, self: Camera[]) => 
              index === self.findIndex((c: Camera) => c.id === camera.id) && 
              camera.id !== nextIncident.camera.id
            )
            .slice(0, 2);
          setOtherCameras(otherCams);
        }
      }

      // Make API call
      await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Failed to resolve incident:', error);
      // Revert on error
      fetchIncidents();
    }
  };

  const handleTimeSelect = (time: Date) => {
    // Find the incident closest to the selected time
    const closestIncident = incidents.reduce((closest, current) => {
      const currentStart = new Date(current.tsStart);
      const closestStart = new Date(closest.tsStart);
      const currentDiff = Math.abs(time.getTime() - currentStart.getTime());
      const closestDiff = Math.abs(time.getTime() - closestStart.getTime());
      return currentDiff < closestDiff ? current : closest;
    }, incidents[0]);

    if (closestIncident) {
      handleIncidentSelect(closestIncident);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left side - Incident Player */}
        <div className="flex-[2] min-w-0 p-4">
          {selectedIncident ? (
            <IncidentPlayer
              incident={selectedIncident}
              otherCameras={otherCameras}
            />
          ) : (
            <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center text-gray-400">
              No active incidents
            </div>
          )}
        </div>

        {/* Right side - Incident List */}
        <div className="w-[400px] min-w-[400px] bg-[#1A1A1A] border-l border-[#333]">
          <div className="p-4 border-b border-[#333] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-sm font-medium">
                {incidents.length} Unresolved Incidents
              </h2>
            </div>
            <div className="text-xs text-gray-400">
              ⓘ {incidents.filter(inc => inc.resolved).length} resolved incidents
            </div>
          </div>
          <div className="h-[calc(100vh-13rem)]">
            <IncidentList
              incidents={incidents}
              onIncidentSelect={handleIncidentSelect}
              onIncidentResolve={handleIncidentResolve}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-48 bg-[#1A1A1A] border-t border-[#333] p-4">
        <IncidentTimeline
          incidents={incidents}
          onTimeSelect={handleTimeSelect}
        />
      </div>
    </div>
  );
}
