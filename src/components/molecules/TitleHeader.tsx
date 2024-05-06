import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { appStateContext } from "@/context/AppStateContext";

const sty = {
	wrapper: "w-full px-4 flex justify-between items-center sm:px-8 lg:p-0",
	h1: "uppercase tracking-widest font-light  text-sm sm:text-base lg:text-lg",
	btn: "rounded hover:bg-slate-400/25 focus:bg-slate-400/25 lg:hidden transition duration-500 cursor-pointer",
	icon: "w-3/4 h-3/4"
};

export default function TitleHeader() {
	const { appState, setAppState } = useContext(appStateContext) || {};

	const handleClick = () => {
		setAppState!((appState) => ({ ...appState, headerIsOpen: !appState.headerIsOpen }));
	};

	return (
		<div className={sty.wrapper}>
			<h1 className={sty.h1}>MOVCULT</h1>
			{appState?.headerIsOpen ? (
				<Button variant="ghost" size="icon" onClick={handleClick} className={sty.btn}>
					<Cross1Icon className={sty.icon} />
				</Button>
			) : (
				<Button variant="ghost" size="icon" onClick={handleClick} className={sty.btn}>
					<HamburgerMenuIcon className={sty.icon} />
				</Button>
			)}
		</div>
	);
}
