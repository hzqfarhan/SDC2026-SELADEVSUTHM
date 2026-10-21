# SHIFTATLAS data provenance

## Labour snapshot

Publisher: Department of Statistics Malaysia (DOSM), OpenDOSM. Dataset: [Quarterly Principal Labour Force Statistics by State](https://open.dosm.gov.my/data-catalogue/lfs_qtr_state). Direct machine-readable source: [lfs_qtr_state.csv](https://storage.dosm.gov.my/labour/lfs_qtr_state.csv). These are public official data; no API key or account authentication is required.

Retrieved at **2026-10-19T15:56:45.093Z**. At retrieval the CSV's latest complete period was **2026 Q2**, encoded as **2026-04-01**, and included all **16 states and federal territories**. The catalogue reported a last update of **11 August 2026, 12:00**, and next scheduled update of **11 November 2026, 12:00**. A retrieval timestamp is not a new statistical release date. This is a quarterly snapshot, not live employment data.

`public/data/labour.json` retains these source fields without interpolation:

| JSON field | CSV column | Unit |
|---|---|---|
| `state` | `state` | Official state / federal territory name |
| `unemploymentRate` | `u_rate` | Percent of labour force unemployed |
| `participationRate` | `p_rate` | Percent of working-age population (15–64) in labour force |
| `employedThousands` | `lf_employed` | Thousand persons |
| `labourForceThousands` | `lf` | Thousand persons |

For example, Johor's `employedThousands: 2143.1` means **2,143,100 persons**, not 2,143 persons. Its unemployment rate is **2.3%**, not a fractional value of 0.023. The data arise from the Labour Force Survey; independently rounded figures can differ slightly from their totals. The catalogue licenses this dataset under **CC BY 4.0**; retain attribution to DOSM.

The snapshot has no missing values in its four numeric metrics. Refresh validation rejects blanks, invalid numbers, unexpected states, duplicate state/quarter keys, and out-of-range rates. No replacement or invented values are supplied.

The snapshot's `sha256` is the SHA-256 digest of the **entire downloaded raw CSV byte stream**, not of the derived JSON:

```text
e69b08f55916ff86e2376fd8c4b221be6bd037969f2229f5bcee379eb50898f1
```

## Geographic boundaries

Source: DOSM's [official state boundary GeoJSON](https://raw.githubusercontent.com/dosm-malaysia/data-open/main/datasets/geodata/administrative_1_state.geojson), in the [dosm-malaysia/data-open repository](https://github.com/dosm-malaysia/data-open).

`public/data/malaysia-states.geojson` is a byte-for-byte copy downloaded on **19 October 2026**. It is 391,521 bytes, containing 16 MultiPolygon features. The source specifies CRS84: coordinates are **longitude, latitude** in degrees. No fabricated positions, boundary simplification, or coastline smoothing have been applied. Ring coordinates, islands, holes, and source topology are retained. Any display projection or extrusion is a presentation transformation, not an alteration of the source geometry. The file does not declare a boundary reference date; its download date must not be presented as that date.

Join each labour row's `state` to a GeoJSON feature's `properties.state`. All 16 join keys match exactly; preserve names including `W.P. Kuala Lumpur`, `W.P. Labuan`, and `W.P. Putrajaya`. `properties.code_state` gives official numeric codes 1–16. Original boundary-file SHA-256:

```text
538f9301431c9f4a7c9262b419c9f6705fdfc57275aedf44c7bbbd7aff748587
```

## Refresh and validation

From the app directory, run with Node.js 20 or later:

```sh
node scripts/refresh-labour.mjs
```

The optional `--as-of=2026-10-19` sets a quarter-end cutoff. It is not a historical vintage query: the live source may contain later revisions to earlier periods. The refresh fetches only the official source, checks all source columns, numbers, duplicate keys, and geometry/join keys, and selects the latest fully ended quarter with all 16 states. A partial latest quarter is skipped; the selected period is always recorded explicitly. Source/network/validation failure exits with an error and leaves the existing snapshot intact. Successful validation writes a temporary file beside the dataset and atomically renames it over the prior snapshot. Boundary data remain pinned to the checked-in official file.

Verified on 19 October 2026: a live refresh succeeded; all 16 joins and quarter selection passed; malformed numeric values, an invented state, and a duplicate source row were each rejected. A historical quarter-end cutoff excluded later quarters.

## Interpretation limits

These observations describe states and federal territories. They are **not city, district, postcode, industry, occupation, job-vacancy, or individual employment observations**. Do not infer those finer details from the choropleth, map height, or state comparisons. Federal territories appear because they are explicitly present in the source. Map extrusion represents a selected statistical metric, not terrain or building height. Participation and unemployment percentages have different denominators and must not be added. This snapshot does not include a time series; it cannot support claims of rising/falling employment or a trend unless additional source periods are explicitly incorporated.
