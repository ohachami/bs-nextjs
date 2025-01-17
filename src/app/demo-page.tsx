'use client'
import { useUsers } from "@/services/users.service";

export default function Home() {
  const usersQuery = useUsers()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {usersQuery.isLoading && <li>SteerLinx: stay tuned..</li>}
          {usersQuery.isSuccess && usersQuery.data.map((u: any) => (<li key={u.id}>
            {u.email}
          </li>))}
        </ol>
      </main>
    </div>
  );
}
