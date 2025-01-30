'use client';
import { DataTable } from '@/components/common/DataTable';
import ExerciseCard from '@/components/common/ExerciseCard';
import TreeCombobox from '@/components/common/TreeCombobox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExercises } from '@/services/exercises.service';
import { mapPeriodToTreeItem } from '@/services/mappers/periodMapper';
import { usePeriodsTree } from '@/services/refExercise.service';
import { Period } from '@/types/config';
import { TreeItem } from '@/types/TreeComboboxFilterTypes';
import { formatDate, getFullName } from '@/utils/functions';
import { Nullable } from '@/utils/types';
import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type DataTableColumns = {
  name: Nullable<string>;
  period: Nullable<string>;
  createdAt: Nullable<string>;
  deadline: Nullable<string>;
  creator: Nullable<string>;
};

const ModuleExercices = () => {
  const { isPending, data } = useExercises();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  const periodQuery = usePeriodsTree();
  const [filter, setFilter] = useState<TreeItem[]>([])

  useEffect(() => {
    if(data && periodQuery.data) {
      let cyears = data.open.map(e => e.year);
      cyears = cyears.concat(data.closed.map(e => e.year));
      const items = cyears.map(y => (mapPeriodToTreeItem({...periodQuery.data, name: `${y}`} as Period, y!)))
      setFilter(items);

    }
  }, [data, periodQuery.data])


  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading ...</p>
      </div>
    );
  }

  const columns: ColumnDef<DataTableColumns>[] = [
    {
      header: 'Nom',
      accessorKey: 'name',
    },
    {
      header: 'Horizon',
      accessorKey: 'period',
      cell: ({ row }) => (
        <Badge variant="muted">
          {row.original.period}
        </Badge>
      ),
    },
    {
      header: 'Date Début',
      accessorKey: 'createdAt',
    },
    {
      header: 'Date fin',
      accessorKey: 'deadline',
    },
    {
      header: 'Créateur',
      accessorKey: 'creator',
    },
  ];


  return (
    <div className="flex flex-col p-8 pt-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-semibold font-geist tracking-tight">
          Liste des exercices
        </h1>

        <Button>
          <PlusIcon /> Démarrer un exercice
        </Button>
      </div>

      <div className="flex flex-nowrap gap-2.5">
        <div className="relative grow">
          <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            className="bg-white pl-9"
            placeholder="Rechercher un exercice"
          />
        </div>
        <div>
        {periodQuery.isSuccess && <TreeCombobox 
            items={filter}
            multiSelect 
            selectChildren={false}
            defaultValues={selectedPeriods}
            onSelectionChange={setSelectedPeriods}
          />}
        </div>
        <Button variant="ghost" onClick={() => setSelectedPeriods([])}>
          <XIcon />
          Réinitialiser
        </Button>
      </div>

      <h2 className="font-geist font-semibold text-lg text-card-foreground">
        Exercices actifs
      </h2>

      {data && (
        <div className="flex gap-4">
          {data.open
          .filter(e => selectedPeriods.length === 0 || selectedPeriods.includes(`${e.year}-${e.period.id}`))
          .map((ex) => (
            <ExerciseCard
              key={ex.id}
              creator={getFullName(ex.user.last_name, ex.user.first_name)}
              creationDate={ex.created_at}
              name={ex.name}
              status={ex.status}
              period={ex.period.name}
              steps={ex.exercise_step.map((s, index) => ({
                id: s.id,
                name: s.step_config?.name || null,
                status: s.status,
                deadline: s.deadline_at,
                order: s.step_config?.sorted_by || index,
              }))}
            />
          ))}
        </div>
      )}

      <h2 className="font-geist font-semibold text-lg text-card-foreground">
        Exercices précédents
      </h2>

      {data && (
        <DataTable
          data={data.closed
            .filter(e => selectedPeriods.length === 0 || selectedPeriods.includes(`${e.year}-${e.period.id}`))
            .map((ex) => ({
            id: ex.id,
            name: ex.name,
            period: ex.period.name,
            createdAt: ex.created_at && formatDate(ex.created_at),
            deadline: null,
            creator: getFullName(ex.user.last_name, ex.user.first_name),
          }))}
          columns={columns}
        />
      )}
    </div>
  );
};

export default ModuleExercices;
