import { Avatar, Divider } from 'antd';
import type { FC } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import type { GitHubUser } from '~/lib/types';
import { cx } from '~/lib/utils';
import { RepositoryList } from '../repo/RepoList';

interface UserCardProps {
  isSelected: boolean;
  user: GitHubUser;
  onClick: () => void;
}

export const UserCard: FC<UserCardProps> = ({ isSelected, user, onClick }) => {
  return (
    <div
      className={cx(
        'rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md',
        isSelected
          ? 'border-slate-400 bg-slate-50 shadow-sm'
          : 'cursor-pointer border-slate-200 hover:border-slate-300',
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-4">
        <Avatar src={user.avatar_url} size={64} alt={user.login}>
          {user.login.substring(0, 2).toUpperCase()}
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate font-semibold text-slate-800">{user.name || user.login}</h4>
          </div>

          <p className="mb-2 text-sm text-slate-600">@{user.login}</p>

          {user.bio && <p className="mb-3 line-clamp-2 text-sm text-slate-600">{user.bio}</p>}

          {/* <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <IoGitBranch className="mr-1 h-3 w-3" />
              {user.public_repos} repositories
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <IoPeople className="mr-1 h-3 w-3" />
              {user.followers} followers
            </Badge>
          </div> */}
        </div>

        <IoChevronDown
          className={cx(
            'h-6 w-6 transform text-slate-500 transition-transform ease-in-out',
            isSelected && 'rotate-180',
          )}
        />
      </div>

      {isSelected && (
        <>
          <Divider className="!border-t-slate-300" />
          <RepositoryList />
        </>
      )}
    </div>
  );
};
