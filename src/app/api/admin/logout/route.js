import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = serialize('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
  response.headers.append('Set-Cookie', cookie);
  return response;
}
