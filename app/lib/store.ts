import { create } from 'zustand';
import { api } from './api';
import type { GitHubRepo, GitHubUser } from './types';

interface GitHubStore {
  // State
  searchQuery: string;
  users: GitHubUser[];
  selectedUser: GitHubUser | null;
  repositories: GitHubRepo[];
  isSearching: boolean;
  isLoadingRepos: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setUsers: (users: GitHubUser[]) => void;
  setSelectedUser: (user: GitHubUser | null) => void;
  setRepositories: (repos: GitHubRepo[]) => void;
  setIsSearching: (loading: boolean) => void;
  setIsLoadingRepos: (loading: boolean) => void;

  // Async actions
  searchUsers: (query: string) => Promise<void>;
  selectUserAndLoadRepos: (user: GitHubUser) => Promise<void>;
  clearAll: () => void;
}

export const useGitHubStore = create<GitHubStore>((set, get) => ({
  // Initial state
  searchQuery: '',
  users: [],
  selectedUser: null,
  repositories: [],
  isSearching: false,
  isLoadingRepos: false,

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setRepositories: (repos) => set({ repositories: repos }),
  setIsSearching: (loading) => set({ isSearching: loading }),
  setIsLoadingRepos: (loading) => set({ isLoadingRepos: loading }),

  searchUsers: async (query: string) => {
    if (!query.trim()) {
      set({
        users: [],
        selectedUser: null,
        repositories: [],
      });
      return;
    }

    set({
      isSearching: true,
      selectedUser: null,
      repositories: [],
    });

    try {
      const users = await api.searchUsers(query);
      set({ users });
    } catch (error) {
      set({ users: [] });
      console.error('Error searching users:', error);
      throw error;
    } finally {
      set({ isSearching: false });
    }
  },

  selectUserAndLoadRepos: async (user: GitHubUser) => {
    set({
      selectedUser: user,
      isLoadingRepos: true,
      repositories: [],
    });

    try {
      const repos = await api.getUserRepos(user.login);
      set({ repositories: repos });
    } catch (error) {
      set({ repositories: [] });
      console.error(`Error fetching repos owned by @${user.login}:`, error);
      throw error;
    } finally {
      set({ isLoadingRepos: false });
    }
  },

  clearAll: () =>
    set({
      users: [],
      selectedUser: null,
      repositories: [],
      isSearching: false,
      isLoadingRepos: false,
    }),
}));
