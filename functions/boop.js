// Export a function called handler
// Async so you do not have to fire a callback, just return a value
exports.handler = async () => {
  return {
    statusCode: 200,
    body: 'Boop!'
  };
};