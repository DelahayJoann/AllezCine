var genreList = [];
var highlighted;
var Featured;
var featuredGenre;
var nowTheatre;
var shopMovies;
var bigCard;
var latestMovies;
var allezCine;


// Templates

var highlightedMovieCardHTMLcode =
    `<div class="col-lg-2">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0 text-left" id="highlightYear"> _year </p>
            <p class="card-text col-6 m-0 p-0 text-right" id="highlightGenre"> _genre </p>
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

var shopMoviesCardHTMLcode =
    `<div class="col-lg-3">
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
    `<div class="carousel-item _tmp " style="max-height: 768px;">
<img class="d-block img-fluid" src= _imgSrc alt="First slide">
<div class="carousel-caption d-none d-md-block mb-3">
  <h1 class="display-3">LATEST ONLINE MOVIES</h1>
  <p class="lead"> _title </p>
  <hr class="my-2">
  <p class="lead">
    <a class="btn btn-primary btn-lg" href= _href target="_blank" role="button">Watch trailer</a>
  </p>
</div>`;

var bigCardHTMLcode =
    `<figure class="figure justify-content-around row">
<img src=_imgSrc class="d-block img-fluid" col-12" alt="">
<figcaption class="figure-caption text-xs-right col-12 row">
  <div class="container">
    <div class="row">
      <h3 class="card-title col-12">_title</h3>
      <p class="card-text col-3 m-0 p-0" id="storyline">Story line</p>
      <p class="card-text col-1 m-0 p-0" class="dot">:</p>
      <p class="card-text col-8 m-0 p-0" id="summaryText"> _summary </p>
    </div>
    <div class="row">
      <p class="card-text col-3 m-0 p-0" id="releaseOn">Release On</p>
      <p class="card-text col-1 m-0 p-0" class="dot">:</p>
      <p class="card-text col-8 m-0 p-0" id="releaseDate">_year</p>
    </div>
    <div class="row">
      <p class="card-text col-3 m-0 p-0" id="Genres">Genres</p>
      <p class="card-text col-1 m-0 p-0" class="dot">:</p>
      <p class="card-text col-6 m-0 p-0" id="highlightGenre"> _genre </p>
    </div>
    <div class="row">
      <p class="card-text col-3 m-0 p-0" id="price">Price</p>
      <p class="card-text col-1 m-0 p-0" class="dot">:</p>
      <p class="card-text col-8 m-0 p-0" id="priceTag">Price tag</p>
    </div>
  </div>
</figcaption>
</figure>`

var latestMoviesHTMLcode =
    `<div class="row" style="height:5rem;width:20rem;">
        <img src= _imgSrc class="figure-img img-fluid col-5" alt="">
        <div class="col-sm-7"> _title </div>
</div>`;

var allezCineHTMLcode =
    `<img src= _imgSrc class="figure-img img-fluid col-4" alt="">`

// Classes/Objects
var TMDB = {
    apiKey: "?api_key=766c1ba4a606493ccaf76431323f4829",
    apiOption: "&language=fr",
    apiBaseURL: "http://api.themoviedb.org/3/",
    apiImageBaseURL: "http://image.tmdb.org/t/p/",
    youtubeBaseURL: "https://www.youtube.com/watch?v="
};

// Fetchs
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list' + TMDB.apiKey + TMDB.apiOption);  // Get all Genres with their id
const fetchTopRated = fetch('https://api.themoviedb.org/3/movie/top_rated' + TMDB.apiKey + TMDB.apiOption); // Highlighted
const fetchPopular = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Featured
const fetchNowPlaying = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Get Movies to populate jumbotron carousel
const fetchShowMovies = fetch('https://api.themoviedb.org/3/movie/now_playing' + TMDB.apiKey + TMDB.apiOption); // Shop Movies
const fetchBigCard = fetch('https://api.themoviedb.org/3/movie/now_playing' + TMDB.apiKey + TMDB.apiOption); // Big Card
const fetchLatestMovies = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Latest Movies 
const fetchAllezCine = fetch('https://api.themoviedb.org/3/movie/top_rated' + TMDB.apiKey + TMDB.apiOption); //allez cine 

Promise.all([fetchGenres, fetchTopRated, fetchPopular, fetchNowPlaying, fetchShowMovies, fetchBigCard, fetchLatestMovies, fetchAllezCine]).then(values => {
    return Promise.all(values.map(fetch => fetch.json()))
}).then(([genres, topRated, popular, nowPlaying, showThem, card, latest, allez]) => {
    genreList = genres.genres;
    highlighted = topRated.results.slice(0, 5);
    Featured = popular.results.slice(0, 12);
    nowTheatre = nowPlaying.results;
    shopMovies = showThem.results.slice(0, 8);
    bigCard = card.results.slice(0, 1);
    latestMovies = latest.results.slice(0, 4);
    allezCine = allez.results.slice(0, 6);
    //console.log(highlighted);


    // HTML Selection
    var html_highlightedMovies = document.getElementById('highlightedMoviesRow');
    var html_featuredMovies = document.getElementById('featuredMoviesRow');
    var html_NowTheatre = document.getElementById('carouselInner');
    var html_shopMovies = document.getElementById('underShopMovies');
    var html_bigCard = document.getElementById("theBigCard");
    var html_latestMovies = document.getElementById("latestMovies");
    var html_allezCine = document.getElementById("allezCine");

    // Build Highlighted Cards
    highlighted.map((x) => {
        let tmp = highlightedMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_genre/, getGenreName(x.genre_ids[0]));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_highlightedMovies.insertAdjacentHTML('beforeend', tmp);
    });

    // Array to collect all unfiltered movie genres
    var rawFeaturedGenre = [];

    // Build Featured Cards
    Featured.map((x) => {
        rawFeaturedGenre.push(getGenreName(x.genre_ids[0]));
        let tmp = featuredMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_featuredMovies.insertAdjacentHTML('beforeend', tmp);
    });

    // Build Shop Movies Cards
    shopMovies.map((x) => {
        let tmp = shopMoviesCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_shopMovies.insertAdjacentHTML('beforeend', tmp);
    });

    // Build Big Card
    bigCard.map((x) => {
        let tmp = bigCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_summary/, x.overview);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w500' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_bigCard.insertAdjacentHTML('beforeend', tmp);
    });

    // Transform rawFeaturedGenre into an Array of unique genre
    featuredGenre = Array.from([...new Set(rawFeaturedGenre)]);

    // Build Jumbotron carousel slide
    nowTheatre.map(async (x, index) => {
        let tmp = carouselInnerHTMLcode;
        if (index == 0) tmp = tmp.replace(/_tmp/, 'active');;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'original' + x.backdrop_path + TMDB.apiKey + TMDB.apiOption);
        let a = await getTrailer(x.id);
        tmp = tmp.replace(/_href/, TMDB.youtubeBaseURL + a[0]);
        html_NowTheatre.insertAdjacentHTML('beforeend', tmp);
    });

    // *** Build Footer ***
    // Latest Movies

    latestMovies.map((x) => {
        let tmp = latestMoviesHTMLcode;
        // console.log(latestMoviesHTMLcode);
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.backdrop_path + TMDB.apiKey + TMDB.apiOption);
        html_latestMovies.insertAdjacentHTML('beforeend', tmp);
    });

    allezCine.map((x) => {
        let tmp = allezCineHTMLcode;
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_allezCine.insertAdjacentHTML('beforeend', tmp);
    });

    // Get functions
    function getGenreName(movieGenreId) {
        return genreList.find(element => element.id == movieGenreId).name;
    }

    async function getTrailer(id) {
        let res = await fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=766c1ba4a606493ccaf76431323f4829&language=fr');
        if (res.status == 200) {
            let json = await res.json();
            return json.results.map(x => x.key);
        }
        throw new Error(res.status);
    }

});

