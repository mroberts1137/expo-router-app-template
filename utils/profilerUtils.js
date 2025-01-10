export const profilerRender = (id, phase, actualDuration, baseDuration) => {
  const results = [
    {
      phase,
      renderTime: actualDuration.toFixed(0),
      base: baseDuration.toFixed(0),
      ratio: baseDuration > 0 ? (baseDuration / actualDuration).toFixed(1) : '-'
    }
  ];
  console.log(`Profiler: ${id}`, JSON.stringify(results));
};
