import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, rename, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const SOURCE_URL = 'https://storage.dosm.gov.my/labour/lfs_qtr_state.csv';
export const CATALOGUE_URL = 'https://open.dosm.gov.my/data-catalogue/lfs_qtr_state';
export const STATES = ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Pulau Pinang', 'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Sabah', 'Sarawak', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'];
const COLUMNS = ['date', 'state', 'lf', 'lf_employed', 'lf_unemployed', 'lf_outside', 'p_rate', 'u_rate'];
const ROOT = fileURLToPath(new URL('../', import.meta.url));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseCsv(text) {
  const result = [];
  let row = [], cell = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some(value => value !== '')) result.push(row);
      row = []; cell = '';
    } else cell += ch;
  }
  assert(!quoted, 'Unclosed quoted CSV field');
  if (cell || row.length) { row.push(cell); result.push(row); }
  return result;
}

export function validateBoundaries(geo) {
  assert(geo.type === 'FeatureCollection' && geo.features?.length === 16, 'Expected exactly 16 boundary features');
  const names = new Set();
  for (const feature of geo.features) {
    const state = feature.properties?.state;
    assert(STATES.includes(state) && !names.has(state), `Unknown/duplicate boundary state: ${state}`);
    names.add(state);
    assert(['Polygon', 'MultiPolygon'].includes(feature.geometry?.type), `Invalid geometry: ${state}`);
    const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
    assert(polygons.length > 0, `Empty geometry: ${state}`);
    for (const polygon of polygons) {
      assert(polygon.length > 0, `Empty polygon: ${state}`);
      for (const ring of polygon) {
        assert(ring.length >= 4, `Degenerate ring: ${state}`);
        assert(ring[0][0] === ring.at(-1)[0] && ring[0][1] === ring.at(-1)[1], `Unclosed ring: ${state}`);
        for (const point of ring) assert(point.length >= 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && point[0] >= 99 && point[0] <= 120 && point[1] >= 0 && point[1] <= 8, `Invalid Malaysian longitude/latitude: ${state}`);
      }
    }
  }
  return names;
}

export function buildDataset(bytes, geo, asOf = new Date().toISOString().slice(0, 10), retrievedAt = new Date().toISOString()) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(asOf) && !Number.isNaN(Date.parse(asOf)) && new Date(asOf).toISOString().slice(0, 10) === asOf, 'Invalid as-of date');
  const boundaryNames = validateBoundaries(geo);
  const records = parseCsv(Buffer.from(bytes).toString('utf8'));
  const header = records.shift();
  assert(header?.length === COLUMNS.length && COLUMNS.every(name => header.includes(name)), 'Unexpected source CSV schema');
  const byPeriod = new Map();
  for (const record of records) {
    assert(record.length === header.length, 'CSV row length does not match header');
    const row = Object.fromEntries(header.map((name, index) => [name, record[index]]));
    assert(/^\d{4}-(01|04|07|10)-01$/.test(row.date), `Invalid quarter date: ${row.date}`);
    assert(STATES.includes(row.state) && boundaryNames.has(row.state), `Unknown state/join key: ${row.state}`);
    for (const name of COLUMNS.slice(2)) {
      assert(/^\d+(\.\d+)?$/.test(row[name]), `Missing/non-numeric ${name}: ${row.state}, ${row.date}`);
      row[name] = Number(row[name]);
      assert(Number.isFinite(row[name]) && row[name] >= 0, `Invalid ${name}: ${row.state}`);
    }
    assert(row.p_rate <= 100 && row.u_rate <= 100 && row.lf > 0 && row.lf_employed <= row.lf + 0.11, `Out-of-range metric: ${row.state}`);
    assert(Math.abs(row.lf_employed + row.lf_unemployed - row.lf) <= 0.21, `Inconsistent labour totals: ${row.state}`);
    if (!byPeriod.has(row.date)) byPeriod.set(row.date, new Map());
    const quarter = byPeriod.get(row.date);
    assert(!quarter.has(row.state), `Duplicate state/quarter: ${row.state}, ${row.date}`);
    quarter.set(row.state, row);
  }
  const eligible = [...byPeriod.keys()].filter(date => {
    const endExclusive = new Date(date + 'T00:00:00Z');
    endExclusive.setUTCMonth(endExclusive.getUTCMonth() + 3);
    return endExclusive.toISOString().slice(0, 10) <= asOf && byPeriod.get(date).size === 16;
  }).sort();
  assert(eligible.length > 0, 'No complete published quarter with all 16 states before the as-of date');
  const date = eligible.at(-1);
  const selected = byPeriod.get(date);
  const rows = STATES.map(state => {
    const source = selected.get(state);
    assert(source, `Missing selected state: ${state}`);
    return { state, unemploymentRate: source.u_rate, participationRate: source.p_rate, employedThousands: source.lf_employed, labourForceThousands: source.lf };
  });
  return {
    retrievedAt,
    period: `${date.slice(0, 4)} Q${Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1}`,
    sourceUrl: SOURCE_URL,
    catalogueUrl: CATALOGUE_URL,
    granularity: 'State / federal territory',
    units: { unemploymentRate: '%', participationRate: '%', employedThousands: 'thousand persons', labourForceThousands: 'thousand persons' },
    rows,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
}

async function main() {
  const args = process.argv.slice(2);
  assert(args.length <= 1 && args.every(arg => /^--as-of=\d{4}-\d{2}-\d{2}$/.test(arg)), 'Usage: node scripts/refresh-labour.mjs [--as-of=YYYY-MM-DD]');
  const today = new Date().toISOString().slice(0, 10);
  const asOf = args[0]?.slice(8) ?? today;
  assert(asOf <= today, 'The as-of date must not be in the future');
  const output = resolve(ROOT, 'public/data/labour.json');
  const boundaries = JSON.parse(await readFile(resolve(ROOT, 'public/data/malaysia-states.geojson'), 'utf8'));
  const response = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(30000) });
  assert(response.ok, `DOSM download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const dataset = buildDataset(bytes, boundaries, asOf);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(resolve(ROOT, 'public/data/lfs_qtr_state.csv'), bytes);
  const temporary = `${output}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify(dataset, null, 2) + '\n', { flag: 'wx' });
    await rename(temporary, output);
  } finally { await rm(temporary, { force: true }); }
  console.log(`Updated ${dataset.period}; ${dataset.rows.length} matched states; CSV SHA-256 ${dataset.sha256}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(`Refresh failed; existing snapshot retained. ${error.message}`); process.exitCode = 1; });
}
