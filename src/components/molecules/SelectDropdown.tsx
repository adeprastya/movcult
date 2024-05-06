import * as Select from "@radix-ui/react-select";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useContext } from "react";
import { queryContext } from "@/context/QueryContext";
import axios from "axios";
import { url, option } from "@/lib/TMDB";

const sty = {
	trigger:
		"px-2 py-0.5 rounded-sm border-2 border-slate-400/25 outline-none bg-slate-800/50 flex gap-1 items-center uppercase tracking-widest font-light text-xs sm:text-sm lg:text-base focus:border-slate-400 focus:bg-slate-800 transition duration-500",
	content:
		"z-50 max-h-72 overflow-y-auto p-2 rounded-sm border border-slate-400/25 bg-slate-800/75 backdrop-blur-sm capitalize tracking-widest font-light text-center text-slate-200 text-xs sm:text-sm lg:text-base",
	item: "outline-none p-0.5 focus:text-slate-200 focus:bg-slate-400/25 cursor-pointer"
};

interface genreInterface {
	id?: number;
	name?: string;
}

export default function SelectDropdown() {
	const [genres, setGenres] = useState<Array<genreInterface>>([]);
	const { setQuery } = useContext(queryContext) || {};

	const handleClick = (value: string) => {
		setQuery!({ type: "DISCOVER", query: value });
	};

	useEffect(() => {
		axios.get(url({ type: "GENRE" }), option).then((data) => setGenres(data.data.genres));
	}, []);

	return (
		<Select.Root name="genre" onValueChange={(value) => handleClick(value)}>
			<Select.Trigger aria-label="Genre" className={sty.trigger}>
				<Select.Value placeholder="Discover" />
				<Select.Icon>
					<CaretDownIcon />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content position="popper" align="center" className={sty.content}>
					<Select.Viewport>
						{genres.length > 1 &&
							genres.map((genre) => (
								<SelectItem key={genre.id} value={genre.id!.toString()}>
									{genre.name}
								</SelectItem>
							))}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}

function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
	return (
		<Select.Item value={value} className={sty.item}>
			<Select.ItemText>{children}</Select.ItemText>
		</Select.Item>
	);
}
