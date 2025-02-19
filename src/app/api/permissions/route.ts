import { PermissionKey } from "@/types/user";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface JwtAppPayload extends JwtPayload {
    permissions: PermissionKey[];
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("steerlinxJwt")
    if (!token) {
        return NextResponse.json([]);
    }
    const decoded = jwtDecode<JwtAppPayload>(token.value);
    return NextResponse.json(decoded.permissions || []);
}
