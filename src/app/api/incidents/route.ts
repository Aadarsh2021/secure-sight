import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolvedParam = searchParams.get('resolved');
    
    // Convert string param to boolean, undefined if not provided
    const resolved = resolvedParam ? resolvedParam === 'true' : undefined;

    const incidents = await prisma.incident.findMany({
      where: {
        resolved: resolved, // If undefined, this condition is ignored
      },
      include: {
        camera: true, // Include camera details in the response
      },
      orderBy: {
        tsStart: 'desc', // Newest first
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Failed to fetch incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
} 