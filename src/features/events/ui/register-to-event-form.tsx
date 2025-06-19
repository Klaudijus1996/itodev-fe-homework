import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { register } from '@/lib/services/api/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRegisterToEventMutation } from '@/features/events/use-register-to-event-mutation';
import { useQueryClient } from '@tanstack/react-query';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterToEventFormProps {
  eventId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function RegisterToEventForm({ eventId, onSuccess, onError }: RegisterToEventFormProps) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const mutation = useRegisterToEventMutation();
  const queryClient = useQueryClient();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setFormError(null);

    try {
      await mutation.mutateAsync([eventId, data]);
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Successfully registered for the event!');
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors ?? {};

      // Map API errors to form fields
      Object.keys(apiErrors).forEach((field) => {
        if (field in data) {
          form.setError(field as keyof RegisterFormData, {
            type: 'manual',
            message: apiErrors[field],
          });
        }
      });

      const message =
        error.response?.data?.message ?? 'An unexpected error occurred. Please try again.';
      setFormError(message);

      toast.error('Failed to register for the event');
      onError?.(error);
    }
  };

  return (
    <div className="space-y-6">
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className={'size-5 animate-spin'} />}
            {mutation.isPending ? 'Registering...' : 'Register for Event'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
