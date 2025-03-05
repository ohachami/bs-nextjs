'use client';
import React, { FC } from 'react';
import ScenarioCard from '../common/ScenarioCard';
import { Button } from '../ui/button';
import { Split } from 'lucide-react';
import { useScenarios } from '@/services/scenarios.service';
import CreateSenario from '../scenarisation/createSenario';
import { FormValues } from '@/validations/schemas/scenario.schemas';
import { UseFormReturn } from 'react-hook-form';

interface PropsIF {
  form: UseFormReturn<FormValues>;
}

const ScenarioList: FC<PropsIF> = ({ form }) => {
  const { isPending, data: scenarios } = useScenarios();

  if (isPending) return <p>Loading...</p>;
  if (!scenarios) return <p>Error...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg p-4 pl-0"> Liste des scénarios</p>
        <div className="flex gap-4 p-4">
          <Button variant="outline">
            <Split size={16} />
            Comparer
          </Button>
          <CreateSenario form={form} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {scenarios.map((item, index) => (
          <ScenarioCard key={index} scenario={item} />
        ))}
      </div>
    </div>
  );
};

export default ScenarioList;
