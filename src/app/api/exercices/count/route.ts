import { getCount } from "@/db/exercices.db";

export async function GET() {
    const count = await getCount();
    return Response.json(count);
}