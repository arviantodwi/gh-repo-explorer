import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { GitHubUser } from '~/lib/types';
import { UserCard } from './UserCard';

const mockUser: GitHubUser = {
  login: 'testuser',
  id: 12345,
  node_id: '',
  avatar_url: 'https://example.com/avatar.jpg',
  gravatar_id: null,
  url: '',
  html_url: 'https://example.com/testuser',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: 'User',
  site_admin: false,
  name: 'Test User',
  bio: 'A test user bio.',
  public_repos: 10,
  public_gists: 0,
  followers: 100,
  following: 50,
  created_at: '',
  updated_at: '',
  score: 1,
};

describe('UserCard', () => {
  it('renders user data correctly', () => {
    render(<UserCard user={mockUser} isSelected={false} onClick={() => {}} />);

    const avatar = screen.getByAltText('testuser');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');

    const userRealName = screen.getByText('Test User');
    expect(userRealName).toBeInTheDocument();

    const usernameWithPrefix = screen.getByText('@testuser');
    expect(usernameWithPrefix).toBeInTheDocument();
  });
});
