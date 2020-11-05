var genreList = [];
var highlighted;
var Featured;
var featuredGenre;
var nowTheatre;


// Templates

var highlightedMovieCardHTMLcode =
`<div class="col-lg-2">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0" id="highlightYear"> _year </p>
            <p class="card-text col-6 m-0 p-0" id="highlightGenre"> _genre </p>
        </figcaption>
        </figure> 
    </div>
    </div>
</div>`;
var featuredMovieCardHTMLcode =
`<div class="col-lg-2">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0" id="highlightYear"> _year </p>
        </figcaption>
        </figure> 
    </div>
    </div>
</div>`;
var carouselInnerHTMLcode =
`<div class="carousel-item _tmp ">
<img class="d-block img-fluid" src= _imgSrc alt="First slide">
<div class="carousel-caption d-none d-md-block">
  <h1 class="display-3">LATEST ONLINE MOVIES</h1>
  <p class="lead"> _title </p>
  <hr class="my-2">
  <p class="lead">
    <a class="btn btn-primary btn-lg" href= _href target="_blank" role="button">Watch trailer</a>
  </p>
</div>`;


// Classes/Objects
var TMDB = {
    apiKey : "?api_key=766c1ba4a606493ccaf76431323f4829",
    apiOption: "&language=fr",
    apiBaseURL : "http://api.themoviedb.org/3/",
    apiImageBaseURL : "http://image.tmdb.org/t/p/",
    youtubeBaseURL : "https://www.youtube.com/watch?v="
};

// Fetchs
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list'+TMDB.apiKey+TMDB.apiOption);  // Get all Genres with their id
const fetchTopRated = fetch('https://api.themoviedb.org/3/movie/top_rated'+TMDB.apiKey+TMDB.apiOption); // Highlighted
const fetchPopular = fetch('https://api.themoviedb.org/3/movie/popular'+TMDB.apiKey+TMDB.apiOption); // Featured
const fetchNowPlaying = fetch('https://api.themoviedb.org/3/movie/popular'+TMDB.apiKey+TMDB.apiOption);


Promise.all([fetchGenres, fetchTopRated, fetchPopular, fetchNowPlaying]).then(values=>{
    return Promise.all(values.map(fetch=>fetch.json()))}).then(([genres, topRated, popular, nowPlaying])=>{
    genreList = genres.genres;
    highlighted = topRated.results.slice(0, 5);
    Featured = popular.results.slice(0, 12);
    nowTheatre = nowPlaying.results;
    //console.log(highlighted);


    // HTML Selection
    var html_highlightedMovies = document.getElementById('highlightedMoviesRow');
    var html_featuredMovies = document.getElementById('featuredMoviesRow');
    var html_NowTheatre = document.getElementById('carouselInner');

    // Build Highlighted Cards
    highlighted.map((x) =>{
        let tmp = highlightedMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0,x.release_date.indexOf('-')));
        tmp = tmp.replace(/_genre/, getGenreName(x.genre_ids[0]));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL+'w300'+x.poster_path+TMDB.apiKey+TMDB.apiOption);
        html_highlightedMovies.insertAdjacentHTML('beforeend', tmp);
    });

    // Array to collect all unfiltered movie genres
    var rawFeaturedGenre = [];

    // Build Featured Cards
    Featured.map((x) =>{
        rawFeaturedGenre.push(getGenreName(x.genre_ids[0]));
        let tmp = featuredMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0,x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL+'w300'+x.poster_path+TMDB.apiKey+TMDB.apiOption);
        html_featuredMovies.insertAdjacentHTML('beforeend', tmp);
    });

    // Transform rawFeaturedGenre into an Array of unique genre
    featuredGenre = Array.from([...new Set(rawFeaturedGenre)]);

    nowTheatre.map(async (x,index) =>{
        let tmp = carouselInnerHTMLcode;
        if(index == 0) tmp = tmp.replace(/_tmp/, 'active');;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0,x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL+'original'+x.backdrop_path+TMDB.apiKey+TMDB.apiOption);
        let a = await getTrailer(x.id);
        tmp = tmp.replace(/_href/, TMDB.youtubeBaseURL+a[0] );
        html_NowTheatre.insertAdjacentHTML('beforeend', tmp);
    });

    
    // Get functions
    function getGenreName(movieGenreId){
        return genreList.find(element => element.id == movieGenreId).name;
    }

    async function getTrailer(id) {
        let res = await fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=766c1ba4a606493ccaf76431323f4829&language=fr');  
        if (res.status == 200) {
          let json = await res.json();
          return json.results.map(x => x.key);
        }
        throw new Error(res.status);
      }



      
});

