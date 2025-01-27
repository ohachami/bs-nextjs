import { getExercises } from "@/db/exercises.db";

export async function GET() {
    const data = await getExercises();
    return Response.json(data);
}
