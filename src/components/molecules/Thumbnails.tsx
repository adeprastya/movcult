import { useContext } from "react";
import { appStateContext } from "@/context/AppStateContext";
import { motion } from "framer-motion";
import { MovieInterface } from "@/aliases/MovieInterface";

const sty = {
	wrapper:
		"z-10 fixed bottom-4 right-0 w-9/12 p-6 bg-slate-950/90 shadow-[0_0_60px_60px_rgb(0,0,0)] shadow-slate-950/90 grid grid-flow-col auto-cols-max gap-8 overflow-x-scroll overflow-y-hidden transition duration-1000 sm:w-7/12 sm:gap-10 lg:w-6/12 lg:gap-12 scrollbar-custom snap-x",
	item: "overflow-hidden relative box-border w-40 aspect-[7/10] rounded-sm transition duration-1000 sm:w-44 lg:w-52 cursor-pointer group snap-start",
	itemActive: "border-2 border-sky-400 *:translate-y-0",
	title:
		"absolute top-0 -translate-y-full w-full p-1 bg-slate-900/75 font-bold text-sm text-center group-hover:translate-y-0 transition duration-700 sm:text-md lg:text-xl",
	vote: "absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-[150%] aspect-square p-2 rounded-full bg-slate-900/75 font-thin text-lg group-hover:translate-y-0 transition duration-700 sm:text-xl lg:text-2xl"
};

const wrapperVars = {
	show: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5
		}
	},
	hide: {
		opacity: 1,
		y: "150%",
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5
		}
	},
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren"
		}
	}
};

const itemVars = {
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.15,
			duration: 0.3
		}
	}),
	hidden: {
		opacity: 0,
		y: "100%"
	}
};

export default function Thumbnails({
	movieList,
	activeMovie,
	setActiveMovie
}: {
	movieList: MovieInterface[];
	activeMovie: MovieInterface;
	setActiveMovie: Function;
}) {
	const { appState } = useContext(appStateContext) || {};

	return (
		<motion.div
			className={sty.wrapper}
			variants={wrapperVars}
			initial="hidden"
			animate={appState?.thumbnailsIsShown ? "show" : "hide"}
		>
			{movieList.map((movie, i) => (
				<ThumbnailItem
					key={movie.id}
					movie={movie}
					activeMovie={activeMovie}
					setActiveMovie={setActiveMovie}
					custom={i}
				/>
			))}
		</motion.div>
	);
}

function ThumbnailItem({
	movie,
	activeMovie,
	setActiveMovie,
	custom
}: {
	movie: MovieInterface;
	activeMovie: MovieInterface;
	setActiveMovie: Function;
	custom: number;
}) {
	const handleClick = () => setActiveMovie(movie);

	const customStyle = {
		backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
		backgroundSize: "cover",
		backgroundPosition: "center"
	};

	return (
		<motion.div
			onClick={handleClick}
			className={`${sty.item} ${movie.id === activeMovie.id && sty.itemActive}`}
			style={{ ...customStyle }}
			variants={itemVars}
			initial="hidden"
			animate="visible"
			custom={custom}
		>
			<h2 className={sty.title}>{movie.title}</h2>
			<p className={sty.vote}>{movie?.vote_average?.toFixed(1)}</p>
		</motion.div>
	);
}
