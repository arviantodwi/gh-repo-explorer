import { cx } from '../../lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('bg-slate-300 animate-pulse rounded-md', className)} {...props} />;
}
