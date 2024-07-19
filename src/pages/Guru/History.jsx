import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

export default function History() {
  const [loading, setLoading] = useState(false);
  const [historyMentor, setHistoryMentor] = useState([]);
  const [urlGoogle, setUrlGoogle] = useState("");
  const [cookie, removeCookie] = useCookies(["token"]);
  const checkToken = cookie.token;
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(20);

  useEffect(() => {
    fetchDataHistoryMentor(1);
  }, []);

  const fetchDataHistoryMentor = (page) => {
    setLoading(true);

    axios
      .get(`/mentors/transactions?limit=15&page=${page}`)
      .then((res) => {
        const data = res.data.data;
        setHistoryMentor(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchDataHistoryMentor(newPage);
  };

  const prevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    fetchDataHistoryMentor(newPage);
  };

  return (
    <Layout>
      <div className="w-full min-h-screen">
        <div className="w-[85%] mx-auto mt-10 mb-5 pl-5">
          <h1 className="text-button font-bold text-2xl">Histori Mengajar</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-[85%] mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th className="bg-button text-white">No</th>
                <th className="bg-button text-white">Student Name</th>
                <th className="bg-button text-white">Course</th>
                <th className="bg-button text-white">Start Date</th>
                <th className="bg-button text-white">End Date</th>
                <th className="bg-button text-white">Status</th>
                <th className="bg-button text-white">Create Events</th>
              </tr>
            </thead>
            <tbody>
              {historyMentor.map((item, index) => (
                <tr key={item.id}>
                  <th className="bg-slate-100 text-black border-none">{index + 1}</th>
                  <td className="bg-slate-100 text-black border-none">{item.student_name}</td>
                  <td className="bg-slate-100 text-black border-none">{item.class_name}</td>
                  <td className="bg-slate-100 text-black border-none">{item.start_date}</td>
                  <td className="bg-slate-100 text-black border-none">{item.end_date}</td>
                  <td className="bg-slate-100 text-black border-none">{item.status}</td>
                  <td className="bg-slate-100 text-black border-none">
                    {item.status === "settlement" ? (
                      <Button
                        id="btn-createEvents"
                        label="Create Events"
                        className="btn bg-button text-white"
                        onClick={() => navigate(`/createEvents/${item.id}`)}
                      />
                    ) : (
                      "Selesaikan Pembayaran"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!checkToken && (
          <h1 className="text-black text-md font-poppins font-semibold text-center">
            * To Create Event Please Login With your Google Accounts ?{" "}
            <span className="text-black font-bold text-lg">Click Here</span>
          </h1>
        )}
        <div className="flex flex-row justify-end mr-28 space-x-8">
          <Button
            label="Prev"
            className="btn border-none w-full bg-transparent text-black hover:text-white font-semibold hover:bg-[#3A2BE8]"
            onClick={prevPage}
            disabled={page === 1}
          />
          <p className="text-xl text-[#3A2BE8] mt-2">{page}</p>
          <Button
            label="Next"
            className="btn border-none w-full bg-transparent text-black hover:text-white font-semibold hover:bg-[#3A2BE8]"
            onClick={nextPage}
          />
        </div>
        <div className="flex w-[93%] justify-end">
          <Button
            id="btn-kembali"
            label="Kembali"
            className="btn bg-button px-32 lg:px-20 py-2 text-white border-none mt-5"
            onClick={() => navigate("/profileTeacher")}
          />
        </div>
      </div>
    </Layout>
  );
}
