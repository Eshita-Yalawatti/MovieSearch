# Movie Search
## Important features:
- Enter a movie title and get detailed information about the movie.
- Displays movie information such as IMDb rating, runtime, genre, and plot.
- Shows movie recommendations based on the genre of the searched movie, fetched from TMDb API.
- The interface is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## Future feature ideas:
- Giving hollywood movie recommendations similar to the bollywood movie searched by the user and vice-verse.
- Displaying the recommendations in grid view.
- Making the recommendations section more robust with clickable posters of the recommendations.
- Adding a pin feature to create a collection of movies of interest of the user.
- Having a share option where the details of the movie can be shared by th user to his/her friends.
- A community page where people can suggest each other movies, webseries, TV shows, etc.
- Giving recommendations according to the timelines of when they were released.
- Optimising the search engine for two movies having same name.
- Review section under the movie where the user can add their review about that movie.
- Adding another information parameter for the movie searched i.e where is the movie available online: prime, netflix, zee5, etc.

### Few improvements:
If we look at the recommendation logic, the first genre word given by OMDB API is passed through the TMDB API to get recommendations. So Annabelle having short as the first genre word and then horror doesn't show any recommedation but on the other hand when we search The NUN, its first genre word is horror and so it shows horror recommendations. Same goes for Interstellar, first word is adventure, then drama and then sci-fi so it shows adventure related recommendations and not sci-fi. So I am working on that to make it better and more robust so that it considers all the genre words.


HTML: For structure of the website

CSS: For the design and UI of the website

Javascript: Fetching the data from API

OMDB API: Provides detailed information about movies

TMDB API: Provides movie recommendations based on genres
