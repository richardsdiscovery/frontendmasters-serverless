const { URL } = require('url');
const fetch = require('node-fetch');
const { query } = require('./util/hasura');

exports.handler = async () => {
  const { movies } = await query({
    query: `
      query AllMovies {
        movies {
          id
          poster
          tagline
          title
        }
      }
    `
  });

  const api = new URL('https://www.omdbapi.com');

  // Add the secret API key to the query string
  api.searchParams.set('apikey', process.env.OMDB_API_KEY);

  // All movies execute at the same time. Then resolve all promises with Promise.all
  // https://www.learnwithjason.dev/blog/keep-async-await-from-blocking-execution/
  const promises = movies.map((movie) => {
    // Use the movie's IMDB ID to look up details
    api.searchParams.set('i', movie.id); // Set the movie id as "i"

    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores
        };
      });
  });

  const moviesWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings)
  };
};