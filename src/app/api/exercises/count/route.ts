import { getCount } from "@/db/exercises.db";

export async function GET() {
    const count = await getCount();
    return Response.json(count);
}