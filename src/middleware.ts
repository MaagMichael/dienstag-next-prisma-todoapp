import { NextResponse, NextRequest  } from "next/server";

export function middleware(request: NextRequest) {
    console.log("middleware reached now");
    
    // const userId = request.cookies.get("userid")?.value;
    const userId = true; // Simulating userId for testing purposes
    
    if(!userId)
        return NextResponse.redirect(new URL("/login", request.url))

    return NextResponse.next();
}

export const config = {
    matcher: ["/todo", "/todo/(.*)"]
}