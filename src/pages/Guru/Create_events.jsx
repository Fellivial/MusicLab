import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "../../components/Button";
import calendar from "../../assets/icon/calendar.webp";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

export default function CreateEvents() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [status, setStatus] = useState("");
  const { id } = useParams();

  localStorage.setItem("idTransaction", JSON.stringify(id));
  const transactionId = JSON.parse(localStorage.getItem("idTransaction") || "");

  const [response, setResponse] = useState("");

  const handleCreateEvents = (e) => {
    e.preventDefault();

    const body = {
      transaction_id: +transactionId,
    };

    axios
      .post("oauth/create-event", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { message } = res.data;
        setStatus(message);
        localStorage.setItem("status", JSON.stringify(message));
      })
      .catch((err) => {
        const { message } = err.response.data;

        setResponse(message);

        MySwal.fire({
          title: "Create Events Failed",
          text: message,
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full min-h-screen flex justify-center items-center bg-center">
        <div className="card flex flex-col w-[30rem] h-[35rem] shadow-xl text-center justify-center items-center bg-white">
          <img src={calendar} className="w-2/12" alt="Calendar Icon" />
          <h1 className="text-black font-poppins text-2xl font-bold mt-5">
            Create Your Events
          </h1>
          <p className="text-slate-400 text-md font-normal w-[20rem] mx-auto mt-3">
            An Easy Way to Create Your Events in Calendar
          </p>
          <Button
            id="btn-submitbutton"
            label="Create Events"
            className="btn mt-5 bg-button text-white px-8"
            onClick={handleCreateEvents}
          />
          {response ===
          "token oauth not generated yet, please login with google account first" ? (
            <p className="text-red-500 font-normal text-sm w-[25rem] mt-5 font-poppins text-center">
              *Please Login with your Google Account to Create Events, then
              Click This{" "}
              <span className="font-semibold text-black underline">
                <Link to="/oauthLogin">Link</Link>
              </span>{" "}
            </p>
          ) : null}
          {status === "success create event" ? (
            <Button
              id="btn-proceedgooglecalendar"
              label="See Events"
              className="btn mt-5 bg-button text-white px-12"
              onClick={() =>
                (window.location.href = "https://calendar.google.com/calendar/u/5/r")
              }
            />
          ) : (
            <Button
              id="btn-proceedgooglecalendar"
              label="See Events"
              className="btn mt-5 bg-button text-white px-12"
              onClick={() =>
                (window.location.href = "https://calendar.google.com/calendar/u/5/r")
              }
              disabled
            />
          )}
          <div
            tabIndex={0}
            className="w-[70%] collapse collapse-plus border text-slate-500 border-none bg-slate-200 rounded-box mt-5"
          >
            <div className="collapse-title text-xl font-medium">
              How to Create Events
            </div>
            <div className="collapse-content">
              <p>
                <span className="mt-2">1. Click Create Events</span>
                <span>
                  2. After The Notification Success, Click See Events To
                  redirect to Google Calendar to see Events You just Uploaded,
                  and Voilaaa
                </span>
              </p>
            </div>
          </div>
          <Button
            id="btn-kembali"
            label="Kembali"
            className="btn mt-5 text-white px-8"
            onClick={() => navigate("/historyTeacher")}
          />
        </div>
      </div>
    </div>
  );
}
