# Fantasy Draft Board

A free, phone-first Progressive Web App (PWA) for a live fantasy football draft.

## Included
- Board, favorites, roster, search, and position filters
- Distinguishes "I drafted him" from "someone else drafted him"
- Roster-aware "Best For Me"
- Undo
- Automatic local saving on the device
- Offline support after first load
- Import/replace rankings without editing JavaScript
- JSON backup export/import

## Ranking import format
One player per line:

Name | POS | Team | Tier | sleeper

Examples:
Jahmyr Gibbs | RB | DET | 1
Puka Nacua | WR | LAR | 1
Example Player | WR | NYJ | 8 | sleeper

Only Name and POS are required.

## GitHub Pages
Upload all files in this folder to the root of your repository, then enable Pages:
Settings > Pages > Deploy from a branch > main > /(root)

## v2 — 250-player board
- Expanded the built-in master board to 250 players.
- Migrates users from the earlier ~60-player board while preserving matching favorites and draft status.
- Bumped the offline cache so installed Home Screen copies can receive the new app version.
