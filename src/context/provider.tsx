import QueryContextProvider from "./QueryContext";
import AppStateContextProvider from "./AppStateContext";

export default function Provider({ children }: any) {
	return (
		<QueryContextProvider>
			<AppStateContextProvider>{children}</AppStateContextProvider>
		</QueryContextProvider>
	);
}
