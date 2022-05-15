const apiConfigs = {
    baseUrl : 'https://api.themoviedb.org/3',
    apiKey : 'b58c8dc06f7a8750be989c781287902d',
    originalImage : 
    (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image : 
    (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfigs 