(function() {    
    var getBoxOfficeFor = function(id) {
        $.ajax({
            url: "http://api.themoviedb.org/3/movie/" + id + "?api_key=a1d5f291d84e71e51b248b86ec9c9e2a",
            type: "GET",
            success: function(data) {
                var movie = {
                  title: data.title,
                  year: data.release_date.slice(0,4),
                  budget: data.budget,
                  revenue: data.revenue
                }
                makeRowFor(movie);
            }
        })
    }

    var getMoviesOf = function(id) {
        $.ajax({
            url: "http://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=a1d5f291d84e71e51b248b86ec9c9e2a",
            type: "GET",
            success: function(data) {
                getBoxOfficeFor(data.cast[0].id);
                // data.cast.forEach(function(movie) {
                //     getBoxOfficeFor(movie.id);
                // })
            }
        });
    };

    var getIdOf = function(name) {
        $.ajax({
            url: "http://api.themoviedb.org/3/search/person?api_key=a1d5f291d84e71e51b248b86ec9c9e2a&query=" + name,
            type: "GET",
            success: function(data) {
                var id = data.results[0].id;
                getMoviesOf(id);
            }
        });
    };

    $('form.search').submit(function(event) {
        event.preventDefault();
        var query = $('input').val();
        getIdOf(query);
    })

})()

