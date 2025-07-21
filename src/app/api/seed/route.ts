import { PrismaClient } from '@prisma/client'
import { addHours, subHours } from 'date-fns'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Create sample cameras
    const cameras = await Promise.all([
      prisma.camera.create({
        data: {
          name: 'Main Entrance',
          location: 'Building A Front'
        }
      }),
      prisma.camera.create({
        data: {
          name: 'Parking Lot',
          location: 'North Side'
        }
      }),
      prisma.camera.create({
        data: {
          name: 'Loading Dock',
          location: 'Building B Rear'
        }
      })
    ])

    // Create sample incidents
    const now = new Date()
    
    await Promise.all(
      cameras.flatMap(camera => [
        prisma.incident.create({
          data: {
            cameraId: camera.id,
            type: 'Unauthorized Access',
            tsStart: subHours(now, 2),
            tsEnd: subHours(now, 1.5),
            thumbnailUrl: `https://picsum.photos/seed/${camera.id}-1/400/300`,
            resolved: Math.random() > 0.5
          }
        }),
        prisma.incident.create({
          data: {
            cameraId: camera.id,
            type: 'Suspicious Activity',
            tsStart: subHours(now, 1),
            tsEnd: subHours(now, 0.5),
            thumbnailUrl: `https://picsum.photos/seed/${camera.id}-2/400/300`,
            resolved: Math.random() > 0.5
          }
        }),
        prisma.incident.create({
          data: {
            cameraId: camera.id,
            type: 'Object Left Behind',
            tsStart: addHours(now, 1),
            tsEnd: addHours(now, 1.5),
            thumbnailUrl: `https://picsum.photos/seed/${camera.id}-3/400/300`,
            resolved: false
          }
        })
      ])
    )

    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 