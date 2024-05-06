import TitleHeader from "@/components/molecules/TitleHeader";
import ButtonBrowseList from "@/components/molecules/ButtonBrowseList";
import SearchField from "@/components/molecules/SearchField";
import SelectDropdown from "@/components/molecules/SelectDropdown";
import { useContext } from "react";
import { appStateContext } from "@/context/AppStateContext";
import { motion, AnimatePresence } from "framer-motion";

const sty = {
	container:
		"z-20 fixed top-0 w-screen border-b border-slate-500/50 divide-y divide-slate-500/75 bg-slate-800/50 backdrop-blur-sm grid grid-flow-row hover:backdrop-blur-md transition duration-1000 lg:px-8 lg:divide-none lg:grid-flow-col lg:justify-between",
	wrapper: "py-4 flex flex-col gap-4 items-center justify-between lg:flex-row"
};

const wrapperVars = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
};

const itemVars = {
	hidden: { opacity: 0, y: -100 },
	visible: { opacity: 1, y: 0 }
};

export default function Header() {
	const { appState } = useContext(appStateContext) || {};

	return (
		<motion.header className={sty.container} variants={wrapperVars} initial="hidden" animate="visible">
			<div className={sty.wrapper}>
				<TitleHeader />
			</div>

			<AnimatePresence>
				{(appState!.viewport > 1024 || appState!.headerIsOpen) && (
					<motion.div className={sty.wrapper} variants={itemVars} initial="hidden" animate="visible" exit="hidden">
						<ButtonBrowseList />
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{(appState!.viewport > 1024 || appState!.headerIsOpen) && (
					<motion.div
						className={sty.wrapper}
						variants={itemVars}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ ease: "easeInOut", delay: 0.2 }}
					>
						<SearchField />

						<SelectDropdown />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
