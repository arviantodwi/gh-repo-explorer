import type { RestEndpointMethodTypes } from 'node_modules/@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';

export type GitHubUser =
  RestEndpointMethodTypes['search']['users']['response']['data']['items'][number];

export type GitHubRepo =
  RestEndpointMethodTypes['repos']['listForUser']['response']['data'][number];
