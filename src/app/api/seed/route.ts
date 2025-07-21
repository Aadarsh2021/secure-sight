import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { addHours, parseISO } from 'date-fns';

export async function GET() {
  try {
    // Check if data already exists
    const existingIncidents = await prisma.incident.count();
    
    if (existingIncidents > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded', 
        count: existingIncidents 
      });
    }

    // Clean up existing data
    await prisma.incident.deleteMany();
    await prisma.camera.deleteMany();

    // Create cameras
    const cameras = await Promise.all([
      prisma.camera.create({
        data: {
          name: 'Shop Floor Camera A',
          location: 'Main Building Ground Floor',
        },
      }),
      prisma.camera.create({
        data: {
          name: 'Camera - 02',
          location: 'Basement Level B2',
        },
      }),
      prisma.camera.create({
        data: {
          name: 'Camera - 03',
          location: 'Building Front',
        },
      }),
    ]);

    // Base date for November 7, 2025, 03:12:37 (as shown in image)
    const baseDate = parseISO('2025-11-07T03:12:37');
    
    // Base date for July 7, 2025, 14:35 (for incident list)
    const incidentBaseDate = parseISO('2025-07-07T14:35:00');

    // Create incidents
    const incidents = [
      // Unresolved incidents (15 total)
      {
        cameraId: cameras[0].id,
        type: 'Unauthorised Access',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60), // 14:35 - 14:37
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Gun Threat',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60),
        thumbnailUrl: '/incidents/gun-threat.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Unauthorised Access',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[1].id,
        type: 'Unauthorised Access',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Unauthorised Access',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      // Add more unresolved incidents to reach 15 total
      ...Array.from({ length: 10 }, (_, i) => ({
        cameraId: cameras[Math.floor(Math.random() * cameras.length)].id,
        type: 'Unauthorised Access',
        tsStart: incidentBaseDate,
        tsEnd: addHours(incidentBaseDate, 2/60),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      })),
      // Timeline incidents (June 15, 2025)
      {
        cameraId: cameras[0].id,
        type: 'Unauthorised Access',
        tsStart: parseISO('2025-06-15T03:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T03:00:00'), 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Face Recognised',
        tsStart: parseISO('2025-06-15T14:45:00'),
        tsEnd: addHours(parseISO('2025-06-15T14:45:00'), 0.5),
        thumbnailUrl: '/incidents/face.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Multiple Events',
        tsStart: parseISO('2025-06-15T09:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T09:00:00'), 1),
        thumbnailUrl: '/incidents/multiple.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Unauthorised Access',
        tsStart: parseISO('2025-06-15T14:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T14:00:00'), 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[0].id,
        type: 'Gun Threat',
        tsStart: parseISO('2025-06-15T15:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T15:00:00'), 1),
        thumbnailUrl: '/incidents/gun-threat.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[1].id,
        type: 'Unauthorised Access',
        tsStart: parseISO('2025-06-15T03:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T03:00:00'), 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[1].id,
        type: 'Face Recognised',
        tsStart: parseISO('2025-06-15T07:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T07:00:00'), 1),
        thumbnailUrl: '/incidents/face.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[1].id,
        type: 'Unauthorised Access',
        tsStart: parseISO('2025-06-15T14:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T14:00:00'), 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[2].id,
        type: 'Traffic congestion',
        tsStart: parseISO('2025-06-15T06:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T06:00:00'), 1),
        thumbnailUrl: '/incidents/traffic.jpg',
        resolved: false,
      },
      {
        cameraId: cameras[2].id,
        type: 'Unauthorised Access',
        tsStart: parseISO('2025-06-15T14:00:00'),
        tsEnd: addHours(parseISO('2025-06-15T14:00:00'), 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: false,
      },
      // Resolved incidents (4 total)
      ...Array.from({ length: 4 }, () => ({
        cameraId: cameras[Math.floor(Math.random() * cameras.length)].id,
        type: 'Unauthorised Access',
        tsStart: baseDate,
        tsEnd: addHours(baseDate, 1),
        thumbnailUrl: '/incidents/unauthorised.jpg',
        resolved: true,
      })),
    ];

    await Promise.all(incidents.map(incident => prisma.incident.create({ data: incident })));
    
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString(),
      incidentsCreated: incidents.length,
      camerasCreated: cameras.length
    });
  } catch (error) {
    console.error('Failed to seed database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 