# Loxie

A word-guessing puzzle you can play in any browser. Pick a word length
(5–8 letters) and a familiarity level, then find the hidden word in 6 guesses
(7 for 7- and 8-letter words).

## Features

- 5, 6, 7 and 8-letter words with five familiarity levels, from *Familiar* to *Obscure*
- Every guess is checked against a ~170,000-word dictionary
- Challenge friends: share your emoji result grid with a link that loads the same word
- Relaxing lo-fi background music, composed live in the browser (toggle it in Options or with the ♪ button)
- Theme Studio: eight presets, a live preview, custom colors, and shareable theme codes
- Per-length statistics with streaks and a guess distribution
- Your game in progress is saved, so a reload picks up where you left off
- Works offline with a built-in list of everyday words (difficulty levels need a connection)

## Install on your phone

Loxie is a Progressive Web App. Open it over HTTPS (e.g. GitHub Pages), then:

- **Android / Chrome / Edge:** tap the download icon in the game's header, or *Install app* in the browser menu.
- **iPhone / iPad (Safari):** tap **Share**, then **Add to Home Screen**.

Once installed it opens full-screen like a regular app and works offline.

**Publishing updates:** when you release a change, bump the version in two places so
installed copies pick it up: `APP_VERSION` in `index.html` (shown in How to Play) and
`CACHE_VERSION` in `sw.js` (e.g. `1.0.0` → `1.0.1` and `loxie-1.0.0` → `loxie-1.0.1`).
If you add new files the game needs, add them to `APP_SHELL` in `sw.js` too.

## Running it

No build step. Open `index.html` in a browser, or serve the folder
(the offline/install features need `http://localhost` or HTTPS):

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

## Regenerating the dictionary

`valid-words.js` is generated from `words.txt`:

```sh
python process.py
```

## License and credits

Loxie is released under the [MIT License](LICENSE).
See [CREDITS.md](CREDITS.md) for the word list, icons and other third-party material.
