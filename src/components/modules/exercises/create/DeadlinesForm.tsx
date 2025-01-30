'use client';

import DatePicker from '@/components/common/DatePicker';
import { Label } from '@/components/ui/label';

function DeadlinesForm() {
  const onSelectedDate = (date: Date) => {
    console.log(date);
  };

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-3 items-center">
        <Label>Hypothèses Manufacturing</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label>TopLine & UpSide</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label>Ajustement des hypothèses Manufacturing</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label>Scénarisation</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} withClearBtn />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label>Arbitrage & Validation</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <Label>Reporting</Label>
        <div className="col-span-2">
          <DatePicker onSelectedDate={onSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default DeadlinesForm;
