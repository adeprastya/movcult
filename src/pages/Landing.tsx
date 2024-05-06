import { buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { url, option } from "@/lib/TMDB";
import { motion, AnimatePresence } from "framer-motion";
import { MovieInterface } from "@/aliases/MovieInterface";
import { Link } from "react-router-dom";

const sty = {
	container: "w-screen h-screen bg-slate-900 text-slate-200 flex justify-center items-center",
	wrapper: "relative h-1/2 rounded-xl bg-slate-700 overflow-hidden group",
	h1: "absolute top-1/4 w-full font-bold text-2xl text-center sm:text-3xl lg:text-4xl",
	btn: "absolute bottom-1/4 left-1/2 -translate-x-1/2 font-thin tracking-widest rounded-md border-sky-400 bg-sky-900/50 backdrop-blur-sm hover:bg-sky-600/75 focus:bg-sky-600/75 transition duration-500",
	background: "brightness-75 flex flex-nowrap gap-2 group-hover:brightness-50 transition duration-700",
	backgroundCol: "flex flex-col",
	backgroundItem: "w-28 h-36 sm:w-36 sm:h-52 lg:w-44 lg:h-60"
};

const vars = {
	visible: {
		opacity: 1
	},
	hidden: {
		opacity: 0
	}
};

export default function Landing() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(url({ type: "BROWSE", query: "now_playing" }), option).then((data) => setMovies(data.data.results));
	}, []);

	return (
		<AnimatePresence>
			<motion.section className={sty.container} variants={vars} initial="hidden" animate="visible" exit="hidden">
				<div className={sty.wrapper}>
					<div className={sty.background}>
						<BackgroundCol movies={movies.slice(0, 5)} classname="animate-[slide-y_15.3s_linear_infinite]" />
						<BackgroundCol movies={movies.slice(5, 10)} classname="animate-[slide-y_15.5s_linear_infinite]" />
						<BackgroundCol movies={movies.slice(10, 15)} classname="animate-[slide-y_15.25s_linear_infinite]" />
						<BackgroundCol movies={movies.slice(15, 20)} classname="animate-[slide-y_15s_linear_infinite]" />
					</div>

					<h1 className={sty.h1}>MOVCULT</h1>

					<Link
						to="/movcult/home"
						className={buttonVariants({ variant: "outline", size: "lg", className: sty.btn })}
					>
						PLAY
					</Link>
				</div>
			</motion.section>
		</AnimatePresence>
	);
}

function BackgroundCol({ movies, classname }: { movies: MovieInterface[]; classname: string }) {
	return (
		<div className={`${sty.backgroundCol} ${classname}`}>
			{movies.length > 0 &&
				movies.map((movie) => {
					return <BackgroundItem key={movie.id} movie={movie} />;
				})}
			{movies.length > 0 &&
				movies.map((movie) => {
					return <BackgroundItem key={movie.id} movie={movie} />;
				})}
		</div>
	);
}

function BackgroundItem({ movie }: { movie: MovieInterface }) {
	return (
		<div
			className={sty.backgroundItem}
			style={{
				backgroundImage: `linear-gradient(#000000cc, transparent, transparent, transparent, transparent, #000000cc) ,url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
				backgroundSize: "cover",
				backgroundPosition: "center"
			}}
		/>
	);
}
