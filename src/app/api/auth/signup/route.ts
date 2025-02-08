import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });

    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to Sanity
    const newUser = {
        _type: 'user',
        name,
        email,
        password: hashedPassword,
    };

    await client.create(newUser);

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}
