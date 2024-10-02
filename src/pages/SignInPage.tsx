import React from "react";
import FormReg from "../components/FormReg/FormReg";
import { funcE } from "../components/FormReg/FormReg";
export const SignInPage = () => {
	return <FormReg titleText="SignIn" url="user/sign-in" func={funcE.signIn} />;
};
