# Internship Opportunities — E&TC, Sipna COET, Amravati

A one-page website that lists internships for students. It is plain HTML, CSS and
JavaScript: no build step and nothing to install. A small robot on GitHub checks
every link each morning and republishes the site.

```
index.html                         the page
data/internships.js                ALL the content — the only file you edit
data/status.js                     written by the daily robot — do not edit
assets/css/style.css               colours and layout
assets/js/app.js                   search, filters, save, share (no need to touch)
assets/img/                        favicon, link-preview image, your logo
assets/fonts/                      heading font (IBM Plex Sans Condensed, SIL Open Font License)
.github/workflows/auto-update.yml  the daily robot's timetable; it also publishes the site
.github/scripts/auto-update.mjs    what the robot does
LINKS-VERIFIED.md                  what was checked on each link, and what was left out
```

## 1. Publish on GitHub Pages

1. Sign in at github.com and click **New repository**. Name it, for example,
   `internships`. Keep it **Public**. Click **Create repository**.
2. On the new repository page click **uploading an existing file**. Drag in
   everything from this folder: `index.html`, `README.md`, `LINKS-VERIFIED.md`,
   and the folders `assets` and `data`. Click **Commit changes**.
3. Add the robot. The `.github` folder is hidden on many computers and may not
   upload by dragging, so add its two files by hand:
   **Add file → Create new file**, type the name
   `.github/workflows/auto-update.yml`, paste the contents of that file, commit.
   Do the same for `.github/scripts/auto-update.mjs`.
4. Go to **Settings → Pages**. Under *Build and deployment*, under *Source*,
   choose **GitHub Actions**. (Not "Deploy from a branch": GitHub does not
   rebuild a branch-published site when a robot changes a file, so the daily
   updates would never appear.)
5. Go to the **Actions** tab, click **Daily check and publish**, then
   **Run workflow**. When it shows a green tick, the site is live at
   `https://YOUR-USERNAME.github.io/internships/`.
6. Open `index.html` on GitHub (pencil icon) and replace `YOUR-USERNAME` and
   `YOUR-REPO` in the two lines marked `<!-- replace -->`. This makes the
   picture appear when the link is shared on WhatsApp.

From now on the site republishes by itself: every morning at about 6:00 India
time, and about a minute after any change you commit.

## 2. What happens without you

| It happens by itself | How |
| --- | --- |
| A listing disappears the day after its closing date | The page compares the date with today. No robot needed. |
| A listing disappears when its official page is gone | The robot opens every link daily. Gone on 2 checks in a row ("page not found", or the web address no longer exists) = hidden. It returns by itself if the page comes back. You get a GitHub issue naming it. |
| A closing date appears on a card | The robot reads the official page. If it finds a full date written straight after words like "last date", "deadline", "apply by" or "open till", and you have not typed a date (or yours has passed), the card shows it with the note "read automatically". |
| A listing whose date has passed comes back | If the official page later shows a new closing date, the robot's date brings the card back. |
| "May be closed" appears on a card | The official page says applications or registration are closed. |
| "Link checked on" shows a fresh date | Whenever the robot opened the page successfully. |

What it cannot do:

- **Find new internships.** A new listing still has to be added by you.
- **Read every page.** Some sites refuse robots, and some only show their
  content in a real browser. Those listings keep whatever you typed. Nothing is
  ever hidden because a site refused the robot.
- **Understand every wording.** Dates without a year ("31st October every
  year"), dates inside PDFs or pictures, and unusual phrasing are skipped.
  A skipped date is safer than a wrong one, so the robot is deliberately strict.
- **Be right every time.** A page can mention "last date" for something else.
  That is why your typed date always wins over the robot's, and why the card
  tells students when a date was read automatically.

**See what the robot did:** Actions tab → latest *Daily check and publish* run →
*Summary*. It lists every date it read with the exact words from the page,
pages that say "closed", links it hid, sites it could not read, and any date
that differs from the one you typed.

**Switches** — in `data/internships.js`, under `auto`:

```js
auto: {
  hideDeadLinks: true,     // false = never hide a listing for a dead link
  readDeadlines: true,     // false = never show a date read by the robot
  closedPages: "label"     // "label" = show "May be closed"; "hide" = remove the card; "ignore" = do nothing
}
```

Use `closedPages: "hide"` only if you accept that a page mentioning an *old*
round as closed could hide a listing that is open again.

Add the line `auto: false,` to a single listing if the robot must leave its
date and status alone.

**If GitHub stops the robot:** GitHub pauses timed jobs in a public repository
after 60 days without activity. The robot saves its result to the repository
every day, which keeps it active. If GitHub ever emails you that the workflow
was disabled, open the Actions tab and click **Enable workflow**.

## 3. Add, edit or remove an internship

Open `data/internships.js` on GitHub, click the pencil icon, make the change,
and click **Commit changes**. The site updates in about a minute.

**Add** — copy this block, paste it inside `window.INTERNSHIPS = [ ... ]`
(after any closing `},`), and fill it in:

```js
  {
    id: "short-unique-name",
    title: "Programme name",
    org: "Organisation name",
    badge: "ORG",
    category: "Company",
    domains: ["Embedded & IoT"],
    mode: ["On-site"],
    location: "City, State",
    duration: "6 weeks",
    years: [3, 4],
    stipend: "Stipend",
    stipendNote: "",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://official-site.example/apply",
    note: "One or two lines a student needs before clicking."
  },
```

| Field | What to write |
| --- | --- |
| `id` | Letters, numbers and dashes. Must be different for every listing. It becomes the share link. |
| `badge` | Up to 6 letters for the coloured chip on the card, e.g. `ISRO`. Leave the line out to use initials. |
| `category` | `Government`, `PSU`, `Research`, `Company` or `Open source`. Each type has its own colour. |
| `domains` | One or more from the `window.DOMAINS` list at the top of the file, spelled exactly the same |
| `mode` | `"Remote"`, `"On-site"`, `"Hybrid"`; use `[]` if the official page does not say |
| `years` | Eligible years, e.g. `[2, 3, 4]`; use `[]` if the official page does not say |
| `stipend` | `"Stipend"`, `"Unpaid"`, `"Fee-based"` or `"Varies"` (shown as "Stipend: check page") |
| `deadline` | `"Rolling"`, a date `"2026-12-31"`, several dates `["2026-10-30", "2027-03-31"]`, or short text. If you do not know the date, write short text such as `"See the page"`; the robot fills in a date when it can read one. |
| `verified` | The date you opened the link yourself, as `YYYY-MM-DD` |
| `url` | The organisation's own page, starting with `https://` |

**Edit** — change the text between the quotes. Keep the quotes and the commas.

**Remove** — delete the whole block from `{` to `},`.

Listings with a date are shown first, soonest first. The page shows 12 cards
and a *Show more* button.

**Department tie-ups** — paste the same block inside `window.TIEUPS = [ ... ]`.
The *Department tie-ups* section appears on the site as soon as it has one
entry. For a Google Form, put the form link in `url`.

**Announcement bar** — edit `announcement` near the top of the file, or set
`show: false`.

**Report a broken link** — put an email in `coordinator.email`. Each listing's
share menu then shows a *Report a broken link* button that writes to it.

**If the page goes blank after an edit** — a comma or a quote is missing.
On GitHub open the file's **History**, open the previous version, and compare.

## 4. Colours and logo

- **Colours:** open `assets/css/style.css`. The first block, `:root { ... }`,
  holds every colour for the light theme; the block below it is the dark theme.
  `--board` and `--board-2` colour the header, hero and footer; `--gold` is the
  Apply button; `--c-research`, `--c-government`, `--c-company` and the other
  `--c-` lines set the colour of each type of internship.
- **Logo:** upload the file to `assets/img/` and set `logo: "assets/img/logo.png"`
  in `data/internships.js`. A square image works best.
- **College and department name:** `college`, `department` and `shortName` in
  `data/internships.js`. The page title and description are in the first lines
  of `index.html`.
