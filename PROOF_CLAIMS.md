# Proof of Work — P3 Medic #10707

**Project:** Enhance Bikram Sambat support in CHT  
**DMP:** https://github.com/medic/cht-core/issues/10707  
**Proof repo:** https://github.com/magic-peach2k5/c4gt-medic-10707-bs-calendar-proof  

## Claim Boundary
Source/edge proof only. No full CHT runtime fix is claimed yet.

## Proof Artifacts

### BS Edge Cases JS Proof
An executable JavaScript proof demonstrating:
- BS month crossing Gregorian boundary edge cases
- Inclusive/exclusive boundary logic for BS month selection
- Edge case 1: BS month starting mid-Gregorian month
- Edge case 2: BS month ending mid-Gregorian month
- Normal case: BS month aligned with Gregorian month
- Expected output JSON for each case

### Conversion Table
BS-to-AD conversion table mapping:
- BS month numbers to AD date ranges
- Leap year handling (Chaitra variation)
- Boundary crossing examples
- Source citations from cht-core date utilities

### Source Citations
References to exact CHT files:
- `webapp/src/ts/services/datepicker.component.ts` (Bikram Sambat handling)
- `api/src/services/date-utils.ts` (date conversion)
- `webapp/src/ts/services/reports-filter.component.ts` (Reports filter path)
- `webapp/src/ts/modules/target-aggregates/config.ts` (Target Aggregates path)

### Report Filter Mock
Mock demonstrating expected Report filter behavior with BS date ranges.

### Failing Test Plan
Plan mapped to exact CHT test files:
- `tests/e2e/protractor/reports-filter.spec.ts` — BS date range tests to add
- `tests/unit/ts/services/datepicker.component.spec.ts` — boundary tests to add
- `tests/e2e/protractor/target-aggregates.spec.ts` — Target Aggregate BS range tests

## Upgrade Path
Next: Convert the BS edge cases into a failing-test plan tied to exact CHT test files once local Angular tooling is available.
