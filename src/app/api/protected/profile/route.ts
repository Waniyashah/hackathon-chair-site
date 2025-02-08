import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { client } from '@/sanity/lib/client';
import { JWT_SECRET } from '@/sanity/lib/auth';

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  // Check if authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized: No token provided.' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Define the type of decoded token
    const decoded: DecodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Fetch user details based on decoded ID
    const user = await client.fetch(`*[_type == "user" && _id == $id][0]`, { id: decoded.id });

    // If no user found, return 404
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    // Return success response with user info
    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Catch and log any error
    console.error(error);

    // Return unauthorized response for invalid token
    return NextResponse.json({ success: false, message: 'Invalid token.' }, { status: 401 });
  }
}
