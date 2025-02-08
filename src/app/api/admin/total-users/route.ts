import { NextResponse } from 'next/server';
import {client} from '@/sanity/lib/client';

export async function GET() {
    try {
        // Sanity query to fetch total users
        const users = await client.fetch(`*[_type == "user"]`);
        const totalUsers = users.length;

        return NextResponse.json({ totalUsers }, { status: 200 });
    } catch (error) {
        console.error('Error fetching total users:', error);
        return NextResponse.json({ error: 'Failed to fetch total users' }, { status: 500 });
    }
}
