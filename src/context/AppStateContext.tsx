import { createContext, useState, useEffect, useContext } from "react";
import { queryContext } from "./QueryContext";
import { AppStateInterface } from "@/aliases/AppStateInterface";

const initState = {
	viewport: window.innerWidth,
	headerIsOpen: false,
	thumbnailsIsShown: true
};

interface AppStateContext {
	appState: AppStateInterface;
	setAppState: React.Dispatch<React.SetStateAction<AppStateInterface>>;
}

export const appStateContext = createContext<AppStateContext | null>(null);

export default function AppStateContextProvider({ children }: any) {
	const { query } = useContext(queryContext) || {};
	const [appState, setAppState] = useState(initState);

	const handleResize = () => {
		setAppState((appState) => ({ ...appState, viewport: window.innerWidth }));
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setAppState(initState);
	}, [query]);

	return <appStateContext.Provider value={{ appState, setAppState }}>{children}</appStateContext.Provider>;
}
