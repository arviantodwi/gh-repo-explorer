import type { FC } from 'react';
import { IoGitNetwork, IoStar, IoTime } from 'react-icons/io5';
import type { GitHubRepo } from '~/lib/types';
import { Badge } from '../ui/Badge';

interface RepositoryCardProps {
  repository: GitHubRepo;
}

export const RepositoryCard: FC<RepositoryCardProps> = ({ repository }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-orange-500',
      'C++': 'bg-blue-600',
      C: 'bg-gray-600',
      HTML: 'bg-orange-400',
      CSS: 'bg-blue-400',
      React: 'bg-cyan-400',
      Vue: 'bg-green-400',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      PHP: 'bg-purple-500',
    };
    return colors[language] || 'bg-gray-400';
  };

  return (
    <div className="relative rounded-lg border border-slate-200 p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate font-semibold text-slate-800">{repository.name}</h4>
          </div>

          {repository.description && (
            <p className="mb-3 line-clamp-2 text-sm text-slate-600">{repository.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        {repository.language && (
          <div className="flex items-center gap-1">
            <div className={`h-3 w-3 rounded-full ${getLanguageColor(repository.language)}`} />
            <span>{repository.language}</span>
          </div>
        )}

        {!!(repository.stargazers_count && repository.stargazers_count > 0) && (
          <div className="flex items-center gap-1">
            <IoStar className="h-4 w-4" />
            <span>{repository.stargazers_count}</span>
          </div>
        )}

        {!!(repository.forks_count && repository.forks_count > 0) && (
          <div className="flex items-center gap-1">
            <IoGitNetwork className="h-4 w-4" />
            <span>{repository.forks_count}</span>
          </div>
        )}

        {repository.updated_at && (
          <div className="flex items-center gap-1">
            <IoTime className="h-4 w-4" />
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>
        )}
      </div>

      {repository.topics && repository.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {repository.topics.slice(0, 5).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
          {repository.topics.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{repository.topics.length - 5} more
            </Badge>
          )}
        </div>
      )}

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      />
    </div>
  );
};
