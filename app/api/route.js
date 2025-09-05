import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const hola = searchParams.get('hola');
    return NextResponse.json({ message: "This is how you get a get", hola }, { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    return NextResponse.json({ message: "This is how you post a post", body }, { status: 200 });
}
export async function PUT(request) {
    const body = await request.json();
    return NextResponse.json({ message: "This is how you put a put", body }, { status: 200 });
}
export async function DELETE(request) { 
    const body = await request.json();
    return NextResponse.json({ message: "This is how you delete a delete", body }, { status: 200 });
}
export async function PATCH(request) {  
    const body = await request.json();
    return NextResponse.json({ message: "This is how you patch a patch", body }, { status: 200 });
}


