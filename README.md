# Résumé Advocate

A tiny voice demo built with LiveKit: visitors open a single public page and talk to an AI that knows Niel Christensen's résumé and makes the case for hiring him.

There are only two pieces:

- `agent/` is the LiveKit voice agent. LiveKit Cloud hosts it.
- `docs/index.html` is a static landing page for GitHub Pages. It uses LiveKit's hosted Agent Embed Widget, so it has no backend, no token server, and no Vercel account.

## Publish it

1. Push this repository to GitHub. In **Settings → Pages**, set **Deploy from a branch**, choose `main`, and select the `/docs` folder. GitHub gives you a public URL such as `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`.
2. Authenticate the installed LiveKit CLI:

   ```sh
   lk cloud auth
   ```

   Complete the browser sign-in, choosing the LiveKit Cloud project for this demo.
3. Deploy the agent:

   ```sh
   cd agent
   pnpm install
   lk agent create
   ```

   This creates `livekit.toml`, deploys the agent, and gives it an ID beginning with `CA_`.
4. In the LiveKit Cloud dashboard, open the deployed agent → **Embed**. Add your GitHub Pages origin, for example `https://YOUR_USERNAME.github.io`, to **Allowed origins**. Configure the widget and enable it.
5. Replace `CA_YOUR_AGENT_ID` in `docs/index.html` with the agent ID from step three, then push that change. Your GitHub Pages URL is the final job-application link.

The widget is hosted and tokenized by LiveKit Cloud; GitHub Pages only hosts the simple résumé page. See [LiveKit's Agent Embed Widget guide](https://docs.livekit.io/agents/start/embed/) for the dashboard settings.

## Before sharing

- Open the GitHub Pages URL in an incognito window and approve microphone access.
- Ask about experience, a project, and a weakness; ensure every answer remains true to the résumé.
