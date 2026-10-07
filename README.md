# Pulse Garden

Plant beats in rings of different lengths and hear the patterns meet in unexpected ways.

## Run

No installation or build. Run `python -m http.server 8000` in this folder, then open http://localhost:8000. Press **Play** and toggle a numbered dot. All controls also work with Tab and Enter/Space.

Use one to four rings, 3–16 steps each, four sounds, and a shared tempo. Rotate a ring, spread its current beat count evenly, or clear it. Changing a ring's size redistributes its beat count; **Undo** restores the previous arrangement. Edits stop playback. Every dot advances on the same sixteenth-note pulse, so different lengths create repeating cross-rhythms.

Your pattern saves locally when browser storage is available. **Keep it & explore** contains editable JSON download/open and a recoverable reset. Imports are validated before replacing state. Undo holds 40 edits in this session. Audio stops when the tab hides; it never starts on load or restore.

## Verify

With Node 18 or newer, run `npm test`. Tests cover every legal beat distribution, circular rotation, independent ring scheduling, silence, project isolation and invalid input. Web Audio scheduling is browser-dependent; tests do not certify sound quality or physical output timing. There is no audio/MIDI export in this release.

## Originality and future depth

Original implementation inspired by the playful music making of **8-Bit Music**. This is a beat-ring instrument rather than a song arranger. Future possibilities, not shipped: per-ring accents, rhythmic challenges, sound design and exact audio export.
