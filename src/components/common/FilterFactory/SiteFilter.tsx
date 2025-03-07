import React, {FC} from "react";
import {DashboardFilterProps} from "@/types/dashboard";
import {useSites} from "@/services/referential.Service";
import Filter from "@/components/common/FilterFactory/Filter";

const SiteFilter: FC<DashboardFilterProps<string[]>> = ({
    onChange,
    values,
    sbuId
}) => {
    const { data, status } = useSites(sbuId);

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
            title="Sites"
            placeholder="Chercher"
            mapOption={(site) => ({ label: site.name, value: site.id })}
            onChange={onChange}
            values={values}
        />
    );
}

export default SiteFilter;