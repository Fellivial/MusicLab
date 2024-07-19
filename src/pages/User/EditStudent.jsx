import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";

export const blockInvalidChar = (e) => {
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
};

export default function EditStudent() {
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [editStudent, setEditStudent] = useState({});
  const [editPassword, setEditPassword] = useState({});
  const [student, setStudent] = useState({});
  const [pictures, setPictures] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Profile();

    return () => {
      Profile();
    };
  }, []);

  function Profile() {
    axios
      .get(`/students/profile`)
      .then((response) => {
        const data = response.data.data;
        setStudent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangePassword = (value, key) => {
    setEditPassword(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in editPassword) {
      formData.append(key, editPassword[key]);
    }

    axios
      .put("/students/password", formData, {
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
        navigate("/ProfilStudent");
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
    for (const key in editStudent) {
      formData.append(key, editStudent[key]);
    }

    axios
      .put("/students", formData, {
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
        navigate("/ProfilStudent");
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
    setEditStudent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <Layout>
          <div className="w-full min-h-screen">
            <div className="flex flex-col lg:flex-row mt-5 lg:mt-10">
              <div className="flex-1 flex-col">
                <h1 className="text-black font-bold font-poppins text-2xl text-center">
                  Edit Profile
                </h1>
                <img
                  src={pictures === "" ? student?.avatar : pictures}
                  className="w-4/12 mx-auto mt-5 rounded-2xl"
                />
                <h1 className="text-slate-500 text-center">
                  * Max File Size Image 500kb
                </h1>
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
                  Update Password
                </h1>

                <label className="label">
                  <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                    Old Password
                  </span>
                </label>
                <div className="center-login">
                  <div className="image">
                    <span
                      onClick={() => setOldPassword(!oldPassword)}
                      className="ab"
                    >
                      <i className="fa fa-eye"></i>
                    </span>
                    <Input
                      id="input-oldpassword"
                      className="input-custom text-black font-poppins font-semibold"
                      placeholder="*******"
                      minLength={3}
                      size={5}
                      name="text"
                      type={oldPassword ? "text" : "password"}
                      onChange={(e) =>
                        handleChangePassword(e.target.value, "old_password")
                      }
                    />
                  </div>
                </div>

                <label className="label">
                  <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                    New Password
                  </span>
                </label>
                <div className="center-login">
                  <div className="image">
                    <span
                      onClick={() => setNewPassword(!newPassword)}
                      className="ab"
                    >
                      <i className="fa fa-eye"></i>
                    </span>
                    <Input
                      id="input-newpassword"
                      className="input-custom text-black font-poppins font-semibold"
                      placeholder="*******"
                      size={5}
                      minLength={3}
                      name="text"
                      type={newPassword ? "text" : "password"}
                      onChange={(e) =>
                        handleChangePassword(e.target.value, "new_password")
                      }
                    />
                  </div>
                </div>

                <label className="label">
                  <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                    Confirmation Password
                  </span>
                </label>
                <div className="center-login">
                  <div className="image">
                    <span
                      onClick={() => setConfirmPassword(!confirmPassword)}
                      className="ab"
                    >
                      <i className="fa fa-eye"></i>
                    </span>
                    <Input
                      id="input-confirmpassword"
                      className="input-custom text-black font-poppins font-semibold"
                      placeholder="*******"
                      size={5}
                      name="text"
                      type={confirmPassword ? "text" : "password"}
                      onChange={(e) =>
                        handleChangePassword(
                          e.target.value,
                          "confirmation_password"
                        )
                      }
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center mt-10">
                  <Button
                    id="btn-updatepassword"
                    label="Update Password"
                    className="bg-button w-[20rem] rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-blue-900"
                    onClick={handleUpdatePassword}
                  />
                </div>
              </div>

              <div className="flex-1 lg:ml-0 ml-10">
                <form>
                  <div className="form-control w-full mx-auto">
                    <label className="label mt-3">
                      <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-9/12">
                        Nama Lengkap
                      </span>
                    </label>
                    <Input
                      id="input-namalengkap"
                      type="text"
                      maxLength={50}
                      placeholder="marlina1998"
                      defaultValue={student?.name}
                      className="input input-bordered w-11/12 lg:w-9/12 bg-bg-input border-slate-300 text-black font-semibold font-poppins bg-white"
                      onChange={(e) => handleChange(e.target.value, "name")}
                    />

                    <label className="label mt-3">
                      <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-9/12">
                        Jenis Kelamin
                      </span>
                    </label>
                    <select
                      id="select-role"
                      className="input input-bordered bg-bg-input border-slate-300 w-11/12 lg:w-9/12 text-black font-semibold font-poppins bg-white"
                      onChange={(e) => handleChange(e.target.value, "sex")}
                    >
                      <option disabled defaultValue={student?.sex}>
                        Pilih Salah Satu
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer Not To Say">Prefer Not To Say</option>
                    </select>
                    <label className="label mt-5">
                      <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-9/12">
                        No. Hp
                      </span>
                    </label>
                    <Input
                      id="input-telepon"
                      type="number"
                      min={0}
                      step={1}
                      onKeyDown={blockInvalidChar}
                      max={12}
                      defaultValue={student?.phone}
                      className="input input-bordered bg-bg-input border-slate-300 w-11/12 lg:w-9/12 text-black font-semibold font-poppins bg-white"
                      onChange={(e) => handleChange(e.target.value, "phone")}
                    />
                    <label className="label mt-5">
                      <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-9/12">
                        Email
                      </span>
                    </label>
                    <Input
                      id="input-email"
                      type="email"
                      maxLength={50}
                      defaultValue={student?.email}
                      placeholder="@test@gmail.com"
                      className="input input-bordered bg-bg-input border-slate-300 w-11/12 lg:w-9/12 text-black font-semibold font-poppins bg-white"
                      onChange={(e) => handleChange(e.target.value, "email")}
                    />

                    <label className="label">
                      <span className="label-text text-black font-semibold text-lg font-poppins w-10/12 lg:w-9/12 mt-5">
                        Alamat
                      </span>
                    </label>
                    <textarea
                      id="input-address"
                      defaultValue={student?.address}
                      className="textarea textarea-bordered h-32 bg-bg-input border-slate-300 w-11/12 lg:w-9/12 text-black font-semibold font-popins bg-white"
                      onChange={(e) => handleChange(e.target.value, "address")}
                    ></textarea>
                  </div>
                  <div className="w-full mt-10 flex flex-row">
                    <Button
                      id="btn-back"
                      label="Kembali"
                      className="bg-button w-[10rem] lg:w-[15rem] rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-blue-900"
                      onClick={() => navigate("/ProfilStudent")}
                    />
                    <Button
                      id="btn-Update"
                      label="Update"
                      className="bg-button w-[9rem] lg:w-[15rem] rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer ml-5 hover:bg-blue-900"
                      onClick={handleUpdateProfile}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
