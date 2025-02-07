import {useDatasourceVersions} from "@/services/dataVersions.service";
import {useState} from "react";
import {DatasourceVersion} from "@/types/datasource/datasourceVersion";
import {ColumnDef} from "@tanstack/react-table";
import {formatDateAndTime} from "@/utils/functions";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {VersionsDataTable} from "@/components/common/VersionsDataTable";
import {ArrowUpDown, MessageSquareReply} from "lucide-react";
import {Button} from "@/components/ui/button";

interface Props {
    initialDatasource: DatasourceVersion
}

function CollectPage({ initialDatasource }: Props) {
    const [datasource, setDatasource] = useState(initialDatasource);
    const datasourceVersions = useDatasourceVersions(datasource.id);

    const handleClickOnChat = (id: string) => {}

    const columns: ColumnDef<DatasourceVersion>[] = [
        {
            id: 'Select',
            enableHiding: false,
            cell: ({ row }) => <RadioGroupItem className="border-black mb-1" value={row.id} />
        },
        {
            header: 'Version',
            accessorKey: 'version',
            cell: ({ row }) => <span className="font-semibold">{row.original.version}</span>
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
            cell: ({ row }) => <span className="px-4">{formatDateAndTime(row.original.updatedAt)}</span>
        },
        {
            id:'Actions',
            cell: ({ row }) => (
                <button onClick={_ => handleClickOnChat(row.original.id)}>
                    <MessageSquareReply strokeWidth={1.2} />
                </button>
            )
        }
    ]

    return (
        <div>
            {datasourceVersions.data && (
                <RadioGroup defaultValue="null">
                    <VersionsDataTable columns={columns} data={datasourceVersions.data} />
                </RadioGroup>
            )}
        </div>
    );
}

export default CollectPage;