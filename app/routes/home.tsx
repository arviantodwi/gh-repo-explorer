import { SearchHeader } from '~/components/search-header/SearchHeader';
import { UserList } from '~/components/user-list/UserList';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub Repo Explorer' },
    { name: 'description', content: 'Welcome to GitHub Repo Explorer demo!' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <SearchHeader />

        <div className="mt-8 grid max-w-3xl grid-cols-1 gap-8 mx-auto">
          <UserList />
        </div>
      </div>
    </div>
  );
}
