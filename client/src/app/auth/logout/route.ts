import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('session_token');
    return response;
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}