import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../assets/bg-banner.webp";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "../../utils/Swal";
import { useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";

const DetailCourse = () => {
    const [, setIsLoading] = useState(false);
    const [course, setCourse] = useState({});
    const [cookie] = useCookies(["token", "role", "id"]);
    const checkRole = cookie.role;
    const tax = 200000;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataClassDetail = () => {
            setIsLoading(true);
            axios
                .get(`/class/${id}`)
                .then((res) => {
                    const data = res.data.data;
                    setCourse(data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        };

        fetchDataClassDetail();

        return () => fetchDataClassDetail();
    }, [id]);

    const header = {
        width: "80%",
        height: "25rem",
        backgroundImage: `url(${course.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col bg-white items-center mt-10">
                <h1 className="text-black font-bold w-9/12 flex justify-start text-2xl font-poppins lg:mt-0 -mt-8">
                    {course.name}
                </h1>
                <h2 className="text-slate-500 font-semibold w-9/12 flex justify-start text-xl font-poppins mt-5">
                    Tingkatan Kelas : {course.level}
                </h2>
                <div
                    className="rounded-2xl bg-no-repeat bg-auto bg-center mt-10"
                    style={header}
                ></div>
                <div className="flex flex-col-reverse lg:flex-row w-[80%] min-h-screen mt-20">
                    <div className="w-full lg:mt-0 -mt-16 lg:w-[65%] text-black">
                        <div className="flex flex-col w-11/12">
                            <h1 className="text-black text-2xl font-bold font-poppins">
                                Deskripsi Khusus:
                            </h1>
                            <p className="text-black font-semibold font-poppins text-lg mt-8">
                                {course.description}
                            </p>
                            <h1 className="text-black text-2xl font-bold font-poppins mt-10">
                                Apa yang akan anda Pelajari:
                            </h1>
                            <p className="text-black font-semibold font-poppins text-lg mt-8">
                                {course.syllabus}
                            </p>
                            <h1 className="text-black text-2xl font-bold font-poppins mt-10">
                                Prasyarat Khusus:
                            </h1>
                            <p className="text-black font-semibold font-poppins text-lg mt-8">
                                {course.requirement}
                            </p>
                            <h1 className="text-black text-2xl font-bold font-poppins mt-10">
                                Untuk Siapa Kursus ini:
                            </h1>
                            <p className="text-black font-semibold font-poppins text-lg mt-8">
                                {course.for_whom}
                            </p>

                            <div className="flex w-full justify-center">
                                <Button
                                    id="loadMore"
                                    label="Load More"
                                    className="w-6/12 py-2 bg-bg-button rounded-xl text-white font-poppins font-semibold mt-8 hover:bg-red-600"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[35%] w-full text-black flex justify-center sticky">
                        <div className="card bg-card w-full h-[45rem] items-center">
                            <div className="flex flex-row w-[85%] h-auto mt-32 lg:mt-5">
                                <div className="flex-1">
                                    <p className="font-bold font-poppins text-sm">
                                        Harga Kursus
                                    </p>
                                    <p className="font-bold font-poppins text-sm mt-2">Tax</p>
                                </div>
                                <div className="flex-1 flex items-end flex-col">
                                    <p className="font-bold font-poppins text-sm">
                                        Rp.{course.price},-
                                    </p>
                                    <p className="font-bold font-poppins text-sm mt-2">
                                        Rp.{tax},-
                                    </p>
                                </div>
                            </div>
                            <hr className="w-10/12 border-1 border-black mt-4" />
                            <div className="flex flex-row w-[85%] h-auto mt-5">
                                <div className="flex-1">
                                    <p className="font-bold font-poppins text-sm mt-2">
                                        Jumlah Total
                                    </p>
                                </div>
                                <div className="flex-1 flex items-end flex-col">
                                    <p className="font-bold font-poppins text-sm mt-2"></p>
                                </div>
                            </div>
                            <div className="flex justify-start w-[85%]">
                                {checkRole !== "Mentor" && (
                                    <Button
                                        id="btn-belikursus"
                                        label="Beli Kursus"
                                        className="btn bg-button px-16 py-2 text-white border-none mt-5"
                                        onClick={() => navigate(`/payment/${id}`)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const UploadCourse = () => {
    const [image, setImages] = useState("");
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [description, setDescription] = useState("");
    const [syllabus, setSyllabus] = useState("");
    const [requirement, setRequirement] = useState("");
    const [for_whom, setForWhom] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const handlePostCourse = (e) => {
        e.preventDefault();

        const body = {
            name,
            level,
            description,
            syllabus,
            requirement,
            for_whom,
            price: +price,
            duration: +duration,
            image,
        };

        axios
            .post("mentors/classes", body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                const { message } = res.data;

                MySwal.fire({
                    title: "Succesfully Upload Course",
                    text: message,
                    showCancelButton: false,
                });
                navigate("/daftarKursus");
            })
            .catch((err) => {
                const { message } = err.response.data;

                MySwal.fire({
                    title: "Failed Upload Course",
                    text: message,
                    showCancelButton: false,
                });
            });
    };

    const preventChar = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

    const headerImg = {
        width: "80%",
        height: "25rem",
        backgroundImage: `url(${image === "" ? Header : image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <Layout>
            <form
                onSubmit={handlePostCourse}
                encType="multipart/form-data"
                className="w-full min-h-screen flex flex-col bg-white items-center mt-10"
            >
                <h1 className="text-black font-bold w-9/12 flex justify-center text-2xl font-poppins lg:mt-0 -mt-8">
                    Upload Kursus
                </h1>

                <div
                    className="rounded-2xl bg-no-repeat bg-auto bg-center mt-10"
                    style={headerImg}
                ></div>
                <h1 className="text-slate-500 text-center font-normal">
                    *Notes: Maksimal Size untuk gambar 500kb
                </h1>
                <Input
                    id="input-header-kursus"
                    type="file"
                    className="file-input h-10 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-10 border-none"
                    onChange={(e) => {
                        setImages(URL.createObjectURL(e.target.files[0]));
                    }}
                />
                <div className="flex flex-col-reverse lg:flex-row w-10/12 min-h-screen mt-5 lg:mt-16">
                    <div className="flex flex-col w-full lg:w-1/2">
                        <Input
                            id="input-nama"
                            type="text"
                            label="Nama Kursus"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            id="input-tingkatan"
                            type="text"
                            label="Tingkatan"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        <Input
                            id="input-deskripsi"
                            type="text"
                            label="Deskripsi Kursus"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            id="input-silabus"
                            type="text"
                            label="Silabus"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setSyllabus(e.target.value)}
                        />
                        <Input
                            id="input-prasyarat"
                            type="text"
                            label="Prasyarat"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setRequirement(e.target.value)}
                        />
                        <Input
                            id="input-untukSiapa"
                            type="text"
                            label="Untuk Siapa"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setForWhom(e.target.value)}
                        />
                        <Input
                            id="input-harga"
                            type="number"
                            label="Harga"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setPrice(e.target.value)}
                            onKeyDown={preventChar}
                        />
                        <Input
                            id="input-durasi"
                            type="number"
                            label="Durasi"
                            className="input bg-input p-3 mt-5 border-none"
                            onChange={(e) => setDuration(e.target.value)}
                            onKeyDown={preventChar}
                        />
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                id="btn-simpan"
                                label="Simpan"
                                className="w-6/12 py-2 bg-bg-button rounded-xl text-white font-poppins font-semibold mt-8 hover:bg-red-600"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

const EditCourse = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [requirement, setRequirement] = useState("");
  const [forWhom, setForWhom] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({});
  const [cookies] = useCookies(["token", "role"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const fetchCourseData = () => {
      setLoading(true);
      axios
          .get(`/class/${id}`)
          .then((res) => {
              const data = res.data.data;
              setCourse(data);
              setImage(data.image);
              setName(data.name);
              setLevel(data.level);
              setDescription(data.description);
              setSyllabus(data.syllabus);
              setRequirement(data.requirement);
              setForWhom(data.for_whom);
              setPrice(data.price);
              setDuration(data.duration);
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => setLoading(false));
  };

  useEffect(() => {
      fetchCourseData();
  }, [id]);

  const handleUpdateCourse = (e) => {
      e.preventDefault();

      const body = {
          name,
          level,
          description,
          syllabus,
          requirement,
          for_whom: forWhom,
          price: +price,
          duration: +duration,
          image,
      };

      axios
          .put(`mentors/classes/${id}`, body, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          })
          .then((res) => {
              const { message } = res.data;
              MySwal.fire({
                  title: "Successfully Updated Course",
                  text: message,
                  showCancelButton: false,
              });
              navigate(`/detailCourse/${id}`);
          })
          .catch((err) => {
              const { message } = err.response.data;
              MySwal.fire({
                  title: "Failed to Update Course",
                  text: message,
                  showCancelButton: false,
              });
          });
  };

  const preventChar = (e) =>
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const headerImg = {
      width: "80%",
      height: "25rem",
      backgroundImage: `url(${image === "" ? Header : image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
  };

  return (
      <Layout>
          <form
              onSubmit={handleUpdateCourse}
              encType="multipart/form-data"
              className="w-full min-h-screen flex flex-col bg-white items-center mt-10"
          >
              <h1 className="text-black font-bold w-9/12 flex justify-center text-2xl font-poppins lg:mt-0 -mt-8">
                  Edit Kursus
              </h1>
              <div
                  className="rounded-2xl bg-no-repeat bg-auto bg-center mt-10"
                  style={headerImg}
              ></div>
              <h1 className="text-slate-500 text-center font-normal">
                  *Notes: Maksimal Size untuk gambar 500kb
              </h1>
              <Input
                  id="input-header-kursus"
                  type="file"
                  className="file-input h-10 w-10/12 lg:w-full lg:max-w-xs flex justify-center bg-white mx-auto mt-10 border-none"
                  onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]));
                  }}
              />
              <div className="flex flex-col-reverse lg:flex-row w-10/12 min-h-screen mt-5">
                  <div className="lg:w-[65%] text-black flex flex-col w-full">
                      <Input
                          id="input-nama-kursus"
                          type="text"
                          placeholder="Nama Kursus"
                          className="w-full h-10 mt-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                          id="input-tingkatan"
                          type="text"
                          placeholder="Tingkatan Kelas"
                          className="w-full h-10 mt-10"
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                      />
                      <Input
                          id="input-deskripsi"
                          type="text"
                          placeholder="Deskripsi Khusus"
                          className="w-full h-10 mt-10"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      />
                      <Input
                          id="input-silabus"
                          type="text"
                          placeholder="Apa yang akan Anda Pelajari"
                          className="w-full h-10 mt-10"
                          value={syllabus}
                          onChange={(e) => setSyllabus(e.target.value)}
                      />
                      <Input
                          id="input-prasyarat"
                          type="text"
                          placeholder="Prasyarat Khusus"
                          className="w-full h-10 mt-10"
                          value={requirement}
                          onChange={(e) => setRequirement(e.target.value)}
                      />
                      <Input
                          id="input-untuk-siapa"
                          type="text"
                          placeholder="Untuk Siapa Kursus ini"
                          className="w-full h-10 mt-10"
                          value={forWhom}
                          onChange={(e) => setForWhom(e.target.value)}
                      />
                      <Input
                          id="input-harga"
                          type="number"
                          placeholder="Harga"
                          className="w-full h-10 mt-10"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          onKeyDown={preventChar}
                      />
                      <Input
                          id="input-durasi"
                          type="number"
                          placeholder="Durasi (dalam jam)"
                          className="w-full h-10 mt-10"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          onKeyDown={preventChar}
                      />
                      <div className="w-full flex justify-center mt-10">
                          <Button
                              id="btn-update"
                              label="Update Kursus"
                              className="btn bg-button px-16 py-2 text-white border-none"
                              type="submit"
                          />
                      </div>
                  </div>
              </div>
          </form>
      </Layout>
  );
};

export { DetailCourse, UploadCourse, EditCourse};
