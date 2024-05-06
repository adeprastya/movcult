import "@/css/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "@/context/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";

const router = createBrowserRouter([
	{
		path: "/movcult",
		element: <Landing />
	},
	{
		path: "/movcult/home",
		element: <Home />
	}
]);

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
