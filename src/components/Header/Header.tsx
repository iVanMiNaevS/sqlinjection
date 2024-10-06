import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
export const Header = () => {
	const navigate = useNavigate();

	return (
		<header>
			<div className="logo">
				<img
					src="https://avatars.mds.yandex.net/i?id=b002fe2cca3e4057b867bb73dcee6e3680daec4b-9065887-images-thumbs&n=13"
					alt="logo"
				/>
			</div>
			{localStorage.getItem("userId") && (
				<div className="buttons">
					<button
						onClick={() =>
							navigate({
								pathname: "/posts",
								search: `?protected=false`,
							})
						}
					>
						Посты
					</button>
					<button>
						<Link to={"/create-post"}>Создать пост</Link>
					</button>
					<button
						onClick={() =>
							navigate({
								pathname: "/my-posts",
								search: `?id=${localStorage.getItem("userId")}`,
							})
						}
					>
						Мои посты
					</button>
					<button
						onClick={() => {
							localStorage.removeItem("userId");
							navigate("/");
						}}
						className="header__button"
					>
						Выйти
					</button>
				</div>
			)}
		</header>
	);
};
