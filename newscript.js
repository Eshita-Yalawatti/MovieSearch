const OMDB_API_BASE = "https://www.omdbapi.com/";
const OMDB_API_KEY = "597ad976"; 
const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "44a2bec2a5dd29afd8e6bd00c7c14093"; 


const genreMapping = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Western": 37
};


const app = document.querySelector('#app');
app.innerHTML = `
  <div class="container">
    <div class="dashboard">
      <h1 class="title">Movie Search Dashboard</h1>
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search for a movie..."
          id="movieInput"
        >
      </div>
      <div class="movie-section" id="movieSection">
        <div class="initial-message">Search for a movie to see details</div>
      </div>
      <div class="recommendations-section" id="recommendationsSection">
        <h3>Similar Movies</h3>
        <div id="recommendationList"></div>
      </div>
    </div>
  </div>
`;


async function fetchMovieDetails(title) {
  try {
    const response = await fetch(
      `${OMDB_API_BASE}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();
    if (data.Response === 'False') {
      document.getElementById('movieSection').innerHTML = `
        <div class="error-message">Movie not found</div>
      `;
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}


async function fetchSimilarMovies(genreId) {
  try {
    const response = await fetch(
      `${TMDB_API_BASE}/discover/movie?with_genres=${genreId}&api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results.slice(0, 5);  // Limit to 5 similar movies
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}


function displayMovieDetails(movie) {
  document.getElementById('movieSection').innerHTML = `
    <div class="movie-details">
      <div class="movie-poster">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Poster'}" alt="${movie.Title} poster">
      </div>
      <div class="movie-info">
        <h2>${movie.Title} (${movie.Year})</h2>
        <div class="rating">
          <span class="imdb-rating">⭐ ${movie.imdbRating}/10</span>
          <span class="runtime">${movie.Runtime}</span>
        </div>
        <p class="genre">${movie.Genre}</p>
        <p class="plot">${movie.Plot}</p>
        <div class="details">
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Cast:</strong> ${movie.Actors}</p>
          <p><strong>Released:</strong> ${movie.Released}</p>
        </div>
      </div>
    </div>
  `;
}


function displaySimilarMovies(movies) {
  const recommendationList = document.getElementById('recommendationList');
  recommendationList.innerHTML = '';
  if (movies.length > 0) {
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie-recommendation');
      movieElement.innerHTML = `
        <div class="movie-poster">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
        </div>
        <div class="movie-info">
          <h4>${movie.title} (${movie.release_date.split('-')[0]})</h4>
        </div>
      `;
      recommendationList.appendChild(movieElement);
    });
  } else {
    recommendationList.innerHTML = '<p>No similar movies found</p>';
  }
}


async function searchMovie(title) {
  const movieDetails = await fetchMovieDetails(title);
  if (movieDetails) {
    displayMovieDetails(movieDetails);

  
    const genreNames = movieDetails.Genre.split(', ');
    const genreName = genreNames[0]; 
    const genreId = genreMapping[genreName];

    if (genreId) {
      const similarMovies = await fetchSimilarMovies(genreId);
      displaySimilarMovies(similarMovies);
    } else {
      document.getElementById('recommendationList').innerHTML = '<p>No genre found for recommendations.</p>';
    }
  }
}

document.getElementById('movieInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const movie = e.target.value.trim();
    if (movie) {
      searchMovie(movie);
    }
  }
});
