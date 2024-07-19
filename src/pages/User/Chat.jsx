import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

import { LayoutSec } from "../../components/Layout";
import ModalChat from "./ModalChat";
import { IoIosArrowBack } from "react-icons/io";

const Chat = () => {
  const navigate = useNavigate();
  const [inbox, setInbox] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [cookie] = useCookies(["token", "id"]);
  const checkToken = cookie.token;

  useEffect(() => {
    const fetchChats = () => {
      axios
        .get(`/inbox`, {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          setInbox(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchChats();
  }, [checkToken]);

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <LayoutSec>
      <div className="container bg-white mx-auto p-7">
        <div className="flex flex-row">
          <div
            onClick={() => navigate("/profileTeacher")}
            className="flex text-black font-semibold cursor-pointer"
          >
            <IoIosArrowBack size={35} />
            <p className="text-xl font-poppins mt-1">Back</p>
          </div>
          <div className="mt-24">
            <p className="text-black text-4xl font-poppins">Chat</p>
            <div className="card w-96 shadow-lg border-black border mt-4 ml-20">
              <div className="card-body">
                {inbox?.map((chat, index) => (
                  <div
                    key={index}
                    id={chat.id}
                    className="flex flex-col justify-start space-y-6 cursor-pointer"
                    onClick={() => handleChatItemClick(chat)}
                  >
                    <div>
                      <div id={chat.student_id} className="flex space-x-8">
                        <img
                          src={chat.avatar}
                          className="w-14 mt-2 rounded-full object-contain"
                        />
                        <div className="mt-2 text-black font-poppins">
                          <p className="font-semibold">{chat.student_name}</p>
                          <label
                            htmlFor={`my-modal-${index}`}
                            className="btn font-semibold"
                          >
                            See Message
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      id={`my-modal-${index}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box w-11/12 max-w-5xl bg-white">
                        <ModalChat
                          mentor_id={chat.mentor_id}
                          student_id={chat.student_id}
                        />
                        <div className="modal-action">
                          <label htmlFor={`my-modal-${index}`} className="btn">
                            Close
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSec>
  );
};

export default Chat;
