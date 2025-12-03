window.addEventListener('DOMContentLoaded', () => {
	const el = id => document.getElementById(id);
	const q = sel => document.querySelector(sel);

	const totalDaysIn = el('totalDays');
	const percentIn = el('percent');
	const attendedIn = el('attendedSessions');
	const currentAttendanceQuick = el('currentAttendanceQuick');
	const calcBtn = el('calcBtn');
	const resetBtn = el('resetBtn');
	const results = el('results');
	const explain = el('explain');
	const percentDisplay = el('percentDisplay');
	const percentWarning = el('percentWarning');
	const absentFullIn = el('absentFull');
	const absentHalfIn = el('absentHalf');

// Important dates for December (strictly mandatory: 18,19,21)
const mandatoryDates = [18, 19, 21]; // 21 is Annual Day (mandatory, Sunday but with attendance)
const itDates = [15, 16, 17];
const ptmDate = 6;
const sundays = [7, 14]; // Sundays (no classes) — 21 is Sunday but mandatory for Annual Day, so not here
const pastDays = [1, 2, 3]; // Already passed (today is 3rd)
const schoolClosed = [22, 23, 25, 26, 28, 29, 31]; // School closed (not 24, 27, 30 which are preboard exams)
const preboardExamDays = [24, 27, 30]; // Preboard exam days

// Track which days user has marked as "planned to attend" (interactive calendar state)
// Default: weekdays from 4-21 (include 18,19,21 as working by default; user can toggle them off)
const plannedDays = new Set([4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21]);

	function getType(){ const r = document.querySelector('input[name=type]:checked'); return r ? r.value : 'it'; }

	function floorOrZero(v){ return Math.max(0, Math.floor(v)); }

	function calculatePercentMode(basePercent, threshold, deduct){
		const diff = basePercent - threshold;
		if(diff < 0) return 0;
		return Math.floor(diff / deduct);
	}

	function calculateSessionsMode(attended, total, threshold){
		// Need (attended - misses) / total *100 >= threshold
		// misses <= attended - threshold/100 * total
		const allowed = attended - (threshold/100) * total;
		if(allowed < 0) return {full:0, half:0};
		return { full: Math.floor(allowed), half: Math.floor(allowed / 0.5) };
	}

	function calc(){
		const total = parseFloat(totalDaysIn.value) || 0;
		const isIT = getType() === 'it';
		const attendSpecial = el('attendSpecial').checked;
		// Effective special attendance: only grant +2% if user keeps all special days (18,19,21) planned
		const attendSpecialEffective = attendSpecial && mandatoryDates.every(d => plannedDays.has(d));

		// For IT students, 15-17 are always mandatory (no checkbox option)
		// Derive attended sessions and percent
		let percent = parseFloat(percentIn.value);
		let attended = parseFloat(attendedIn.value);
		if(Number.isNaN(percent)) percent = null;
		if(Number.isNaN(attended)) attended = null;

		// If percent provided but not attended, compute attended
		if(attended == null && percent != null && total > 0){
			attended = (percent/100) * total;
		}
		if(attended == null) {
			explain.innerHTML = '<strong>Sessions mode:</strong> please provide either percent or attended sessions.';
			results.classList.remove('hidden');
			return;
		}

		// Apply +2% for attending 18/19/21 by increasing attended count equivalent
		// Convert +2% into sessions: sessionsEquivalent = 2% * total / 100
		let attendedAdj = attended;
		if(attendSpecialEffective) attendedAdj += (2/100) * total;

		// Use Calc module if available (shared logic), otherwise fall back to local functions

		// Calculate allowed misses from INPUT attended/percent, not projected
		const inputPercent = total>0 ? ((attended/total)*100) : 0; // percent based on input attended
		
		const fullDeduct = 0.8; // percent per full day
		const halfDeduct = 0.5; // percent per half day
		const margin85 = inputPercent - 85;
		const margin75 = inputPercent - 75;
		const r85Calc = { full: margin85>0 ? Math.floor(margin85 / fullDeduct) : 0, half: margin85>0 ? Math.floor(margin85 / halfDeduct) : 0 };
		const r75Calc = { full: margin75>0 ? Math.floor(margin75 / fullDeduct) : 0, half: margin75>0 ? Math.floor(margin75 / halfDeduct) : 0 };

		// Determine available clickable days for Dec (same list used later)
		// Include 18, 19, 21 as working days by default (user can toggle them off)
		const availableDays = [4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21];
		// Count mandatory days that fall within availableDays (including IT mandatory 15-17)
		const mandatoryWithinAvailable = availableDays.filter(d => mandatoryDates.includes(d) || (isIT && itDates.includes(d))).length;
		const missablePool = Math.max(0, availableDays.length - mandatoryWithinAvailable);

		// Deselected days count
		const N = availableDays.length; // future days considered
		const plannedCount = availableDays.filter(d => plannedDays.has(d)).length;
		const missedDays = N - plannedCount; // days not planned to attend

		// Projected percent using (finalPresent / finalTotal) method
		// finalPresent = attended so far + planned to attend
		const finalPresent = (attended || 0) + plannedCount;
		const finalTotal = total + N;
		// Base projected percent (without special +2%)
		const projectedBasePercent = finalTotal > 0 ? (finalPresent / finalTotal) * 100 : 0;
		// Projected with bonus if attending special events (effective only if all special days kept planned)
		const projectedWithBonus = projectedBasePercent + (attendSpecialEffective ? 2 : 0);

		// Cap allowed misses to the number of actually missable days
		const r85FullAdj = Math.max(0, Math.min(r85Calc.full, missablePool));
		const r85HalfAdj = Math.max(0, Math.min(r85Calc.half, missablePool * 2));
		const r75FullAdj = Math.max(0, Math.min(r75Calc.full, missablePool));
		const r75HalfAdj = Math.max(0, Math.min(r75Calc.half, missablePool * 2));
		
		// Get simulated absence values - these affect PROJECTED value only
		const simFull = parseInt(absentFullIn && absentFullIn.value ? absentFullIn.value : 0) || 0;
		const simHalf = parseInt(absentHalfIn && absentHalfIn.value ? absentHalfIn.value : 0) || 0;
		const simDeduction = (simFull * 0.8) + (simHalf * 0.5);
		
		// Current percent stays as is (inputPercent), projected value gets the simulation deduction
		const currentPercentStr = inputPercent.toFixed(2);
		const projectedWithSimulation = Math.max(0, projectedWithBonus - simDeduction);
		const projectedStr = projectedWithSimulation.toFixed(2);

		// Display percentage (show current on left → projected with simulation on right)
		percentDisplay.textContent = currentPercentStr + '% → ' + projectedStr + '%';

		// Always keep the percent text a solid, readable white (warning shown separately)
		percentDisplay.style.color = '#ffffff';
		if(inputPercent < 75){
			percentWarning.classList.remove('hidden');
		} else {
			percentWarning.classList.add('hidden');
		}

		// Show an informational note when the user's CURRENT input percent is >75%
		const attendanceNoteEl = el('attendanceNote');
		if(attendanceNoteEl){
			if(inputPercent > 75){
				attendanceNoteEl.classList.remove('hidden');
				attendanceNoteEl.textContent = 'Note: Your current attendance is above 75% — you only need to attend until 11th December (aside from mandatory events).';
			} else {
				attendanceNoteEl.classList.add('hidden');
			}
		}

		// Build detailed calculation breakdown
		let note = `<div class="calc-box">`; 
		note += `<strong>📊 Calculation Breakdown:</strong><br>`;
		note += `<strong>Input:</strong> total ${total} days, attended ${attended.toFixed(1)} sessions`;
		if(percent != null) note += ` (${percent.toFixed(1)}%)`;
		note += `<br>`;
		note += `<strong>Your current attendance:</strong> ${attended}/${total} × 100 = <strong>${currentPercentStr}%</strong><br>`;
		note += `<strong>Projected without bonus:</strong> ${finalPresent}/${finalTotal} × 100 = <strong>${projectedBasePercent.toFixed(2)}%</strong><br>`;
		note += `<strong>Projected with bonus:</strong> ${projectedBasePercent.toFixed(2)}% + ${attendSpecialEffective ? '2.00' : '0.00'}% = <strong>${projectedWithBonus.toFixed(2)}%</strong><br>`;
		if(simFull > 0 || simHalf > 0){
			note += `<strong>Simulated absences (affect projected only):</strong> -${simFull} full days (${(simFull * 0.8).toFixed(2)}%) -${simHalf} half days (${(simHalf * 0.5).toFixed(2)}%) = -${simDeduction.toFixed(2)}%<br>`;
			note += `<strong>Projected after absences:</strong> ${projectedWithBonus.toFixed(2)}% - ${simDeduction.toFixed(2)}% = <strong>${projectedStr}%</strong><br>`;
		}
		if(margin85 >= 0) {
			note += `&nbsp;&nbsp;For ≥85%: margin = ${currentPercentStr}% - 85% = ${margin85.toFixed(2)}% → ${Math.floor(margin85/fullDeduct)} full days allowed`;
			if(r85FullAdj < Math.floor(margin85/fullDeduct)) note += ` (limited to ${r85FullAdj} due to only ${missablePool} non-mandatory days available)`;
			note += `<br>`;
		}
		const r75RawFull = Math.floor(margin75/fullDeduct);
		note += `&nbsp;&nbsp;For ≥75%: margin = ${currentPercentStr}% - 75% = ${margin75.toFixed(2)}% → ${r75RawFull} full days allowed`;
		if(r75FullAdj < r75RawFull) note += ` (limited to ${r75FullAdj} due to only ${missablePool} non-mandatory days available)`;
		note += `<br>`;
		if(isIT) note += `<strong>Note:</strong> As IT student, days 15-17 are mandatory (cannot be missed).<br>`;
		if(!attendSpecialEffective && attendSpecial) note += `<strong>Note:</strong> You deselected one or more special days (18,19,21) — +2% bonus will not be applied.<br>`;
		note += `</div>`;
		
		// Add summary
		note += `<div style="margin-top:10px;"><strong>📋 Summary:</strong> Your current attendance is ${currentPercentStr}%. `;
		note += `Based on the days you've selected for attendance, your projected percent will be ${projectedStr}%.`;
		if(inputPercent < 75) note += ` <span style="color:#d9534f;font-weight:bold;">⚠️ This is below 75%!</span>`;
		else if(inputPercent >= 75 && inputPercent < 85) note += ` You're in the 75–85% range.`;
		else note += ` You're well above 85%.`;
		note += `</div>`;

		explain.innerHTML = note;
		results.classList.remove('hidden');
	}

	try{
		calcBtn.addEventListener('click', calc);
		resetBtn.addEventListener('click', ()=>{
			totalDaysIn.value = '137'; percentIn.value = ''; attendedIn.value = ''; if(absentFullIn) absentFullIn.value=''; if(absentHalfIn) absentHalfIn.value=''; document.querySelector('input[name=type][value=it]').checked=true; el('attendSpecial').checked=true; results.classList.add('hidden'); renderCalendar();
		});

		// Add listener for quick attendance input - auto-calculate when it changes
		if(currentAttendanceQuick){
			currentAttendanceQuick.addEventListener('input', ()=>{
				const quickVal = currentAttendanceQuick.value.trim();
				if(quickVal){
					percentIn.value = quickVal;
					attendedIn.value = '';
					calc();
				}
			});
		}

		// Sync quick input field with main form inputs
		if(percentIn && currentAttendanceQuick){
			percentIn.addEventListener('input', ()=>{
				if(percentIn.value){
					currentAttendanceQuick.value = percentIn.value;
				}
			});
		}
		if(attendedIn && currentAttendanceQuick){
			attendedIn.addEventListener('input', ()=>{
				if(attendedIn.value){
					const total = parseFloat(totalDaysIn.value) || 0;
					const attended = parseFloat(attendedIn.value) || 0;
					if(total > 0){
						const percent = (attended / total) * 100;
						currentAttendanceQuick.value = percent.toFixed(2);
					}
				}
			});
		}
	} catch(e){
		console.error('Initialization error attaching handlers:', e);
		if(results) { results.classList.remove('hidden'); explain.innerHTML = '<strong>Error:</strong> ' + (e && e.message ? e.message : String(e)); }
	}

	// Calendar rendering for December
	function renderCalendar(){
		const isIT = getType() === 'it';
		const cal = el('calendar');
		if(!cal) return;
		cal.innerHTML = '';
		// simple grid of days 1..31
		for(let d=1; d<=31; d++){
			const day = document.createElement('div');
			day.className = 'day';
			const dateEl = document.createElement('div');
			dateEl.className = 'date';
			dateEl.textContent = d;
			day.appendChild(dateEl);

			// Determine day states
			const isPast = pastDays.includes(d);
			const isSunday = sundays.includes(d);
			const isMandatory = mandatoryDates.includes(d); // special mandatory days (18,19,21)
			const isITMandatory = isIT && itDates.includes(d); // IT mandatory: 15-17 (remain non-toggleable)
			const isSchoolClosed = schoolClosed.includes(d);
			const isPreboardExam = preboardExamDays.includes(d);
			// Make special mandatory days clickable (they are working days by default); IT mandatory remain non-toggleable
			const isClickable = !isPast && !isSchoolClosed && !isPreboardExam && (!isSunday || isMandatory) && !isITMandatory;

			// Mark categories
			if(isMandatory){
				day.classList.add('mandatory');
				const t = document.createElement('div'); t.className='tag'; t.textContent = d===21 ? 'Annual Day' : 'Mandatory'; day.appendChild(t);
			}
			if(isITMandatory){
				day.classList.add('mandatory'); // Mark as mandatory-like (not toggleable)
				const t = document.createElement('div'); t.className='tag'; t.textContent='IT Mandatory'; day.appendChild(t);
				plannedDays.add(d); // Ensure IT students always have 15-17 planned
			}
			if(itDates.includes(d) && !isITMandatory){
				day.classList.add('it');
				const t = document.createElement('div'); t.className='tag'; t.textContent='IT'; day.appendChild(t);
			}
			if(d === ptmDate){
				day.classList.add('ptm');
				const t = document.createElement('div'); t.className='tag'; t.textContent='PTM'; day.appendChild(t);
			}
			if(isPast){
				day.classList.add('past');
				const t = document.createElement('div'); t.className='tag'; t.textContent='Passed'; day.appendChild(t);
			}
			if(isSunday){
				day.classList.add('sunday');
				const t = document.createElement('div'); t.className='tag'; t.textContent='Sunday'; day.appendChild(t);
			}
			if(isSchoolClosed){
				day.classList.add('school-closed');
				const t = document.createElement('div'); t.className='tag'; t.textContent='Closed'; day.appendChild(t);
			}
			if(isPreboardExam){
				day.classList.add('preboard');
				const t = document.createElement('div'); t.className='tag'; t.textContent='Pre-board'; day.appendChild(t);
			}

			// Mark as planned to attend if in plannedDays set or if IT-mandatory
			if(plannedDays.has(d) || isITMandatory){
				day.classList.add('planned');
			}

			// Make day clickable only for non-mandatory, non-past, non-sunday, non-school-closed, non-preboard days
			if(isClickable){
				day.style.cursor = 'pointer';
				day.addEventListener('click', ()=>{
					if(plannedDays.has(d)){
						plannedDays.delete(d);
						day.classList.remove('planned');
					} else {
						plannedDays.add(d);
						day.classList.add('planned');
					}
					// Sync the special-events checkbox state: if any special day is deselected, uncheck the box; if all selected, check it
					const specialCheckbox = el('attendSpecial');
					if(specialCheckbox){
						specialCheckbox.checked = mandatoryDates.every(x => plannedDays.has(x));
					}
					// Recalculate on toggle
					calc();
				});
			} else {
				day.style.cursor = (isMandatory || isITMandatory) ? 'default' : 'not-allowed';
				if(!isMandatory && !isITMandatory) day.style.opacity = '0.5';
			}

			cal.appendChild(day);
		}
	}

	// initial render
	renderCalendar();

	// Keep the special-events checkbox in sync: when checkbox toggled, add/remove special days from plannedDays
	const specialCheckbox = el('attendSpecial');
	if(specialCheckbox){
		specialCheckbox.addEventListener('change', ()=>{
			const checked = specialCheckbox.checked;
			if(checked){
				mandatoryDates.forEach(d=> plannedDays.add(d));
			} else {
				mandatoryDates.forEach(d=> plannedDays.delete(d));
			}
			renderCalendar();
			calc();
		});
	}
	
	// Add listeners for student type changes to re-render calendar
	document.querySelectorAll('input[name=type]').forEach(radio => {
		radio.addEventListener('change', renderCalendar);
	});
});
