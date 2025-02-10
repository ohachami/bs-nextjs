import { ArrowUpDown, MessageSquareReply } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { formatDateAndTime } from "@/utils/functions";
import { ColumnDef } from "@tanstack/react-table";
import { useDatasourceVersions } from "@/services/dataVersions.service";
import { DataVersionIF } from "@/types/collect/datasources";

const columns: ColumnDef<DataVersionIF>[] = [
    {
        id: 'Select',
        enableHiding: false,
        cell: ({ row }) => <RadioGroupItem className="border-black mb-1" value={row.id} />
    },
    {
        header: 'Version',
        accessorKey: 'name',
        cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>
    },
    {
        header: 'Commentaire',
        accessorKey: 'comment',
    },
    {
        accessorKey: 'updatedAt',
        accessorFn: (row) => new Date(row.updatedAt),
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date de mise à jour
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <span className="px-4">{row.original.updatedAt ? formatDateAndTime(row.original.updatedAt): ''}</span>
    },
    {
        id:'Actions',
        cell: ({ row }) => (
            <Button variant="ghost">
                <MessageSquareReply strokeWidth={1.2} />
            </Button>
        )
    }
  ]

export function VersionTable({datasourceId, siteId}: {datasourceId: string; siteId?: string}) {
    const datasourceVersions = useDatasourceVersions(datasourceId, siteId);
    return (
        <RadioGroup defaultValue="null">
            <DataTable hidePagination columns={columns} data={datasourceVersions.data || []} />
        </RadioGroup>
    )
}