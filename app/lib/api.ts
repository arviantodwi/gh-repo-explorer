import { Octokit } from 'octokit';
import type { GitHubRepo, GitHubUser } from './types';

const octokit = new Octokit({});

/**
 * Searches for users using the GitHub API.
 * @param {string} query The search query.
 * @returns {Promise<GitHubUser[]>} A promise that resolves to an array of users.
 * @throws {Error} If there is an error searching users.
 */
async function searchUsersApi(query: string): Promise<GitHubUser[]> {
  const response = await octokit.rest.search.users({
    q: query, // Query is automatically URI encoded by Octokit
    page: 1,
    per_page: 5,
  });

  return response.data.items;
}

/**
 * Retrieves a list of repositories owned by a given user using the GitHub API.
 * @param {string} username The username of the user.
 * @returns {Promise<GitHubRepo[]>} A promise that resolves to an array of GitHub repositories.
 * @throws {Error} If there is an error fetching the repositories.
 */
async function getUserReposApi(username: string): Promise<GitHubRepo[]> {
  const response = await octokit.rest.repos.listForUser({
    username,
  });

  return response.data;
}

export const api = {
  searchUsers: searchUsersApi,
  getUserRepos: getUserReposApi,
};
