# Pulse Garden

Create repeating rhythms with independently sized step rings and a shared tempo.

## Run

No installation or build. Run `python -m http.server 8000` in this folder, then open http://localhost:8000. Press **Play** and toggle a numbered dot: edits keep the rhythm playing. All controls also work with Tab and Enter/Space.

Use one to four rings, 3–16 steps each, four sounds, and a shared tempo. **Sound & pattern** reveals its sound, rotation, even spreading, clearing and removal controls. Ring lengths and beat dots stay visible. Expanded controls stay open while editing. Changing a ring's size redistributes its beat count; **Undo** restores the previous arrangement. Beat, ring, sound and tempo edits take effect during playback on the next scheduled pulse (the look-ahead is up to 80 ms). Undo, reset and opening a project stop playback; they never start restored material. An edit during a pending initial audio start cancels that start. Every dot advances on the same sixteenth-note pulse, so different lengths create repeating cross-rhythms.

Your pattern saves locally when browser storage is available. **Project & rhythm guide** contains editable JSON download/open and a recoverable reset. Imports are validated before replacing state. Undo holds 40 edits in this session. Audio stops when the tab hides; it never starts on load or restore.

## Verify

With Node 18 or newer, run `npm test`. Tests cover every legal beat distribution, circular rotation, independent ring scheduling, silence, project isolation and invalid input. Web Audio scheduling is browser-dependent; tests do not certify sound quality or physical output timing. There is no audio/MIDI export in this release.

## Originality and future depth

Original implementation inspired by the playful music making of **8-Bit Music**. This is a beat-ring instrument rather than a song arranger. Future possibilities, not shipped: per-ring accents, rhythmic challenges, sound design and exact audio export.
