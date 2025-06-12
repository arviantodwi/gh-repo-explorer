import type { FC } from 'react';
import { cx } from '../../lib/utils';

export const Skeleton: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cx('animate-pulse rounded-md bg-slate-300', className)} {...props} />;
};
