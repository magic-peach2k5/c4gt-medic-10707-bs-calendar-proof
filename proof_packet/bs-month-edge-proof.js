const assert = require('node:assert/strict');
const bs = require('/Users/rahul/Desktop/CFGT/worktrees/cht-core-mini/node_modules/bikram-sambat');

function gregText(year, month, day) {
  return bs.toGreg_text(year, month, day);
}

function bsMonthRange(year, month) {
  const days = bs.daysInMonth(year, month);
  return {
    bs: `${year}-${String(month).padStart(2, '0')}`,
    days,
    adStart: gregText(year, month, 1),
    adEnd: gregText(year, month, days),
  };
}

function reportFilterQuery(range) {
  return {
    date: {
      from: `${range.adStart}T00:00:00.000Z`,
      to: `${range.adEnd}T23:59:59.999Z`,
    },
  };
}

function targetAggregateResetCase(range) {
  return {
    reportingPeriod: range.bs,
    intervalTag: range.bs.replace('-', '-BS-'),
    resetAt: range.adStart,
    closesAt: range.adEnd,
  };
}

const cases = [
  bsMonthRange(2080, 12),
  bsMonthRange(2081, 1),
  bsMonthRange(2081, 2),
  bsMonthRange(2081, 3),
];

assert.equal(cases[0].adEnd, '2024-04-12');
assert.equal(cases[1].adStart, '2024-04-13');
assert.equal(cases[1].adEnd, '2024-05-13');
assert.equal(cases[2].days, 32);
assert.equal(cases[2].adStart, '2024-05-14');
assert.equal(cases[2].adEnd, '2024-06-14');

const proof = cases.map((range) => ({
  ...range,
  reportsFilterExpected: reportFilterQuery(range),
  targetAggregatesExpected: targetAggregateResetCase(range),
}));

console.log(JSON.stringify({
  status: 'pass',
  sourcePackage: 'cht-core-mini/node_modules/bikram-sambat',
  sourcePaths: [
    'webapp/src/js/enketo/widgets/bikram-sambat-datepicker.js',
    'webapp/src/ts/modules/reports/reports-sidebar-filter.component.ts',
    'webapp/src/ts/services/target-aggregates.service.ts',
    'webapp/src/ts/services/calendar-interval.service.ts',
  ],
  cases: proof,
}, null, 2));
