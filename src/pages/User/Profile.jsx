import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import { useCookies } from "react-cookie";

const ProfilStudent = () => {
  const MySwal = withReactContent(Swal);
  const [cookie, , removeCookie] = useCookies(["token"]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchDataStudent = async () => {
      try {
        const res = await axios.get("students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        setStudent(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataStudent();
  }, [token]);

  const handleDeleteAccount = () => {
    MySwal.fire({
      title: "Are You Sure?",
      text: "You Can't Retrieve your Data After Deleting your Account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete account!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("students")
          .then(() => {
            removeCookie("token", { path: "/" });
            navigate("/login");
          })
          .catch((err) => {
            const { message } = err.response.data;
            MySwal.fire({
              title: "Error",
              text: message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-10">
        <div className="flex flex-col lg:flex-row justify-center space-x-8 p-6">
          <div className="card w-[18rem] mx-auto lg:w-96 sm:h-full shadow-black shadow-sm lg:mt-7">
            <div className="card-body mx-auto">
              <div className="flex mx-auto">
                <img
                  src={student.avatar}
                  className="w-36 rounded-full object-contain"
                  alt="Student Avatar"
                />
              </div>
              <div className="mt-8 mx-auto">
                <p className="text-3xl text-black font-poppins">
                  {student.name}
                </p>
              </div>
              <hr />
              <div className="card card-actions flex flex-row justify-between space-x-3 mt-10">
                <p
                  onClick={() => navigate("/editStudent")}
                  className="text-md text-black font-poppins cursor-pointer"
                >
                  Edit Profile
                </p>
                <p
                  onClick={handleDeleteAccount}
                  className="text-md text-red-500 font-poppins cursor-pointer"
                >
                  Delete Account
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-6 lg:p-7 lg:m-2">
            <div className="flex flex-col">
              <p className="text-4xl lg:text-5xl font-poppins text-black">
                Hi, {student.name}
              </p>
              <div className="mt-7 lg:p-3 space-y-3">
                <p className="text-2xl lg:ml-0 lg:text-3xl font-poppins text-black font-bold">
                  Contact me
                </p>
                <div className="ml-5 text-lg">
                  <p className="font-poppins text-black">
                    Gmail: <span>{student.email}</span>
                  </p>
                  <p className="font-poppins text-black">
                    No Hp: <span>{student.phone}</span>
                  </p>
                  <p className="font-poppins text-black">
                    Address: <span>{student.address}</span>
                  </p>
                </div>
                <Button
                  label="Jadwal"
                  className="btn border-none rounded-xl w-5/6 lg:w-3/6 bg-[#3A2BE8] text-white font-semibold mt-5"
                  onClick={() => navigate("/historyStudent")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilStudent;
