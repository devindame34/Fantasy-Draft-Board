# Fantasy Draft Board v6.0

A phone-first, offline-capable 2026 fantasy football draft board rebuilt for a 12-team, half-PPR, one-QB league. The source snapshot and news review are dated September 1, 2026.

## Default format

- 12 teams, snake draft
- 1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX, 1 K, 1 DST
- 5 bench spots; 16 total rounds
- Half-PPR rankings with ESPN/CBS PPR projections shown separately

All league-size, slot and roster inputs can be changed in Setup.

## What changed in v6.0

- Rebuilt the complete 250-player board instead of patching v5.
- Corrected every team field and supplied a projection for every entry.
- Restored relevant players missing from v5 and removed Tyreek Hill from the usable redraft pool.
- Re-audited all tags: 36 My Guys, 41 Sleepers and 24 Risky players.
- Separated Our Rank, market ADP, expert ranks and projections throughout the interface.
- Replaced the backwards “Will He Make It Back?” equation with a conditional ADP-survival model.
- Rebuilt Live Value around board rank, fall value, roster fit, positional scarcity, position-relative projection, market timing and tags.
- Suppressed K/DST and unnecessary second quarterbacks until the appropriate rounds.
- Added a complete Draft Log with pick numbers and one-tap corrections.
- Made backup imports retain v6 data while restoring draft status and settings.
- Migrates matching favorites and drafted status from v5 when hosted on the same origin.

## Board methodology

Our Rank is the curated decision layer. It reflects half-PPR scoring, a one-QB league, elite-TE priority, late RB/WR upside and deliberate risk discounts. ADP never overwrites it.

The reference baseline combines current ranks from [ESPN](https://www.espn.com/fantasy/football/story/_/id/48711830/2026-fantasy-football-rankings-ppr-field-yates), [CBS Sports](https://www.cbssports.com/fantasy/football/rankings/ppr/top200/) and [FantasyPros half-PPR ECR](https://www.fantasypros.com/nfl/rankings/half-point-ppr-cheatsheets.php). Displayed projections average the available [ESPN PPR projections](https://fantasy.espn.com/football/players/projections?leagueFormatId=3) and [CBS PPR projections](https://www.cbssports.com/fantasy/football/stats/RB/2026/season/projections/ppr/).

Market timing uses recent 12-team half-PPR ADP from [Fantasy Football Calculator](https://fantasyfootballcalculator.com/adp/half-ppr). `ADP~` means the stale market sample was adjusted for a material late news event. `ECR` means live ADP was too thin, so the app uses the expert consensus as a visibly labeled low-confidence proxy.

## “Will He Make It Back?”

The estimator treats the player’s market pick as a probability distribution centered on ADP and widened by the observed ADP standard deviation. It calculates:

`P(available at your next pick | available at the current pick)`

That conditional step matters when a player has already fallen. A small adjustment is applied when several players at the same position were selected in the previous six picks. The result is guidance—not certainty—and each detail sheet labels its data confidence.

## Live Value

Our Rank remains the largest component. Smaller, capped adjustments account for:

- How far the player has fallen past Our Rank
- Remaining starters, FLEX and bench spots
- Elite QB/TE scarcity in a one-QB format
- Projection strength relative to the same position
- ADP price and chance of surviving to your next pick
- My Guy, Sleeper, Risky and Favorite tags

Tap any player to see the complete Value breakdown.

## Using the app

1. Open Setup and choose the league size and your draft slot.
2. Mark every selection as Mine or Taken; the overall pick advances automatically.
3. Use Draft Log or Undo to correct mistakes.
4. Check Best For Me when deciding between similarly ranked players.
5. Export a backup before the draft if you want a second copy.

## Install with GitHub Pages

Upload every file in this folder to the root of a repository. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, then select `main` and `/ (root)`. Visit the published URL once while online; after that, the service worker keeps the board available offline and it can be added to an iPhone Home Screen.

## Files

- `index.html` — application shell
- `players.js` — audited 250-player snapshot
- `app.js` — draft state, recommendations and probability model
- `styles.css` — phone-first interface
- `manifest.json`, `sw.js`, icons — install and offline support

This is a static snapshot. Recheck major injury, suspension and depth-chart news immediately before the draft.
