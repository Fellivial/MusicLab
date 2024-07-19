import React, { useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import { useCookies } from "react-cookie";
import googleLogo from "../../assets/icon/search (1).webp";
import bgImage from "../../assets/poster.webp";

const background = {
  backgroundImage: `url(${bgImage})`,
  width: "100%",
  height: "auto",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function OauthLogin() {
  const [, setCookie] = useCookies(["token", "role", "id"]);
  const [tokenOauth, setTokenOauth] = useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setTokenOauth(tokenResponse.access_token);
      MySwal.fire({
        title: "Klik Proceed To Login To Continue",
        showCancelButton: false,
      });
    },
  });

  const handleLoginOauth = (e) => {
    e.preventDefault();

    const body = {
      token_oauth: tokenOauth,
    };

    axios
      .post("/login/oauth", body)
      .then((res) => {
        const { data, message } = res.data;

        setCookie("role", data.role, { path: "/" });
        setCookie("token", data.token, { path: "/" });
        setCookie("id", data.id, { path: "/" });

        MySwal.fire({
          title: "Success Login Using Google Account",
          text: message,
          showCancelButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        const { message } = err.response.data;

        MySwal.fire({
          title: "Please Using Valid Email Account",
          text: message,
          showCancelButton: false,
        });
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div
          className="w-full min-h-screen flex justify-center items-center bg-center"
          style={background}
        >
          <div className="card flex flex-col w-[30rem] h-[35rem] shadow-xl text-center justify-center items-center bg-white">
            <img src={googleLogo} className="w-2/12" alt="Google Logo" />
            <h1 className="text-black font-poppins text-2xl font-bold mt-5">
              Welcome To MusicLab
            </h1>
            <p className="text-slate-400 text-md font-normal w-[20rem] mx-auto mt-3">
              You are one step closer to access with Google User Account
            </p>
            <Button
              id="btn-chooseaccount"
              label="Choose Account"
              className="btn bg-button text-white px-8 mt-5"
              onClick={() => login()}
            />
            <Button
              id="btn-logingoogle"
              label="Proceed to Login"
              className="btn bg-button text-white px-8 mt-5"
              onClick={(e) => handleLoginOauth(e)}
            />
            <p className="mt-5">
              *Use this account to Login with Google Account
            </p>
            <p className="mt-2">User : musiclabsejahtera@gmail.com</p>
            <p>Password : @Qwerty1234</p>
            <Button
              id="btn-kembali"
              label="Kembali"
              className="btn mt-5"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const Success = () => {
  return <>Success Login</>;
};
