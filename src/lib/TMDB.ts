import { UrlInterface } from "@/aliases/UrlInterface";

// TMDB API
const BASE_URL = "https://api.themoviedb.org/3";

export const option = {
	headers: {
		accept: "application/json",
		Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGRhODE0MDFjMWU2NGY3MTQ2MTI4ZmY2ZWQ0NjFmNiIsInN1YiI6IjY1MDkxYTgxOGE4OGIyMDEzY2ZiMGVjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nGc826uvcd63BrOBHcLF1UILL3Azu6qy4Wx3xn6kow`
	}
};

const param = {
	adult: false,
	video: false
};

export const url = ({ type, query = "now_playing", page = "1", movieId, language = "en" }: UrlInterface) => {
	let url = BASE_URL;

	switch (type) {
		case "BROWSE":
			url += `/movie/${query}?`;
			break;
		case "SEARCH":
			url += `/search/movie?query=${query}`;
			break;
		case "DISCOVER":
			url += `/discover/movie?&with_genres=${query}`;
			break;
		case "DETAIL":
			return (url += `/movie/${movieId}`);
		case "GENRE":
			return (url += `/genre/movie/list?language=${language}`);
		default:
			throw new Error(`Unknown Type: ${type}`);
	}

	return (url += `&include_adult=${param.adult}&include_video=${param.video}&page=${page}`);
};
