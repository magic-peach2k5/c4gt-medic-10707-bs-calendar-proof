# Report Filter Mock — Medic #10707

## Issue
[DMP 2026]: Enhance Bikram Sambat support in CHT | https://github.com/medic/cht-core/issues/10707

## Purpose
Demonstrate BS month selection → AD query range → report behavior for reviewers.

---

## Text Wireframe

```
┌─────────────────────────────────────────────────────┐
│ [Reports Filter]                                    │
│                                                     │
│ Calendar: [Bikram Sambat ▼]                          │
│                                                     │
│ Month:  [Poush 2081 ▼]                             │
│         (Month 9 - crosses Gregorian year)         │
│                                                     │
│ ──────────────────────────────────────────────────── │
│                                                     │
│ Query Range Preview:                                │
│   AD Start: 2024-12-13                              │
│   AD End:   2025-01-11                              │
│                                                     │
│ This query includes:                                 │
│   ✓ December 2024 records                           │
│   ✓ January 2025 records                            │
│                                                     │
│ ──────────────────────────────────────────────────── │
│                                                     │
│ [Apply Filter]  [Clear]                             │
└─────────────────────────────────────────────────────┘
```

---

## Edge Case Behavior

| BS Month Selected | AD Start | AD End | Includes |
|------------------|-----------|--------|----------|
| Baisakh (1) | 2024-04-14 | 2024-05-13 | April + May |
| Jestha (2) | 2024-05-14 | 2024-06-13 | May + June |
| ... | ... | ... | ... |
| Poush (9) | 2024-12-13 | 2025-01-11 | Dec + Jan |
| Magh (10) | 2025-01-12 | 2025-02-10 | Jan + Feb |
| Chaitra (12) | 2025-03-13 | 2025-04-11 | Mar + April |

---

## Report Behavior

When BS month crosses Gregorian year boundary:

1. Query uses `start_date` and `end_date` in AD
2. Both December and January records returned
3. Report aggregates include both months
4. No records dropped at boundary

---

## Source Files Referenced

- `webapp/src/ts/modules/reports/reports-sidebar-filter.component.ts`
- `webapp/src/ts/services/date.service.ts`
- `webapp/src/js/enketo/widgets/bikram-sambat-datepicker.js`

---

## Proof Boundary

This is a **proposal-facing mock** - shows expected UI behavior, not running CHT verification.

**What's NOT Verified:**
- No runtime CHT build (`ng` not found)
- No running app
- No live report generation