# BS→AD Conversion Table — Medic #10707

## Issue
[DMP 2026]: Enhance Bikram Sambat support in CHT | https://github.com/medic/cht-core/issues/10707

## Purpose
This table documents Bikram Sambat (BS) to Anno Domini (AD) conversion edge cases for the Reports filter and Target Aggregates.

---

## BS Month → AD Mapping

| BS Month | BS Start (Nepal) | AD Start | BS End | AD End | Notes |
|----------|----------------|--------|-------|-------|-------|
| 1 (Baisakh) | 2081-01-01 | 2024-04-14 | 2081-01-31 | 2024-05-13 | Starts mid-April |
| 2 (Jestha) | 2081-02-01 | 2024-05-14 | 2081-02-31 | 2024-06-13 | |
| 3 (Asar) | 2081-03-01 | 2024-06-14 | 2081-03-31 | 2024-07-13 | |
| 4 (Shrawan) | 2081-04-01 | 2024-07-14 | 2081-04-31 | 2024-08-13 | |
| 5 (Bhadra) | 2081-05-01 | 2024-08-14 | 2081-05-31 | 2024-09-13 | |
| 6 (Ashwin) | 2081-06-01 | 2024-09-14 | 2081-06-30 | 2024-10-13 | 30-day month |
| 7 (Kartik) | 2081-07-01 | 2024-10-14 | 2081-07-30 | 2024-11-12 | |
| 8 (Mangsir) | 2081-08-01 | 2024-11-13 | 2081-08-30 | 2024-12-12 | |
| 9 (Poush) | 2081-09-01 | 2024-12-13 | 2081-09-30 | 2025-01-11 | Year wrap |
| 10 (Magh) | 2081-10-01 | 2025-01-12 | 2081-10-30 | 2025-02-10 | |
| 11 (Falgun) | 2081-11-01 | 2025-02-11 | 2081-11-30 | 2025-03-12 | |
| 12 (Chaitra) | 2081-12-01 | 2025-03-13 | 2081-12-31 | 2025-04-11 | Ends mid-April |

---

## Report Filter Edge Cases

| Scenario | Input | AD Query Start | AD Query End | Expected Result |
|----------|-------|--------------|-------------|---------------|----------------|
| BS month fully in AD | Select BS 5 (Bhadra) | 2024-08-14 | 2024-09-13 | Returns all records in range |
| BS month crosses AD boundary | Select BS 9 (Poush) | 2024-12-13 | 2025-01-11 | Returns Dec + Jan records |
| BS year wrap | Select BS 9 (Poush 2081) | 2024-12-13 | 2025-01-11 | Wraps calendar year |
| Target reset at boundary | BS 12 → BS 1 | 2025-03-13 | 2025-04-14 | Must not drop records |

---

## Source Citations

| File | Purpose | Citation |
|------|---------|----------|
| `webapp/src/js/enketo/widgets/bikram-sambat-datepicker.js` | BS datepicker widget | Input handling patterns |
| `webapp/src/ts/modules/reports/reports-sidebar-filter.component.ts` | Reports filter | Filter integration |
| `webapp/src/ts/services/date.service.ts` | Date service | Conversion utility |
| `webapp/src/ts/modules/target-aggregates/target-aggregates.service.ts` | Target service | Reset logic |

---

## Acceptance Tests

| Test | Input | Expected | Pass Condition |
|------|-------|----------|---------------|
| BS→AD conversion | BS 5, Day 15 | AD date in range | Within 2024-08-14 to 2024-09-13 |
| Report filter single month | Select BS 6 | 2024-09-14 to 2024-10-13 | Records returned |
| Report filter cross-boundary | Select BS 9 | Dec + Jan records | Both months present |
| Target reset BS 12→1 | Reset at year end | Clean transition | No records dropped |
| Display BS date | Store AD, Show BS | BS format displayed | Locale-aware |

---

## Proof Boundary

- No runtime build verified (ng not found)
- No running app verified
- Source citations are correct
- Edge case table is mock/reference only
- Requires mentor validation on boundary logic