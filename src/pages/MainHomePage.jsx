import { useState, useEffect } from "react";
import BgBanner from "../assets/bg-banner.webp";
import Button from "../components/Button";
import { NavMain } from "../components/Navbar";
import icon1 from "../assets/icon/Icon-1.webp";
import Logo from "../assets/logo-musiclab.webp";
import { Link } from "react-router-dom";
import icon2 from "../assets/icon/icon-2.webp";
import icon3 from "../assets/icon/icon-3.webp";
import icon4 from "../assets/icon/icon-4.webp";
import icon5 from "../assets/icon/icon-5.webp";
import icon6 from "../assets/icon/icon-6.webp";
import calendar from "../assets/icon/calendar (1).webp";
import choose from "../assets/icon/choose.webp";
import search from "../assets/icon/loupe (2).webp";
import { CardMentor, CardTestimonial } from "../components/Card";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import axios from "axios";
import Layout from "../components/Layout";

export default function MainHomePage() {
  return (
    <div className="w-full min-h-screen overflow-auto bg-white">
      <Header />
      <section id="service">
        <Information />
      </section>
      <TopPicks />
      <AboutUs />
      <Ulasan />
      <BookNow />
      <Footer />
    </div>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const background = {
    backgroundImage: `url(${BgBanner})`,
    width: "100%",
    height: "auto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="w-full h-auto" style={background}>
      <NavMain />
      <div className="w-full h-[45rem] flex flex-col items-center justify-center">
        <h1 className="text-4xl lg:text-6xl font-bold w-[20rem] lg:w-[50rem] text-center text-white">
          Turn your passionate with music better with us
        </h1>
        <Link to="/searching">
          <Button
            id="btn-findmentor"
            label="Find Mentor"
            className="input input-bordered font-bold font-popins px-20 py-3 bg-white mt-10 text-black hover:bg-black hover:text-white border-none"
          />
        </Link>
      </div>
    </div>
  );
};

const Information = () => {
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-button text-2xl lg:text-4xl font-bold font-poppins text-center mt-16">
        Why Choosing Us?
      </h1>

      <div className="w-[80%] lg:h-full mx-auto mt-16">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 lg:overflow-hidden h-[96rem] lg:h-[40rem]">
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon1} className="w-3/12 mx-auto" alt="Mentor Terbaik" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Mentor Terbaik
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Dapatkan pengalaman diajarkan oleh mentor terbaik dan terverifikasi
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon2} className="w-3/12 mx-auto" alt="Harga Terjangkau" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Harga Terjangkau
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Harga terjangkau dengan pembelian paket dan sesi yang terbilang ramah di kantong
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon6} className="w-3/12 mx-auto" alt="Mentor Bersertifikat" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Mentor Bersertifikat
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Dapatkan jaminan diajarkan oleh mentor bersertifikat Nasional dan Internasional
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon3} className="w-3/12 mx-auto" alt="Cocok Untuk Pemula Hingga Expert" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Cocok Untuk Pemula Hingga Expert
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Cocok untuk pemula, intermedia hingga expert sekalipun
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon5} className="w-3/12 mx-auto" alt="Mudah Dalam Memesan Mentor" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Mudah Dalam Memesan Mentor
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Hanya tinggal cari guru, pilih guru, dan tentukan jadwal, maka kalian sudah bisa memesan mentor
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center card rounded-lg w-full h-full shadow-lg p-5 bg-choosingUs">
              <img src={icon4} className="w-3/12 mx-auto" alt="Tersedia Berbagai Genre Musik dan Instrumen" />
              <h2 className="text-black font-bold text-lg text-center font-poppins mt-2">
                Tersedia Berbagai Genre Musik dan Instrumen
              </h2>
              <p className="text-center text-black font-normal font-poppins mt-3">
                Tersedia berbagai Genre Musik dan Instrumen yang bisa dipelajari
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-44 lg:mt-20">
        <h1 className="text-button text-4xl font-bold font-poppins text-center mt-16">
          Cara Memesan
        </h1>
        <div className="w-[80%] mx-auto mt-16">
          <div className="lg:grid lg:grid-cols-3 grid-cols-1 gap-20 lg:overflow-hidden h-[55rem] lg:h-[20rem]">
            <div>
              <div className="flex justify-center card rounded-lg w-full shadow-lg p-12 bg-choosingUs">
                <img src={search} className="w-3/12 mx-auto" alt="Cari Guru" />
                <h2 className="text-black font-bold text-lg text-center font-poppins mt-5">
                  1. Cari Guru
                </h2>
                <p className="text-center text-black font-normal font-poppins mt-3">
                  Cari guru yang sesuai dengan genre musik anda
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-center card rounded-lg w-full shadow-lg p-12 bg-choosingUs">
                <img src={choose} className="w-3/12 mx-auto" alt="Pilih Guru" />
                <h2 className="text-black font-bold text-lg text-center font-poppins mt-5">
                  2. Pilih Guru
                </h2>
                <p className="text-center text-black font-normal font-poppins mt-3">
                  Pilih Guru dan lihat apakah cocok dengan anda
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-center card rounded-lg w-full shadow-lg p-12 bg-choosingUs">
                <img src={calendar} className="w-3/12 mx-auto" alt="Tentukan Jadwal" />
                <h2 className="text-black font-bold text-lg text-center font-poppins mt-5">
                  3. Tentukan Jadwal
                </h2>
                <p className="text-center text-black font-normal font-poppins mt-3">
                  Tentukan Jadwal kapan anda sendiri fleksibel kapan ingin belajar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopPicks = () => {
  const [loading, setLoading] = useState(false);
  const [topWeek, setTopWeek] = useState([]);
  const navigate = useNavigate();

  const fetchDataTopWeek = () => {
    setLoading(true);

    axios
      .get("/mentors/topweek")
      .then((res) => {
        const { data } = res.data;
        setTopWeek(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDataTopWeek();
  }, []);

  return (
    <div className="w-[80%] mx-auto min-h-screen mt-10">
      <h1 className="text-button text-center font-bold font-poppins text-4xl">
        Top Pick's Teacher
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        {topWeek.map((item) => (
          <CardMentor
            key={item.id}
            image={item.avatar}
            name={item.name}
            desc={item.about}
            instagram={item.instagram}
            rating={item.rating}
            onClick={() => navigate(`/ProfileDetail/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row w-[80%] mx-auto h-[40rem] lg:h-[30rem] mt-10">
      <div className="flex-1 flex-col flex justify-center text-center lg:ml-20">
        <h1
          id="aboutus"
          className="text-button font-bold lg:flex text-4xl font-poppins lg:mt-0 -mt-22"
        >
          About Us
        </h1>
        <hr className="border-2 border-slate-300 w-full lg:w-6/12 mt-3" />
        <p className="font-poppins font-normal text-black w-full lg:w-11/12 mt-5">
          MusicLab adalah sebuah platform untuk mempertemukan orang yang ingin
          belajar musik dan guru les musik. Di platform ini pengguna aplikasi
          dapat membooking guru les musik minimal jangka waktu 1 bulan (untuk
          selanjutnya bisa diperpanjang perminggu) atau bisa membeli paket les
          yang ingin dipelajari, dan untuk jadwalnya bisa menyesuaikan dengan
          kebutuhan dan jadwal yang disediakan oleh guru les.
        </p>
      </div>
      <div className="flex-1 flex-col flex justify-end lg:justify-center items-center lg:mb-0 mb-10">
        <img src={Logo} className="w-4/12" alt="MusicLab Logo" />
        <h1 className="text-button font-bold text-2xl lg:text-4xl font-poppins mt-5">
          MusicLab
        </h1>
      </div>
    </div>
  );
};

const Ulasan = () => {
  return (
    <div className="w-[80%] mx-auto min-h-screen mt-10">
      <h2 className="text-button text-center font-semibold font-poppins text-2xl">
        Testimonial
      </h2>
      <h1 className="text-button text-center font-bold font-poppins text-4xl mt-5">
        What Our Client Say
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {Array(6).fill().map((_, index) => (
          <CardTestimonial
            key={index}
            desc="I love how the instructor is really committed and brings happiness to students. The method of learning is astonishing and good for future student progress."
            image={Logo}
            name="Ardi"
          />
        ))}
      </div>
    </div>
  );
};

const BookNow = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row w-[80%] bg-button lg:h-[10rem] h-[15rem] mt-24 lg:mt-32 mx-auto rounded-2xl items-center justify-center shadow-xl">
      <h1 className="w-[30%] font-bold lg:text-4xl text-2xl text-white items flex justify-center font-poppins">
        MusicLab
      </h1>
      <p className="w-[60%] lg:w-[40%] font-semibold text-sm lg:text-xl text-white items text-center font-poppins mt-3">
        Turn your passion for music into something better with us
      </p>
      <h1 className="w-[30%] font-semibold lg:text-2xl text-lg text-white items flex justify-center lg:mt-0 mt-5">
        <Button
          id="btn-booking"
          label="Book Now"
          className="px-16 lg:px-7 py-1 border-white border-2 rounded-xl font-poppins hover:bg-white hover:text-button text-sm lg:text-xl"
          onClick={() => navigate("/searching")}
        />
      </h1>
    </div>
  );
};
