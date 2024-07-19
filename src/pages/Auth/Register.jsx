import React, { useState, useEffect } from "react";
import Poster from "../../assets/poster.webp";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "../../utils/Swal";
import withReactContent from "sweetalert2-react-content";

const background = {
  backgroundImage: `url(${Poster})`,
  width: "100%",
  height: "auto",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Register = () => {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (name && email && role && password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    return () => {
      setDisabled(false);
    };
  }, [name, email, password, role]);

  const handleRegister = (e) => {
    setLoading(false);
    e.preventDefault();

    const body = {
      name,
      role,
      email,
      password,
    };

    axios
      .post("/register", body)
      .then((res) => {
        const { message } = res.data;

        MySwal.fire({
          title: "Registered Success",
          text: message,
          showCancelButton: false,
        });
        navigate("/login");
      })
      .catch((err) => {
        const { message } = err.response.data;
        MySwal.fire({
          title: "Registered Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="w-full h-full bg-white flex flex-row">
      <div className="flex-1 lg:flex hidden h-auto" style={background}></div>
      <div className="flex-1 h-auto">
        <h1 className=" text-2xl lg:text-4xl font-bold text-center  font-poppins text-black mt-16 ">
          Register
        </h1>
        <form onSubmit={handleRegister}>
          <div className="form-control w-full mt-10">
            <label className="label">
              <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12">
                Nama Lengkap
              </span>
            </label>
            <Input
              id="input-namalengkap"
              type="text"
              maxLength={50}
              placeholder="Type here"
              className="input input-bordered w-10/12 lg:w-7/12 border-slate-300  mx-auto text-black font-semibold font-poppins bg-white"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label">
              <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                Role
              </span>
            </label>
            <select
              id="select-role"
              className="input input-bordered w-10/12 lg:w-7/12 border-slate-300  mx-auto text-black font-semibold font-poppins bg-white"
              onChange={handleRole}
            >
              <option defaultValue={"DEFAULT"}>Pilih Role</option>
              <option value="Student">Student</option>
              <option value="Mentor">Mentor</option>
            </select>
            <label className="label">
              <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                Email
              </span>
            </label>
            <Input
              id="input-email"
              type="email"
              maxLength={50}
              placeholder="Type here"
              className="input input-bordered w-10/12 lg:w-7/12 border-slate-300  mx-auto text-black font-semibold font-poppins bg-white"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="container-form">
              <label className="label">
                <span className="label-text text-black font-semibold text-lg font-poppins mx-auto w-10/12 lg:w-7/12 mt-5">
                  Password
                </span>
              </label>
              <div className="center-login">
                <div className="image">
                  <span
                    onClick={() => setSeePassword(!seePassword)}
                    className="ab"
                  >
                    <i className="fa fa-eye"></i>
                  </span>

                  <Input
                    id="input-password"
                    className="input-custom text-black font-poppins font-semibold"
                    placeholder="*******"
                    size={5}
                    name="text"
                    type={seePassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {password.length < 8 ? (
              <p className="text-red-600 ml-20 lg:ml-36 mt-5 font-normal">
                Password yang anda masukan lemah
              </p>
            ) : (
              <p className="text-green-600 ml-36 mt-5">
                Password yang anda masukan kuat
              </p>
            )}

            <div className="text-center w-full  mt-10">
              <Button
                id="btn-register"
                label="Register"
                className="bg-button w-10/12 lg:w-7/12 rounded-lg py-3 text-white font-poppins font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:cursor-pointer hover:bg-blue-600"
                loading={loading || disabled}
              />
            </div>
          </div>
        </form>
        <p className="text-center text-black  font-semibold mt-5 font-poppins">
          Don't Have an Account?{" "}
          <span className="font-bold font-poppins">
            <Link to="/login">Login</Link>
          </span>
        </p>
        <div className="pb-16 "></div>
      </div>
    </div>
  );
};

export default Register;
