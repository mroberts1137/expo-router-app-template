module.exports = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for any pending operations
};
