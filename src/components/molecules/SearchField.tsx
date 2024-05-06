import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { queryContext } from "@/context/QueryContext";
import { debounce } from "@/lib/fnUtils";

const sty = {
	wrapper: "relative",
	icon: "absolute top-1/2 -translate-y-1/2 left-2.5 w-6 h-6 text-slate-400 cursor-pointer",
	input:
		"w-44 ps-10 rounded-sm border border-slate-400/25 outline-none bg-slate-800/50 tracking-wide font-light text-sm focus:border-slate-400 focus:bg-slate-800 sm:w-72 sm:text-base lg:w-0 lg:ps-8 lg:focus:w-60 lg:focus:ps-10 lg:text-lg transition-all duration-500"
};

export default function SearchField() {
	const { setQuery } = useContext(queryContext) || {};

	const debouncedSetQuery = debounce(setQuery!);

	const handleKeyUp = (e: any) => {
		if (e.key !== "Tab") {
			debouncedSetQuery({ type: "SEARCH", query: e.target.value });
		}
	};

	return (
		<div className={sty.wrapper}>
			<label htmlFor="search">
				<MagnifyingGlassIcon className={sty.icon} />
			</label>

			<Input onKeyUp={handleKeyUp} type="search" id="search" aria-label="search" className={sty.input} />
		</div>
	);
}
