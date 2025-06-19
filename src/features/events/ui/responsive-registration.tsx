import * as React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegisterEventDialog } from './register-event-dialog';
import { RegisterEventDrawer } from './register-event-drawer';
import type { EventResponse } from '@/lib/services/api/events';

interface ResponsiveRegistrationProps {
  event: EventResponse;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

export function ResponsiveRegistration({
  event,
  onSuccess,
  onError,
  className,
}: ResponsiveRegistrationProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  // TODO: use media query
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const triggerButton = (
    <Button variant="outline" size="icon" className={className}>
      <UserPlus className="h-4 w-4" />
      <span className="sr-only">Register for event</span>
    </Button>
  );

  if (isMobile) {
    return (
      <RegisterEventDrawer event={event} onSuccess={onSuccess} onError={onError}>
        {triggerButton}
      </RegisterEventDrawer>
    );
  }

  return (
    <RegisterEventDialog event={event} onSuccess={onSuccess} onError={onError}>
      {triggerButton}
    </RegisterEventDialog>
  );
}
