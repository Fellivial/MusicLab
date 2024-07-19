import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import { blockInvalidChar } from "../User/EditStudent";

export default function EditTeacher() {
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const [editUser, setEditUser] = useState({});
  const [genre, setGenre] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [instrumentData, setInstrumentData] = useState([]);
  const [editPassword, setEditPassword] = useState({});
  const [user, setUser] = useState();
  const [certificateFile, setCertificateFile] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [instrumentId, setInstrumentId] = useState("");
  const [pictures, setPictures] = useState("");
  const [loading, setLoading] = useState(false);
  const checkToken = cookie.token;

  useEffect(() => {
    profile();
    instrument();
    genres();
  }, []);

  function profile() {
    axios
      .get(`mentors/profile`)
      .then((response) => {
        const data = response.data.data;
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function genres() {
    axios
      .get("/genres")
      .then((res) => {
        const data = res.data.data;
        setGenre(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function instrument() {
    axios
      .get("/instruments")
      .then((res) => {
        const data = res.data.data;
        setInstrumentData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  const handlePostGenre = (e) => {
    e.preventDefault();
    const body = {
      genre_id: +genreId,
    };
    axios
      .post("mentors/genres", body, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
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

  const handlePostInstrument = (e) => {
    e.preventDefault();
    const body = {
      instrument_id: +instrumentId,
    };

    axios
      .post("/mentors/instruments", body, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });

        navigate("/profileTeacher");
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

  const handleChangePassword = (value, key) => {
    let temp = { ...editPassword };
    temp[key] = value;
    setEditPassword(temp);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const formData = new FormData();
    let key;
    for (key in editPassword) {
      formData.append(key, editPassword[key]);
    }

    axios
      .put("/mentors/password", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Password Successfully Updated",
          text: message,
          showCancelButton: false,
        });
        navigate("/profileTeacher");
      })
      .catch((err) => {
        const { message } = err.response.data;

        MySwal.fire({
          title: "Please Fill with Correct Format",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let key;
    for (key in editUser) {
      formData.append(key, editUser[key]);
    }

    axios
      .put("mentors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { message } = res.data;
        setPictures(res.data.avatar);

        MySwal.fire({
          title: "Data Successfully Updated",
          text: message,
          showCancelButton: false,
        });
        navigate("/profileTeacher");
      })
      .catch((err) => {
        const { message } = err.response.data;

        console.log(err);

        MySwal.fire({
          title: "Please Fill The Form with Correct Format",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...editUser };
    temp[key] = value;
    setEditUser(temp);
  };

  const handlePostCredentials = (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("certificate_file", certificateFile);
    formData.append("name", name);
    formData.append("type", type);

    axios
      .post("/mentors/credentials", formData)
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Successfully Upload Certificate",
          text: message,
          showCancelButton: false,
        });
        navigate("/profileTeacher");
      })
      .catch((err) => {
        const { message } = err.response.data;

        MySwal.fire({
          title: "Please Fill The Form with Correct Format",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <>
          <Layout>
            <div className="w-full min-h-screen">
              <div className="flex flex-col lg:flex-row mt-5 lg:mt-10">
                <div className="flex-1 flex-col">
                  <h1 className="text-black font-bold font-poppins text-2xl text-center">
                    Edit Profile
                  </h1>
                  <img
                    src={`${pictures === "" ? user?.avatar : pictures}`}
                    className="w-4/12 mx-auto mt-5 rounded-2xl"
                  />
                  <h1 className="flex justify-center">*Max File Size 500kb</h1>
                  <Input
                    id="input-file"
                    type="file"
                    className="file-input h-10 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5 border-none"
                    onChange={(e) => {
                      if (!e.currentTarget.files) {
                        return;
                      }
                      setPictures(URL.createObjectURL(e.currentTarget.files[0]));
                      handleChange(e.currentTarget.files[0], "avatar_file");
                    }}
                  />
                  <h1 className="text-center text-xl font-poppins text-black font-bold mt-12">
                    Upload Sertifikat
                  </h1>
                  <label className="label">
                    <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-full lg:max-w-xs flex bg-white mx-auto mt-8">
                      Tipe Sertifikat
                    </span>
                  </label>
                  <select
                    id="select-role"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto text-black font-semibold font-poppins"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option defaultValue={"DEFAULT"}>Pilih Salah Satu</option>
                    <option value="International">Internasional</option>
                    <option value="National">Nasional</option>
                  </select>
                  <label className="label">
                    <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-full lg:max-w-xs flex bg-white mx-auto mt-8">
                      Upload Sertifikat
                    </span>
                  </label>
                  <Input
                    id="input-file"
                    type="file"
                    className="file-input h-10 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5 border-none"
                    onChange={(e) => {
                      if (!e.currentTarget.files) {
                        return;
                      }
                      setCertificateFile(e.currentTarget.files[0]);
                    }}
                  />
                  <Button
                    label="Save"
                    className="btn btn-accent w-10/12 lg:w-full lg:max-w-xs flex justify-center mx-auto mt-10"
                    onClick={handlePostCredentials}
                  />
                </div>

                <div className="flex-1 flex-col">
                  <h1 className="text-black font-bold font-poppins text-2xl text-center">
                    Edit Profile
                  </h1>
                  <Input
                    id="name"
                    type="text"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5"
                    value={editUser.name || ""}
                    onChange={(e) => handleChange(e.target.value, "name")}
                    placeholder={user?.name}
                    onKeyDown={blockInvalidChar}
                  />
                  <Input
                    id="description"
                    type="text"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5"
                    value={editUser.description || ""}
                    onChange={(e) =>
                      handleChange(e.target.value, "description")
                    }
                    placeholder={user?.description}
                    onKeyDown={blockInvalidChar}
                  />
                  <Button
                    label="Save"
                    className="btn btn-accent w-10/12 lg:w-full lg:max-w-xs flex justify-center mx-auto mt-10"
                    onClick={handleUpdateProfile}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row mt-5 lg:mt-10">
                <div className="flex-1 flex-col">
                  <h1 className="text-black font-bold font-poppins text-2xl text-center">
                    Edit Genre
                  </h1>
                  <select
                    id="select-genre"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5 text-black font-semibold font-poppins"
                    onChange={(e) => setGenreId(e.target.value)}
                  >
                    <option defaultValue={"DEFAULT"}>Pilih Genre</option>
                    {genre.map((gen) => (
                      <option key={gen.id} value={gen.id}>
                        {gen.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    label="Save"
                    className="btn btn-accent w-10/12 lg:w-full lg:max-w-xs flex justify-center mx-auto mt-10"
                    onClick={handlePostGenre}
                  />
                </div>

                <div className="flex-1 flex-col">
                  <h1 className="text-black font-bold font-poppins text-2xl text-center">
                    Edit Instrument
                  </h1>
                  <select
                    id="select-instrument"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5 text-black font-semibold font-poppins"
                    onChange={(e) => setInstrumentId(e.target.value)}
                  >
                    <option defaultValue={"DEFAULT"}>Pilih Instrument</option>
                    {instrumentData.map((ins) => (
                      <option key={ins.id} value={ins.id}>
                        {ins.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    label="Save"
                    className="btn btn-accent w-10/12 lg:w-full lg:max-w-xs flex justify-center mx-auto mt-10"
                    onClick={handlePostInstrument}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row mt-5 lg:mt-10">
                <div className="flex-1 flex-col">
                  <h1 className="text-black font-bold font-poppins text-2xl text-center">
                    Change Password
                  </h1>
                  <Input
                    id="oldPassword"
                    type="password"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5"
                    value={editPassword.old_password || ""}
                    onChange={(e) =>
                      handleChangePassword(e.target.value, "old_password")
                    }
                    placeholder="Old Password"
                  />
                  <Input
                    id="newPassword"
                    type="password"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5"
                    value={editPassword.new_password || ""}
                    onChange={(e) =>
                      handleChangePassword(e.target.value, "new_password")
                    }
                    placeholder="New Password"
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="input input-bordered border-slate-300 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-5"
                    value={editPassword.confirm_password || ""}
                    onChange={(e) =>
                      handleChangePassword(e.target.value, "confirm_password")
                    }
                    placeholder="Confirm New Password"
                  />
                  <Button
                    label="Save"
                    className="btn btn-accent w-10/12 lg:w-full lg:max-w-xs flex justify-center mx-auto mt-10"
                    onClick={handleUpdatePassword}
                  />
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </>
  );
}
