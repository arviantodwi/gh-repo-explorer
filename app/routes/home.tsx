import { SearchHeader } from '~/components/search-header/SearchHeader';
import { UserList } from '~/components/user/UserList';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub Repo Explorer' },
    { name: 'description', content: 'Welcome to GitHub Repository Explorer demo!' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <SearchHeader />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-8">
          <UserList />
        </div>
      </div>
    </div>
  );
}
