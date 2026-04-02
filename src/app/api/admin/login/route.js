import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || 'secret';

    if (username === envUsername && password === envPassword) {
      const token = sign({ username }, jwtSecret, { expiresIn: '1d' });

      const cookie = serialize('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
      response.headers.append('Set-Cookie', cookie);
      return response;
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
