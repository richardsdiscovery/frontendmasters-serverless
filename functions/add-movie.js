const { query } = require('./util/hasura');

exports.handler = async (event) => {
  console.log('HELLO!', event)

  return {
    statusCode: 200,
    body: 'wip'
  }
  // const { id, title, tagline, poster } = JSON.parse(event.body);
}