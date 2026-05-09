# Medic #10707 - Bikram Sambat Calendar

C4GT 2026 reviewer proof packet.

## What This Proof Shows

- BS month-boundary edge proof and output JSON
- BS/AD conversion table and report filter mock
- source-grounded runtime conversion proof
- date-flow, edge-case, and prototype screenshots

## What This Proof Does Not Claim

- no full CHT runtime fix
- no merged upstream PR
- no production deployment

## Files To Inspect

- `proof_packet/bs-month-edge-proof.js`
- `proof_packet/bs-month-edge-proof-output.json`
- `proof_packet/bs-ad-conversion-table.md`
- `proof_packet/screenshots/`

## Next Upgrade

Convert edge cases into failing CHT tests once Angular tooling is available.

## Boundary

This repo is application proof, not production code. Claims are limited to the artifacts listed above.
