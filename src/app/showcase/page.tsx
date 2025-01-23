"use client";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUsers } from "@/services/users.service";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export default function Home() {
  const columns: ColumnDef<{firstName: string; lastName: string}>[] = [ 
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              type="button"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              First name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        accessorKey: 'firstName'
      },
      {
        header: "Last name",
        accessorKey: 'lastName'
      }
    ]
  const usersQuery = useUsers();
  return (
    <div className="grid w-full items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-1/2 gap-8 row-start-2 items-center sm:items-start">
        
        <div className="w-full">
        <DataTable 
          data={[{firstName: "Omar", lastName: "HACHAMI"}, {firstName: "Nada", lastName: "Belh."}]}
          columns={columns}
        />
        </div>
      </main>
    </div>
  );
}
