(function(moduleExports){
  // Lightweight shared calculation utilities. Works in browser (window.Calc)
  // and in Node (module.exports = Calc).
  function calculatePercentMode(basePercent, threshold, deduct){
    const diff = basePercent - threshold;
    if(diff < 0) return 0;
    return Math.floor(diff / deduct);
  }

  function calculateSessionsMode(attended, total, threshold){
    // misses <= attended - threshold/100 * total
    const allowed = attended - (threshold/100) * total;
    if(allowed <= 0) return { full: 0, half: 0 };
    // full = whole sessions allowed,
    // half = how many 0.5-session halves you can miss (allowed / 0.5)
    return { full: Math.floor(allowed), half: Math.floor(allowed / 0.5) };
  }

  function adjustForMandatoryFull(allowedFull, mandatoryCount){
    // Previously this subtracted mandatory days from allowed misses which
    // incorrectly reduced the allowed misses to zero when mandatoryCount
    // was larger than allowedFull (e.g., IT students). Instead, this
    // function should simply normalize the allowedFull value. The
    // caller should cap the allowed misses against the number of
    // actually-missable days (non-mandatory days).
    return Math.max(0, Math.floor(allowedFull));
  }

  function adjustForMandatoryHalf(allowedHalf, mandatoryCount){
    // Normalize allowed half-days. Caller should cap against available
    // half-day slots (non-mandatory days * 2).
    return Math.max(0, Math.floor(allowedHalf));
  }

  const Calc = {
    calculatePercentMode,
    calculateSessionsMode,
    adjustForMandatoryFull,
    adjustForMandatoryHalf
  };

  if(typeof window !== 'undefined') window.Calc = Calc;
  if(typeof module !== 'undefined' && module.exports) module.exports = Calc;
  return Calc;
})();
