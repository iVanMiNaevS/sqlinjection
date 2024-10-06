import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.getItem("userId") && navigate("/posts");
	}, []);
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
