import { FC, useState } from "react";
import "./FormReg.css";
import { useNavigate } from "react-router-dom";
export enum funcE {
	signIn = "signIn",
	login = "login",
}
interface Props {
	titleText: string;
	url: string;
	func: funcE;
}

const FormReg: FC<Props> = ({ titleText, url, func }) => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();
	return (
		<div className="form-wrapp">
			<h2>{titleText}</h2>
			<form
				method="post"
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						const response = await (
							await fetch(`http://localhost:3500/${url}`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json;charset=utf-8",
								},
								body: JSON.stringify({
									name: name,
									surname: surname,
								}),
							})
						).json();
						if (response.error) {
							setError(response.error);
						} else {
							console.log(response);
							// if(func === funcE.login){

							// }
							localStorage.setItem("userId", response.id);
							navigate("/posts");
						}
					} catch (err) {
						console.log(err);
					}
				}}
			>
				<input
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					placeholder="name"
				/>
				<input
					type="text"
					value={surname}
					onChange={(e) => {
						setSurname(e.target.value);
					}}
					placeholder="surname"
				/>
				<button type="submit">ОТПРАВИТЬ</button>
				<p style={{ color: "red" }}>{error}</p>
			</form>
		</div>
	);
};

export default FormReg;
