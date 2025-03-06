import { callApi } from "@/hooks/useApi";
import { ProductGroup, ProductTypeIF, RefSbu, RegionTypeIF } from '@/types/refExercise/config';
import { apiPaths } from "@/utils/apiPaths";
import { getMarketableProductConfig, MARKETABLE_PRODUCT_TYPES } from "@/utils/constants";
import { MarketableConfig } from "@/utils/types";
import { useQuery } from '@tanstack/react-query';

export const useSalesRegions = (versionIds: string[]) => {
  return useQuery<RegionTypeIF[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      return await callApi<RegionTypeIF[]>({
        method: 'POST',
        url: apiPaths.salesRegions(),
        data: {
          versionIds
        }
      });
    },
  });
};

export const useProducts = () => {
  return useQuery<number>({
    queryKey: ["products"],
    queryFn: async () => {
      return await callApi<number>({
        method: 'GET',
        url: apiPaths.products(),
      });
    },
  });
};

export const useProductTypes = () => {
  return useQuery<ProductTypeIF[]>({
    queryKey: ["productTypes"],
    queryFn: async () => {
      return await callApi<ProductTypeIF[]>({
        method: 'GET',
        url: apiPaths.productTypes(),
      });
    },
  });
};

export const useSbus = () => {
  return useQuery<RefSbu[]>({
    queryKey: ["sbus"],
    queryFn: async () => {
      return await callApi<RefSbu[]>({
        method: 'GET',
        url: apiPaths.sbus(),
      });
    },
  });
}

export const useGroupedProducts = (versionIds: string[]) => {
  return useQuery<ProductGroup[]>({
    queryKey: ["groupedProducts"],
    queryFn: async () => {
      return await callApi<ProductGroup[]>({
        method: 'POST',
        url: apiPaths.salesGroupedProducts(),
        data: {
          versionIds
        }
      });
    },
  });
};

export const useDemandTypes = () => {
  return useQuery<ProductGroup[]>({
    queryKey: ["demandTypes"],
    queryFn: async () => {
      return await callApi<ProductGroup[]>({
        method: 'GET',
        url: apiPaths.demandTypes(),
      });
    },
  });
};


export const useMarketableProductTypes = (groups: ProductGroup[]) => {
  const types = MARKETABLE_PRODUCT_TYPES.map(m => m.name);
  return useQuery<MarketableConfig[]>({
    queryKey: ["marketableProductTypes", groups],
    queryFn: async () => {
      const marketables: MarketableConfig[] = []
      types.forEach(t => {
        const type = groups?.find(g => g.productType.name.toLowerCase() === t.toLowerCase())
        if (type) {
          const config = getMarketableProductConfig(type.productType.name);
          marketables.push(config ? {
            ...config,
            id: type.productType.id
          } : {
            id: type.productType.id,
            name: type.productType.name,
            colors: []
          })
        }
      })
      return marketables;
    },
  });
}
