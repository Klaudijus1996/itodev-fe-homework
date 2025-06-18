import { Button } from '@/components/ui/button';
import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface SortableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  children: ReactNode;
}

export function SortableColumnHeader<TData, TValue>({
  column,
  children,
}: SortableColumnHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (!isSorted) {
          column.toggleSorting(false, true); // asc
        } else if (isSorted === 'asc') {
          column.toggleSorting(true, true); // desc
        } else {
          column.clearSorting(); // none
        }
      }}
    >
      {children}
      {isSorted === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
      {isSorted === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
    </Button>
  );
}
