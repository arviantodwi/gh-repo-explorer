import { Button, Input } from 'antd';
import { useCallback, type FC, type FormEvent } from 'react';
import { IoLogoGithub, IoSearch } from 'react-icons/io5';
import { useGitHubStore } from '~/lib/store';

export const SearchHeader: FC = () => {
  const { searchQuery, setSearchQuery, searchUsers } = useGitHubStore();

  const handleSearchSubmit = useCallback(
    async (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      try {
        await searchUsers(searchQuery);
      } catch (error) {
        //
      }
    },
    [searchQuery, searchUsers],
  );

  return (
    <div className="space-y-6 text-center">
      <div className="mb-8 flex items-center justify-center gap-3">
        <IoLogoGithub className="h-6 w-6 text-slate-700 sm:h-8 sm:w-8" />
        <h1 className="text-2xl font-bold text-slate-800 sm:text-4xl">Repository Explorer</h1>
      </div>

      <p className="mx-auto max-w-2xl text-lg text-slate-600">
        Search for GitHub users and explore their repositories.
      </p>

      <div className="relative mx-auto flex max-w-md">
        <form className="flex w-full flex-col gap-2 sm:flex-row" onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Search GitHub users..."
            prefix={<IoSearch className="text-slate-400" />}
            size="large"
            name="user"
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
          />
          <Button type="primary" size="large" htmlType="submit">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};
