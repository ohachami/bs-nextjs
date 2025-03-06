'use client';

import ScenarioList from './ScenarioList';
import ScenarioParams from './ScenarioParams';
import { useScenarisationStore } from '@/store/exercises/scenarisation';
import { List } from 'lucide-react';
import { Button } from '../ui/button';
import { ChartNoAxesCombined } from 'lucide-react';
import { FileSpreadsheet } from 'lucide-react';
import { Cog } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import ModelSettings from './model-settings';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormValues,
  senarioShema,
} from '@/validations/schemas/scenario.schemas';
import { SENARIO_INPUTS_TYPE, SENARIO_TYPE } from '@/utils/constants';
import { Form } from '../ui/form';

const Scenarisation: React.FC = () => {
  const { listScenarios, setlistScenarios, settingModel, setSettingModel } =
    useScenarisationStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(senarioShema),
    mode: 'onChange',
    defaultValues: {
      type: SENARIO_TYPE.EXPLOITATION,
      name: '',
      description: '',
      input: SENARIO_INPUTS_TYPE.DONNEES_CONSOLIDEES,
      consolidated_data_id: '',
      v_min: 0,
      v_max: 0,
      scm_price: 0,
    },
  });

  const id = form.getValues().consolidated_data_id;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div>
          {listScenarios ? (
            <ScenarioList form={form} />
          ) : (
            <div className="flex flex-col gap-y-4">
              <div>
                <Button
                  onClick={setlistScenarios}
                  variant="ghost"
                  className="p-0"
                >
                  <List className="size-4 text-muted-foreground" />
                  Liste des sénarios
                </Button>
              </div>
              <p className="text-2xl font-bold">Scénario Default v1</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-5">
                  <div className="text-sm font-normal">Data input</div>
                  <div className="flex gap-x-1 text-sm font-normal">
                    <FileSpreadsheet className="size-4" />
                    Données_consolidées_V2
                  </div>
                  <Button
                    variant={'outline'}
                    className="px-2 py-4"
                    onClick={() => {}}
                  >
                    <ChartNoAxesCombined className="size-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="h-8"
                  onClick={setSettingModel}
                >
                  <Cog />
                  Model Setting
                  {settingModel ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              {settingModel && <ModelSettings />}

              <ScenarioParams consolidated_data_id={id} form={form} />
              <div className="flex justify-end">
                <Button type="submit">
                  Run scénario
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default Scenarisation;
