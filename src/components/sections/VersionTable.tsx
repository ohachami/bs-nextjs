import { ArrowUpDown, MessageSquareReply } from "lucide-react";
import { DataTable } from "../common/DataTable";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { formatDateAndTime } from "@/utils/functions";
import { ColumnDef } from "@tanstack/react-table";
import { DataVersionIF } from "@/types/collect/datasources";
import { useExerciseStore } from "@/store/exercises/useExerciseStore";
import { useDatasourceVersions } from "@/services/dataVersions.service";
import {EditableInputWrapper} from "@/components/common/EditableInputWrapper";

const createColumns = (selectedId: string): ColumnDef<DataVersionIF>[] => [
    {
        id: 'Select',
        enableHiding: false,
        cell: ({ row }) => (
            <RadioGroupItem
                value={`${row.original.id}`}
                className="border-black mb-1"
                checked={selectedId === row.original.id}
            />
        )
    },
    {
        header: 'Version',
        accessorKey: 'name',
        cell: ({ row }) => <span className="font-semibold">{row.original.name}</span>
    },
    {
        header: 'Commentaire',
        accessorKey: 'comment',
        cell: ({ row }) => <EditableInputWrapper comment={row.original.comment} id={row.original.id}/>
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
        cell: ({ row }) => (
            <span className="px-4">
                {row.original.updatedAt ? formatDateAndTime(row.original.updatedAt) : ''}
            </span>
        )
    },
    {
        id:'Actions',
        cell: () => (
            <Button variant="ghost">
                <MessageSquareReply strokeWidth={1.2} />
            </Button>
        )
    }
];

export function VersionTable({
    datasourceId,
    siteId,
    onSelect,
    selectedId,
}: {
    datasourceId: string;
    siteId?: string;
    onSelect?: (selected: DataVersionIF[]) => void;
    selectedId: string;
}) {
    const {currentExercise} = useExerciseStore();
    const datasourceVersions = useDatasourceVersions(datasourceId, currentExercise?.id || "", siteId);

    const columns = createColumns(selectedId);

    const handleRadioChange = (value: string) => {
        if (onSelect) {
            const selectedVersion = datasourceVersions.data?.find(v => v.id === value);
            onSelect(selectedVersion ? [selectedVersion] : []);
        }
    };

    if(datasourceVersions.isLoading) return <p>Loading ...</p>

    if(datasourceVersions.isError) return <p>Error Fetching DataSource Versions !</p>

    return (
        <RadioGroup value={selectedId} onValueChange={handleRadioChange}>
            <DataTable
                hidePagination
                columns={columns}
                data={datasourceVersions.data || []}
            />
        </RadioGroup>
    );
}