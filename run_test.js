// Simple Node test runner for calc module
const Calc = require('./calc.js');

const total = 137;
const attended = 104; // from screenshot
const attendSpecial = true; // (+2%)
const mandatoryCount = 3; // 18,19,21

const attendedAdj = attended + (attendSpecial ? (2/100)*total : 0);

console.log('Test run — total:', total, 'attended:', attended, 'attendSpecial:', attendSpecial);

const r85 = Calc.calculateSessionsMode(attendedAdj, total, 85);
const r75 = Calc.calculateSessionsMode(attendedAdj, total, 75);

// Mirror script.js logic: compute available clickable days and missable pool
const availableDays = [4,5,6,8,9,10,11,12,13,15,16,17,18,19,20];
const itDates = [15,16,17];
const mandatoryDates = [18,19,21];
const isIT = true;
const mandatoryWithinAvailable = availableDays.filter(d => mandatoryDates.includes(d) || (isIT && itDates.includes(d))).length;
const missablePool = Math.max(0, availableDays.length - mandatoryWithinAvailable);

const r85FullAdj = Math.max(0, Math.min(r85.full, missablePool));
const r85HalfAdj = Math.max(0, Math.min(r85.half, missablePool * 2));
const r75FullAdj = Math.max(0, Math.min(r75.full, missablePool));
const r75HalfAdj = Math.max(0, Math.min(r75.half, missablePool * 2));

console.log('Results (sessions mode), after capping to missable pool:');
console.log('availableDays length', availableDays.length, 'mandatoryWithinAvailable', mandatoryWithinAvailable, 'missablePool', missablePool);
console.log('>=85% => full days:', r85FullAdj, ', half-days:', r85HalfAdj);
console.log('>=75% => full days:', r75FullAdj, ', half-days:', r75HalfAdj);
