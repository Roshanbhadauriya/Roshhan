# Faster first load: HolaLoader and hero photos

Status: implemented and verified on the working tree of `main` (not committed).

## What we're building and why

On first visit the site shows `HolaLoader` (the "HOLA" water-fill screen)
before any content appears. The owner reported that it takes too long. We
found two causes in the code:

1. **The loader runs on a fixed timer.** Progress goes up by 1% every 45 ms, so
   it can never finish in less than 4.5 s. After that it holds for 0.6 s.
   `App.jsx` then fades the loader out (0.6 s) and only then fades the site in
   (0.6 s), because `AnimatePresence mode="wait"` runs the two one after the
   other. That makes about **6.3 s minimum on every visit**, even when
   everything is already cached.
2. **The loader waits for 11.6 MB of photos.** It preloads three photos:
   - `Roshan.JPG`: 4.3 MB, 5712×4284
   - `prize.JPG`: 7.1 MB, 6000×4000
   - `me2.jpg`: 0.16 MB

   The first two are straight-from-camera files. In `ImageCollage` they are
   shown at about 300 CSS px wide. On a 20 Mbps connection 11.6 MB takes about
   4.6 s, so on slower networks the photos, not the timer, set how long the
   loader takes. There was also no time limit: if a photo request hung, the
   loader never finished.

## Decisions

1. **Progress is driven by elapsed time, not a tick count.** Progress is
   calculated from `performance.now()` on each 50 ms tick. Each tick reads
   the real elapsed time, so a slowed or late timer can't stretch out the fill.
   If a tab is in the background, the bar has usually reached 100% by the time
   the visitor switches to it. The old tick counter only advanced when a tick
   actually ran. (The fade from the loader to the site still needs the tab to
   be visible. See "Background tabs" below.)
2. **Minimum display of 1.2 s (`MIN_DISPLAY_MS`).** The fill animation still
   plays in full and the screen doesn't just flash. This is the one setting
   that controls how long the loader lasts. Rejected: removing the loader
   entirely. It is a deliberate part of the site's design, and the owner asked
   for faster, not gone.
3. **Hard cap of 4 s (`MAX_WAIT_MS`).** If the photos haven't loaded by then,
   the loader finishes anyway and the photos keep loading in the page.
   Rejected: waiting for photos with no limit (the old behaviour), which can
   leave a slow or failing connection stuck on the loader.
4. **Progress stops at 90% until the photos are ready (or the cap passes).**
   The bar stays honest: it doesn't show 100% while it is still waiting.
5. **Shorter hand-off.** The hold after 100% goes from 600 ms to 200 ms. In
   `App.jsx` the loader fade-out and the site fade-in each go from 0.6 s to
   0.35 s. The two fades still run one after the other (`mode="wait"`), so the
   transition looks the same, only quicker.
6. **Resized photos are added as new files and the originals are left alone.**
   - The new files are WebP (quality 82), with the short side at 800 px, about
     2.6× the size they are shown at.
   - The camera's rotation flag is applied first (`exif_transpose`), because
     `Roshan.JPG` carries orientation tag 6.
   - `HolaLoader` and `ImageCollage` both import the new files, so the preload
     warms the same files the collage shows.
   - The original `.JPG` files are no longer imported anywhere, so they are left
     out of the build. They stay in the repo until the owner decides to delete them.

## Not changed here (shared code; waiting for the owner's decision)

- **Radix Themes CSS.**
  - `src/index.css` imports `@radix-ui/themes/styles.css`, and `main.jsx` wraps
    the app in `<Theme>`.
  - The only component using Radix Themes is `Intro.jsx`, which is commented
    out in `Layout`.
  - The stylesheet is 716 KB raw, but only **89 KB gzipped**, which is what
    visitors download from a host that compresses files.
  - The win is real but smaller than the raw size suggests. Removing it could
    change fonts and colours across the site and needs a visual check.
- **The JavaScript file is 999 KB raw, 290 KB gzipped.** Loading the
  `/projects` and `/gadgets` pages only when visited would shrink it.
- **Hero entrance delays.**
  - `Hero2` and `ImageCollage` start their entrance animations 1.9–2.1 s after
    the page appears.
  - That is designed behaviour, but it adds to how long the page feels like it
    takes to load.
- **Google Fonts.** The fonts are pulled in by an `@import` inside the CSS.
  Moving that to a `<link>` in `index.html` would let them start downloading
  sooner.

## Edge cases

| Case | Handling |
| --- | --- |
| Photos already cached | Ready at once; the loader still shows for the 1.2 s minimum. |
| A photo fails to load | Counted as ready (same as before), so the loader can't get stuck. |
| A photo request never finishes | The 4 s cap passes and the loader finishes. Tested: the site appeared at 6.3 s with both photos held forever. |
| Tab in the background (timers slowed, animation frames paused) | Progress uses real elapsed time, so the bar is usually at 100% when the tab is opened. The 0.75 s hand-off (0.2 s hold plus two 0.35 s fades) then runs once the tab is visible. |
| Component unmounts mid-load | Every interval and timeout is cleared in its effect's cleanup. |
| React StrictMode runs effects twice in dev | Cleanups clear the first run's timers; `onComplete` is guarded so it fires at most once. |
| `onComplete` prop changes identity between renders | It is held in a ref, so the completion timer is not reset. |

## Open questions

- Remove Radix Themes? Owner: Roshan. It saves about 89 KB gzipped and needs a
  side-by-side visual check.
- Delete the original `Roshan.JPG` and `prize.JPG` from `src/assets`? Owner: Roshan.
- Shorten the hero entrance delays (1.9–2.1 s)? Owner: Roshan.

## What was verified

All checks were run on 2026-11-16, on the `main` working tree (uncommitted), on
Windows with Node 22.13 and Chrome. "Before" means the `HEAD` commit `eca664a`,
built in a temporary worktree.

**Time to first content: from navigation start until the hero text "FULL STACK DEVELOPER" is on screen**

Measured with headless Chrome driven over the DevTools Protocol, browser cache
disabled, against production builds served by `vite preview`. The measuring
script was a scratch file and is not committed.

| Network | Before | After |
| --- | --- | --- |
| No throttling (2 runs) | 7.41 s, 7.29 s | 3.21 s, 3.22 s |
| 20 Mbps, 40 ms latency | 9.20 s | 3.24 s |
| 5 Mbps, 40 ms latency | 23.91 s | 3.67 s |
| No throttling, both collage photos never load | (would wait forever) | 6.29 s |

- About 1.1 s of each figure is outside the loader in both builds: downloading
  and starting the JavaScript, plus first render.
- With no throttling, the 4.1 s drop matches the 4.2 s of fixed waiting the
  timing change removed (6.3 s → 2.1 s).

**Data downloaded by the time the hero appeared (with no throttling)**

- Before: about 14.8 MB.
- After: about 3.75 MB.

**Images**

- `Roshan.JPG`: 4.3 MB at 5712×4284 → `roshan-collage.webp`: 86 KB at
  800×1067. The camera rotation flag was applied, so the photo is upright.
- `prize.JPG`: 7.1 MB at 6000×4000 → `prize-collage.webp`: 59 KB at 1200×800.
- `dist/assets` no longer contains either `.JPG`.
- A screenshot of the hero after load shows all three collage photos upright and
  cropped as before.

**Lint and build**

- `npx eslint` reports no errors on `HolaLoader.jsx` or `App.jsx`.
- `ImageCollage.jsx` has 2 errors (`react-hooks/refs`) and 1 warning. The
  `HEAD` version of the file has the same 3, so these existed before.
- `npm run build` passes.

**Background tabs**

- In a fully hidden pane, `requestAnimationFrame` doesn't run at all.
- Framer Motion's fade from the loader to the site needs it, so neither the old
  nor the new build shows the site until the tab becomes visible.
- This is unchanged by this work and is expected browser behaviour.

**Incident during verification (no effect on tracked files)**

- **What happened:** removing the temporary baseline worktree with
  `git worktree remove --force` followed a directory junction pointing at the
  real `node_modules` and deleted some of its packages.
- **Impact:** no tracked file or `package-lock.json` was affected.
- **Recovery:** `npm ci` restored all 314 packages from the lockfile, after
  which `npm ls` was clean and `npm run build` passed.
- **Lesson:** remove junctions with `rmdir` (which deletes only the link)
  before deleting a folder that contains them.
