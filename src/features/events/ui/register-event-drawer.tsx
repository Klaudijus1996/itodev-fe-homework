import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { RegisterToEventForm } from './register-to-event-form';

interface RegisterEventDrawerProps {
  eventId: number;
  children: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RegisterEventDrawer({
  eventId,
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
        <div className="max-h-[80vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Register for Event</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <RegisterToEventForm
              eventId={eventId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
