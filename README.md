# School

School is a web application built with React, TypeScript, and Vite, with an Express server for the application backend.

## Requirements

- [Bun](https://bun.sh/) or Node.js with npm
- The environment values required by the app (see `.env.example`)

## Run locally

From the repository root, install dependencies and start the development server:

```sh
bun install
bun run dev
```

Or, using npm:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Build and start

Create a production frontend build with:

```sh
bun run build
```

Start the Express application with:

```sh
bun run start
```

The available scripts are `dev`, `build`, `start`, `preview`, `clean`, and `lint` (TypeScript type checking).

## Environment variables

Review `.env.example` and set the required values in a local `.env` file before running the app if it uses environment-based configuration. For deployment, add those values through the hosting provider's environment-variable settings.

Do not commit `.env` files, API keys, passwords, or other secrets. The repository includes `.env.example` as a template; keep real credentials out of it.

## Deployment

This project includes an Express server, so GitHub Pages cannot run the complete application by itself. GitHub Pages can host static files, but it does not run the server-side code. To deploy the full app, use a host that supports Node.js and configure the required environment variables there.

## Technology

- React and TypeScript
- Vite
- Express
- Google GenAI SDK
