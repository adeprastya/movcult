import Header from "../components/organisms/Header";
import Main from "../components/organisms/Main";
import { motion, AnimatePresence } from "framer-motion";

const sty = {
	container: "w-screen min-h-screen bg-slate-900 text-slate-200"
};

const vars = {
	visible: {
		opacity: 1
	},
	hidden: {
		opacity: 0
	}
};

export default function Home() {
	return (
		<AnimatePresence>
			<motion.div className={sty.container} variants={vars} initial="hidden" animate="visible" exit="hidden">
				<Header />
				<Main />
			</motion.div>
		</AnimatePresence>
	);
}
