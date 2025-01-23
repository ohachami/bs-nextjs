import { getUsers } from "@/db/users.db";

export async function GET() {
  const users = await getUsers();
  return Response.json(users);
}