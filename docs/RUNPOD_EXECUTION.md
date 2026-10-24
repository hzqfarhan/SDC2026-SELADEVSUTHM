# RunPod E5 execution record

25 October 2026, Asia/Kuala_Lumpur. This record covers one direct Queue worker request using fictional text. The application gateway and Career Council require separate end-to-end verification.

## Completed request

The team-supplied [provider response](evidence/runpod-e5-completion.json) passed the application output validator against the original synthetic fixture. The accompanying own-account request-history screenshot is retained in the private submission evidence folder.

| Field | Observed value |
|---|---|
| Endpoint | `7ib627oev3kwlb` |
| Job | `abdc818d-4447-4171-95d1-adafa18b47ce-e2` |
| Status | `COMPLETED` |
| Worker | `bxd7e439wqr3xy` |
| Hardware label in dashboard | PRO 6000 MIG 24GB, US |
| Model | `intfloat/multilingual-e5-base` |
| Revision | `d128750597153bb5987e10b1c3493a34e5a4502a` |
| Returned device | `cuda` |
| Generated at | 25 October 2026, 03:11:44 MYT / 24 October 2026, 19:11:44 UTC |
| Provider execution time | 3,452 ms |
| Queue delay | 11,626 ms |
| Input | One fictional learner query and two authored role-description passages |

The query describes spreadsheet/SQL analysis and explaining charts. Returned raw cosine similarities were `0.858772` for `data-analyst` and `0.761758` for `cloud-support`. These are text-similarity values, not calibrated probabilities, proficiency scores or hiring-demand estimates. One small fixture is not a quality, fairness, throughput or representative latency benchmark. The six-role application route remains a separate integration check.

## Image build

The supplied build log confirms successful dependency installation and `pip check`, download of ten model snapshot files, nine passing offline worker tests, image construction and registry upload.

- Source commit identified by image tag: `f98dd67e3`.
- Root build recipe: `Dockerfile.e5`.
- Registry image: `registry.runpod.net/hzqfarhan-sdc2026-seladevsuthm-main-dockerfile-e5:f98dd67e3`.
- Exported OCI manifest: `sha256:785d8fdafb55c1fff52c68f14fb9b3b643dabc78034134e0efe7a2db7ec7c08e`.
- Registry upload finished at 03:07:20 MYT on 25 October 2026; log-reported image size 4.70 GB.

The exported OCI digest was read from build output; it has not been independently retrieved from the registry. The builder's missing-Git warning concerns embedded source provenance and did not prevent build/upload. The pinned source, model revision and actual receipt remain separately recorded. Weights are not included in the source package.

## Reproduce

Use the exact worker contract in [RUNPOD_WORKER.md](RUNPOD_WORKER.md). Send an explicitly confirmed synthetic fixture to a Queue endpoint built from the reviewed recipe. Preserve the full completed response, model/revision, device, execution and delay metadata. Never include a provider API key in evidence. For application-level validation, configure the Replit server and run `scripts/smoke-cloud.mjs --run-cloud-job` with the private demo access code in the server environment.

The separate Qwen Career Council model has not yet been built or executed in the recorded evidence. Its four stages share one model and require four validated completion receipts.
