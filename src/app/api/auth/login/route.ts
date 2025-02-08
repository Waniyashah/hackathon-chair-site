import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Check if user exists and fetch isAdmin field as well
    const user = await client.fetch(
        `*[_type == "user" && email == $email][0]{name, email, password, isAdmin}`, 
        { email }
    );

    if (!user) {
        return NextResponse.json({ message: 'User does not exist, please sign up' }, { status: 400 });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Set cookie for session (Optional - if you are using cookies)
    const response = NextResponse.json({ 
        message: 'Login successful', 
        user: { 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin || false  // Ensure isAdmin flag is passed
        } 
    });

    response.cookies.set('user', JSON.stringify({ 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin || false 
    }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 din tak valid
        path: '/',
    });

    return response;
}
