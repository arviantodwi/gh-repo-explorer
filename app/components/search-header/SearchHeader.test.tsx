import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGitHubStore } from '~/lib/store';
import type { GitHubUser } from '~/lib/types';
import { UserList } from '../user/UserList';
import { SearchHeader } from './SearchHeader';

vi.mock('~/lib/store', () => ({
  useGitHubStore: vi.fn(),
}));

describe('SearchHeader Component', () => {
  beforeEach(() => {
    (useGitHubStore as any).mockReturnValue({
      searchQuery: '',
      setSearchQuery: vi.fn(),
      searchUsers: vi.fn(),
    });
  });

  it('should render the search input field', () => {
    render(<SearchHeader />);
    const searchInput = screen.getByPlaceholderText('Search GitHub users...') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  it('should update the search input value on user input', () => {
    const mockSetSearchQuery = vi.fn();
    (useGitHubStore as any).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      searchUsers: vi.fn(),
    });

    render(<SearchHeader />);
    const searchInput = screen.getByPlaceholderText('Search GitHub users...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test');
  });

  it('should trigger the search functionality on form submission', async () => {
    const mockSearchUsers = vi.fn();
    (useGitHubStore as any).mockReturnValue({
      searchQuery: 'username_test',
      setSearchQuery: vi.fn(),
      searchUsers: mockSearchUsers,
    });

    render(<SearchHeader />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(mockSearchUsers).toHaveBeenCalledWith('username_test');
  });

  it('should filter users in UserList based on search query', async () => {
    const mockUsers: Partial<GitHubUser>[] = [
      { id: 1, login: 'testuser1' },
      { id: 2, login: 'testuser2' },
      { id: 3, login: 'anotheruser' },
    ];
    (useGitHubStore as any).mockReturnValue({
      users: mockUsers,
      searchQuery: 'test',
      setSearchQuery: vi.fn(),
      searchUsers: vi.fn(),
    });

    render(
      <>
        <SearchHeader />
        <UserList />
      </>,
    );

    const searchInput = screen.getByPlaceholderText('Search GitHub users...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });

    const filteredUsers = await screen.findAllByText(/@testuser/);
    expect(filteredUsers).toHaveLength(2);
  });
});
