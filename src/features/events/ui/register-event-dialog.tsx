import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RegisterToEventForm } from './register-to-event-form';
import { DialogDescription } from '@radix-ui/react-dialog';
import type { EventResponse } from '@/lib/services/api/events';
import { Badge } from '@/components/ui/badge';

interface RegisterEventDialogProps {
  event: EventResponse;
  children: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RegisterEventDialog({
  event,
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
          <DialogDescription className={'flex flex-col gap-2'}>
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
          </DialogDescription>
        </DialogHeader>
        <RegisterToEventForm eventId={event.id} onSuccess={handleSuccess} onError={handleError} />
      </DialogContent>
    </Dialog>
  );
}
