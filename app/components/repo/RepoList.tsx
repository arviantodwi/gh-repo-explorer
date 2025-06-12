import { IoGitBranch } from 'react-icons/io5';
import { useGitHubStore } from '~/lib/store';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { RepositoryCard } from './RepoCard';

export const RepositoryList = () => {
  const { selectedUser, repositories, isLoadingRepos } = useGitHubStore();

  if (!selectedUser) {
    return null;
  }

  if (isLoadingRepos) {
    return (
      <Card className="h-fit border-0 shadow-none">
        <CardContent className="space-y-4 p-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (repositories.length === 0) {
    return (
      <Card className="h-fit">
        <CardContent className="p-8 text-center">
          <IoGitBranch className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="text-lg font-medium text-slate-600">No Repositories</h3>
          <p className="mt-2 text-slate-500">This user has no public repositories</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          {selectedUser.name || selectedUser.login}'s Repositories ({repositories.length})
        </h3>
        <div className="max-h-[600px] space-y-4 overflow-y-auto">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
