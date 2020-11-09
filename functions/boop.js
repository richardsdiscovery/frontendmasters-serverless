// Export a function called handler
// Async so you do not have to fire a callback, just return a value
// Using common.js syntax
exports.handler = async () => {
  return {
    statusCode: 200,
    body: 'Boop!'
  };
};