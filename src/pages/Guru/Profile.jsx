import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Card, CardTestimonial, CardUlasan } from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

const Profile = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cookie, removeCookie] = useCookies(["token", "role", "id"]);
  const idUser = cookie.id;

  const [genre, setGenre] = useState([]);
  const [id, setId] = useState("1");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedules, setSchedules] = useState([]);

  const [course, setCourse] = useState([]);
  const [comment, setComment] = useState([]);
  const [instrument, setInstrument] = useState([]);

  const [totalPage, setTotalPage] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProfile();
    fetchInstrument();
    fetchDataMentor();
    fetchCourseMentor(1);

    return () => {
      fetchProfile();
      fetchInstrument();
      fetchDataMentor();
    };
  }, []);

  const fetchProfile = () => {
    axios
      .get(`/mentors/${idUser}`)
      .then((response) => {
        const data = response.data.data;
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchInstrument = () => {
    setIsLoading(true);
    axios
      .get(`/mentors/${idUser}/instrument`)
      .then((response) => {
        const { data } = response.data;
        setInstrument(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteAccount = () => {
    MySwal.fire({
      title: "Are You Sure?",
      text: "You Can't Retrieve your Data After Delete your Account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus akun!",
      cancelButtonText: "Batal",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete("mentors");
        }
      })
      .then(() => {
        removeCookie("token", { path: "/" });
        removeCookie("role", { path: "/" });
        removeCookie("id", { path: "/" });
        localStorage.clear();
      })
      .catch((err) => {
        const { message } = err.response.data;
        MySwal.fire({
          title: "Error",
          text: message,
          showCancelButton: false,
        });
      });
  };

  const handlePostJadwal = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      day,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .post("mentors/schedules", body)
      .then((res) => {
        const { data, message } = res.data;
        const updateData = {
          ...data,
          day,
          start_time: startTime,
          end_time: endTime,
        };
        setSchedules((prevState) => [...prevState, updateData]);

        MySwal.fire({
          title: "Successfully Uploaded Schedule",
          text: message,
          showCancelButton: false,
        });
        setDay("");
        setStartTime("");
        setEndTime("");
      })
      .catch((err) => {
        const { message } = err.response.data;
        MySwal.fire({
          title: "Failed to Upload Schedule",
          text: message,
          showCancelButton: false,
        });
      });
  };

  const fetchDataMentor = () => {
    setIsLoading(true);
    axios
      .get(`mentors/${idUser}/schedules`)
      .then((res) => {
        setSchedules(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteSchedule = (id) => {
    axios
      .delete(`schedules/${id}`)
      .then(() => {
        setSchedules((prevState) => prevState.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCourseMentor = (page) => {
    setIsLoading(true);
    axios
      .get(`/mentors/${idUser}/class?limit=4&page=${page}`)
      .then((res) => {
        const data = res.data.data;
        setCourse(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchCourseMentor(newPage);
  };

  const prevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    fetchCourseMentor(newPage);
  };

  useEffect(() => {
    const fetchCommentMentor = () => {
      axios
        .get(`/mentors/${idUser}/reviews`)
        .then((res) => {
          const data = res.data.data;
          setComment(data);
        })
        .catch((err) => console.log(err));
    };

    fetchCommentMentor();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto w-[80%] p-10">
        <div className="flex flex-row p-4">
          <div className="w-[50%] text-black font-poppins">
            <p className="text-3xl font-semibold opacity-80">Teacher</p>
            <p className="text-5xl font-bold">{user?.name}</p>
            <div className="font-semibold space-x-2">
              {instrument.map((item, index) => (
                <a key={index} className="text-black">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-2">
              <p className="font-semibold opacity-75">Ulasan</p>
              <p className="text-sm font-bold">47.889</p>
            </div>
            <div className="mt-7">
              <p className="text-xl font-semibold">About Me</p>
              <p className="text-lg">{user?.about}</p>
            </div>
            <div className="mt-7">
              <p className="font-semibold text-xl">My Courses</p>
              <div className="m-2 mt-7 grid grid-cols-2 space-x-5 gap-7">
                {course.map((item, index) => (
                  <Card
                    key={index}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => navigate(`/detailCourse/${item.id}`)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 mt-8 p-7 ml-8">
                <Button
                  label="Prev"
                  className="btn border-none w-5/6 bg-transparent text-black hover:text-white font-semibold hover:bg-[#3A2BE8]"
                  onClick={prevPage}
                  disabled={page === 1}
                />
                <p className="mx-auto text-xl text-[#3A2BE8] mt-2">{page}</p>
                <Button
                  label="Next"
                  className="btn border-none w-5/6 bg-transparent text-black hover:text-white font-semibold hover:bg-[#3A2BE8]"
                  onClick={nextPage}
                  disabled={page === totalPage}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 md:w-10/12 flex items-center flex-col ml-40">
            <img src={user?.avatar} alt="photo" width={250} />
            <div className="text-black text-md font-semibold ml-16 sm:ml-10 mt-2">
              <p>
                Address : <span>{user?.address}</span>
              </p>
              <p>
                Gmail : <span>{user?.email}</span>
              </p>
              <Link to={user?.instagram}>
                <Button
                  id="btn-deactivateaccount"
                  label="Deactivate Account"
                  className="btn mt-5 px-8"
                  onClick={handleDeleteAccount}
                />
              </Link>
              <Button
                id="btn-editTeacher"
                label="Edit Profile"
                className="btn bg-[#3A2BE8] text-white mt-2 px-16 border-none"
                onClick={() => navigate(`/editTeacher/${user?.id}`)}
              />
              <Button
                id="btn-kursussaya"
                label="Kursus Saya"
                className="btn bg-[#3A2BE8] text-white mt-2 px-16 border-none"
                onClick={() => navigate("/daftarKursus")}
              />
              <Button
                id="btn-jadwalsaya"
                label="Jadwal Saya"
                className="btn bg-[#3A2BE8] text-white mt-2 px-16 border-none"
                onClick={() => navigate("/historyTeacher")}
              />
              <details className="border-2 w-[17rem] border-black p-4 rounded-2xl mt-5">
                <summary>Tambah Jadwal</summary>
                <form className="w-[11rem] p-3" onSubmit={handlePostJadwal}>
                  <label className="label">
                    <span className="label-text text-black font-semibold text-lg font-poppins w-full lg:max-w-xs flex bg-white mx-auto"></span>
                  </label>
                  <select
                    id="select-role"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto text-black font-semibold font-poppins"
                    onChange={(e) => setDay(e.target.value)}
                    value={day}
                  >
                    <option value="" disabled>Pilih hari</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <div className="flex flex-row gap-2 mt-2">
                    <Input
                      id="input-startTime"
                      type="time"
                      className="w-[50%] bg-slate-100 text-black border-1 border-black rounded-lg p-2"
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTime}
                    />
                    <Input
                      id="input-endTime"
                      type="time"
                      className="w-[50%] bg-slate-100 text-black border-1 border-black rounded-lg p-2"
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endTime}
                    />
                  </div>
                  <Button
                    id="btn-jadwal"
                    type="submit"
                    className="btn bg-[#3A2BE8] text-white border-none mt-2 w-full"
                    label="Upload Jadwal"
                  />
                </form>
              </details>
              <details className="border-2 w-[17rem] border-black p-4 rounded-2xl mt-5">
                <summary>Lihat Jadwal</summary>
                <div className="w-[14rem] p-3">
                  {schedules.length > 0 ? (
                    schedules.map((item, index) => (
                      <div className="flex flex-row" key={index}>
                        <div className="w-[50%] text-sm text-black">
                          {item?.day}
                        </div>
                        <div className="w-[50%] flex justify-end">
                          <p className="text-sm">{item?.start_time}</p>
                          <p> - </p>
                          <p className="text-sm">{item?.end_time}</p>
                          <Button
                            id="btn-delete"
                            className="ml-2 -mt-1"
                            label="x"
                            onClick={() => handleDeleteSchedule(item?.id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No schedules available</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
        <h1 className="text-black text-xl font-poppins font-bold">Ulasan</h1>
        {comment.map((item, index) => (
          <CardUlasan
            key={index}
            image={item?.avatar}
            name={item?.name}
            date={item?.created_at}
            comment={item?.comment}
            rating={item?.rating}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Profile;
