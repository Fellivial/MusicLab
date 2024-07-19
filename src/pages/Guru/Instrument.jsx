import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import LogoMusicLab from "../../assets/logo-musiclab.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

const Instrument = () => {
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [instrumentData, setInstrumentData] = useState([]);
  const [instrumentId, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstrument = () => {
      setLoading(true);

      axios
        .get("/instruments")
        .then((res) => {
          const { data } = res.data;
          setInstrumentData(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    };

    fetchInstrument();
  }, []);

  const handlePostInstrument = (e) => {
    e.preventDefault();

    const body = {
      instrument_id: +instrumentId,
    };

    axios
      .post("/mentors/instruments", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });

        navigate("/genre");
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
          <img src={LogoMusicLab} className="w-4/12 lg:w-2/12 mx-auto mt-8" alt="MusicLab Logo" />
        </div>
        <div className="flex-1 w-full">
          <h1 className="text-xl lg:text-2xl text-center text-black font-poppins font-bold mt-10">
            Instrumen apa yang ingin anda ajarkan
          </h1>
          <div className="flex flex-col lg:flex-row w-[80%] mx-auto mt-8">
            <div className="flex-1">
              <div className="form-control mx-auto w-11/12 lg:w-9/12 max-w-xs">
                <select
                  className="select select-bordered text-slate-600 border-slate-400 bg-select font-semibold font-poppins"
                  onChange={(e) => setId(e.target.value)}
                >
                  <option>Pilih Salah Satu</option>
                  {instrumentData.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto text-center mt-10 pb-20">
            <Button
              id="btn-instrumen"
              label="Selanjutnya"
              className="bg-button w-9/12 lg:w-3/12 rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-blue-600"
              onClick={(e) => handlePostInstrument(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instrument;
