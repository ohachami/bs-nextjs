// List of key;value api paths
export const apiPaths = {
  exerciceTypes: () => `/config/exerciseTypes`,
  periodConfig: () => `/config/periodConfig`,
  periods: () => `/config/periods`,
  stepConfig: () => `/config/steps`,
  exercises: () => `/exercises`,
  exercisesCount: () => `/exercises/count`,
  currentUser: () => `/users/current`,
  datasources: (sbuId: string) => `/datasources/hierarchy/${sbuId}`,
  dashboardSections: (stepId: string) => `/dashboard/steps/${stepId}/sections`,
  aggregations: () => `/aggregations`,
  chartList: (sectionId: string) => `/dashboard/sections/${sectionId}`,
  datasourceVersions: (datasourceId: string) =>
    `/datasources/${datasourceId}/versions`,
  version: (id: string) => `/datasources/versions/${id}`,
  regions: () => `/referential/regions`,
  products: () => `/referential/products`,
  productTypes: () => `/referential/product-types`,
  groupedProducts: () => `/referential/grouped-products`,
  sbus: () => `/referential/sbus`,
  consolidationVersions: (sbuId?: string) =>
    sbuId ? `/consolidation` : `/consolidation?sbuId=${sbuId}`,
} as const;
