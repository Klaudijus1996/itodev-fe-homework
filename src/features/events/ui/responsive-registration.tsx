import * as React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegisterEventDialog } from './register-event-dialog';
import { RegisterEventDrawer } from './register-event-drawer';

interface ResponsiveRegistrationProps {
  eventId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

export function ResponsiveRegistration({
  eventId,
  onSuccess,
  onError,
  className,
}: ResponsiveRegistrationProps) {
  const [isMobile, setIsMobile] = React.useState(false);

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
      <RegisterEventDrawer eventId={eventId} onSuccess={onSuccess} onError={onError}>
        {triggerButton}
      </RegisterEventDrawer>
    );
  }

  return (
    <RegisterEventDialog eventId={eventId} onSuccess={onSuccess} onError={onError}>
      {triggerButton}
    </RegisterEventDialog>
  );
}
