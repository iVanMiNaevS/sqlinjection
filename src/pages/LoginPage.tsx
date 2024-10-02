import React from "react";
import FormReg from "../components/FormReg/FormReg";
import { funcE } from "../components/FormReg/FormReg";
export const LoginPage = () => {
	return (
		<div>
			<FormReg titleText="Login" url="user/login" func={funcE.login} />
		</div>
	);
};
