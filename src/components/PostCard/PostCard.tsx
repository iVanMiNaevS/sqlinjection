import React, { FC, useEffect, useState } from "react";
import "./PostCard.css";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
export interface IPost {
	id: number;
	title: string;
	content: string;
	comments: string;
	user_id: number;
	protected: boolean;
}

type props = {
	post: IPost;
	myPost: boolean;
	setUpdate?: Dispatch<SetStateAction<boolean>>;
};

type body = {
	id: number;
};
export const PostCard: FC<props> = ({ post, myPost, setUpdate }) => {
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [deleteErr, setDeleteErr] = useState("");
	const navigate = useNavigate();
	const [userId, setUserId] = useState();
	useEffect(() => {
		const id = post.user_id;
		const body: body = {
			id,
		};
		const response = fetch("http://localhost:3500/user/getOne", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then((data) => data.json())
			.then((res) => {
				setName(`${res.name} ${res.surname}`);
				setUserId(res.id);
			})
			.catch((err) => setError(err.message));
	}, [post]);
	return (
		<div className="postCard">
			{error ? (
				<p color="red">{error}</p>
			) : (
				<>
					<h3>{post.title}</h3>
					<p>{post.content}</p>
					<div className="postCard-btns">
						{myPost && (
							<div className="actionBtns">
								<button className="action-btn">изменить</button>
								<button
									className="action-btn delete"
									onClick={() => {
										const body: body = {
											id: post.id,
										};

										fetch("http://localhost:3500/post/delete", {
											method: "DELETE",
											headers: {
												"Content-Type": "application/json;charset=utf-8",
											},
											body: JSON.stringify(body),
										})
											.then((data) => data.json())
											.then((res) => {
												if (setUpdate) {
													setUpdate((prev) => !prev);
												}
											})
											.catch((err) => setDeleteErr(err.message));
									}}
								>
									удалить
								</button>
								{post.protected ? (
									<p className="status">Скрыт</p>
								) : (
									<p className="status">Публичный</p>
								)}
								{deleteErr && <p>{deleteErr}</p>}
							</div>
						)}
						<button
							onClick={() => {
								navigate({
									pathname: "/posts-by-user",
									search: `?id=${userId}`,
								});
							}}
						>
							<h3 className="maker">{name}</h3>
						</button>
					</div>
				</>
			)}
		</div>
	);
};
