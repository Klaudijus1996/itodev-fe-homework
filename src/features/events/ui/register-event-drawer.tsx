import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { RegisterToEventForm } from './register-to-event-form';
import type { EventResponse } from '@/lib/services/api/events';
import { Badge } from '@/components/ui/badge';

interface RegisterEventDrawerProps {
  event: EventResponse;
  children: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RegisterEventDrawer({
  event,
  children,
  onSuccess,
  onError,
  ...drawerProps
}: RegisterEventDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleError = (error: any) => {
    onError?.(error);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} {...drawerProps}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Register for Event</DrawerTitle>
            <DrawerDescription className={'flex flex-col items-center gap-2'}>
              <span className={'inline-flex gap-2'}>
                Date:{' '}
                <b className={'font-medium'}>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </b>
              </span>
              <span className={'inline-flex gap-2'}>
                Location: <b className={'font-medium'}>{event.location}</b>
              </span>
              <span className={'inline-flex gap-2'}>
                Available spots: <Badge>{event.available_spots}</Badge>
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <RegisterToEventForm
              eventId={event.id}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
