# GoalVerse

GoalVerse is a production-ready football live score web application built with
Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Axios, and React Icons.

This first build step includes the project structure, global app layout,
navigation bar, footer, and a responsive dark-mode home hero.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your football API configuration:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SERVER_URL=https://your-backend.example.com
FOOTBALL_API_BASE_URL=https://api.example.com
FOOTBALL_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Structure

```text
src/
  app/
  components/
  services/
  hooks/
  lib/
  types/
  utils/
  assets/
```

## Roadmap

- Live matches
- Match details
- Fixtures
- Leagues and standings
- Teams and players
- Search
- Favorites with localStorage
- Skeleton and error states

## Environment Variables

Use server-only variables for secret API keys whenever possible. Only expose
values with `NEXT_PUBLIC_` when they are safe to ship to the browser.

`SERVER_URL` enables the catch-all proxy at `/api/[...path]`. A licensed channel
backend can return records with `_id`, `name`, `channelsNumber`, `logo`,
`groupTitle`, and `channelUrl`; GoalVerse maps those fields for the Watch page.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
