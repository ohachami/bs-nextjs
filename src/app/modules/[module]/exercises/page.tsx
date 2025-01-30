'use client';
import { DataTable } from '@/components/common/DataTable';
import ExerciseCard from '@/components/common/ExerciseCard';
import ExerciseStatus from '@/components/common/ExerciseStatus';
import StepProgress from '@/components/common/ExerciseStepper';
import TreeCombobox from '@/components/common/TreeCombobox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import { useExercises } from '@/services/exercises.service';
import { mapPeriodToTreeItem } from '@/services/mappers/periodMapper';
import { usePeriodsTree } from '@/services/refExercise.service';
import { TreeItem } from '@/types/common/TreeComboboxFilterTypes';
import { Exercise } from '@/types/exercise';
import { PeriodIF } from '@/types/refExercise/config';
import { formatDate, getFullName } from '@/utils/functions';
import { Nullable } from '@/utils/types';
import { ColumnDef } from '@tanstack/react-table';
import { PenIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-react';
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
  const periodQuery = usePeriodsTree();

  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [filter, setFilter] = useState<TreeItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [openEx, setOpenEx] = useState<Exercise[]>([]);
  const [closedEx, setClosedEx] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (data) {
      let newData = [...data];

      if (search !== '') {
        newData = newData.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (selectedPeriods.length !== 0) {
        newData = newData.filter((e) =>
          selectedPeriods.includes(`${e.year}-${e.parentPeriod.id}`)
        );
      }

      setOpenEx(newData.filter((ex) => ex.status === 'IN_PROGRESS'));
      setClosedEx(newData.filter((ex) => ex.status === 'CLOSED'));
    }
  }, [data, selectedPeriods, search]);

  useEffect(() => {
    if (data && periodQuery.data) {
      const cyears = [...new Set(data.map((e) => e.year))];
      const items = cyears.map((y) =>
        mapPeriodToTreeItem(
          { ...periodQuery.data, name: `${y}` } as PeriodIF,
          y!
        )
      );
      setFilter(items);
    }
  }, [data, periodQuery.data]);

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
      cell: ({ row }) => <Badge variant="muted">{row.original.period}</Badge>,
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

  const handleViewDetails = (ex: Exercise) => {
    setExercise(ex);
  };

  const handleCloseDrawer = () => {
    setExercise(null);
  };

  const actifStep =
    exercise && exercise.steps.find((s) => s.status === 'IN_PROGRESS');

  const objectifs = exercise && exercise.target && JSON.parse(exercise.target);

  console.log(exercise);
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {periodQuery.isSuccess && (
            <TreeCombobox
              items={filter}
              multiSelect
              selectChildren={false}
              defaultValues={selectedPeriods}
              onSelectionChange={setSelectedPeriods}
            />
          )}
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedPeriods([]);
            setSearch('');
          }}
        >
          <XIcon />
          Réinitialiser
        </Button>
      </div>

      <h2 className="font-geist font-semibold text-lg text-card-foreground">
        Exercices actifs
      </h2>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {openEx.map((ex) => (
            <ExerciseCard
              key={ex.id}
              creator={getFullName(ex.creator.lastName, ex.creator.firstName)}
              creationDate={ex.createdAt}
              name={ex.name}
              status={ex.status}
              period={ex.parentPeriod.name}
              steps={ex.steps.map((s) => ({
                id: s.id,
                name: s.stepConfig.name,
                status: s.status,
                deadline: s.deadlineAt,
                order: s.stepConfig.sortedBy,
              }))}
              onDetailsView={() => handleViewDetails(ex)}
            />
          ))}
        </div>
      )}

      <h2 className="font-geist font-semibold text-lg text-card-foreground">
        Exercices précédents
      </h2>

      {data && (
        <DataTable
          data={closedEx.map((ex) => ({
            id: ex.id,
            name: ex.name,
            period: ex.parentPeriod.name,
            createdAt: formatDate(ex.createdAt),
            deadline: formatDate(ex.updatedAt),
            creator: getFullName(ex.creator.lastName, ex.creator.firstName),
          }))}
          columns={columns}
        />
      )}

      {exercise && (
        <Sheet
          open={Boolean(exercise)}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseDrawer();
            }
          }}
        >
          <SheetContent className="p-9 w-[485px] sm:max-w-screen-xl [&>button]:hidden rounded-s-xl">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4 font-geist">
                <div>
                  <ExerciseStatus status={exercise.status} />
                </div>

                <div>
                  <StepProgress
                    steps={exercise.steps.map((s) => ({
                      id: s.id,
                      name: s.stepConfig.name,
                      status: s.status,
                      deadline: s.deadlineAt,
                      order: s.stepConfig.sortedBy,
                    }))}
                  />
                </div>

                {actifStep && (
                  <div className="flex flex-col font-geist">
                    <p className="font-semibold text-sm text-foreground">
                      {actifStep.stepConfig.name}
                    </p>
                    <p className="text-xs text-card-foreground">
                      {actifStep.deadlineAt &&
                        formatDate(new Date(actifStep.deadlineAt))}
                    </p>
                  </div>
                )}

                <SheetTitle className="font-semibold text-xl">
                  {exercise.name}
                </SheetTitle>

                <SheetDescription>
                  Description Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Nam imperdiet quam fringilla libero rutrum lobortis...
                </SheetDescription>

                <div>
                  <h2 className="font-semibold text-sm mb-1.5">
                    Objectifs stratégiques
                  </h2>

                  <div className="flex flex-col">
                    {objectifs &&
                      Object.keys(objectifs).map((key) => (
                        <div key={key}>
                          <p className="text-xs text-muted-foreground leading-4 font-normal mb-1.5">
                            {key}
                          </p>
                          <p className="text-base font-montserrat">
                            {objectifs[key]}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground leading-4 font-normal mb-1.5">
                    Horizon
                  </p>
                  <Badge variant="muted">{exercise.parentPeriod.name}</Badge>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground leading-4 font-normal">
                  <PenIcon className="size-3" /> Creé le{' '}
                  {formatDate(exercise.createdAt)}
                </div>
              </div>

              <SheetFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCloseDrawer}
                >
                  Fermer
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ModuleExercices;
