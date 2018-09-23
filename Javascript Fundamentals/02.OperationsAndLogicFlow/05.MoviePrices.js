function solve([movie, day]) {
    let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let movies = {
        'the godfather': [12, 10, 15, 12.50, 15, 25, 30],
        'schindler\'s list': [8.50, 8.50, 8.50, 8.50, 8.50, 15, 15],
        'casablanca': [8, 8, 8, 8, 8, 10, 10],
        'the wizard of oz': [10, 10, 10, 10, 10, 15, 15],
    };

    day = day.toLowerCase();
    movie = movie.toLowerCase();

    let price = movies[movie][days.indexOf(day)];

    console.log(price !== undefined ? price : 'error');
}

solve(['THE GODFATHER', 'SUNDAY']);
