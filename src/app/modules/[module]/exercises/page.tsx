'use client';
import { DataTable } from '@/components/common/DataTable';
import ExerciseCard from '@/components/common/ExerciseCard';
import ExerciseStatus from '@/components/common/ExerciseStatus';
import StepProgress from '@/components/common/ExerciseStepper';
import PeriodFilter from '@/components/common/PeriodFilter';
import GuardedCreateNewExercise from '@/components/modules/exercises/create';
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
import { cn } from '@/lib/utils';
import { useExercises } from '@/services/exercises.service';
import { Exercise } from '@/types/exercise';
import { EXERCISE_STATUS, STEP_STATUS } from '@/utils/constants';
import { formatDate, getFullName } from '@/utils/functions';
import { Nullable } from '@/utils/types';
import { ColumnDef } from '@tanstack/react-table';
import { differenceInDays, isValid } from 'date-fns';
import { MousePointerClick, PenIcon, SearchIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type DataTableColumns = {
  name: Nullable<string>;
  period: Nullable<string>;
  createdAt: Nullable<string>;
  deadline: Nullable<string>;
  creator: Nullable<string>;
};

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

const ModuleExercices = () => {
  const { isPending, data } = useExercises();
  const router = useRouter();

  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const [openEx, setOpenEx] = useState<Exercise[]>([]);
  const [closedEx, setClosedEx] = useState<Exercise[]>([]);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (data) {
      const yearsSet = new Set(data.map((e) => e.year));
      setYears(Array.from(yearsSet));

      let newData = [...data];

      if (search !== '') {
        newData = newData.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (selectedPeriods.length !== 0) {
        newData = newData.filter((e) =>
          selectedPeriods.includes(`${e.year};${e.parentPeriod.id}`)
        );
      }

      setOpenEx(
        newData.filter((ex) => ex.status === EXERCISE_STATUS.IN_PROGRESS)
      );
      setClosedEx(newData.filter((ex) => ex.status === EXERCISE_STATUS.CLOSED));
    }
  }, [data, selectedPeriods, search]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading ...</p>
      </div>
    );
  }

  const handleViewDetails = (ex: Exercise) => {
    setExercise(ex);
  };

  const handleCloseDrawer = () => {
    setExercise(null);
  };

  const actifStep =
    exercise && exercise.steps.find((s) => s.status === 'IN_PROGRESS');

  const objectifs = exercise && exercise.target && JSON.parse(exercise.target);

  const isDeadlineClose =
    exercise && actifStep?.deadlineAt && isValid(new Date(actifStep.deadlineAt))
      ? differenceInDays(new Date(actifStep.deadlineAt), new Date()) < 2
      : false;

  return (
    <div className="flex flex-col p-8 pt-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-card-foreground font-semibold font-geist tracking-tight">
          Liste des exercices
        </h1>

        <GuardedCreateNewExercise />
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
          {search !== '' && (
            <Button
              variant="ghost"
              className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground rounded-full p-1 size-6"
              onClick={() => setSearch('')}
            >
              <XIcon />
            </Button>
          )}
        </div>
        <div>
          <PeriodFilter years={years} onSelectionChange={setSelectedPeriods} />
        </div>
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
              onOpenClick={() =>
                router.push(
                  `./exercises/${ex.id}/${ex.steps.find((e) => e.status === STEP_STATUS.IN_PROGRESS)?.stepConfig.code}`
                )
              }
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
                <div className="flex items-center gap-3">
                  <MousePointerClick
                    className={cn('size-6', {
                      'text-blue-500': !isDeadlineClose,
                      'text-red-500': isDeadlineClose,
                    })}
                  />

                  <div className="grow flex flex-col">
                    <p className="font-geist text-foreground leading-5 text-xs font-semibold">
                      {getFullName(
                        exercise.creator.lastName,
                        exercise.creator.firstName
                      )}
                    </p>
                    {exercise.createdAt && (
                      <p className="font-geist text-muted-foreground leading-5 text-[10px] font-normal">
                        crée le {formatDate(exercise.createdAt)}
                      </p>
                    )}
                  </div>

                  <ExerciseStatus
                    status={isDeadlineClose ? 'DEADLINE_CLOSE' : 'IN_PROGRESS'}
                  />
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
                    <p
                      className={cn('text-xs', {
                        'text-card-foreground': !isDeadlineClose,
                        'text-red-500': isDeadlineClose,
                      })}
                    >
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
                  <Badge
                    variant="outline"
                    className="bg-[#57D7624D] hover:bg-[#57D7624D] border-0 rounded-full hover:cursor-default"
                  >
                    {exercise.parentPeriod.name}
                  </Badge>
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
