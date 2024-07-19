import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Poster from "../../assets/poster_no-bg.webp";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import axios from "axios";

export default function Genre() {
  const MySwal = withReactContent(Swal);
  const [, setLoading] = useState(false);
  const [genre, setGenre] = useState([]);
  const [genreId, setGenreId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataGenre = () => {
      setLoading(true);

      axios
        .get("/genres")
        .then((res) => {
          const { data } = res.data;
          setGenre(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    };
    fetchDataGenre();
  }, []);

  const handlePostGenre = (e) => {
    e.preventDefault();

    const body = {
      genre_id: +genreId,
    };

    axios
      .post("mentors/genres", body)
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        navigate(`/profileTeacher`);
      })
      .catch((err) => {
        const { message } = err.response.data;

        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="flex-1 w-full mt-20">
          <h2 className="text-4xl lg:text-6xl text-center text-button font-poppins font-bold">
            MusicLab
          </h2>
          <img src={Poster} className="w-4/12 lg:w-2/12 mx-auto mt-8" alt="Poster" />
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-xl lg:text-2xl text-center text-black font-poppins font-bold mt-10">
            Genre Musik Apa yang Ingin Anda Ajarkan
          </h1>
          <div className="flex flex-col lg:flex-row w-9/12 lg:w-[50%] mx-auto mt-8">
            <div className="flex-1 lg:mt-0 mt-5">
              <div className="form-control mx-auto w-11/12 lg:w-9/12 max-w-xs">
                <select
                  className="select select-bordered text-slate-600 border-slate-400 bg-select font-semibold font-poppins"
                  onChange={(e) => setGenreId(e.target.value)}
                >
                  <option value="">Pilih Salah Satu</option>
                  {genre.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto text-center mt-10 pb-20">
            <Button
              id="btn-selesai"
              label="Selesai"
              className="bg-button w-9/12 lg:w-3/12 rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-blue-600"
              onClick={handlePostGenre}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
