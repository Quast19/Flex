# Flex: Unified Coding Profile Builder

Flex is a SvelteKit-based web application that lets users create a consolidated, shareable profile page showcasing their LeetCode, Codeforces, and GitHub stats—all in one place. Users sign in with Google, enter their coding handles, and get a unique link (e.g., `/flex/[your-google-mail]`) that can be shared with recruiters or friends. No authentication is required to view a profile page.

---

## Features

- **Unified Profile:** View LeetCode, Codeforces, and GitHub stats in a single, beautiful UI.
- **Shareable Link:** Each user gets a unique, public profile URL that can be shared with anyone.
- **No Viewer Login Required:** Recruiters and friends can view your profile without signing in.
- **Live Data:** Fetches and displays up-to-date stats from all platforms.
- **Graceful Error Handling:** Invalid handles or API failures are handled smoothly with friendly messages.
- **Responsive Design:** Looks great on desktop and mobile.
- **Modern UI:** Built with SvelteKit and shadcn-svelte components for a smooth, modern experience.

---

## Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/), [shadcn-svelte](https://www.shadcn-svelte.com/), Tailwind CSS
- **Backend:** SvelteKit endpoints
- **Database:** [Neon](https://neon.tech/) (Postgres) with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** Google OAuth
- **APIs:** Fetches data from LeetCode, Codeforces, and GitHub public APIs

---

## Project Structure

```
src/
  lib/
    components/
      Visualizations/      # Platform-specific charts and stats
      ui/                 # shadcn-svelte UI components (Button, Progress, etc.)
      codeforcesProfiles/ # Codeforces profile builder logic
    server/
      db/                 # Database schema and access (Drizzle ORM)
  routes/
    +page.svelte          # Main landing page
    [useremail]/
      +page.svelte        # User's public profile page
      profileHeader.svelte
      +error.svelte       # Error handling for profile pages
```

---

## How It Works

1. **Sign in with Google:**  
   Users authenticate using their Google account.

2. **Enter Handles:**  
   Provide your LeetCode, Codeforces, and GitHub usernames.

3. **Get Your Link:**  
   The app generates a unique, public profile page at `/flex/[your-google-mail]`.

4. **Share:**  
   Share your link with recruiters or friends—no login required to view!

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**  
   Configure your Neon DB connection and Google OAuth credentials in a `.env` file.

3. **Run database migrations (if needed):**
   ```bash
   # See Drizzle ORM docs for migration commands
   ```

4. **Run the dev server:**
   ```bash
   npm run dev
   ```

5. **Visit:**  
   Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Customization

- **Add More Platforms:**  
  Extend `/src/lib/components/Visualizations/` and update the server logic to support more coding platforms.
- **UI Tweaks:**  
  Modify or add shadcn-svelte components in `/src/lib/components/ui/` for a custom look.

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea before submitting a PR.

---

## License

MIT

---

## Credits

- [SvelteKit](https://kit.svelte.dev/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon](https://neon.tech/)
- [LeetCode API](https://leetcode.com/)
- [Codeforces API](https://codeforces.com/api/)
- [GitHub API](https://docs.github.com/en/rest)

---

**Made with ❤️ by Shriganesh Bhide**
