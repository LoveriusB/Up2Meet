import { LoginFormValues } from "./api";

export const loginRequest = async (values: LoginFormValues) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: values.email,
    password: values.password,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const result = await fetch(
    "http://localhost:3001/user/login",
    requestOptions
  );

  return await result.json();
};
