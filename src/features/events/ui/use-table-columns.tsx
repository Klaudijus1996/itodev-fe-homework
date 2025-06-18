import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortableColumnHeader } from '@/components/ui/sortable-column-header';
import type { EventResponse } from '@/lib/services/api/events';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

const columns: ColumnDef<EventResponse>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableColumnHeader column={column}>Name</SortableColumnHeader>,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <SortableColumnHeader column={column}>Date</SortableColumnHeader>,
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue('date')).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <SortableColumnHeader column={column}>Location</SortableColumnHeader>,
    cell: ({ row }) => <span>{row.getValue('location')}</span>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log({ event })}>Register</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const useTableColumns = () => {
  return [...columns];
};
