import { useEffect, useState, useContext } from "react";
import { appStateContext } from "../../context/AppStateContext";
import { motion } from "framer-motion";
import axios from "axios";
import { url, option } from "@/lib/TMDB";
import { MovieInterface } from "@/aliases/MovieInterface";

const sty = {
	container:
		"overflow-x-hidden w-screen min-h-screen py-24 px-8 grid grid-cols-1 gap-8 sm:px-20 sm:grid-cols-2 sm:gap-10 lg:px-40 lg:gap-12 cursor-pointer",

	titleWrapper: "capitalize text-center flex flex-col gap-3 sm:text-start sm:col-span-2",
	title: "tracking-wider font-bold text-4xl sm:text-5xl lg:text-6xl",
	tagline: "tracking-wide font-thin text-2xl sm:text-3xl lg:text-4xl",

	infoWrapper: "flex flex-col gap-2 sm:col-span-2",
	info: "flex flex-col gap-1 sm:flex-row sm:gap-4 *:tracking-wider *:proportional-nums *:font-light *:text-start *:text-xs *:sm:text-sm *:lg:text-base",
	voteBar:
		"overflow-hidden w-3/4 rounded-sm border border-slate-500/50 bg-slate-800/50 backdrop-blur-sm sm:w-3/5 lg:w-2/5 *:bg-gradient-to-r *:from-sky-500 *:to-cyan-300 *:tracking-tighter *:font-bold *:text-center *:text-slate-950 *:text-xs *:lg:text-sm",

	poster: "object-cover w-40 aspect-[7/10] m-auto rounded-sm sm:w-48 lg:w-60",

	overview: "indent-5 font-thin tracking-widest text-justify text-xs sm:text-sm lg:text-base",

	status: "w-fit px-2 border uppercase tracking-wide font-light text-base sm:text-lg lg:text-xl",

	companies:
		"overflow-hidden rounded-2xl border border-slate-500/50 bg-slate-800/50 backdrop-blur-md grid grid-cols-2 place-items-stretch hover:backdrop-brightness-50 transition duration-1000 sm:col-span-2 sm:grid-cols-3 lg:grid-cols-4",
	company: "object-contain p-4 grayscale hover:grayscale-0 hover:bg-slate-200 transition duration-700 sm:p-5 lg:p-6"
};

const wrapperVars = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5
		}
	},
	hidden: {
		opacity: 0,
		scale: 1.25,
		backgroundPosition: "bottom",
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5
		}
	}
};

const itemVars = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
};

export default function Active({ activeMovie }: { activeMovie: MovieInterface }) {
	const { appState, setAppState } = useContext(appStateContext) || {};
	const [movieDetail, setMovieDetail] = useState<MovieInterface>({} as MovieInterface);

	useEffect(() => {
		if (activeMovie.id) {
			axios.get(url({ type: "DETAIL", movieId: activeMovie.id }), option).then((data) => setMovieDetail(data.data));
		}
	}, [activeMovie]);

	interface customStyle {
		backgroundImage?: string;
		backgroundSize?: string;
		backgroundPosition?: string;
	}

	const customStyle: customStyle = {
		backgroundImage: `linear-gradient(#00000055, #00000077, #00000088, #00000088, #00000077, #00000055), url(https://image.tmdb.org/t/p/w1280${activeMovie.backdrop_path})`,
		backgroundSize: "cover",
		backgroundPosition: "center"
	};

	const handleClick = () => setAppState!({ ...appState!, thumbnailsIsShown: !appState?.thumbnailsIsShown });

	return (
		<motion.article
			key={activeMovie.id}
			onClick={handleClick}
			className={sty.container}
			style={activeMovie.backdrop_path ? { ...customStyle } : undefined}
			variants={wrapperVars}
			initial="hidden"
			animate="visible"
			transition={{ ease: "linear", duration: 0.3 }}
		>
			<motion.div
				className={sty.titleWrapper}
				variants={itemVars}
				initial="hidden"
				animate="visible"
				transition={{ ease: "linear", duration: 1 }}
			>
				{movieDetail.title && <h2 className={sty.title}>{movieDetail.title}</h2>}

				{movieDetail.tagline && <p className={sty.tagline}>{movieDetail.tagline}</p>}
			</motion.div>

			<motion.div
				className={sty.infoWrapper}
				variants={itemVars}
				initial="hidden"
				animate="visible"
				transition={{ ease: "linear", duration: 1 }}
			>
				<div className={sty.info}>
					{movieDetail.release_date && <p>{movieDetail.release_date.split("-")[0]}</p>}

					{movieDetail.genres && <p>{movieDetail.genres.map((genre) => genre.name).join(", ")}</p>}

					{movieDetail.runtime && (
						<p>
							{Math.floor(movieDetail.runtime / 60)}h {movieDetail.runtime % 60}m
						</p>
					)}
				</div>

				{movieDetail.vote_average && (
					<div className={sty.voteBar}>
						<div style={{ width: `${movieDetail.vote_average * 10}%` }}>{movieDetail.vote_average.toFixed(1)}</div>
					</div>
				)}
			</motion.div>

			{movieDetail.poster_path && (
				<motion.img
					src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
					alt={movieDetail.title}
					className={sty.poster}
					variants={itemVars}
					initial="hidden"
					animate="visible"
					transition={{ ease: "linear", duration: 1 }}
				/>
			)}

			{movieDetail.overview && (
				<motion.p
					className={sty.overview}
					variants={itemVars}
					initial="hidden"
					animate="visible"
					transition={{ ease: "linear", duration: 1 }}
				>
					{movieDetail.overview}
				</motion.p>
			)}

			{movieDetail.status && (
				<motion.p
					className={sty.status}
					variants={itemVars}
					initial="hidden"
					animate="visible"
					transition={{ ease: "linear", duration: 1 }}
				>
					{movieDetail.status}
				</motion.p>
			)}

			{movieDetail.production_companies && (
				<motion.div
					className={sty.companies}
					variants={itemVars}
					initial="hidden"
					animate="visible"
					transition={{ ease: "linear", duration: 1 }}
				>
					{movieDetail.production_companies.map((company) => (
						<img
							key={company.id}
							src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
							alt={company.name}
							className={sty.company}
						/>
					))}
				</motion.div>
			)}
		</motion.article>
	);
}
