import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export const Section = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'section'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : 'section';

  return <Comp data-slot={'section'} className={cn('lg:px-36 lg:py-24', className)} {...props} />;
};
