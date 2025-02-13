'use client'
import { ChartBox } from '@/components/common/ChartBox';
import ProcessStepWrapper from '@/components/common/ProcessStepWrapper';
import CollectPage from '@/components/sections/Collect';
import { STEPS } from '@/utils/mocks';
import { useState } from 'react';

function PageHyperManu() {
  const [selected, setSelected] = useState("COLLECT")
  return (
    <div className='space-y-6'>
      <ProcessStepWrapper steps={STEPS} onSelect={setSelected} />
      {selected === "COLLECT" && <CollectPage />}
      <ChartBox 
          chart={{
            code: "CODe1",
            displayType: "VISUALIZE",
            name: "Volume chart",
            subTitle:"my sub",
            id: "2345678",
            type: "bar",
            comment: "",
            config:  {
              "entity": "ConsolidatedDemand",
              "aggregations": [
                  {
                      "metric": "vMax",
                      "operation": "sum"
                  }
              ],
              "groupedBy": ["client.country.region.name", "product.name"],
              "filters": [
                  {
                      "name": "regions",
                      "key": "client.country.region.id",
                      "values": []
                  },{
                    "name":"periods",
                    "key": "version.exercise.parentPeriod.id",
                    "values": []
                  },
                  {
                    "name":"demandTypes",
                    "key": "demandType.id",
                    "values": []
                  }
              ]
            }
          }}
          globalFilters={{}}
        />
    </div>
  );
}

export default PageHyperManu;
