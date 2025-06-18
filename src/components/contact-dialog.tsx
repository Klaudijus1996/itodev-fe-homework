import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { FormCheckbox } from './ui/form-checkbox';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/services/api/axios';

const useContactMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/auth/contact-us', data);
      return response.data;
    },
  });
};

const schema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  message: yup
    .string()
    .min(10, 'This field must be at least {{count}} characters')
    .max(500, 'This field must not exceed {{count}} characters')
    .required('This field is required'),
  newsletter: yup.boolean().default(false),
});

type FormData = yup.InferType<typeof schema>;

type ContactFormProps = {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    values: {
      name: '',
      email: '',
      message: '',
      newsletter: true,
    },
  });

  const { mutateAsync, isPending } = useContactMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = form;

  const handleFormSubmit = async (data: FormData) => {
    try {
      await mutateAsync(data);
      toast.success(t('Message sent successfully!'));
      onSubmit(data);
      reset(); // Reset form fields
      onClose(); // Close the dialog
    } catch (error: unknown) {
      console.error(
        'Contact form error:',
        error instanceof Error ? error.message : 'Unknown error'
      );

      const validationErrors =
        error instanceof Error && 'response' in error
          ? ((error.response as { data?: { errors?: Record<string, string | string[]> } })?.data
              ?.errors ?? [])
          : [];

      switch ((error as { response?: { status?: number } })?.response?.status) {
        case 422:
          Object.entries(validationErrors).forEach(([field, messages]) => {
            setError(field as keyof FormData, {
              type: 'manual',
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          });
          break;
        case 429:
          toast.error(t('Too many requests. Please try again later.'));
          break;
        default:
          toast.error(t('Service is not available at the moment. Please try again later.'));
          break;
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
        <div className="">
          <Input {...register('name')} placeholder={t('Name')} aria-invalid={!!errors.name} />
          {errors.name?.message && <p className="text-sm text-red-500">{t(errors.name.message)}</p>}
        </div>
        <div className="">
          <Input
            {...register('email')}
            type="email"
            placeholder={t('Email')}
            aria-invalid={!!errors.email}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-500">{t(errors.email.message)}</p>
          )}
        </div>
        <div className="">
          <Textarea
            {...register('message')}
            rows={6}
            placeholder={t('Message')}
            aria-invalid={!!errors.message}
          />
          {errors.message?.message && (
            <p className="text-sm text-red-500">
              {t(errors.message.message, { count: errors.message.type === 'min' ? 10 : 500 })}
            </p>
          )}
        </div>

        <div className="mb-8 flex items-center space-x-2">
          <FormCheckbox id="newsletter" {...register('newsletter')} />
          <Label htmlFor="newsletter">{t('I would like to receive the newsletter')}</Label>
        </div>

        <Button type="submit" className="cursor-pointer self-start" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('Sending...')}
            </>
          ) : (
            t('Submit')
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

type ContactDialogProps = React.ComponentProps<typeof Dialog> & {
  onSubmit: (data: FormData) => void;
};

export const ContactDialog: React.FC<ContactDialogProps> = ({
  onSubmit,
  children,
  ...dialogProps
}) => {
  const { t } = useTranslation();

  return (
    <Dialog {...dialogProps}>
      {children}
      <DialogContent className={'flex flex-col gap-8 p-8 md:gap-16'}>
        <DialogHeader>
          <DialogTitle>{t('Get in touch')}</DialogTitle>
        </DialogHeader>
        <ContactForm onSubmit={onSubmit} onClose={() => dialogProps.onOpenChange?.(false)} />
      </DialogContent>
    </Dialog>
  );
};
