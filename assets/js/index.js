var genreList = [];
var highlighted;
var Featured;
var featuredGenre;
var nowTheatre;
var shopMovies;
var bigCard;
var latestMovies;
var allezCine;
var FeaturedDisplayed = 12;


// Templates

var highlightedMovieCardHTMLcode = `<div class="col-lg-2">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0 text-left" id="highlightYear"> _year </p>
            <p class="card-text col-6 m-0 p-0 text-right" id="highlightGenre"> _genre </p>
            <p class="d-none" id="movieId"> _movieid </p>
        </figcaption>
        </figure> 
    </div>
    </div>
</div>`;
var featuredMovieCardHTMLcode = `<div class="col-lg-2">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0" id="highlightYear"> _year </p>
            <p class="card-text col-6 m-0 p-0 text-right" id="highlightGenre" style="display: none;"> _genre </p>
            <p class="d-none" id="movieId"> _movieid </p>
        </figcaption>
        </figure> 
    </div>
    </div>
</div>`;

var shopMoviesCardHTMLcode = `<div class="col-lg-3">
    <div class="card border-0" id="highlightCard">
    <div class="card-body">
        <figure class="figure justify-content-around row">
        <img src= _imgSrc class="figure-img img-fluid rounded col-12" alt="">
        <figcaption class="figure-caption text-xs-right col-12 row">
            <p class="card-title col-12"> _title </p>
            <p class="card-text col-6 m-0 p-0" id="highlightYear"> _year </p>
            <p class="d-none" id="movieId"> _movieid </p>
        </figcaption>
        </figure> 
    </div>
    </div>
</div>`;

var carouselInnerHTMLcode = `<div class="carousel-item _tmp " style="max-height: 768px;">
<img class="d-block img-fluid" src= _imgSrc alt="First slide">
<div class="carousel-caption d-none d-md-block mb-3">
  <h1 class="display-3"><span class="whitespan">LATEST</span> ON<span class="whitespan">LINE</span> MO<span class="whitespan">VIES</span></h1>
  <p class="lead"> _title </p>
  <hr class="my-2">
  <p class="lead">
    <a class="btn btn-primary btn-lg" href= _href target="_blank" role="button" rel="noopener">Watch trailer</a>
  </p>
</div>`;

var bigCardHTMLcode = `<figure class="figure justify-content-around row hidden-xs">
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
</figure></div>`

var latestMoviesHTMLcode =
    `<div class="row" style="height:5rem;width:20rem;">
        <img src= _imgSrc class="figure-img img-fluid col-5" alt="">
        <div class="col-sm-7"> _title </div>
</div>`;

var allezCineHTMLcode =
    `
    <img src= _imgSrc class="figure-img img-fluid col-4" alt="" >
    `

// Classes/Objects
var TMDB = {
    apiKey: "?api_key=766c1ba4a606493ccaf76431323f4829",
    apiOption: "&language=fr",
    apiBaseURL: "https://api.themoviedb.org/3/",
    apiImageBaseURL: "https://image.tmdb.org/t/p/",
    youtubeBaseURL: "https://www.youtube.com/watch?v="
};

// Fetchs
const fetchGenres = fetch('https://api.themoviedb.org/3/genre/movie/list' + TMDB.apiKey + TMDB.apiOption);  // Get all Genres with their id
const fetchTopRated = fetch('https://api.themoviedb.org/3/movie/top_rated' + TMDB.apiKey + TMDB.apiOption); // Highlighted
const fetchPopular = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Featured
const fetchPopular2 = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption + '&page=2'); //more Featured
const fetchPopular3 = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption + '&page=3'); //more Featured
const fetchPopular4 = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption + '&page=4'); //more Featured
const fetchPopular5 = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption + '&page=5'); //more Featured
const fetchNowPlaying = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Get Movies to populate jumbotron carousel
const fetchShowMovies = fetch('https://api.themoviedb.org/3/movie/now_playing' + TMDB.apiKey + TMDB.apiOption); // Shop Movies
const fetchBigCard = fetch('https://api.themoviedb.org/3/movie/now_playing' + TMDB.apiKey + TMDB.apiOption); // Big Card
const fetchLatestMovies = fetch('https://api.themoviedb.org/3/movie/popular' + TMDB.apiKey + TMDB.apiOption); // Latest Movies 
const fetchAllezCine = fetch('https://api.themoviedb.org/3/movie/top_rated' + TMDB.apiKey + TMDB.apiOption); //allez cine 


Promise.all([fetchGenres, fetchTopRated, fetchPopular, fetchPopular2, fetchPopular3, fetchPopular4, fetchPopular5, fetchNowPlaying, fetchShowMovies, fetchBigCard, fetchLatestMovies, fetchAllezCine]).then(values => {
    return Promise.all(values.map(fetch => fetch.json()))
}).then(([genres, topRated, popular, popular2, popular3, popular4, popular5, nowPlaying, showThem, card, latest, allez]) => {
    genreList = genres.genres;
    highlighted = topRated.results.slice(0, 5);
    Featured = popular.results;
    Featured = Featured.concat(popular2.results);
    Featured = Featured.concat(popular3.results);
    Featured = Featured.concat(popular4.results);
    Featured = Featured.concat(popular5.results);
    nowTheatre = nowPlaying.results;
    shopMovies = showThem.results.slice(0, 8);
    bigCard = card.results.slice(0, 1);
    latestMovies = latest.results.slice(0, 4);
    allezCine = allez.results.slice(0, 6);


    // HTML Selection
    var html_highlightedMoviesRow = document.getElementById('highlightedMoviesRow');
    var html_featuredMoviesRow = document.getElementById('featuredMoviesRow');
    var html_featuredMoviesH3 = document.querySelector('#featuredMovies h3');
    var html_NowTheatre = document.getElementById('carouselInner');
    var html_shopMovies = document.getElementById('underShopMovies');
    var html_bigCard = document.getElementById("theBigCard");
    var html_latestMovies = document.getElementById("latestMovies");
    var html_allezCine = document.getElementById("allezCine");
    var html_modalMovieDetails = document.getElementById("momdalMovieDetailsBody");

    // Build Highlighted Cards
    highlighted.map((x) => {
        let tmp = highlightedMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_genre/, getGenreName(x.genre_ids[0]));
        tmp = tmp.replace(/_movieid/, x.id);
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_highlightedMoviesRow.insertAdjacentHTML('beforeend', tmp);
    });

    // Array to collect all unfiltered Featured movie genres
    var rawFeaturedGenre = [];

    // Build Featured Cards
    Featured.map((x) => {
        rawFeaturedGenre.push(getGenreName(x.genre_ids[0]));
        let tmp = featuredMovieCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_genre/, getGenreName(x.genre_ids[0]));
        tmp = tmp.replace(/_movieid/, x.id);
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_featuredMoviesRow.insertAdjacentHTML('beforeend', tmp);
    });

    // Transform rawFeaturedGenre into an Array of unique genre
    featuredGenre = Array.from([...new Set(rawFeaturedGenre)]);
    featuredGenre = featuredGenre.sort();

    // Featured Movies Genre Filter buttons
    let genreFilterDiv = document.createElement('div');
    genreFilterDiv.setAttribute('class', 'row');
    let tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = 'ALL';
    tmpDiv.setAttribute('class', 'btn btn-danger');
    tmpDiv.id = 'ALL';
    genreFilterDiv.appendChild(tmpDiv);

    featuredGenre.forEach((elem) => {
        let tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = elem;
        tmpDiv.setAttribute('class', 'btn btn-danger');
        tmpDiv.id = elem;
        genreFilterDiv.appendChild(tmpDiv);
        document.getElementById('navDropdown').insertAdjacentHTML('beforeend', '<a class="dropdown-item" href="#featuredMovies">' + elem + '</a>');
        document.getElementById('navDropdown').lastChild.addEventListener('click', function (event) {
            let eventDropdown = new Event('click');
            document.getElementById(this.innerHTML.trim()).dispatchEvent(eventDropdown);
        });
    });
    html_featuredMoviesH3.parentNode.insertBefore(genreFilterDiv, html_featuredMoviesH3.nextSibling);

    let currentFilter = 'ALL';

    // Click Featured Genre Filter
    document.querySelectorAll('#featuredMovies .btn').forEach((button) => {
        button.addEventListener('click', function (event) {
            let count = 0;
            if (event.target.innerHTML != currentFilter) document.getElementById('moreless').innerHTML = 'More';
            currentFilter = event.target.id;
            document.querySelectorAll('#featuredMovies .card').forEach((card, index) => {
                if (event.target.innerHTML.trim() == 'ALL' && index < FeaturedDisplayed) { card.parentNode.style.display = "block"; count = Featured.length; }
                else if (card.querySelector('#highlightGenre').innerHTML.trim() != event.target.innerHTML.trim()) { card.parentNode.style.display = "none"; }
                else if (count < FeaturedDisplayed) { card.parentNode.style.display = "block"; count++; }
                else { card.parentNode.style.display = "none"; }

                if (count < 12) { document.getElementById('moreless').style.display = 'none'; }
                else { document.getElementById('moreless').style.display = 'block'; }
            });

        });
    });

    // Button More/Less
    document.getElementById('moreless').addEventListener('click', function (event) {
        if (FeaturedDisplayed < Featured.length) {
            FeaturedDisplayed += 1000;
            event.target.innerHTML = 'Less';
        }
        else {
            event.target.innerHTML = 'More';
            FeaturedDisplayed -= 1000;
        }
        let eventFilter = new Event('click');
        document.getElementById(currentFilter).dispatchEvent(eventFilter);
        document.getElementById(currentFilter).scrollIntoView();
    });

    let event = new Event('click');
    document.getElementById('ALL').dispatchEvent(event);


    // Build Shop Movies Cards
    shopMovies.map((x) => {
        let tmp = shopMoviesCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_movieid/, x.id);
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w300' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_shopMovies.insertAdjacentHTML('beforeend', tmp);
    });

    html_shopMovies.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('click', function (event) {
            bigCardDetails(this);
        });
    });

    // Build Big Card
    bigCard.map((x) => {
        let tmp = bigCardHTMLcode;
        tmp = tmp.replace(/_title/, x.title);
        tmp = tmp.replace(/_summary/, x.overview);
        tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
        tmp = tmp.replace(/_genre/, getGenreName(x.genre_ids[0]));
        tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w500' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
        html_bigCard.insertAdjacentHTML('beforeend', tmp);
    });

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
        let indic;
        if (index == 0) { indic = '<li data-target="#carouselExampleIndicators" class="active" data-slide-to="' + index + '"></li>'; }
        else { indic = '<li data-target="#carouselExampleIndicators" data-slide-to="' + index + '"></li>'; }
        document.getElementsByClassName('carousel-indicators')[0].insertAdjacentHTML('beforeend', indic);
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

    // Add Eventlisteners to open details modal
    modalDetails(html_highlightedMoviesRow);
    modalDetails(html_featuredMoviesRow);

    // Get functions
    function getGenreName(movieGenreId) {
        if(movieGenreId != null){return genreList.find(element => element.id == movieGenreId).name;}
        else {return "Sans catégorie";}
    }

    async function getTrailer(id) {
        let res = await fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=766c1ba4a606493ccaf76431323f4829&language=fr');
        if (res.status == 200) {
            let json = await res.json();
            return json.results.map(x => x.key);
        }
        throw new Error(res.status);
    }

    function modalDetails(htmlContainerWithCards) {
        // Add Eventlisteners to open details modal of Highlited cards
        htmlContainerWithCards.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('click', function (event) {
                //console.log(this.querySelector('#movieId').innerHTML.trim());

                const movieDetails = fetch('https://api.themoviedb.org/3/movie/' + this.querySelector('#movieId').innerHTML.trim() + TMDB.apiKey + TMDB.apiOption);

                Promise.all([movieDetails]).then((values) => {
                    return Promise.all(values.map(fetch => fetch.json()))
                }).then(([x]) => {
                    if (html_modalMovieDetails.firstChild) html_modalMovieDetails.removeChild(html_modalMovieDetails.firstChild);
                    let tmp = bigCardHTMLcode;
                    tmp = tmp.replace(/_title/, x.title);
                    tmp = tmp.replace(/_summary/, x.overview);
                    tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
                    tmp = tmp.replace(/_genre/, x.genres[0].name);
                    tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w500' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
                    html_modalMovieDetails.insertAdjacentHTML('beforeend', tmp);
                    $('#modalMovieDetails').modal('show');
                });
            });
        });
    }

    // Function to populate BigCard in Shop section (bigCardDetails(card);)
    function bigCardDetails(card) {
        const bigCardDetails = fetch('https://api.themoviedb.org/3/movie/' + card.querySelector('#movieId').innerHTML.trim() + TMDB.apiKey + TMDB.apiOption);

        Promise.all([bigCardDetails]).then((values) => {
            return Promise.all(values.map(fetch => fetch.json()))
        }).then(([x]) => {
            html_bigCard.innerHTML = '';
            let tmp = bigCardHTMLcode;
            tmp = tmp.replace(/_title/, x.title);
            tmp = tmp.replace(/_summary/, x.overview);
            tmp = tmp.replace(/_year/, x.release_date.substring(0, x.release_date.indexOf('-')));
            tmp = tmp.replace(/_genre/, x.genres[0].name);
            tmp = tmp.replace(/_imgSrc/, TMDB.apiImageBaseURL + 'w500' + x.poster_path + TMDB.apiKey + TMDB.apiOption);
            html_bigCard.insertAdjacentHTML('beforeend', tmp);
        });
    }
    // Footer button

    var scrollButton = document.createElement("button");
    scrollButton.innerHTML = `<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>`;
    scrollButton.setAttribute("id", "myBtn");
    scrollButton.setAttribute("name", "scrollButton");

    var place = document.getElementById("footerFun");
    place.appendChild(scrollButton);

    // let scrollButton = getElementById("myBtn");

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    }

    scrollButton.addEventListener("click", () => {

        document.documentElement.scrollTop = 0;
    });

});