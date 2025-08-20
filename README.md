# Revolutionary War Battle Explorer

An interactive, student‑friendly web app to explore key battles of the American Revolutionary War (1775–1783). Pan around a Leaflet map, scrub a timeline to see how the war unfolded, and dive into rich, classroom‑ready details for each battle — including outcomes, significance, images, fun facts, sources, and student activities.

This project started as a fun hobby and is free for anyone to use, learn from, and adapt. Enjoy, and feel welcome to contribute!

## Live Demo
https://theamericanrevolutiontimeline.netlify.app/

## Features
- Interactive map with battle markers and tooltips
- Timeline slider with play/pause to reveal battles over time
- Detailed battle panel with images, summaries, casualties, sources, and activities
- Search by name, location, or theater
- Gamification: discovery tracker and achievement notifications
- Light/dark mode friendly, responsive layout

## Quick Start (Local)
You can run this with any static file server, or simply open the HTML file directly.

Option A — simplest:
1. Download or clone this repository.
2. Open `index.html` in your browser.

Option B — serve locally (recommended):
1. Download or clone this repository.
2. From the project folder, start a tiny server (pick one):
   - Python 3: `python3 -m http.server 5500`
   - Node (npx): `npx serve -l 5500`
3. Open `http://localhost:5500` in your browser.

Note: A local server avoids occasional browser restrictions with local files and ensures Leaflet assets load consistently.

## Tech Stack
- HTML, CSS, JavaScript (no framework)
- [Leaflet](https://leafletjs.com/) for maps
- OpenStreetMap tiles for the base map

## Screenshots
Add images to `docs/screenshots/` (or any folder you like) and update the paths below.

![Map and Timeline](docs/screenshots/map-timeline.png)
![Battle Details Panel](docs/screenshots/battle-details.png)
![Achievements and Discovery](docs/screenshots/achievements.png)

## Project Structure
- `index.html` — App layout, includes map container, controls, and panels
- `style.css` — Visual design, responsive layout, dark mode, animations
- `app.js` — Core logic (map setup, markers, timeline, search, panels, gamification)
- `revolutionary_war_battles_sample.json` — Example data structure (for reference only)
- `testing_checklist.md` — Manual testing guide for recent UI/UX changes

## How It Works
- Battle data lives in `app.js` inside the `RevolutionaryWarMap` class (`this.battles`).
- On load, the app initializes a Leaflet map, creates markers for each battle, and wires up UI controls.
- The timeline slider filters visible battles by date; play mode animates month‑by‑month from April 1775 to October 1783.
- Clicking a marker opens a popup; the “Explore This Battle!” button opens a slide‑in panel with full details.

## Using the App
- Timeline: Drag the slider or press Play to animate the war’s progression.
- Map: Hover or click markers to learn more; use the popup to explore details.
- Search: Type a battle name, location, or theater; click a result to zoom and open details.
- Surprise Me: Jump to a random battle for quick discovery.
- Discovery Tracker: See how many unique battles you’ve explored and unlock small achievements.

## Editing or Adding Battles
- Open `app.js` and find the `this.battles` array.
- Add or edit a battle object using the existing structure:
  - `name`, `date` (YYYY‑MM‑DD), `location`, `latitude`, `longitude`
  - `outcome`, `significance`, `description`, `theater`
  - `casualties_american`, `casualties_british`
  - `image`, `fun_fact`, `quick_summary`, `student_activity`
  - `sources` (array), `primary_sources` (array)
- Save and refresh — the app picks up changes automatically.

Tip: The `revolutionary_war_battles_sample.json` file is just a simplified reference; the app reads data directly from `app.js`.

## Development Notes
- The main class is `RevolutionaryWarMap` in `app.js`.
- Key methods: map init (`initializeMap`), load markers (`loadBattleMarkers`), timeline filtering (`updateVisibleBattles`), search (`performSearch`), details panel (`showBattleDetails`).
- Styling uses CSS variables and supports dark mode via `prefers-color-scheme` and a `data-color-scheme` hook if you want to add a manual toggle.

## Testing
- See `testing_checklist.md` for targeted manual tests covering marker interactions, panel behavior, header visuals, and basic regressions.
- Also check the browser console for any runtime errors after changes.

## Roadmap Ideas
- Add more battles and theaters (Southern, Frontier, Naval) with images
- Optional overlays for territorial control by year
- Bookmarking or shareable links per battle
- Keyboard controls for the timeline
- Audio narration or teacher mode

## Attribution
- Map: © OpenStreetMap contributors
- Library: © [Leaflet](https://leafletjs.com/) contributors

## Contributing
This is a hobby project — contributions, suggestions, and improvements are welcome! Feel free to open an issue or PR. If you’re adding UI features, please update `testing_checklist.md` with any relevant test cases.

 

Made for students, educators, and history fans. Have fun exploring!
