import React, { useState } from "react";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

interface ICreatePostData {
	title: string;
	text: string;
	privatePost: boolean;
	userId: number | null;
}

export const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [privatePost, setPrivatePost] = useState(true);
	const [error, setError] = useState("");
	const [validErr, setValidErr] = useState({
		emptyErr: "",
		textArea: "",
		hasErr: false,
	});
	const navigate = useNavigate();
	function validation() {
		const e = { emptyErr: "", textArea: "", hasErr: false };
		if (title === "" || text === "") {
			e.emptyErr = "Нужно заполнить все поля";
			e.hasErr = true;
		}
		if (text.length > 255) {
			e.textArea = "текст поста максимум 255 символов";
			e.hasErr = true;
		}
		setValidErr(e);
		return e.hasErr;
	}
	return (
		<div className="container create-post">
			<h2>Create Post</h2>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (localStorage.getItem("userId")) {
						if (!validation()) {
							const body: ICreatePostData = {
								title: title,
								text: text,
								userId: Number(localStorage.getItem("userId")),
								privatePost: privatePost,
							};
							try {
								const response = await (
									await fetch("http://localhost:3500/post/create", {
										method: "POST",
										headers: {
											"Content-Type": "application/json;charset=utf-8",
										},
										body: JSON.stringify(body),
									})
								).json();
								navigate({
									pathname: "/my-posts",
									search: `?id=${localStorage.getItem("userId")}`,
								});
							} catch (e) {
								setError((e as Error).message);
							}
						}
					}
				}}
			>
				<input
					type="text"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="title"
				/>
				<textarea
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					placeholder="text post"
				/>
				{validErr.textArea && (
					<div style={{ color: "red", textAlign: "center" }}>
						{validErr.textArea}
					</div>
				)}
				<div className="radio-btns">
					<h3>Status post</h3>
					<div className="radio-btn__wrapp">
						<input
							value="false"
							onChange={(e) => {
								setPrivatePost(JSON.parse(e.target.value.toLowerCase()));
							}}
							name="statusPost"
							id="public"
							type="radio"
						/>
						<label htmlFor="public">public</label>
					</div>
					<div className="radio-btn__wrapp">
						<input
							value="true"
							onChange={(e) => {
								setPrivatePost(JSON.parse(e.target.value.toLowerCase()));
							}}
							name="statusPost"
							id="private"
							type="radio"
							defaultChecked
						/>
						<label htmlFor="private">private</label>
					</div>
				</div>
				<button type="submit">Create</button>
				{error && (
					<div style={{ color: "red", textAlign: "center" }}>{error}</div>
				)}
				{validErr.emptyErr && (
					<div style={{ color: "red", textAlign: "center" }}>
						{validErr.emptyErr}
					</div>
				)}
			</form>
		</div>
	);
};
