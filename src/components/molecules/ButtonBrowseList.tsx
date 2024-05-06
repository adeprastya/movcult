import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { queryContext } from "@/context/QueryContext";

const sty = {
	button:
		"uppercase tracking-widest rounded font-light text-xs hover:bg-slate-400/25 focus:bg-slate-400/25 transition duration-500"
};

export default function ButtonBrowseList() {
	const { setQuery } = useContext(queryContext) || {};

	const handleClick = (value: string) => {
		setQuery!({ type: "BROWSE", query: value });
	};

	return (
		<>
			<Button variant="ghost" onClick={() => handleClick("now_playing")} className={sty.button}>
				Now Playing
			</Button>
			<Button variant="ghost" onClick={() => handleClick("popular")} className={sty.button}>
				Popular
			</Button>
			<Button variant="ghost" onClick={() => handleClick("top_rated")} className={sty.button}>
				Top Rated
			</Button>
			<Button variant="ghost" onClick={() => handleClick("upcoming")} className={sty.button}>
				Upcoming
			</Button>
		</>
	);
}
