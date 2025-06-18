import React from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from './checkbox';

export const FormCheckbox: React.FC<
  Omit<React.ComponentProps<typeof Checkbox>, 'name'> & {
    name: string;
  }
> = ({ name, ...props }) => {
  const { field } = useController({ name });

  return (
    <Checkbox
      {...props}
      checked={field.value}
      onCheckedChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
};
