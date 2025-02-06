import { BookDashed, Check, LayoutDashboard, NotebookText } from "lucide-react";
import { STEP_STATUS } from "./constants";

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
export const getMockSession = async (permissions: string[] = ['ROLE_ADMIN', 'ROLE_USERS_R'], sleep: number = 1000): Promise<MockSessionIF> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: "g",
          name: "string",
          image: null,
          email: 'naciritaoufikmed@gmail.com',
          permissions,
        },
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNzk5NTk2Miwic3ViIjoib21hckBvY3Bncm91cC5tYSJ9.oqUYDrl8Js2dMjbHAS5FQoK9Up9OzMXzkLgh43CnGCg",
        adfsToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTczNzk5NTk2Miwic3ViIjoib21hckBvY3Bncm91cC5tYSJ9.oqUYDrl8Js2dMjbHAS5FQoK9Up9OzMXzkLgh43CnGCg",
        expires: '2025-01-30T12:00:00.000Z',
      });
    }, sleep);
  });
};


// exercice Step List mocks

export const steps = [
  {
    title: 'Collecte',
    description: 'Collecte de données brutes',
    icon: BookDashed,
    status: STEP_STATUS.IN_PROGRESS,
  },
  {
    title: 'Consolidation & visualisation',
    description: 'Consolidation et visualisation de données',
    icon: Check,
    status: STEP_STATUS.DONE,
  }
];


export const mockList = [
  {
    label: 'Hypothèses manufacturing',
    iconKey: NotebookText,
    status: STEP_STATUS.IN_PROGRESS,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    label: 'TopLine & UpSide',
    iconKey: LayoutDashboard,
    status: STEP_STATUS.IN_PROGRESS,
    redirectUrl: '/modules/BS/exercises',
  },
  {
    label: 'Ajustement des hypothèses',
    iconKey: NotebookText,
    status: STEP_STATUS.INACTIVE,
    redirectUrl: '/modules/BS/exercises',
  },
  // {
  //   text: 'Scénarisation',
  //   icon: <NotebookText />,
  //   status: STEP_STATUS.INACTIVE,
  //   redirectUrl: '/modules/BS/exercises',
  // },
  // {
  //   text: 'Arbitrage & Validation',
  //   icon: <NotebookText />,
  //   status: STEP_STATUS.INACTIVE,
  //   redirectUrl: '/modules/BS/exercises',
  // },
  // {
  //   text: 'Reporting',
  //   icon: <NotebookText />,
  //   status: STEP_STATUS.INACTIVE,
  //   redirectUrl: '/modules/BS/exercises',
  // },
];