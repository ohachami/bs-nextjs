import {
  ChartNoAxesColumn,
  Dot,
  LayoutList,
} from 'lucide-react';
import { STEP_STATUS } from './constants';
import { DataSourceIF } from '@/types/collect/datasources';
import { ConsolidationVersionsIF } from '@/types/consolidation';
import { NestedOption } from '@/types/common/CollapsibleSelectTypes';

// Interface defining a Mock Session structure
interface MockSessionIF {
  user: {
    id: string;
    name: string;
    email: string;
    image: null;
    permissions: string[];
  };
  accessToken: string;
  adfsToken: string;
  expires: string;
}

// Mocking getServerSession Logic For Test Purposes
export const getMockSession = async (
  permissions: string[] = ['ROLE_ADMIN', 'ROLE_USERS_R'],
  sleep: number = 1000
): Promise<MockSessionIF> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 'g',
          name: 'string',
          image: null,
          email: 'naciritaoufikmed@gmail.com',
          permissions,
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNzk5NTk2Miwic3ViIjoib21hckBvY3Bncm91cC5tYSJ9.oqUYDrl8Js2dMjbHAS5FQoK9Up9OzMXzkLgh43CnGCg',
        adfsToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNzk5NTk2Miwic3ViIjoib21hckBvY3Bncm91cC5tYSJ9.oqUYDrl8Js2dMjbHAS5FQoK9Up9OzMXzkLgh43CnGCg',
        expires: '2025-01-30T12:00:00.000Z',
      });
    }, sleep);
  });
};

// exercice Step List mocks
export const STEPS = [
  {
    title: 'Collecte',
    code: 'COLLECT',
    description: 'Collecte de données brutes',
    icon: LayoutList,
    status: STEP_STATUS.DONE,
  },
  {
    title: 'Consolidation & visualisation',
    code: 'CONSOLIDATION',
    description: 'Consolidation et visualisation de données',
    icon: ChartNoAxesColumn,
    status: STEP_STATUS.IN_PROGRESS,
  },
  {
    title: 'Scénarisation',
    code: 'SCENARISATION',
    description: 'Scénarisation de données consolidées',
    icon: Dot,
    status: STEP_STATUS.INACTIVE,
  },
];

// used for Dataources Tabs component test
export const mockDataSources: DataSourceIF[] = [
  {
    id: '1a2b3c4d-0001-0000-0000-000000000001',
    name: 'Mining Data Source 1',
    code: 'MINING_DS_1',
    sites: [
      {
        id: '3d2cc8e8-eafd-4304-8213-cfadc006f3d9',
        name: 'Youssoufia',
        code: null,
        dataVersions: [],
      },
      {
        id: 'ed75610c-99ae-4edf-a317-e408151f19de',
        name: 'Nador',
        code: null,
        dataVersions: [],
      },
      {
        id: '7f98eee1-8879-4f11-afcc-ddb051a8e30f',
        name: 'Jorf',
        code: null,
        dataVersions: [
          {
            id: '1a2b3c4d-0001-0000-0000-000000000004',
            version: null,
            path: '/api/random_4',
            name: 'random_4 v1.2',
            comment: 'sssss',
            createdAt: new Date(),
            updatedAt: new Date(),
            site: {
              id: '',
              name: 'string',
              code: 'string',
            },
          },
        ],
      },
    ],
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000002',
    name: 'Mining Data Source 2',
    code: 'MINING_DS_2',
    sites: [
      {
        id: '3d2cc8e8-eafd-4304-8213-cfadc006f3d9',
        name: 'Safi',
        code: null,
        dataVersions: [],
      },
      {
        id: 'ed75610c-99ae-4edf-a317-e408151f19de',
        name: 'Jorf',
        code: null,
        dataVersions: [],
      },
    ],
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000004',
    name: 'Mining Data Source 3',
    code: 'MINING_DS_2',
    sites: [],
  },
];

// used for consoliodationCombobox component test
export const consoldationVersionMock: ConsolidationVersionsIF[]  = [
  {
    id: "0",
    name: "Données_consolidées_Exercise_Sept_Q4_2024"
  },
  {
    id: "1",
    name: "Données_consolidées_Exercise_Nov_Q4_2024"
  },
  {
    id: "2",
    name: "Données_consolidées_Exercise_Jan_Q1_2025"
  },
  {
    id: "3",
    name: "Données_consolidées_Exercise_Sept_Q4_2026"
  },
  {
    id: "4",
    name: "Données_consolidées_Exercise_Sept_Q4_2028"
  },
]

// used for collaspibleSelect component test
export const collapsibleSelectMock: NestedOption[] = [
  {
    value: 'Actual_Exercice_Q1_2024',
    label: 'Actual_Exercice_Q1_2024',
    children: [
      {
        value: 'Données_Consolidées_Exercice_Q1_2024',
        label: 'Données_Consolidées_Exercice_Q1_2024',
        children: [
          {
            value: 'Fichier_Collecte_Jorf_Exercice_Q1_2024.xlsx',
            label: 'Fichier_Collecte_Jorf_Exercice_Q1_2024.xlsx',
          },
          {
            value: 'Fichier_Collecte_Safi_Exercice_Q1_2024.xlsx',
            label: 'Fichier_Collecte_Safi_Exercice_Q1_2024.xlsx',
          },
          {
            value: 'Fichier_Collecte_Youssoufia_Exercice_Q1_2024.xlsx',
            label: 'Fichier_Collecte_Youssoufia_Exercice_Q1_2024.xlsx',
          },
          {
            value: 'Fichier_Collecte_Dakhla_Exercice_Q1_2024.xlsx',
            label: 'Fichier_Collecte_Dakhla_Exercice_Q1_2024.xlsx',
          },
        ],
      },
    ],
  },
  {
    value: 'Actual_Exercice_Q3_2024',
    label: 'Actual_Exercice_Q3_2024',
    children: [
      {
        value: 'Données_Consolidées_Exercice_Q3_2024',
        label: 'Données_Consolidées_Exercice_Q3_2024',
        children: [
          {
            value: 'Fichier_Collecte_Jorf_Exercice_Q3_2024',
            label: 'Fichier_Collecte_Jorf_Exercice_Q3_2024',
          },
          {
            value: 'Fichier_Collecte_Safi_Exercice_Q3_2024',
            label: 'Fichier_Collecte_Safi_Exercice_Q3_2024',
          },
          {
            value: 'Fichier_Collecte_Youssoufia_Exercice_Q3_2024',
            label: 'Fichier_Collecte_Youssoufia_Exercice_Q3_2024',
          },
          {
            value: 'Fichier_Collecte_Dakhla_Exercice_Q3_2024',
            label: 'Fichier_Collecte_Dakhla_Exercice_Q3_2024',
          },
        ],
      },
    ],
  },
];