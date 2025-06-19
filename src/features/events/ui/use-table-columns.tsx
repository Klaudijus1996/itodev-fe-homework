import { SortableColumnHeader } from '@/components/ui/sortable-column-header';
import type { EventResponse } from '@/lib/services/api/events';
import type { ColumnDef } from '@tanstack/react-table';
import { ResponsiveRegistration } from '@/features/events/ui/responsive-registration';
import { Badge } from '@/components/ui/badge';

const columns: ColumnDef<EventResponse>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableColumnHeader column={column}>Name</SortableColumnHeader>,
    cell: ({ row }) => (
      <div className="max-w-44 truncate capitalize md:max-w-none">{row.getValue('name')}</div>
    ),
    enableHiding: false,
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
    accessorKey: 'available_spots',
    header: ({ column }) => (
      <SortableColumnHeader column={column}>Available Spots</SortableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className={'flex w-full items-center justify-center'}>
        <Badge>{row.getValue('available_spots')}</Badge>
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      const handleSuccess = () => {
        console.log('Successfully registered for event:', event.name);
      };

      const handleError = (error: any) => {
        console.error('Failed to register for event:', event.name, error);
      };

      return (
        <ResponsiveRegistration
          eventId={event.id}
          onSuccess={handleSuccess}
          onError={handleError}
          className="h-8 w-8 p-0"
        />
      );
    },
  },
];

export const useTableColumns = () => {
  return [...columns];
};
