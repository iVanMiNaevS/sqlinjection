import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "./components/Header/Header";

function App() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	return (
		<div className="App">
			<button>
				<Link to={"/login"}>LogIn</Link>
			</button>
			<button>
				<Link to={"/SignIn"}>SignIn</Link>
			</button>
		</div>
	);
}

export default App;
