import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const incidentId = parseInt(params.id);
    
    if (isNaN(incidentId)) {
      return NextResponse.json(
        { error: 'Invalid incident ID' },
        { status: 400 }
      );
    }

    const updatedIncident = await prisma.incident.update({
      where: {
        id: incidentId,
      },
      data: {
        resolved: true,
      },
      include: {
        camera: true,
      },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('Failed to resolve incident:', error);
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    );
  }
} 