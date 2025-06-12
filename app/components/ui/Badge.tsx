import { useMemo, type FC } from 'react';
import { cx } from '~/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: BadgeVariant;
}

export const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  const baseClassName =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variantClassName = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return 'border-transparent bg-gray-300 text-slate-600 hover:bg-secondary/80';
      case 'destructive':
        return 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80';
      case 'outline':
        return 'text-foreground';
      default:
        return 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
    }
  }, [variant]);

  return <div className={cx(baseClassName, variantClassName, className)} {...props} />;
};
