import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCcwDot } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type SettingIF = {
  label: string;
  input: {
    type: string; //JSX.IntrinsicElements['select'] | JSX.IntrinsicElements['input'];
    options?: Array<{
      label: string;
      value: string;
    }>;
  };
};

const objectives = [
  {
    label: 'Margin',
    value: 'margin',
  },
  {
    label: 'Cost',
    value: 'const',
  },
  {
    label: 'Volume',
    value: 'colume',
  },
];

const usePenalities = [
  {
    label: 'Step 1',
    value: '1',
  },
  {
    label: 'Step 2',
    value: '2',
  },
  {
    label: 'Step 3',
    value: '3',
  },
];

const mockedData: SettingIF[] = [
  {
    label: 'Objective',
    input: {
      type: 'select',
      options: objectives,
    },
  },
  {
    label: 'Displacement_from_JV_Port',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'UsePenalities',
    input: {
      type: 'select',
      options: usePenalities,
    },
  },
  {
    label: 'ConsiderJv',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'NoSwap',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'AuthorizedDisplacedDemand',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'NoExportWhenTolling',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'SinglePortByDemand',
    input: {
      type: 'switch',
    },
  },

  {
    label: 'LocalDemandIsMandatory',
    input: {
      type: 'switch',
    },
  },

  {
    label: 'PenalizeLineSwitching',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'Substitutions_Displace_Demand',
    input: {
      type: 'switch',
    },
  },

  {
    label: 'OptimizeInventoryPrices',
    input: {
      type: 'switch',
    },
  },

  {
    label: 'InitialRefPrice',
    input: {
      type: 'input',
    },
  },

  {
    label: 'Increment',
    input: {
      type: 'input',
    },
  },

  {
    label: 'OCP_Opt_Gap',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'Competitor_Opt_Gap',
    input: {
      type: 'input',
    },
  },
  {
    label: 'Production_Cost_Is_FOB',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'Substitutions_Displace_Capacity',
    input: {
      type: 'switch',
    },
  },

  {
    label: 'EvolveSamePeriod',
    input: {
      type: 'input',
    },
  },
  {
    label: 'FairShareGranularity',
    input: {
      type: 'switch',
    },
  },
  {
    label: 'UnifiedScaling',
    input: {
      type: 'input',
    },
  },
];

const ModelSettings = () => {
  return (
    <div>
      <Card className="w-full h-[400px] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Model settings</h3>
            <div className="flex items-center gap-1">
              <Button
                className="p-0"
                variant={'link'}
                onClick={() => {
                  console.log('Réinitialiser par défaut button clicked');
                }}
              >
                <RefreshCcwDot className="w-4 h-4" />
              </Button>
              <p className="text-sm font-normal text-accent-foreground ">
                Réinitialiser par défaut
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(30px,auto)] gap-y-2 gap-x-40">
          {mockedData.map((setting: SettingIF, index: number) => (
            <div key={index} className="flex items-center gap-x-6">
              <Label className="w-1/2 break-words text-sm">
                {setting.label}
              </Label>
              {setting.input.type === 'input' && (
                <Input type="number" className="w-1/2 h-8" />
              )}
              {setting.input.type === 'switch' && <Switch className="" />}
              {setting.input.type === 'select' && setting.input.options && (
                <Select
                  defaultValue={setting.input.options[0].value}
                  onValueChange={() => {}}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {setting.input.options.map((item, key) => (
                        <SelectItem key={key} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelSettings;
