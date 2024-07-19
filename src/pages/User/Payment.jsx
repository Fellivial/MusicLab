import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../assets/bg-banner.webp";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import { useNavigate } from "react-router";

const Payment = () => {
  const [cookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [scheduleId, setScheduleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dataAvail, setDataAvail] = useState("");
  const [availCheck, setAvailCheck] = useState("");
  const [urlPayment, setUrlPayment] = useState("");

  const checkToken = cookie.token;
  const { id } = useParams();
  const classId = JSON.parse(localStorage.getItem("idClass") || "0");
  const idMentor = JSON.parse(localStorage.getItem("idMentor") || "0");

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataCourseDetail();
    fetchJadwalMentor();
  }, []);

  const fetchDataCourseDetail = () => {
    axios
      .get(`/class/${id}`)
      .then((res) => {
        const data = res.data.data;
        setCourse(data);
        localStorage.setItem("availData", JSON.stringify(data));
        setDataAvail(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const fetchJadwalMentor = () => {
    setLoading(true);

    axios
      .get(`mentors/${idMentor}/schedules`)
      .then((res) => {
        const { data } = res.data;
        setSchedules(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleCheck = (e) => {
    e.preventDefault();

    const body = {
      class_id: +classId,
      schedule_id: +scheduleId,
      start_date: startDate,
    };

    axios
      .post("/schedules/check", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const message = res.data;
        localStorage.setItem("responAvai", JSON.stringify(message.message));
        setDataAvail(message.message);

        MySwal.fire({
          title: "Schedules Available",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((err) => {
        const { message } = err.response.data;
        setAvailCheck(message);

        MySwal.fire({
          title: "Your Chosen Date is Unavailable, Pick Another Date",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const body = {
      class_id: +classId,
      schedule_id: +scheduleId,
      start_date: startDate,
    };

    axios
      .post("/transactions", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const paymentUrl = res.data.data.payment_url;
        window.open(paymentUrl, "_blank");
        navigate("/historyStudent");
      })
      .catch((err) => {
        const { message } = err.response.data;

        MySwal.fire({
          title: "Payment Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const header = {
    width: "80%",
    height: "17rem",
    backgroundImage: `url(${course.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col bg-white items-center mt-4">
        <h1 className="text-black font-bold w-9/12 flex justify-start text-2xl font-poppins lg:mt-0 -mt-8">
          {course?.name}
        </h1>
        <p className="text-slate-500 font-semibold w-9/12 flex justify-start text-xl font-poppins mt-5">
          Tingkatan Kelas: {course?.level}
        </p>
        <div
          className="rounded-2xl bg-no-repeat bg-auto bg-center mt-6"
          style={header}
        ></div>

        <div className="flex flex-col w-10/12 min-h-screen p-7 mt-8 space-y-2">
          <div className="flex flex-row justify-between">
            <p className="text-black font-bold font-poppins">Harga:</p>
            <p className="text-black font-bold font-poppins">
              Rp. {course?.price}
            </p>
          </div>
          <hr />
          <div className="flex flex-row justify-between">
            <p className="text-black font-bold font-poppins">Total Biaya:</p>
            <p className="text-black font-bold font-poppins">
              Rp. {course?.price}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p className="text-black font-bold font-poppins mt-8">
                Check Availability
              </p>
              <div className="flex flex-row">
                <div className="flex-1">
                  <Input
                    id="input-start_date"
                    type="date"
                    className="border-2 border-slate-700 p-2 rounded-lg mt-3 font-poppins font-semibold bg-white text-black"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  {dataAvail === "schedule available" ? (
                    <p className="text-green-500 mt-2">
                      Tanggal Tersedia, Lanjutkan Pembayaran
                    </p>
                  ) : (
                    <p className="text-red-500 mt-2">
                      Tanggal Tidak Tersedia, Silahkan Pilih Hari Lain
                    </p>
                  )}
                </div>
              </div>
              <form className="w-[11rem] p-3">
                <label className="label">
                  <span className="label-text text-black font-semibold text-lg font-poppins w-full lg:max-w-xs flex bg-white mx-auto"></span>
                </label>
                <select
                  id="select-role"
                  className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto text-black font-semibold font-poppins"
                  onChange={(e) => setScheduleId(e.target.value)}
                >
                  <option value="">Pilih Hari</option>
                  {schedules.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.day}
                    </option>
                  ))}
                </select>
              </form>
              <Button
                label="Check Availability"
                className="btn bg-[#3A2BE8] mt-4"
                onClick={handleCheck}
              />
              {dataAvail === "schedule available" ? (
                <Button
                  label="Continue Payment"
                  className="btn bg-[#3A2BE8] mt-4"
                  onClick={handlePayment}
                />
              ) : (
                <Button
                  label="Continue Payment"
                  className="btn disabled:bg-slate-200 disabled:cursor-not-allowed mt-4"
                  disabled
                />
              )}
              {urlPayment && (
                <a
                  href={urlPayment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#3A2BE8] mt-4"
                >
                  Proceed to Payment
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
