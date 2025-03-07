import React, {FC} from "react";
import { DashboardFilterProps } from "@/types/dashboard";
import { useTreatments } from "@/services/referential.Service";
import Filter from "@/components/common/FilterFactory/Filter";

const TreatmentFilter: FC<DashboardFilterProps<string[]>> = ({
    onChange,
    values,
    sbuId
}) => {
    const { data, status } = useTreatments(sbuId);

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error' || !data) {
        return <span>Error fetching data</span>;
    }

    return (
        <Filter
            data={data}
            basecomp="multiselect"
            title="Traitments"
            placeholder="Chercher"
            mapOption={(treatment) => ({ label: treatment.name, value: treatment.id })}
            onChange={onChange}
            values={values}
        />
    );
}

export default TreatmentFilter;