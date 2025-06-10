import { Button, Input } from 'antd';
import type { FC } from 'react';
import { IoLogoGithub, IoSearch } from 'react-icons/io5';

export const SearchHeader: FC = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="mb-8 flex items-center justify-center gap-3">
        <IoLogoGithub className="h-8 w-8 text-slate-700" />
        <h1 className="text-4xl font-bold text-slate-800">Repository Explorer</h1>
      </div>

      <p className="mx-auto max-w-2xl text-lg text-slate-600">
        Search for GitHub users and explore their repositories.
      </p>

      <div className="relative mx-auto flex max-w-md gap-2">
        <Input
          placeholder="Search GitHub users..."
          prefix={<IoSearch className="text-slate-400" />}
          size="large"
        />
        <Button type="primary" size="large">
          Search
        </Button>
      </div>
    </div>
  );
};
