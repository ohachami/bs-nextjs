import { GroupedData, GroupedDataByRegion, PreSerie } from '@/types/dashboard';

export const makeBoxPlotData = (
  item: Record<string, number>,
  label: string
) => {
  const { MIN = 0, AVG = 0, MAX = 0 } = item;
  return {
    x: label,
    y: [
      Math.ceil(MIN),
      Math.ceil(AVG),
      Math.ceil(AVG),
      Math.ceil(AVG),
      Math.ceil(MAX),
    ],
  };
};

export const transformData = (data: GroupedData): GroupedDataByRegion[] => {
  const groupedData: Record<string, GroupedDataByRegion> = {};

  data.forEach((item) => {
    const label = item.groupedBy.label;
    if (!groupedData[label]) {
      groupedData[label] = {
        label,
        versions: [],
      };
    }
    groupedData[label].versions.push({
      dataVersionId: item.dataVersionId,
      data: item.groupedBy.data,
    });
  });

  return Object.values(groupedData);
};

export const createPreSeriesFromTransformedData = (
  group: GroupedDataByRegion
): PreSerie => {
  const productSet = new Set<string>();
  group.versions.forEach((ver) => {
    ver.data.forEach((product) => {
      productSet.add(product.label);
    });
  });

  const labelsArray = Array.from(productSet);
  const labelsMap: Record<string, number> = {};
  labelsArray.forEach((product, index) => {
    labelsMap[product] = index;
  });

  return {
    name: group.label,
    labels: labelsArray,
    versions: group.versions.map((ver) => {
      const valuesArray: Array<Record<string, number>> = Array(
        labelsArray.length
      ).fill({});

      ver.data.forEach((p) => {
        valuesArray[labelsMap[p.label]] = p.values || { AVG: 0 };
      });

      return {
        dataVersionId: ver.dataVersionId,
        values: valuesArray,
      };
    }),
  };
};
