import { createContext, useState } from "react";
import { UrlInterface } from "@/aliases/UrlInterface";

interface QueryContext {
	query: UrlInterface;
	setQuery: React.Dispatch<React.SetStateAction<UrlInterface>>;
}

export const queryContext = createContext<QueryContext | null>(null);

export default function QueryContextProvider({ children }: any) {
	const [query, setQuery] = useState({ type: "BROWSE", query: "now_playing" } as UrlInterface);

	return <queryContext.Provider value={{ query, setQuery }}>{children}</queryContext.Provider>;
}
