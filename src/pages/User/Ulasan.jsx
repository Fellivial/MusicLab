import React, { useState } from "react";
import Layout from "../../components/Layout";
import ulasanImg from "../../assets/ulasan.webp";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

const Ulasan = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handlePostReview = (e) => {
    e.preventDefault();

    const body = {
      rating,
      mentor_id: id,
      comment,
    };

    axios
      .post(`/mentors/${id}/reviews`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const message = res.data;

        MySwal.fire({
          title: "Success Give Rating",
          text: message,
          showCancelButton: false,
        });
        navigate("/historyStudent");
      })
      .catch((err) => {
        const message = err.response.data;

        MySwal.fire({
          title: "Please Fill All The Form",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="w-[80%] mx-auto min-h-screen flex flex-row">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-black font-poppins font-semibold text-2xl">
            How do you feel about the class
          </h1>
          <label className="label mt-3">
            <span className="label-text text-black font-semibold text-lg font-poppins w-6/12">
              Comment
            </span>
          </label>
          <textarea
            id="input-deskripsi"
            maxLength={300}
            className="textarea textarea-bordered h-40 bg-bg-input border-slate-300 w-11/12 text-black font-semibold font-popins bg-white"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div>
            <h1 className="text-black font-poppins font-semibold text-2xl mt-10">
              Rating
            </h1>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star text-6xl">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
          <Button
            id="btn-submitulasan"
            label="Submit Ulasan"
            className="btn bg-button text-white mt-5"
            onClick={handlePostReview}
          />
        </div>
        <div className="flex justify-center items-center flex-1 flex-col">
          <img src={ulasanImg} className="w-11/12" alt="Ulasan" />
        </div>
      </div>
    </Layout>
  );
};

export default Ulasan;
