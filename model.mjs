export const VOICES = ['Wood', 'Bell', 'Low', 'Tick'];
export function spread(steps, beats) {
  if (!Number.isInteger(steps) || steps < 3 || steps > 16 || !Number.isInteger(beats) || beats < 0 || beats > steps) throw new Error('Choose 3–16 steps and no more beats than steps.');
  return Array.from({length: steps}, (_, i) => (i * beats) % steps < beats);
}
export function rotate(hits, amount) {
  if (!Array.isArray(hits) || !hits.length || !Number.isInteger(amount)) throw new Error('Invalid rotation.');
  return hits.map((_, i) => hits[((i - amount) % hits.length + hits.length) % hits.length]);
}
export function ring(steps, beats, voice = 'Wood') { return {steps, hits: spread(steps, beats), voice}; }
export function initial() { return {version: 1, tempo: 108, rings: [ring(8, 3), ring(5, 2, 'Bell')]}; }
export function validate(value) {
  if (!value || value.version !== 1 || !Number.isInteger(value.tempo) || value.tempo < 40 || value.tempo > 200 || !Array.isArray(value.rings) || value.rings.length < 1 || value.rings.length > 4) throw new Error('This is not a valid Pulse Garden project.');
  const rings = value.rings.map(r => {
    if (!r || !Number.isInteger(r.steps) || r.steps < 3 || r.steps > 16 || !Array.isArray(r.hits) || r.hits.length !== r.steps || !r.hits.every(x => typeof x === 'boolean') || !VOICES.includes(r.voice)) throw new Error('A ring has invalid steps or sound.');
    return {steps: r.steps, hits: [...r.hits], voice: r.voice};
  });
  return {version: 1, tempo: value.tempo, rings};
}
export function eventsAt(project, tick) {
  if (!Number.isInteger(tick) || tick < 0) throw new Error('Tick must be a non-negative integer.');
  return project.rings.flatMap((r, index) => r.hits[tick % r.steps] ? [{ring: index, step: tick % r.steps, voice: r.voice}] : []);
}
export function cycleLength(project) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  return project.rings.reduce((n, r) => n * r.steps / gcd(n, r.steps), 1);
}
