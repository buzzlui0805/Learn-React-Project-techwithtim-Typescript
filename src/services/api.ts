const API_KEY: string = (import.meta.env.VITE_API_KEY as string);
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
	const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
	const data = await response.json();
	return data.results;
};

export const searchMovies = async (query: string) => {
	const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
	const data = await response.json();
	return data.results;
};
