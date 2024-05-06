import Thumbnails from "../molecules/Thumbnails";
import Active from "../molecules/Active";
import { useContext, useEffect, useState } from "react";
import { queryContext } from "@/context/QueryContext";
import axios from "axios";
import { url, option } from "@/lib/TMDB";
import { MovieInterface } from "@/aliases/MovieInterface";

export default function Main() {
	const { query } = useContext(queryContext) || {};
	const [movieList, setMovieList] = useState([] as MovieInterface[]);
	const [activeMovie, setActiveMovie] = useState({} as MovieInterface);

	useEffect(() => {
		axios.get(url(query!), option).then((data) => setMovieList(data.data.results));
	}, [query]);

	useEffect(() => {
		setActiveMovie(movieList[0]);
	}, [movieList]);

	return (
		<main>
			{movieList && activeMovie && (
				<Thumbnails movieList={movieList} activeMovie={activeMovie} setActiveMovie={setActiveMovie} />
			)}
			{activeMovie && <Active activeMovie={activeMovie} />}
		</main>
	);
}
