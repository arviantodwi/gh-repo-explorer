# GitHub Repo Explorer

A React application that allows users to search for GitHub users and view their repositories.

## Key Features

- **Search for GitHub users:** Enter a username to find and display user information.
- **View user repositories:** Browse a list of repositories for a selected user.
- **Responsive design:** Works well on different screen sizes.

## Technologies Used

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/): A standard library for routing in React.
- [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution.
- [GitHub API](https://docs.github.com/en/rest): Used to fetch user and repository data.

## Key Components

- `SearchHeader`: Provides a search input for finding GitHub users.
- `UserList`: Displays a list of GitHub users based on search results.
- `UserCard`: Renders a summary of a GitHub user's information.
- `RepoList`: Displays a list of repositories for a given user.
- `RepoCard`: Renders a summary of a GitHub repository's information.

## Prerequisites

- [Node.js](https://nodejs.org/) (>=18.0.0)
- [npm](https://www.npmjs.com/)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/arviantodwi/gh-repo-explorer.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd gh-repo-explorer
    ```

3.  Install dependencies using npm, yarn, or pnpm:

    ```bash
    npm install
    ```

## Running the Project

1.  Start the development server using npm:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Running Tests

1.  Run the tests using npm, yarn, or pnpm:

    ```bash
    npm run test
    ```

## Additional Information

- The project uses Zustand for state management. The store is located in [`app/lib/store.ts`](app/lib/store.ts).
- The project uses the GitHub API to fetch data. The API calls are located in [`app/lib/api.ts`](app/lib/api.ts).
- The project uses Vite as a build tool. The configuration file is located in [`vite.config.ts`](vite.config.ts).
- The project uses Vitest and React Testing Library to enable the test functionalities. The configuration file is located in [`vitest.setup.ts`](vitest.setup.ts).
