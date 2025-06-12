import { useCallback, useEffect, type FC } from 'react';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { useGitHubStore } from '~/lib/store';
import type { GitHubUser } from '~/lib/types';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { UserCard } from './UserCard';

export const UserList: FC = () => {
  const { isSearching, searchQuery, users, selectedUser, clearAll, selectUserAndLoadRepos } =
    useGitHubStore();

  const handleUserClick = useCallback(
    async (user: GitHubUser) => {
      if (selectedUser?.id === user.id) {
        return;
      }

      try {
        await selectUserAndLoadRepos(user);
      } catch (error) {
        // @TODO Implement toast for error handling
      }
    },
    [selectUserAndLoadRepos, selectedUser?.id],
  );

  useEffect(() => {
    if (!searchQuery && users.length) {
      clearAll();
    }
  }, [clearAll, searchQuery, users.length]);

  if (!searchQuery) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <IoPeopleCircleOutline className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="text-lg font-medium text-slate-600">Search for Users</h3>
          <p className="mt-2 text-slate-500">Enter a username to find GitHub users</p>
        </CardContent>
      </Card>
    );
  }

  if (isSearching) {
    return (
      <Card className="h-fit">
        <CardContent className="space-y-4 p-6">
          <h3 className="text-lg font-semibold text-slate-800">Searching users...</h3>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <IoPeopleCircleOutline className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="text-lg font-medium text-slate-600">No users found</h3>
          <p className="mt-2 text-slate-500">Try a different search term</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Found {users.length} user{users.length !== 1 ? 's' : ''}
        </h3>
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={selectedUser?.id === user.id}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
