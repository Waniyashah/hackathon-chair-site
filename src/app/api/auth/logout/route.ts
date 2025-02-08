import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.set('user', '', { maxAge: 0, path: '/' });  // Cookie clear karna
    return response;
}
