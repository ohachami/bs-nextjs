import { TreeNode } from '@/types/TreeComboboxFilterTypes';

const treeData: TreeNode[] = [
  {
    id: '2024',
    label: '2024',
    children: [
      {
        id: '2024-Q1',
        label: 'Q1',
        children: [
          { id: '2024-01', label: 'Jan' },
          { id: '2024-02', label: 'Feb' },
          { id: '2024-03', label: 'Mar' },
        ],
      },
      {
        id: '2024-Q2',
        label: 'Q2',
        children: [
          { id: '2024-04', label: 'Apr' },
          { id: '2024-08', label: 'Aug' },
          { id: '2024-09', label: 'Sep' },
        ],
      },
    ],
  },
  {
    id: '2025',
    label: '2025',
    children: [
      {
        id: '2025-Q3',
        label: 'Q3',
        children: [
          { id: '2025-04', label: 'Apr' },
          { id: '2025-05', label: 'May' },
        ],
      },
    ],
  },
];

export { treeData };