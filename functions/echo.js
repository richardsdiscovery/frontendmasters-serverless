// Every serverless function gets an event. Syntax differs between providers
// Netlify and AWS use this syntax
exports.handler = async (event) => {
  const { text } = event.queryStringParameters; // queryStringParameters is an object that breaks down and returns query params

  return {
    statusCode: 200,
    body: `You said ${text}`
  };
};