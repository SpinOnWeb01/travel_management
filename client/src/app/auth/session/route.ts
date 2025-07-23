import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Verify session token with backend
    const response = await fetch(`${backendUrl}/api/v1/auth/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Session verification failed' },
        { status: 401 }
      );
    }
    
    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}