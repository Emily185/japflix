// arrays para almacenar las peliculas y los resultados de búsqueda
let movies = [];
let search_movies = [];

// funcion para mostrar las peliculas en el HTML
function showMovies(array) {
    document.getElementById("lista").innerHTML = ""; // limpiar lista antes de mostrar nuevas

    for (const movie of array) {
        let stars = ""; // estrellas de calificacion
        for (let i = 0; i < parseInt(movie.vote_average / 2); i++) {
            stars += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = 0; i < (5 - parseInt(movie.vote_average / 2)); i++) {
            stars += `<span class="fa fa-star"></span>`;
        }

        // generar los grneros de la pelicula usando map
        let genres = movie.genres.map(genero => genero.name).join(" - ");

        // mostrar en HTML cada película
        document.getElementById("lista").innerHTML += `
            <li class="list-group-item bg-dark text-white">
                <div type="button" data-bs-toggle="offcanvas" data-bs-target="#oc${movie.id}" >
                    <div class="fw-bold">${movie.title} <span class="float-end">${stars}</span></div>
                    <div class="text-muted fst-italic">${movie.tagline}</div>
                </div>
                <div class="offcanvas offcanvas-top text-dark" tabindex="-1" id="oc${movie.id}" >
                    <div class="offcanvas-header">
                        <h3 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" ></button>
                    </div>
                    <div class="offcanvas-body">
                        <p>${movie.overview}</p>
                        <hr>
                        <span class="text-muted">
                            ${genres}
                            <button class="float-end btn btn-secondary dropdown-toggle" type="button" id="dd${movie.id}" data-bs-toggle="dropdown">More</button>
                            <ul class="dropdown-menu"${movie.id}">
                                <li><span class="dropdown-item">Year: <span class="float-end ps-1">${movie.release_date.slice(0, 4)}</span></span></li>
                                <li><span class="dropdown-item">Runtime: <span class="float-end ps-1">${movie.runtime} mins</span></span></li>
                                <li><span class="dropdown-item">Budget: <span class="float-end ps-1">$${movie.budget}</span></span></li>
                                <li><span class="dropdown-item">Revenue: <span class="float-end ps-1">$${movie.revenue}</span></span></li>
                            </ul>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }
}

//evento para cargar las peliculas al inicio
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
            document.getElementById("btnBuscar").addEventListener("click", function () {
                search_movies = movies.filter(movie =>
                    movie.title.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase()) ||
                    movie.tagline.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase()) ||
                    movie.overview.toLowerCase().includes(document.getElementById("inputBuscar").value.toLowerCase())
                );
                showMovies(search_movies);
            });
        });
});
