import React from "react";
import fb from "../assets/icon/Facebook 2.webp";
import ig from "../assets/icon/Instragram 2.webp";
import yt from "../assets/icon/Youtube 1.webp";
import twt from "../assets/icon/Twitter 2.webp";

export default function Footer() {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:mt-0 mt-24 h-[15rem] justify-center items-center overflow-hidden">
      <div className="flex-1">
        <h1 className="text-button font-bold text-4xl font-poppins text-center">
          MusicLab
        </h1>
      </div>
      <div className="flex-1">
        <p className="text-slate-500 font-semibold font-poppins text-center mt-3">
          &copy; 2023 All Rights Reserved MusicLab
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex flex-row">
          <img src={fb} alt="Facebook" className="w-[3.5rem] h-[3rem]" />
          <img src={ig} alt="Instagram" className="w-[3.5rem] h-[3rem] ml-2" />
          <img src={yt} alt="YouTube" className="w-[3.5rem] h-[3rem] ml-2" />
          <img src={twt} alt="Twitter" className="w-[3.5rem] h-[3rem] ml-2" />
        </div>
      </div>
    </div>
  );
}
