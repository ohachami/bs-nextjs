interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeFilterDropdownProps {
  data: TreeNode[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export type { TreeNode, TreeFilterDropdownProps };
