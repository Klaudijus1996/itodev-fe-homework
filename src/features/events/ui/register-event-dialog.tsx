import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RegisterToEventForm } from './register-to-event-form';

interface RegisterEventDialogProps {
  eventId: number;
  children: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RegisterEventDialog({
  eventId,
  children,
  onSuccess,
  onError,
  ...dialogProps
}: RegisterEventDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleError = (error: any) => {
    onError?.(error);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} {...dialogProps}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
        </DialogHeader>
        <RegisterToEventForm eventId={eventId} onSuccess={handleSuccess} onError={handleError} />
      </DialogContent>
    </Dialog>
  );
}
