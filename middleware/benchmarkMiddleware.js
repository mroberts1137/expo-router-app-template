const benchmarkMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  const result = next(action);
  const end = performance.now();
  console.log(`Action ${action.type} took ${(end - start).toFixed(2)}ms`);
  return result;
};

export default benchmarkMiddleware;
